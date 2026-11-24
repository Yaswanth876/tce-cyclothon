"use client";

import React, { useMemo } from "react";

type V = { x: number; y: number };

// ---------- bike geometry (viewBox 0 -30 940 710) ----------
const R = 130; // wheel radius
const REAR: V = { x: 330, y: 510 };
const FRONT: V = { x: 702, y: 510 };
const BB: V = { x: 490, y: 540 };
const CRANK = 66;
const SEAT_TOP: V = { x: 412, y: 282 };
const TT_REAR: V = { x: 428, y: 335 };
const HEAD_TOP: V = { x: 630, y: 318 };
const HEAD_BOT: V = { x: 646, y: 372 };
const BAR_HAND: V = { x: 690, y: 288 };

// ---------- rider geometry ----------
const HIP: V = { x: 428, y: 268 };
const THIGH = 156;
const SHIN = 160;
const UPPER = 92;
const FORE = 92;
const TORSO = 150;
const ANKLE_OFF: V = { x: -24, y: -26 }; // ankle relative to pedal axle

const INK = "#000";

// ---------- helpers ----------
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ease = (a: number, b: number, t: number) => {
  const u = clamp((t - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
};
const mix = (a: V, b: V, t: number): V => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
const pts = (...p: V[]) => p.map((q) => `${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(" ");

/** Two-bone IK. bend -1 = joint forward/up (knees), +1 = back/down (elbows). */
function ik(p: V, t: V, a: number, b: number, bend: 1 | -1): V {
  const dx = t.x - p.x;
  const dy = t.y - p.y;
  const d = clamp(Math.hypot(dx, dy), Math.abs(a - b) + 0.5, a + b - 0.5);
  const A = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
  const ang = Math.atan2(dy, dx) + bend * A;
  return { x: p.x + a * Math.cos(ang), y: p.y + a * Math.sin(ang) };
}

// Near hand keyframes while the helmet is put on: [time, x, y]
const HAND_KEYS: [number, number, number][] = [
  [0, 650, 222],
  [1.2, 650, 222], // helmet held out in front of him
  [2.3, 588, 52],  // lifted above the head
  [3.0, 586, 128], // lowered onto the head
  [3.3, 586, 128],
  [3.9, 602, 152], // chin strap
];

function keyHand(t: number): V {
  for (let i = 0; i < HAND_KEYS.length - 1; i++) {
    const a = HAND_KEYS[i];
    const b = HAND_KEYS[i + 1];
    if (t <= b[0]) {
      const u = ease(a[0], b[0], t);
      return { x: lerp(a[1], b[1], u), y: lerp(a[2], b[2], u) };
    }
  }
  const l = HAND_KEYS[HAND_KEYS.length - 1];
  return { x: l[1], y: l[2] };
}

const HELMET_ON = 3.0;
const RIDE_START = 5.4;

function pose(t: number, crank: number) {
  const sp = ease(RIDE_START, 8, t);
  const lean = ease(4.3, 5.3, t);
  const breathe = Math.sin(t * 2.2) * 1.2 * (1 - ease(RIDE_START, 6.4, t));

  const hip: V = { x: HIP.x, y: HIP.y + Math.sin(crank * 2) * 1.8 * sp + breathe * 0.5 };
  const ang = lerp(-0.62, -0.5, lean);
  const shoulder: V = {
    x: hip.x + TORSO * Math.cos(ang),
    y: hip.y + TORSO * Math.sin(ang) + breathe,
  };
  const head: V = { x: shoulder.x + lerp(34, 62, lean), y: shoulder.y + lerp(-60, -76, lean) };
  const tilt = lerp(0, 0.1, lean);

  const handNear = mix(keyHand(t), BAR_HAND, ease(4.1, 5.1, t));
  const handFar: V = { x: BAR_HAND.x - 8, y: BAR_HAND.y + 4 };
  const farShoulder: V = { x: shoulder.x - 10, y: shoulder.y + 2 };

  const pedalNear: V = { x: BB.x + CRANK * Math.cos(crank), y: BB.y + CRANK * Math.sin(crank) };
  const pedalFar: V = { x: BB.x - CRANK * Math.cos(crank), y: BB.y - CRANK * Math.sin(crank) };
  const ankleNear: V = { x: pedalNear.x + ANKLE_OFF.x, y: pedalNear.y + ANKLE_OFF.y };
  const ankleFar: V = { x: pedalFar.x + ANKLE_OFF.x, y: pedalFar.y + ANKLE_OFF.y };

  return {
    hip,
    shoulder,
    farShoulder,
    head,
    tilt,
    handNear,
    handFar,
    pedalNear,
    pedalFar,
    ankleNear,
    ankleFar,
    kneeNear: ik(hip, ankleNear, THIGH, SHIN, -1),
    kneeFar: ik(hip, ankleFar, THIGH, SHIN, -1),
    elbowNear: ik(shoulder, handNear, UPPER, FORE, 1),
    elbowFar: ik(farShoulder, handFar, UPPER, FORE, 1),
  };
}

/** Filled tapered limb segment: two circles joined by outer tangents. */
function Taper({ a, ra, b, rb }: { a: V; ra: number; b: V; rb: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy) || 1;
  const ang = Math.atan2(dy, dx);
  const phi = Math.acos(clamp((ra - rb) / d, -1, 1));
  const p = (c: V, r: number, s: number): V => ({
    x: c.x + r * Math.cos(ang + s * phi),
    y: c.y + r * Math.sin(ang + s * phi),
  });
  return (
    <g fill={INK}>
      <circle cx={a.x} cy={a.y} r={ra} />
      <circle cx={b.x} cy={b.y} r={rb} />
      <polygon points={pts(p(a, ra, 1), p(b, rb, 1), p(b, rb, -1), p(a, ra, -1))} />
    </g>
  );
}

/** White accent stripe across a limb (jersey cuff, shorts hem). */
function Band({ a, b, u, h }: { a: V; b: V; u: number; h: number }) {
  const c = mix(a, b, u);
  const d = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const nx = -(b.y - a.y) / d;
  const ny = (b.x - a.x) / d;
  return (
    <line
      x1={c.x - nx * h}
      y1={c.y - ny * h}
      x2={c.x + nx * h}
      y2={c.y + ny * h}
      stroke="#fff"
      strokeWidth="3.5"
    />
  );
}

function Leg({ hip, knee, ankle }: { hip: V; knee: V; ankle: V }) {
  const calf = mix(knee, ankle, 0.32);
  return (
    <g>
      <Taper a={hip} ra={38} b={knee} rb={25} />
      <Taper a={knee} ra={23} b={calf} rb={22} />
      <Taper a={calf} ra={22} b={ankle} rb={10} />
      <Band a={hip} b={knee} u={0.74} h={23} />
      <path
        d="M-12,-8 L8,-10 C14,0 30,8 46,14 C52,18 52,26 44,28 L-10,28 C-16,26 -16,10 -12,-8 Z"
        transform={`translate(${ankle.x} ${ankle.y})`}
        fill={INK}
      />
    </g>
  );
}

function Arm({ sh, elbow, hand }: { sh: V; elbow: V; hand: V }) {
  return (
    <g>
      <Taper a={sh} ra={21} b={elbow} rb={16} />
      <Taper a={elbow} ra={15} b={hand} rb={10} />
      <circle cx={hand.x} cy={hand.y} r="13" fill={INK} />
      <Band a={sh} b={elbow} u={0.8} h={14} />
    </g>
  );
}

function Helmet() {
  return (
    <g>
      <path
        d="M-60,-10 C-58,-38 -30,-58 0,-58 C28,-58 46,-40 44,-8 C20,-14 -20,-16 -60,-10 Z"
        fill={INK}
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
        <path d="M-48,-20 C-34,-46 6,-52 30,-32" />
        <path d="M-52,-13 C-30,-34 10,-36 36,-17" />
        <path d="M-24,-47 C-12,-40 -4,-30 -6,-18" />
      </g>
    </g>
  );
}

function Wheel({ c, deg }: { c: V; deg: number }) {
  return (
    <g>
      <circle cx={c.x} cy={c.y} r={R - 7} fill="none" stroke={INK} strokeWidth="14" />
      <circle cx={c.x} cy={c.y} r={R - 22} fill="none" stroke={INK} strokeWidth="2.5" />
      <g transform={`rotate(${deg} ${c.x} ${c.y})`} stroke={INK} strokeWidth="1.5">
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const rimR = R - 24;
          const hubR = 11;
          return [0.38, -0.38].map((o, k) => (
            <line
              key={`${i}-${k}`}
              x1={c.x + hubR * Math.cos(a)}
              y1={c.y + hubR * Math.sin(a)}
              x2={c.x + rimR * Math.cos(a + o)}
              y2={c.y + rimR * Math.sin(a + o)}
            />
          ));
        })}
      </g>
      <circle cx={c.x} cy={c.y} r="10" fill={INK} />
    </g>
  );
}

export interface CyclistSilhouetteProps {
  /** Animation time in seconds (timeline from 0 to 8+) */
  t?: number;
  /** Crank angle in radians */
  crank?: number;
  /** Wheel rotation angle in radians or degrees */
  wheel?: number;
  /** Wheelie angle in degrees (0 = level, 25-30 = wheelie) */
  wheelieAngle?: number;
  /** Custom class */
  className?: string;
}

export function CyclistSilhouette({
  t = 0,
  crank = 0,
  wheel = 0,
  wheelieAngle = 0,
  className = "",
}: CyclistSilhouetteProps) {
  const p = useMemo(() => pose(t, crank), [t, crank]);

  const wheelDeg = (wheel * 180) / Math.PI;
  const crankDeg = (crank * 180) / Math.PI;
  const tiltDeg = (p.tilt * 180) / Math.PI;
  const helmetOnHead = t >= HELMET_ON;

  const neckBase: V = { x: p.shoulder.x - 8, y: p.shoulder.y - 12 };
  const midTorso = mix(p.hip, p.shoulder, 0.55);
  midTorso.y -= 8;

  // Wheelie rotation around rear wheel center (REAR = 330, 510)
  const wheelieTransform = wheelieAngle
    ? `rotate(${-wheelieAngle} ${REAR.x} ${REAR.y})`
    : undefined;

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 -30 940 670"
        className="w-full h-auto overflow-visible block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Realistic cyclist silhouette"
      >
        {/* ============================================================== */}
        {/* WHEELIE WRAPPER (Pivots bicycle & rider around rear axle)      */}
        {/* ============================================================== */}
        <g transform={wheelieTransform}>
          {/* NOTE: Road and speed lines have been completely removed as requested */}

          {/* ---------- bike wheels ---------- */}
          <Wheel c={REAR} deg={wheelDeg} />
          <Wheel c={FRONT} deg={wheelDeg} />

          {/* ---------- bike frame ---------- */}
          <g stroke={INK} strokeLinecap="round" strokeLinejoin="round" fill="none">
            <polyline points={pts(REAR, BB)} strokeWidth="9" />
            <polyline points={pts(REAR, { x: 420, y: 300 })} strokeWidth="7" />
            <polyline points={pts(BB, SEAT_TOP)} strokeWidth="12" />
            <polyline points={pts(TT_REAR, HEAD_TOP)} strokeWidth="12" />
            <polyline points={pts(BB, HEAD_BOT)} strokeWidth="14" />
            <polyline points={pts(HEAD_TOP, HEAD_BOT)} strokeWidth="15" />
            <polyline points={pts(HEAD_BOT, FRONT)} strokeWidth="9" />
            <polyline points={pts(SEAT_TOP, { x: 408, y: 268 })} strokeWidth="7" />
            {/* stem + drop bar */}
            <path d="M636,308 L652,300 L692,292 C724,296 730,332 662,352" strokeWidth="11" />
            {/* brake lever */}
            <path d="M714,300 C736,312 738,330 732,346" strokeWidth="4" />
          </g>

          {/* saddle */}
          <path
            d="M350,262 C368,256 402,262 424,270 L420,278 C396,276 372,273 352,272 Z"
            fill={INK}
          />

          {/* rear cassette + derailleur */}
          <circle cx={REAR.x} cy={REAR.y} r="26" fill={INK} />
          <circle cx={REAR.x} cy={REAR.y} r="19" fill="none" stroke="#fff" strokeWidth="1.5" />
          <circle cx={REAR.x} cy={REAR.y} r="11" fill="none" stroke="#fff" strokeWidth="1.5" />
          <g stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <polyline points="326,524 340,548 332,560 346,578" />
          </g>
          <circle cx="338" cy="552" r="8" fill={INK} />
          <circle cx="346" cy="580" r="7" fill={INK} />

          {/* chain */}
          <line x1={BB.x} y1={BB.y - 30} x2={REAR.x} y2={REAR.y - 24} stroke={INK} strokeWidth="2.5" />
          <line x1={BB.x} y1={BB.y + 30} x2={REAR.x + 10} y2={REAR.y + 28} stroke={INK} strokeWidth="2.5" />

          {/* chainring */}
          <g transform={`rotate(${crankDeg} ${BB.x} ${BB.y})`}>
            <circle cx={BB.x} cy={BB.y} r="36" fill={INK} />
            {Array.from({ length: 5 }, (_, i) => {
              const a = (i / 5) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={BB.x + 20 * Math.cos(a)}
                  cy={BB.y + 20 * Math.sin(a)}
                  r="6.5"
                  fill="#fff"
                />
              );
            })}
          </g>

          {/* cranks + pedals (far) */}
          <g stroke={INK} strokeLinecap="round">
            <line x1={BB.x} y1={BB.y} x2={p.pedalFar.x} y2={p.pedalFar.y} strokeWidth="11" />
            <line
              x1={p.pedalFar.x - 16}
              y1={p.pedalFar.y + 2}
              x2={p.pedalFar.x + 16}
              y2={p.pedalFar.y + 2}
              strokeWidth="8"
            />
          </g>

          {/* ---------- rider: far limbs ---------- */}
          <Leg hip={p.hip} knee={p.kneeFar} ankle={p.ankleFar} />
          <Arm sh={p.farShoulder} elbow={p.elbowFar} hand={p.handFar} />

          {/* torso */}
          <Taper a={{ x: p.hip.x - 6, y: p.hip.y + 2 }} ra={48} b={midTorso} rb={46} />
          <Taper a={midTorso} ra={46} b={p.shoulder} rb={40} />
          <circle cx={p.shoulder.x - 24} cy={p.shoulder.y - 6} r="38" fill={INK} />

          {/* near crank + pedal */}
          <g stroke={INK} strokeLinecap="round">
            <line x1={BB.x} y1={BB.y} x2={p.pedalNear.x} y2={p.pedalNear.y} strokeWidth="11" />
            <line
              x1={p.pedalNear.x - 16}
              y1={p.pedalNear.y + 2}
              x2={p.pedalNear.x + 16}
              y2={p.pedalNear.y + 2}
              strokeWidth="8"
            />
          </g>

          {/* neck + head */}
          <Taper a={neckBase} ra={24} b={{ x: p.head.x - 8, y: p.head.y + 16 }} rb={16} />
          <g transform={`translate(${p.head.x} ${p.head.y}) rotate(${tiltDeg})`}>
            <path
              d="M-6,-26 C14,-27 28,-16 29,-3 L38,8 L30,11 L32,17 L29,21 L31,27 C24,35 8,36 -4,30 C-14,34 -22,28 -26,16 C-32,-2 -26,-24 -6,-26 Z"
              fill={INK}
            />
          </g>

          {/* near limbs */}
          <Leg hip={p.hip} knee={p.kneeNear} ankle={p.ankleNear} />
          <Arm sh={p.shoulder} elbow={p.elbowNear} hand={p.handNear} />

          {/* helmet: in his hand first (0-3s), then lowered onto his head with chin strap */}
          {helmetOnHead ? (
            <g transform={`translate(${p.head.x} ${p.head.y}) rotate(${tiltDeg}) translate(2 4)`}>
              <Helmet />
              <path
                d="M-12,-8 L-8,14"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform="translate(-2 -4)"
              />
            </g>
          ) : (
            <g transform={`translate(${p.handNear.x} ${p.handNear.y - 4})`}>
              <Helmet />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
