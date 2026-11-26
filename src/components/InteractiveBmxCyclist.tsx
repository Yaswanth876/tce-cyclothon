"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { CyclistSilhouette, THETA0, RIDE_START } from "@/components/preloader/CyclistSilhouette";

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

export type CyclistState =
  | "ENTERING"
  | "IDLE"
  | "RIDING"
  | "EVADE"
  | "ACCELERATE"
  | "WHEELIE"
  | "JUMP"
  | "AIRBORNE"
  | "LANDING"
  | "RECOVERY";

export interface InteractiveBmxCyclistProps {
  /** Repulsion radius for cursor detection in pixels (default: 160) */
  interactionRadius?: number;
  /** Global speed multiplier (default: 1.0) */
  speedMultiplier?: number;
  /** Custom ink color for the silhouette (default: "#0A0A0A") */
  ink?: string;
  /** Enable playful speech bubble callouts (default: true) */
  enableSpeechBubbles?: boolean;
  /** Enable BMX stunt interactions (default: true) */
  enableStunts?: boolean;
}

interface TextObstacle {
  x: number;
  w: number;
  type: "word-gap" | "letter-hop";
}

interface Platform {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  isHeading?: boolean;
  obstacles: TextObstacle[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  age: number;
  size: number;
  color: string;
}

interface SpeechBubble {
  text: string;
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

// Visual dimensions
const BIKE_WIDTH = 54;
// Aspect ratio 945 x 618: SVG height = 54 * (618 / 945) ≈ 35.3px
const BIKE_HEIGHT = Math.round(BIKE_WIDTH * (618 / 945));
// Ground contact baseline is at 98% of SVG height
const GROUND_Y_OFFSET = Math.round(BIKE_HEIGHT * 0.98);

// Reduced, natural speed parameters
const BASE_SPEED = 0.58; // gentle, deliberate pedaling pace
const GRAVITY = 0.18; // smooth, realistic jump gravity
const JUMP_IMPULSE = -4.5; // gentle jump impulse between text lines
const MINI_HOP_IMPULSE = -2.6; // subtle hop over letters & word gaps
const PANIC_DISTANCE = 55;

// Playful BMX & Anti-Drug themed speech callouts
const EVADE_SPEECH = [
  "eek!",
  "whoa!",
  "watch out!",
  "skrrrt!",
  "too close!",
  "run!",
  "accelerate!",
  "yikes!",
  "faster faster!",
];

const STUNT_SPEECH = [
  "bunny hop!",
  "wheelie!",
  "sick trick!",
  "smooth",
  "clean landing!",
  "360!",
  "airtime!",
  "send it!",
  "nailed it!",
];

const AMBIENT_SPEECH = [
  "Pedal to No Drug!",
  "TCE 2026!",
  "SDG 3 · Target 3.5",
  "let's ride!",
  "Madurai district edition",
  "cadence 80!",
  "stay drug-free!",
  "zoom!",
  "feel the flow!",
];

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

export function InteractiveBmxCyclist({
  interactionRadius = 160,
  speedMultiplier = 1.0,
  ink = "#0A0A0A",
  enableSpeechBubbles = true,
  enableStunts = true,
}: InteractiveBmxCyclistProps) {
  const [mounted, setMounted] = useState(false);

  // SVG Kinematic props (updated at 60fps)
  const [crankAngle, setCrankAngle] = useState(THETA0);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [wheelieAngle, setWheelieAngle] = useState(0);
  const [stoppieAngle, setStoppieAngle] = useState(0);
  const [bikePitch, setBikePitch] = useState(0);

  // Direct DOM refs (zero React re-render overhead for layout position)
  const cyclistWrapperRef = useRef<HTMLDivElement>(null);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const bubbleTextRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Physics state refs
  const posRef = useRef({ x: 80, y: 220 });
  const velRef = useRef({ vx: BASE_SPEED, vy: 0 });
  const facingRightRef = useRef(true);
  const stateRef = useRef<CyclistState>("RIDING");
  const stateTimerRef = useRef(0);
  const onPlatformRef = useRef<Platform | null>(null);
  const platformsRef = useRef<Platform[]>([]);
  const visitedRef = useRef<string[]>([]);

  // Kinematic angle refs
  const crankRef = useRef(THETA0);
  const wheelRef = useRef(0);
  const wheelieRef = useRef(0);
  const stoppieRef = useRef(0);
  const pitchRef = useRef(0);
  const trickCooldownRef = useRef(0);
  const lastObstacleJumpRef = useRef(0);

  // Pointer & touch coordinates
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchTimeRef = useRef(0);

  // Particles & speech bubble
  const particlesRef = useRef<Particle[]>([]);
  const bubbleRef = useRef<SpeechBubble | null>(null);
  const bubbleCooldownRef = useRef(160);

  const setSimState = useCallback((nextState: CyclistState) => {
    stateRef.current = nextState;
  }, []);

  // --------------------------------------------------------------------------
  // 1. STRICT TEXT-ONLY PLATFORM SCANNER (WALKS ACTUAL TEXT NODES)
  // --------------------------------------------------------------------------
  const scanTypographyPlatforms = useCallback((): Platform[] => {
    if (typeof window === "undefined") return [];

    const found: Platform[] = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Search strictly inside main content
    const main = document.querySelector("main") || document.body;

    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (!n.textContent || !n.textContent.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (!p || !p.offsetParent) return NodeFilter.FILTER_REJECT;
        // Exclude headers, nav, preloader, footers, scripts, and invisible tags
        if (p.closest("nav, aside, footer, script, style, [aria-label*='Preloader'], canvas")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const range = document.createRange();
    const seen = new Set<string>();
    let node: Node | null;
    let platIdCounter = 0;

    while ((node = walker.nextNode())) {
      range.selectNodeContents(node);
      const rects = range.getClientRects();
      const parentEl = node.parentElement;
      const tag = parentEl ? parentEl.tagName.toUpperCase() : "";
      const isHeading =
        tag === "H1" || tag === "H2" || tag === "H3" || tag === "H4" || parentEl?.getAttribute("role") === "heading";

      for (let i = 0; i < rects.length; i++) {
        const r = rects[i];

        // Only accept actual visible text lines with sufficient width to cycle on
        if (r.width < 50 || r.height < 8 || r.height > 120) continue;
        if (r.bottom < 40 || r.top > vh - 40) continue;
        if (r.left < 10 || r.right > vw + 10) continue;

        // Deduplicate close lines
        const key = `${Math.round(r.top / 6)}:${Math.round(r.left / 18)}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const rawText = (node.textContent || "").trim().slice(0, 40);

        // Find word gaps along the text for mini hops
        const obstacles: TextObstacle[] = [];
        const words = rawText.split(/\s+/).filter(Boolean);
        if (words.length > 1) {
          const step = r.width / words.length;
          for (let wIdx = 1; wIdx < words.length; wIdx++) {
            obstacles.push({
              x: Math.round(r.left + wIdx * step),
              w: 12,
              type: "word-gap",
            });
          }
        }

        found.push({
          id: `text-plat-${platIdCounter++}`,
          x: Math.round(r.left),
          y: Math.round(r.top - 1), // tires ride directly along top edge of text letters
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: rawText,
          isHeading,
          obstacles,
        });
      }
    }

    // Sort platforms: Prioritize large prominent headings (H1, H2), then vertical layout
    found.sort((a, b) => {
      const aScore = (a.isHeading ? 300 : 0) + (a.h > 35 ? 180 : 0) - a.y * 0.3;
      const bScore = (b.isHeading ? 300 : 0) + (b.h > 35 ? 180 : 0) - b.y * 0.3;
      return bScore - aScore;
    });

    return found;
  }, []);

  // --------------------------------------------------------------------------
  // 2. HELPER FUNCTIONS: PARTICLES, SPEECH BUBBLE, PLATFORM SELECTION
  // --------------------------------------------------------------------------
  const spawnTireSparks = useCallback((x: number, y: number, count = 6) => {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI * (0.15 + Math.random() * 0.7);
      const speed = 0.7 + Math.random() * 1.8;
      particlesRef.current.push({
        x,
        y: y - 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 20 + Math.random() * 16,
        age: 0,
        size: Math.random() < 0.35 ? 2.2 : 1.4,
        color: Math.random() < 0.65 ? "#4C9F38" : "#EBF6E8",
      });
    }
  }, []);

  const triggerSpeech = useCallback(
    (pool: string[], force = false) => {
      if (!enableSpeechBubbles) return;
      if (!force && (bubbleRef.current || bubbleCooldownRef.current > 0)) return;

      const text = pool[Math.floor(Math.random() * pool.length)];
      bubbleRef.current = {
        text,
        x: posRef.current.x + BIKE_WIDTH * 0.5,
        y: posRef.current.y - GROUND_Y_OFFSET - 20,
        age: 0,
        maxAge: 110 + text.length * 4,
      };

      if (bubbleTextRef.current) {
        bubbleTextRef.current.innerText = text;
      }
      bubbleCooldownRef.current = 150;
    },
    [enableSpeechBubbles]
  );

  const pickTargetPlatform = useCallback(
    (current: Platform | null): Platform | null => {
      const plats = platformsRef.current.filter((p) => p !== current && p.w >= 50);
      if (plats.length === 0) return null;

      // Filter to platforms within sensible jumping distance from current text line
      const reachable = plats.filter((p) => {
        if (!current) return true;
        const dy = Math.abs(p.y - current.y);
        const dx = Math.abs(p.x + p.w * 0.5 - (posRef.current.x + BIKE_WIDTH * 0.5));
        return dy < 160 && dx < 320;
      });

      const candidates = reachable.length > 0 ? reachable : plats;

      const scored = candidates
        .map((p) => {
          const dx = p.x + p.w * 0.5 - posRef.current.x;
          const dy = p.y - posRef.current.y;
          const dist = Math.hypot(dx, dy * 1.5);
          const visitedIdx = visitedRef.current.indexOf(p.id);
          const penalty = visitedIdx >= 0 ? (6 - visitedIdx) * 90 : 0;
          const headingBonus = p.isHeading ? 60 : 0;
          return {
            platform: p,
            score: dist - penalty - headingBonus + Math.random() * 80,
          };
        })
        .sort((a, b) => b.score - a.score);

      return scored[Math.min(Math.floor(Math.random() * 2), scored.length - 1)].platform;
    },
    []
  );

  // --------------------------------------------------------------------------
  // 3. BMX STUNTS: BUNNY HOP, MINI-HOP, WHEELIE
  // --------------------------------------------------------------------------
  const executeBunnyHop = useCallback(
    (targetPlat?: Platform | null, extraBoost = 1.0) => {
      if (!enableStunts) return;
      setSimState("JUMP");
      stateTimerRef.current = 0;
      onPlatformRef.current = null;

      const dy = targetPlat ? posRef.current.y - targetPlat.y : 25;
      const boost = dy > 45 ? 1.25 : 1.0;
      velRef.current.vy = JUMP_IMPULSE * boost * extraBoost;

      if (targetPlat) {
        const dx = targetPlat.x + targetPlat.w * 0.5 - posRef.current.x;
        facingRightRef.current = dx >= 0;
        velRef.current.vx =
          Math.sign(dx) * Math.min(Math.max(Math.abs(dx) / 55, BASE_SPEED), BASE_SPEED * 1.8);
      } else {
        velRef.current.vx = (facingRightRef.current ? 1 : -1) * BASE_SPEED * 1.4 * extraBoost;
      }

      triggerSpeech(STUNT_SPEECH);
    },
    [enableStunts, setSimState, triggerSpeech]
  );

  const executeMiniHop = useCallback(() => {
    if (!enableStunts) return;
    setSimState("JUMP");
    stateTimerRef.current = 0;
    velRef.current.vy = MINI_HOP_IMPULSE;
    wheelieRef.current = 16;
  }, [enableStunts, setSimState]);

  const executeWheelie = useCallback(() => {
    if (!enableStunts) return;
    setSimState("WHEELIE");
    stateTimerRef.current = 0;
    triggerSpeech(STUNT_SPEECH);
  }, [enableStunts, setSimState, triggerSpeech]);

  // --------------------------------------------------------------------------
  // 4. LIFECYCLE, SCROLL SYNC & POINTER LISTENERS
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Accessibility check: reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setMounted(true);

    // Initial platform scan
    platformsRef.current = scanTypographyPlatforms();

    // Canvas resize
    const handleResize = () => {
      platformsRef.current = scanTypographyPlatforms();
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize, { passive: true });

    // Refresh platforms on scroll with debounce
    let scrollDebounce: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(() => {
        platformsRef.current = scanTypographyPlatforms();

        // Mobile autonomous stunt when scrolling past new text sections
        if (Date.now() - lastTouchTimeRef.current < 2500 && Math.random() < 0.35) {
          if (stateRef.current === "RIDING" || stateRef.current === "IDLE") {
            const nextPlat = pickTargetPlatform(onPlatformRef.current);
            if (nextPlat) executeBunnyHop(nextPlat, 1.05);
          }
        }
      }, 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Periodic platform rescan (maintains text sync)
    const intervalId = setInterval(() => {
      platformsRef.current = scanTypographyPlatforms();
    }, 2500);

    // Desktop pointer / mouse tracking
    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerLeave = () => {
      pointerPosRef.current = null;
    };

    // Mobile touch tracking
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastTouchTimeRef.current = Date.now();
        pointerPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastTouchTimeRef.current = Date.now();
        pointerPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        if (Date.now() - lastTouchTimeRef.current >= 400) {
          pointerPosRef.current = null;
        }
      }, 500);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Preloader complete listener
    const onPreloaderComplete = () => {
      platformsRef.current = scanTypographyPlatforms();
      const plats = platformsRef.current;
      if (plats.length > 0) {
        const topPlat = plats[0];
        posRef.current = { x: topPlat.x + 8, y: topPlat.y };
        velRef.current = { vx: BASE_SPEED, vy: 0 };
        facingRightRef.current = true;
        onPlatformRef.current = topPlat;
        setSimState("RIDING");
      }
    };
    window.addEventListener("cyclothon-preloader-complete", onPreloaderComplete);

    // Spawn directly on the primary text heading
    const enterTimer = setTimeout(() => {
      platformsRef.current = scanTypographyPlatforms();
      const plats = platformsRef.current;
      if (plats.length > 0) {
        // Find main heading or top text
        const topPlat = plats.find((p) => p.isHeading && p.w > 120) || plats[0];
        posRef.current = { x: topPlat.x + 8, y: topPlat.y };
        velRef.current = { vx: BASE_SPEED, vy: 0 };
        facingRightRef.current = true;
        onPlatformRef.current = topPlat;
        setSimState("RIDING");
      }
    }, 1200);

    return () => {
      clearTimeout(scrollDebounce);
      clearTimeout(enterTimer);
      clearInterval(intervalId);
      window.removeEventListener("cyclothon-preloader-complete", onPreloaderComplete);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scanTypographyPlatforms, setSimState, pickTargetPlatform, executeBunnyHop]);

  // --------------------------------------------------------------------------
  // 5. 60FPS RAF SIMULATION & RENDER LOOP
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!mounted) return;

    let rafId: number;

    const tick = () => {
      const state = stateRef.current;
      stateTimerRef.current += 1;
      if (trickCooldownRef.current > 0) trickCooldownRef.current -= 1;
      if (bubbleCooldownRef.current > 0) bubbleCooldownRef.current -= 1;
      if (lastObstacleJumpRef.current > 0) lastObstacleJumpRef.current -= 1;

      const pos = posRef.current;
      const vel = velRef.current;
      const pointer = pointerPosRef.current;

      // ======================================================================
      // A. CURSOR DETECTION & VECTOR REPULSION (REDUCED SPEED)
      // ======================================================================
      let cursorDist = 9999;

      if (pointer) {
        const dx = pos.x + BIKE_WIDTH * 0.5 - pointer.x;
        const dy = pos.y - GROUND_Y_OFFSET * 0.5 - pointer.y;
        cursorDist = Math.hypot(dx, dy);

        if (cursorDist < interactionRadius) {
          const proximity = Math.pow(1 - cursorDist / interactionRadius, 1.4);

          if (state === "IDLE") {
            setSimState("EVADE");
            stateTimerRef.current = 0;
          }

          const shouldFaceRight = dx > 0;
          if (facingRightRef.current !== shouldFaceRight) {
            facingRightRef.current = shouldFaceRight;
          }

          // Gentle, moderate evasion speed (~0.58 to 1.25 max)
          const evadeSpeed = (BASE_SPEED + proximity * 0.65) * speedMultiplier;
          vel.vx += ((facingRightRef.current ? evadeSpeed : -evadeSpeed) - vel.vx) * 0.1;

          if (state === "RIDING" || state === "EVADE") {
            if (proximity > 0.45) {
              setSimState("ACCELERATE");
            }
          }

          // Panic escape jump when cursor gets dangerously close
          if (cursorDist < PANIC_DISTANCE && (state === "RIDING" || state === "ACCELERATE")) {
            triggerSpeech(EVADE_SPEECH, true);
            const target = pickTargetPlatform(onPlatformRef.current);
            executeBunnyHop(target, 1.15);
          }
        } else {
          // Cursor moved away: smoothly return to normal cruising speed
          if (state === "ACCELERATE" || state === "EVADE") {
            setSimState("RECOVERY");
            stateTimerRef.current = 0;
          }
        }
      }

      // ======================================================================
      // B. CHARACTER STATE MACHINE (STRICTLY ON TEXT PLATFORMS)
      // ======================================================================
      switch (state) {
        // --------------------------------------------------------------------
        // 1. ENTERING
        // --------------------------------------------------------------------
        case "ENTERING": {
          pos.x += vel.vx * speedMultiplier;
          if (onPlatformRef.current && pos.x >= onPlatformRef.current.x + 8) {
            setSimState("RIDING");
            triggerSpeech(["Let's go!", "TCE Cyclothon 2026", "Pedal to No Drug!"]);
          }
          break;
        }

        // --------------------------------------------------------------------
        // 2. IDLE: Subtle trackstand balance on the text
        // --------------------------------------------------------------------
        case "IDLE": {
          vel.vx *= 0.85;
          pos.x += vel.vx;

          const rock = Math.sin(stateTimerRef.current * 0.07) * 2.5;
          wheelieRef.current += (rock - wheelieRef.current) * 0.15;
          pitchRef.current += (-rock * 0.5 - pitchRef.current) * 0.15;

          if (pointer && cursorDist < interactionRadius && cursorDist >= PANIC_DISTANCE) {
            facingRightRef.current = pointer.x > pos.x;
          }

          if (stateTimerRef.current > 150) {
            setSimState("RIDING");
            stateTimerRef.current = 0;
            vel.vx = (facingRightRef.current ? BASE_SPEED : -BASE_SPEED) * speedMultiplier;
            if (Math.random() < 0.25) triggerSpeech(AMBIENT_SPEECH);
          }
          break;
        }

        // --------------------------------------------------------------------
        // 3. RIDING, 4. EVADE, ACCELERATE, RECOVERY (ON TEXT ONLY)
        // --------------------------------------------------------------------
        case "RIDING":
        case "EVADE":
        case "ACCELERATE":
        case "RECOVERY": {
          pos.x += vel.vx * speedMultiplier;

          wheelieRef.current += (0 - wheelieRef.current) * 0.2;
          stoppieRef.current += (0 - stoppieRef.current) * 0.2;
          pitchRef.current += (0 - pitchRef.current) * 0.2;

          const pl = onPlatformRef.current;

          if (pl) {
            // Tires stay locked to the exact top edge of the text line
            pos.y = pl.y;

            const leftEdge = pl.x;
            const rightEdge = pl.x + pl.w - BIKE_WIDTH;

            // Mini hop over word gaps or letter intervals along the text
            if (
              enableStunts &&
              lastObstacleJumpRef.current === 0 &&
              pl.obstacles &&
              pl.obstacles.length > 0
            ) {
              for (const obs of pl.obstacles) {
                if (Math.abs(pos.x + BIKE_WIDTH * 0.5 - obs.x) < 12) {
                  lastObstacleJumpRef.current = 35;
                  executeMiniHop();
                  break;
                }
              }
            }

            // Reaching the boundary of the current text line
            if (pos.x < leftEdge || pos.x > rightEdge) {
              const targetPlat = pickTargetPlatform(pl);

              // Check if another text line is genuinely reachable
              const isReachable =
                targetPlat &&
                Math.abs(targetPlat.y - pl.y) < 140 &&
                Math.abs(targetPlat.x + targetPlat.w * 0.5 - pos.x) < 280;

              if (isReachable && Math.random() < 0.7) {
                // Leap across to the next line of text!
                executeBunnyHop(targetPlat, 1.0);
              } else {
                // Otherwise, turnaround cleanly and stay on this text line!
                if (Math.random() < 0.25) {
                  setSimState("IDLE");
                  stateTimerRef.current = 0;
                } else {
                  facingRightRef.current = !facingRightRef.current;
                  vel.vx = (facingRightRef.current ? BASE_SPEED : -BASE_SPEED) * speedMultiplier;
                  pos.x = Math.max(leftEdge, Math.min(rightEdge, pos.x));
                  wheelieRef.current = 12;
                }
              }
            } else {
              // Opportunistic BMX stunt while riding across text
              if (
                enableStunts &&
                trickCooldownRef.current === 0 &&
                stateTimerRef.current > 70 &&
                Math.random() < 0.015
              ) {
                trickCooldownRef.current = 190;
                const dice = Math.random();
                if (dice < 0.45 && pl.w > 130) {
                  executeWheelie();
                } else if (dice < 0.8) {
                  executeBunnyHop(null, 0.7);
                } else {
                  setSimState("IDLE");
                  stateTimerRef.current = 0;
                }
              }
            }
          } else {
            // Safety: If somehow disconnected from platform, find nearest text immediately
            const nearest = pickTargetPlatform(null);
            if (nearest) {
              onPlatformRef.current = nearest;
              pos.y = nearest.y;
              pos.x = nearest.x + 10;
            }
          }

          if (state === "RECOVERY" && stateTimerRef.current > 35) {
            setSimState("RIDING");
            vel.vx = (facingRightRef.current ? BASE_SPEED : -BASE_SPEED) * speedMultiplier;
          }
          break;
        }

        // --------------------------------------------------------------------
        // 5. WHEELIE: Front wheel lifted along text
        // --------------------------------------------------------------------
        case "WHEELIE": {
          pos.x += vel.vx * speedMultiplier;

          const targetAngle = 26 + Math.sin(stateTimerRef.current * 0.16) * 3;
          wheelieRef.current += (targetAngle - wheelieRef.current) * 0.16;

          if (stateTimerRef.current > 70) {
            wheelieRef.current += (0 - wheelieRef.current) * 0.22;
            if (wheelieRef.current < 2) {
              setSimState("RIDING");
              stateTimerRef.current = 0;
            }
          }
          break;
        }

        // --------------------------------------------------------------------
        // 6. JUMP & 7. AIRBORNE: Free flight between text lines
        // --------------------------------------------------------------------
        case "JUMP": {
          wheelieRef.current += (18 - wheelieRef.current) * 0.35;
          pitchRef.current += (-8 - pitchRef.current) * 0.35;

          if (stateTimerRef.current >= 3) {
            setSimState("AIRBORNE");
            stateTimerRef.current = 0;
          }
          break;
        }

        case "AIRBORNE": {
          vel.vy += GRAVITY;
          pos.x += vel.vx * speedMultiplier;
          pos.y += vel.vy;

          const flightAngle = Math.atan2(vel.vy, Math.abs(vel.vx)) * (180 / Math.PI) * 0.65;
          pitchRef.current += (flightAngle - pitchRef.current) * 0.16;
          wheelieRef.current += (0 - wheelieRef.current) * 0.18;

          // Check landing onto text surfaces
          for (const pl of platformsRef.current) {
            const minX = pl.x - 6;
            const maxX = pl.x + pl.w + 6;

            if (pos.x >= minX && pos.x <= maxX) {
              if (vel.vy > 0 && pos.y >= pl.y && pos.y - vel.vy <= pl.y + 12) {
                pos.y = pl.y;
                vel.vy = 0;
                onPlatformRef.current = pl;
                visitedRef.current.unshift(pl.id);
                if (visitedRef.current.length > 6) visitedRef.current.pop();

                spawnTireSparks(pos.x + BIKE_WIDTH * 0.5, pl.y, 7);
                setSimState("LANDING");
                stateTimerRef.current = 0;
                break;
              }
            }
          }

          // Off-screen recovery: Snap directly to the nearest visible text platform
          if (pos.y > window.innerHeight + 60 || pos.x < -100 || pos.x > window.innerWidth + 100) {
            const fallback = pickTargetPlatform(null);
            if (fallback) {
              pos.x = fallback.x + fallback.w * 0.3;
              pos.y = fallback.y;
              vel.vy = 0;
              vel.vx = (facingRightRef.current ? BASE_SPEED : -BASE_SPEED) * speedMultiplier;
              onPlatformRef.current = fallback;
              setSimState("RIDING");
            }
          }
          break;
        }

        // --------------------------------------------------------------------
        // 8. LANDING & 9. RECOVERY
        // --------------------------------------------------------------------
        case "LANDING": {
          pos.x += vel.vx * speedMultiplier;
          pitchRef.current += (3 - pitchRef.current) * 0.28;
          wheelieRef.current += (0 - wheelieRef.current) * 0.28;

          if (stateTimerRef.current >= 5) {
            setSimState("RECOVERY");
            stateTimerRef.current = 0;
          }
          break;
        }
      }

      // ======================================================================
      // C. KINEMATIC ROTATIONS (MATCHING REDUCED SPEED)
      // ======================================================================
      const speed = Math.abs(vel.vx);
      if (speed > 0.05) {
        crankRef.current += (vel.vx / 14) * Math.PI * 2;
        wheelRef.current += (vel.vx / 6) * Math.PI * 2;
      }

      setCrankAngle(crankRef.current);
      setWheelAngle(wheelRef.current);
      setWheelieAngle(wheelieRef.current);
      setStoppieAngle(stoppieRef.current);
      setBikePitch(pitchRef.current);

      // ======================================================================
      // D. DIRECT HARDWARE-ACCELERATED DOM TRANSFORM
      // ======================================================================
      if (cyclistWrapperRef.current) {
        const scaleX = facingRightRef.current ? 1 : -1;
        // Transform offset places the tires directly on top of the text
        cyclistWrapperRef.current.style.transform = `translate3d(${Math.round(
          pos.x
        )}px, ${Math.round(pos.y - GROUND_Y_OFFSET)}px, 0) scaleX(${scaleX})`;
      }

      // ======================================================================
      // E. SPEECH BUBBLE UPDATE
      // ======================================================================
      const bubble = bubbleRef.current;
      if (bubble) {
        bubble.age += 1;
        bubble.x += (pos.x + BIKE_WIDTH * 0.5 - bubble.x) * 0.16;
        bubble.y += (pos.y - GROUND_Y_OFFSET - 22 - bubble.y) * 0.16;

        if (bubble.age >= bubble.maxAge) {
          bubbleRef.current = null;
          if (bubbleContainerRef.current) {
            bubbleContainerRef.current.style.opacity = "0";
          }
        } else if (bubbleContainerRef.current) {
          const fadeIn = Math.min(bubble.age / 8, 1);
          const fadeOut =
            bubble.age > bubble.maxAge - 15 ? (bubble.maxAge - bubble.age) / 15 : 1;
          const alpha = fadeIn * fadeOut;

          bubbleContainerRef.current.style.opacity = String(alpha);
          bubbleContainerRef.current.style.transform = `translate3d(${Math.round(
            bubble.x
          )}px, ${Math.round(bubble.y)}px, 0)`;
        }
      }

      // ======================================================================
      // F. TIRE DUST & SPARK PARTICLES
      // ======================================================================
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.age += 1;
          if (pt.age >= pt.life) {
            particles.splice(i, 1);
            continue;
          }
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vy += 0.08;
          pt.vx *= 0.96;

          const alpha = 1 - pt.age / pt.life;
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = alpha * 0.85;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    mounted,
    interactionRadius,
    speedMultiplier,
    enableStunts,
    setSimState,
    spawnTireSparks,
    triggerSpeech,
    pickTargetPlatform,
    executeBunnyHop,
    executeMiniHop,
    executeWheelie,
  ]);

  if (!mounted) return null;

  return (
    <aside
      aria-label="Interactive BMX Cyclist Mascot"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* 1. Spark Dust & Tire Impact Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Playful Comic Speech Bubble */}
      <div
        ref={bubbleContainerRef}
        className="absolute top-0 left-0 pointer-events-none opacity-0 transition-opacity duration-150 will-change-transform z-10"
        style={{ transform: "translate3d(-999px, -999px, 0)" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-full">
          <div className="px-2.5 py-1 rounded-full bg-obsidian/90 backdrop-blur-md border border-primary/50 text-primary font-mono text-[11px] font-bold shadow-lg shadow-primary/20 tracking-wide flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span ref={bubbleTextRef}>whoa!</span>
          </div>
          {/* Downward pointer tail */}
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-primary/70 mx-auto" />
        </div>
      </div>

      {/* 3. Cyclist Silhouette Character */}
      <div
        ref={cyclistWrapperRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width: `${BIKE_WIDTH}px`,
          height: `${BIKE_HEIGHT}px`,
          transform: "translate3d(-999px, -999px, 0)",
          transformOrigin: "50% 98%",
        }}
      >
        <CyclistSilhouette
          t={RIDE_START}
          crank={crankAngle}
          wheel={wheelAngle}
          wheelieAngle={wheelieAngle}
          stoppieAngle={stoppieAngle}
          bikePitch={bikePitch}
          ink={ink}
          glow={true}
          className="w-full h-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        />
      </div>
    </aside>
  );
}
