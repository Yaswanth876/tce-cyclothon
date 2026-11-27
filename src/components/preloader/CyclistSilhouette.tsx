"use client";

import React, { useMemo } from "react";

type V = { x: number; y: number };

// ---------- traced from the reference picture (945 x 674 px) ----------
const BODY_PATH =
  "M641.0 336.5 L641.0 366.0 L651.0 366.0ZM647.8 299.5 L636.5 292.5 L623.5 295.8 L620.5 293.5 L617.5 293.2 L609.5 296.0 L607.0 298.5 L607.0 302.8 L608.0 305.0 L614.0 310.5 L614.0 320.2 L615.8 321.8 L618.2 322.2 L618.8 324.2 L617.2 327.2 L615.0 329.0 L600.0 330.5 L600.0 332.0 L639.0 332.0 L636.5 325.8 L631.0 323.2 L629.2 318.5 L631.5 316.2 L631.8 314.2 L626.8 308.0 L628.2 306.8 L638.2 303.8ZM584.0 197.2 L585.0 199.8 L584.8 202.5 L585.0 201.5 L586.0 202.5 L585.8 205.8 L586.2 205.0 L587.0 205.8 L586.2 207.2 L587.0 208.8 L587.8 208.8 L587.5 210.0 L594.0 224.5 L598.0 229.2 L649.5 269.2 L667.2 287.0 L669.5 288.0 L669.2 288.8 L674.5 288.8 L681.2 286.8 L688.8 286.8 L690.2 287.5 L680.0 288.0 L674.0 290.0 L668.2 290.0 L655.0 303.8 L653.8 303.0 L660.8 310.0 L664.5 312.5 L668.5 313.8 L680.5 313.8 L682.2 314.8 L685.0 317.8 L685.8 322.2 L685.0 326.5 L682.0 332.5 L679.2 335.8 L675.0 339.0 L666.0 342.8 L655.0 345.0 L650.8 347.0 L648.8 350.8 L649.0 354.5 L650.2 356.5 L652.5 357.8 L656.2 358.0 L671.2 354.5 L681.5 349.8 L690.0 342.8 L694.0 337.2 L696.8 331.5 L699.0 318.2 L702.5 317.0 L705.2 313.2 L705.2 308.5 L706.8 306.0 L706.8 302.0 L703.2 294.8 L710.0 299.5 L713.0 302.5 L714.0 304.8 L713.8 308.2 L707.2 319.5 L708.0 324.0 L714.0 330.8 L717.2 333.2 L718.8 333.5 L719.2 332.0 L717.0 325.0 L716.8 321.2 L719.5 303.8 L718.8 299.5 L715.0 292.2 L727.0 281.0 L728.2 282.0 L729.8 292.5 L726.0 299.5 L725.2 305.0 L727.0 310.2 L731.0 317.2 L734.8 321.2 L736.5 320.8 L736.5 318.8 L733.8 310.2 L733.8 286.5 L732.8 281.2 L730.0 275.2 L731.5 265.8 L729.8 262.8 L725.5 260.8 L720.2 260.8 L717.2 262.0 L715.2 265.5 L715.0 269.8 L714.0 272.0 L710.5 275.0 L706.8 276.0 L689.5 275.0 L676.2 280.0 L668.2 275.0 L659.5 267.8 L633.8 240.8 L616.8 224.8 L613.8 220.5 L611.0 213.5 L604.5 190.8 L594.2 195.0ZM638.8 105.5 L654.2 106.8 L663.5 105.2ZM651.2 110.2 L649.2 109.0 L641.2 108.8 L619.5 105.0 L616.8 103.2 L599.0 102.2 L582.5 100.2 L587.5 102.8 L595.8 103.8 L596.0 106.8 L594.5 105.8 L587.8 105.0 L580.2 101.0 L577.0 105.8 L575.5 113.5 L573.8 114.8 L566.2 115.8 L557.5 111.0 L548.5 109.0 L534.0 108.5 L515.5 110.0 L491.8 116.0 L468.5 126.0 L448.5 138.0 L429.5 153.0 L406.8 177.0 L393.0 187.5 L386.5 195.0 L381.0 203.5 L378.0 210.2 L375.0 220.0 L374.0 226.8 L374.0 237.2 L375.0 244.0 L377.0 250.2 L385.0 262.8 L379.0 263.0 L367.2 261.0 L356.0 260.5 L352.5 261.0 L350.0 263.5 L350.5 265.2 L353.8 269.0 L362.2 273.8 L370.2 280.8 L373.5 281.8 L383.0 281.0 L388.5 286.8 L393.5 287.8 L400.8 286.5 L402.0 289.2 L402.2 262.0 L445.0 262.0 L472.2 222.0 L470.8 221.2 L477.5 215.8 L485.0 211.2 L492.5 207.8 L503.2 204.8 L513.8 203.8 L528.2 203.8 L542.5 198.0 L540.0 193.5 L540.2 192.8 L552.2 193.5 L561.8 191.5 L575.0 184.8 L577.5 182.5 L578.2 180.0 L580.0 185.8 L583.2 185.0 L581.5 190.2 L583.5 191.8 L591.0 190.5 L601.2 186.8 L603.2 185.0 L599.8 171.2 L599.8 166.0 L600.8 161.5 L600.8 156.5 L599.8 152.2 L611.2 151.8 L616.5 153.0 L626.0 157.8 L630.2 157.8 L633.5 154.2 L634.8 150.0 L639.8 146.5 L640.0 145.2 L639.0 143.0 L644.8 140.8 L644.8 135.5 L646.5 133.8 L652.8 133.5 L655.8 131.8 L655.8 127.2 L651.0 117.2ZM398.2 276.8 L400.0 279.8 L399.2 281.2 L394.2 282.2 L391.8 279.5 L392.8 277.8 L396.8 276.5Z";

const HELMET_PATH =
  "M664.2 103.2 L659.0 104.8 L663.5 105.0ZM566.0 56.5 L567.0 61.0 L571.8 68.2 L571.5 69.0 L566.2 69.5 L568.0 76.2 L574.2 90.5 L579.0 97.2 L582.2 100.0 L602.0 102.2 L617.0 103.2 L619.8 102.8 L624.5 103.8 L636.2 104.2 L618.0 101.0 L609.2 98.0 L592.5 94.0 L585.0 90.0 L582.8 87.8 L583.0 86.8 L596.2 89.8 L628.8 99.8 L639.8 101.8 L659.5 101.8 L665.5 100.8 L668.8 99.2 L667.5 86.8 L664.8 78.5 L661.8 72.5 L656.5 65.2 L651.2 60.0 L639.2 52.0 L623.5 47.2 L610.0 46.5 L602.8 47.0 L576.0 52.0 L568.5 54.2ZM590.0 68.2 L598.2 68.8 L604.2 70.0 L615.2 73.8 L628.2 80.8 L636.0 86.5 L640.8 91.5 L640.0 92.0 L627.2 89.0 L611.2 83.0 L598.5 76.0 L591.0 70.0ZM582.8 60.2 L590.5 59.0 L601.0 59.0 L610.2 60.0 L624.8 63.8 L633.5 68.0 L640.8 73.0 L648.0 79.8 L654.0 88.0 L653.2 88.2 L648.0 83.0 L640.2 77.2 L626.2 70.0 L606.0 64.0ZM601.0 52.2 L606.5 51.5 L618.0 51.8 L629.8 54.8 L641.0 60.0 L646.2 63.8 L653.5 71.2 L658.8 79.0 L662.0 85.5 L662.0 87.2 L660.8 86.8 L657.8 81.5 L651.5 73.8 L645.5 68.0 L638.8 63.2 L628.5 58.0 L614.0 54.0 L601.8 53.0Z";

const UPPER_ARM_PATH =
  "M598.0 229.5 L610.8 239.8 L615.2 244.5 L616.0 243.5ZM528.5 203.8 L533.0 203.5 L543.5 200.5 L567.8 236.5 L577.0 252.2 L584.5 259.8 L593.5 266.8 L614.5 245.2 L610.5 241.2 L601.0 234.0 L594.0 226.0 L592.8 221.8 L592.0 222.0 L592.2 220.8 L591.0 219.8 L591.5 219.0 L585.8 206.8 L581.0 191.2 L583.0 185.0 L580.2 185.8 L580.2 187.5 L575.5 191.8 L565.0 197.0 L552.2 200.0 L544.8 200.0 L542.2 198.2Z";

const FOREARM_PATH =
  "M587.5 262.0 L603.5 273.8 L635.0 291.0 L654.8 303.5 L668.0 290.0 L666.2 289.0 L669.5 288.2 L667.2 287.2 L649.5 269.5 L609.8 238.8 L633.2 263.5 L646.2 274.5 L666.5 288.8 L665.0 289.0 L659.2 285.8 L643.8 274.0 L632.2 264.0 L618.5 249.0 L608.8 240.0Z";

const SHOULDER: V = { x: 562, y: 188 };
const ELBOW0: V = { x: 615, y: 239 };
const WRIST0: V = { x: 668, y: 290 };
const ARM_ANG0 = 0.7661697642977411;
const ARM_HALF = 73.55;
const HELMET_GRIP: V = { x: 612, y: 104 };

// ---------- bike (measured from reference picture) ----------
export const REAR: V = { x: 334, y: 514 };
export const FRONT: V = { x: 703, y: 514 };
export const BB: V = { x: 490, y: 540 };
export const CRANK = 76;
export const TIRE_R = 122;
export const THETA0 = -1.86;

// ---------- legs ----------
const HIP: V = { x: 446, y: 252 };
const THIGH = 170;
const SHIN = 172;
const PEDAL_TO_ANKLE: V = { x: -46, y: -40 };

const THIGH_D =
  "M0,-32 C40,-36 100,-36 140,-28 C154,-25 164,-23 172,-22 C182,-21 188,-8 186,6 C184,18 176,24 166,24 C138,26 108,30 70,32 C40,34 8,38 -10,34 C-28,24 -28,-20 -10,-28 Z";
const SHIN_D =
  "M0,-22 C24,-24 44,-21 72,-18 C110,-14 150,-12 172,-11 C180,-10 182,2 176,11 C166,14 148,14 124,17 C104,22 84,32 56,31 C30,30 10,28 0,24 C-12,18 -12,-18 0,-22 Z";
const SHOE_D =
  "M-12,-12 C-3,-16 9,-12 18,-4 C32,0 48,7 62,14 C74,19 82,23 80,31 C79,34 74,35 70,35 L-16,35 C-23,35 -24,28 -23,20 C-23,6 -17,-6 -12,-12 Z";

const INK = "var(--brand-deep-green)";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ease = (a: number, b: number, t: number) => {
  const u = clamp((t - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
};
/** Format float to 3 decimal places to prevent SSR/client hydration floating-point drift */
const r = (n: number) => Math.round(n * 1000) / 1000;
const deg = (rad: number) => r((rad * 180) / Math.PI);

function ik(p: V, t: V, a: number, b: number, bend: 1 | -1): V {
  const dx = t.x - p.x;
  const dy = t.y - p.y;
  const d = clamp(Math.hypot(dx, dy), Math.abs(a - b) + 0.5, a + b - 0.5);
  const A = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
  const ang = Math.atan2(dy, dx) + bend * A;
  return { x: p.x + a * Math.cos(ang), y: p.y + a * Math.sin(ang) };
}

const HAND_KEYS: [number, number, number][] = [
  [0, 672, 224],
  [1.2, 672, 224], // helmet held out in front, gripped from below
  [2.0, 668, 150], // raised in front of the face
  [3.0, HELMET_GRIP.x, HELMET_GRIP.y], // slid onto the head
  [3.3, HELMET_GRIP.x, HELMET_GRIP.y],
  [3.9, 636, 150], // chin strap
  [4.7, WRIST0.x, WRIST0.y], // back on the hood
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

export const HELMET_ON = 3.0;
export const RIDE_START = 4.8;

function pose(t: number, crank: number) {
  const hand = keyHand(t);
  const elbow = ik(SHOULDER, hand, ARM_HALF, ARM_HALF, 1);

  const pedalNear: V = { x: BB.x + CRANK * Math.cos(crank), y: BB.y + CRANK * Math.sin(crank) };
  const pedalFar: V = { x: BB.x - CRANK * Math.cos(crank), y: BB.y - CRANK * Math.sin(crank) };
  const ankleNear: V = { x: pedalNear.x + PEDAL_TO_ANKLE.x, y: pedalNear.y + PEDAL_TO_ANKLE.y };
  const ankleFar: V = { x: pedalFar.x + PEDAL_TO_ANKLE.x, y: pedalFar.y + PEDAL_TO_ANKLE.y };

  return {
    hand,
    elbow,
    pedalNear,
    pedalFar,
    ankleNear,
    ankleFar,
    kneeNear: ik(HIP, ankleNear, THIGH, SHIN, -1),
    kneeFar: ik(HIP, ankleFar, THIGH, SHIN, -1),
    helmetShift:
      t < HELMET_ON
        ? { x: hand.x - HELMET_GRIP.x, y: hand.y - HELMET_GRIP.y }
        : { x: 0, y: 0 },
  };
}

function Leg({ knee, ankle }: { knee: V; ankle: V }) {
  const thighAng = deg(Math.atan2(knee.y - HIP.y, knee.x - HIP.x));
  const shinAng = deg(Math.atan2(ankle.y - knee.y, ankle.x - knee.x));
  return (
    <g>
      <g transform={`translate(${HIP.x} ${HIP.y}) rotate(${thighAng})`}>
        <path d={THIGH_D} fill={INK} />
        <line x1="122" y1="-28" x2="122" y2="26" stroke="var(--brand-white)" strokeWidth="3.5" />
      </g>
      <path d={SHIN_D} fill={INK} transform={`translate(${r(knee.x)} ${r(knee.y)}) rotate(${shinAng})`} />
      <path d={SHOE_D} fill={INK} transform={`translate(${r(ankle.x)} ${r(ankle.y)})`} />
    </g>
  );
}

function Pedal({ at }: { at: V }) {
  const atX = r(at.x);
  const atY = r(at.y);
  return (
    <g>
      <line
        x1={BB.x}
        y1={BB.y}
        x2={atX}
        y2={atY}
        stroke={INK}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <rect x={r(atX - 20)} y={r(atY - 4)} width="40" height="9" rx="4" fill={INK} />
    </g>
  );
}

function Wheel({ c, rot, hub }: { c: V; rot: number; hub: number }) {
  return (
    <g>
      <circle cx={c.x} cy={c.y} r={TIRE_R} fill="none" stroke={INK} strokeWidth="22" />
      <g transform={`rotate(${rot} ${c.x} ${c.y})`} fill={INK}>
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const p = (r: number, o: number) =>
            `${(c.x + r * Math.cos(a + o)).toFixed(1)},${(c.y + r * Math.sin(a + o)).toFixed(1)}`;
          return (
            <polygon
              key={i}
              points={`${p(hub, -0.13)} ${p(112, -0.006)} ${p(112, 0.006)} ${p(hub, 0.13)}`}
            />
          );
        })}
      </g>
      <circle cx={c.x} cy={c.y} r={hub} fill={INK} />
    </g>
  );
}

export interface CyclistSilhouetteProps {
  t?: number;
  crank?: number;
  wheel?: number;
  wheelieAngle?: number;
  stoppieAngle?: number;
  bikePitch?: number;
  ink?: string;
  glow?: boolean;
  className?: string;
}

export function CyclistSilhouette({
  t = 0,
  crank = THETA0,
  wheel = 0,
  wheelieAngle = 0,
  stoppieAngle = 0,
  bikePitch = 0,
  ink = INK,
  glow = false,
  className = "",
}: CyclistSilhouetteProps) {
  const p = useMemo(() => pose(t, crank), [t, crank]);

  const wheelDeg = deg(wheel);
  const crankDeg = deg(crank);
  const helmetOn = t >= HELMET_ON;
  const bob = r(Math.sin(crank * 2) * 1.2 * (t >= RIDE_START ? 1 : 0));

  const upperAng = deg(Math.atan2(p.elbow.y - SHOULDER.y, p.elbow.x - SHOULDER.x) - ARM_ANG0);
  const foreAng = deg(Math.atan2(p.hand.y - p.elbow.y, p.hand.x - p.elbow.x) - ARM_ANG0);

  // Wheelie rotation around rear wheel axle
  const wheelieTransform = wheelieAngle
    ? `rotate(${r(-wheelieAngle)} ${REAR.x} ${REAR.y})`
    : undefined;

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 30 945 618"
        className="w-full h-auto overflow-visible block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Realistic cyclist silhouette"
      >
        {/* WHEELIE WRAPPER: pivots bike & rider around rear axle */}
        <g transform={wheelieTransform}>
          {/* Note: Road and speed lines have been removed per requirements */}

          {/* wheels */}
          <Wheel c={REAR} rot={wheelDeg} hub={20} />
          <Wheel c={FRONT} rot={wheelDeg} hub={11} />

          {/* frame */}
          <g stroke={INK} strokeLinecap="round" fill="none">
            <line x1={REAR.x} y1={REAR.y} x2={BB.x} y2={BB.y} strokeWidth="12" />
            <line x1={REAR.x} y1={REAR.y} x2="424" y2="350" strokeWidth="8" />
            <line x1={BB.x} y1={BB.y} x2="402" y2="284" strokeWidth="13" />
            <line x1="424" y1="350" x2="628" y2="335" strokeWidth="17" />
            <line x1="632" y1="300" x2="644" y2="368" strokeWidth="24" />
            <line x1="638" y1="362" x2={BB.x} y2={BB.y} strokeWidth="29" />
            <line x1="644" y1="372" x2={FRONT.x} y2={FRONT.y} strokeWidth="14" />
          </g>

          {/* rear derailleur + chain */}
          <path
            d="M324,526 L340,550 L334,560 L340,574"
            stroke={INK}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="340" cy="552" r="9" fill={INK} />
          <circle cx="336" cy="573" r="11" fill={INK} />
          <line x1="352" y1="505" x2={BB.x} y2="500" stroke={INK} strokeWidth="2.5" />
          <line x1="342" y1="576" x2="482" y2="579" stroke={INK} strokeWidth="2.5" />

          {/* chainring */}
          <g transform={`rotate(${crankDeg} ${BB.x} ${BB.y})`}>
            <circle cx={BB.x} cy={BB.y} r="40" fill={INK} />
            {[6.5, 7, 8.5, 10.5, 11.5].map((r, i) => {
              const a = (i / 5) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={BB.x + 22 * Math.cos(a)}
                  cy={BB.y + 22 * Math.sin(a)}
                  r={r}
                  fill="var(--brand-white)"
                />
              );
            })}
          </g>

          {/* far side: crank + leg */}
          <Pedal at={p.pedalFar} />
          <Leg knee={p.kneeFar} ankle={p.ankleFar} />

          {/* upper body traced from reference photograph */}
          <g transform={`translate(0 ${bob})`}>
            {/* head under the helmet */}
            <path d="M652,108 C660,92 652,64 622,57 C596,52 574,76 578,108 Z" fill={INK} />
            <circle cx="474" cy="246" r="30" fill={INK} />
            <path d={BODY_PATH} fill={INK} fillRule="evenodd" />
            {helmetOn && (
              <path
                d="M598,105 L607,130 L615,105"
                fill="none"
                stroke="var(--brand-white)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            )}

            {/* near leg + crank */}
            <Pedal at={p.pedalNear} />
            <Leg knee={p.kneeNear} ankle={p.ankleNear} />

            {/* near arm */}
            <path
              d={UPPER_ARM_PATH}
              fill={INK}
              fillRule="evenodd"
              transform={`rotate(${upperAng} ${SHOULDER.x} ${SHOULDER.y})`}
            />
            <circle cx={r(p.elbow.x)} cy={r(p.elbow.y)} r="18" fill={INK} />
            <path
              d={FOREARM_PATH}
              fill={INK}
              fillRule="evenodd"
              transform={`translate(${r(p.elbow.x)} ${r(p.elbow.y)}) rotate(${foreAng}) translate(${-ELBOW0.x} ${-ELBOW0.y})`}
            />
            <circle cx={r(p.hand.x)} cy={r(p.hand.y)} r="14" fill={INK} />

            {/* helmet: in his hand first, then on his head */}
            <path
              d={HELMET_PATH}
              fill={INK}
              fillRule="evenodd"
              stroke="var(--brand-white)"
              strokeWidth="3"
              strokeLinejoin="round"
              paintOrder="stroke"
              transform={`translate(${r(p.helmetShift.x)} ${r(p.helmetShift.y)})`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
