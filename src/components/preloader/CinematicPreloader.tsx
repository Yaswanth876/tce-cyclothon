"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { CyclistSilhouette, THETA0 } from "./CyclistSilhouette";
import { FastForward } from "lucide-react";

interface CinematicPreloaderProps {
  /** Callback triggered when the preloader finishes transitioning out */
  onComplete?: () => void;
  /** Force disable preloader */
  disabled?: boolean;
  /**
   * Cyclist vertical positioning mode:
   * - "overlap": Cyclist physically passes in front of the loading text, directly overlapping the letters (as specified in Master Spec).
   * - "bottom": Cyclist rides along the bottom edge of the screen.
   */
  position?: "overlap" | "bottom";
  /** Whether to show the numerical loading percentage beneath the text */
  showProgress?: boolean;
}

interface CharInfo {
  char: string;
  index: number;
  isSpace: boolean;
}

export function CinematicPreloader({
  onComplete,
  disabled = false,
  position = "overlap",
  showProgress = true,
}: CinematicPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyclistWrapperRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Cyclist kinematics state (driven by GSAP)
  const [animTime, setAnimTime] = useState(0);
  const [crankAngle, setCrankAngle] = useState(0);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [wheelieAngle, setWheelieAngle] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Character element refs and measured coordinates
  const charElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charRectsRef = useRef<{ left: number; right: number; width: number; center: number }[]>([]);

  // The loading text
  const loadingText = "TCE CYCLOTHON 2026";

  const allCharacters = useMemo<CharInfo[]>(() => {
    return loadingText.split("").map((char, index) => ({
      char,
      index,
      isSpace: char === " ",
    }));
  }, [loadingText]);

  // Measure character coordinates relative to the viewport
  const measureCharRects = useCallback(() => {
    if (!charElementsRef.current) return;
    charRectsRef.current = charElementsRef.current.map((el) => {
      if (!el) return { left: 0, right: 0, width: 0, center: 0 };
      const r = el.getBoundingClientRect();
      return {
        left: r.left,
        right: r.right,
        width: r.width,
        center: r.left + r.width * 0.5,
      };
    });
  }, []);

  // Completion handler
  const handleComplete = useCallback(() => {
    setIsFinished(true);
    document.body.style.overflow = "";
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // Keyboard shortcut (Escape to skip intro)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleComplete]);

  // GSAP Choreography
  useEffect(() => {
    if (disabled) {
      handleComplete();
      return;
    }

    // Accessibility: Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        handleComplete();
      }, 400);
      return () => clearTimeout(timer);
    }

    // Lock page scroll during preloader
    document.body.style.overflow = "hidden";

    // Measure character bounding boxes after initial layout
    const timer = setTimeout(() => {
      measureCharRects();
    }, 60);
    window.addEventListener("resize", measureCharRects);

    // ==============================================================
    // MASTER GSAP TIMELINE
    // ==============================================================
    const ctxGsap = gsap.context(() => {
      const masterTL = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: handleComplete,
          });
        },
      });

      const cyclistEl = cyclistWrapperRef.current;
      const textContainerEl = textContainerRef.current;

      const riderState = {
        t: 0,
        crank: THETA0,
        wheel: 0,
        wheelie: 0,
        pct: 0,
      };

      const updateKinematics = () => {
        setAnimTime(riderState.t);
        setCrankAngle(riderState.crank);
        setWheelAngle(riderState.wheel);
        setWheelieAngle(riderState.wheelie);
        setProgress(Math.round(riderState.pct));
      };

      // Responsive start position on center-left
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const startX = isMobile ? "-4vw" : "4vw";
      const isOverlap = position === "overlap";
      const startY = isOverlap ? "-50%" : "0%";

      gsap.set(cyclistEl, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0.98,
      });

      gsap.set(textContainerEl, {
        opacity: 0,
        y: 12,
        scale: 0.98,
      });

      // -------------------------------------------------------------
      // STAGE 1: Initial Appearance & Putting on the Helmet (0s - 2.4s)
      // 0.0 - 1.2s: sits on bike, helmet in hand
      // 1.2 - 3.0s: lifts helmet above head, lowers it onto head
      // 3.0 - 3.9s: fastens chin strap
      // 4.1 - 5.3s: hands to bars, leans into racing posture
      // -------------------------------------------------------------
      masterTL.addLabel("stage1");

      // Reveal stationary cyclist & centered text
      masterTL.to(
        cyclistEl,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        0
      );

      masterTL.to(
        textContainerEl,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0.15
      );

      // Interpolate silhouette time t: 0 -> 4.8 (putting on helmet, chin strap, hands to hoods)
      masterTL.to(
        riderState,
        {
          t: 4.8,
          pct: 35,
          duration: 2.3,
          ease: "none",
          onUpdate: updateKinematics,
        },
        0
      );

      // -------------------------------------------------------------
      // STAGE 2 & 3: Fast Cycling Across Text & Progressive Letter Wipe
      // (2.4s - 4.4s)
      // -------------------------------------------------------------
      masterTL.addLabel("stage2", 2.4);

      masterTL.call(
        () => {
          measureCharRects();
        },
        [],
        2.4
      );

      // Cyclist accelerates and rides physically across the screen from startX to 118vw (exiting right)
      masterTL.to(
        cyclistEl,
        {
          x: "118vw",
          duration: 2.0,
          ease: "power2.in",
          onUpdate: () => {
            if (!cyclistEl) return;
            const bikeRect = cyclistEl.getBoundingClientRect();
            // The leading edge of the bicycle (front tire contact point at ~88.5% of SVG width)
            const bikeLeadX = bikeRect.left + bikeRect.width * 0.885;

            // Character-level disappearance synchronization:
            // - Before cyclist reaches letter -> 100% visible
            // - When cyclist crosses letter -> wipes away from left to right
            // - Behind cyclist -> 100% invisible
            charElementsRef.current.forEach((el, idx) => {
              if (!el) return;
              const r = charRectsRef.current[idx];
              if (!r || r.width === 0) return;

              // Before cyclist reaches this character -> 100% visible
              if (bikeLeadX < r.left) {
                el.style.clipPath = "inset(0 0 0 0%)";
                el.style.opacity = "1";
                el.style.transform = "translateY(0) scale(1)";
              }
              // Cyclist has passed this character -> 100% invisible!
              else if (bikeLeadX >= r.right) {
                if (el.style.opacity !== "0") {
                  el.style.clipPath = "inset(0 0 0 100%)";
                  el.style.opacity = "0";
                  el.style.transform = "translateY(-4px) scale(0.92)";
                }
              }
              // Cyclist is actively crossing this character -> progressive left-to-right wipe!
              else {
                const fraction = Math.max(0, Math.min(1, (bikeLeadX - r.left) / r.width));
                el.style.clipPath = `inset(0 0 0 ${fraction * 100}%)`;
                el.style.opacity = `${1 - fraction * 0.7}`;
                el.style.transform = `translateY(-${fraction * 4}px)`;
              }
            });
          },
        },
        2.4
      );

      // Pedaling cadence (slowed to a realistic, powerful ~80-85 RPM athletic cadence)
      // Progress ramps to 90% as cyclist crosses the screen
      masterTL.to(
        riderState,
        {
          t: 8.0,
          crank: THETA0 + Math.PI * 5,
          wheel: Math.PI * 24,
          pct: 90,
          duration: 2.0,
          ease: "power2.in",
          onUpdate: updateKinematics,
        },
        2.4
      );

      // Smoothly fade progress indicator as cyclist finishes letter wipe
      if (progressRef.current) {
        masterTL.to(
          progressRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          4.1
        );
      }

      // -------------------------------------------------------------
      // STAGE 4: Re-entry & Convincing Bicycle Wheelie (4.4s - 6.4s)
      // -------------------------------------------------------------
      masterTL.addLabel("stage4", 4.4);

      // Progress reaches 100% on wheelie re-entry
      masterTL.to(
        riderState,
        {
          pct: 100,
          duration: 0.1,
          ease: "none",
          onUpdate: updateKinematics,
        },
        4.4
      );

      // Re-position cyclist offscreen to the left for Stage 4 wheelie re-entry
      masterTL.set(
        cyclistEl,
        {
          x: "-32vw",
          y: startY,
        },
        4.4
      );

      // Cyclist re-enters rapidly performing the wheelie across the viewport
      masterTL.to(
        cyclistEl,
        {
          x: "120vw",
          duration: 2.0,
          ease: "power1.inOut",
        },
        4.5
      );

      // Realistic wheelie elevation (front wheel pitches up 26° around rear wheel pivot)
      masterTL.to(
        riderState,
        {
          wheelie: 26,
          crank: THETA0 + Math.PI * 7.5,
          wheel: Math.PI * 44,
          duration: 0.45,
          ease: "back.out(1.5)",
          onUpdate: updateKinematics,
        },
        4.65
      );

      // Hold the triumphant wheelie balance across the middle
      masterTL.to(
        riderState,
        {
          wheelie: 25,
          crank: THETA0 + Math.PI * 10,
          wheel: Math.PI * 58,
          duration: 0.9,
          ease: "sine.inOut",
          onUpdate: updateKinematics,
        },
        5.1
      );

      // Smooth front wheel touchdown
      masterTL.to(
        riderState,
        {
          wheelie: 0,
          crank: THETA0 + Math.PI * 12,
          wheel: Math.PI * 68,
          duration: 0.45,
          ease: "power2.in",
          onUpdate: updateKinematics,
        },
        5.9
      );

      // Subtle road contact bounce
      masterTL.to(
        cyclistEl,
        {
          y: 3,
          duration: 0.08,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        6.25
      );
    }, containerRef);

    // Fail-safe timer (6.8s max) so user is never trapped
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      window.removeEventListener("resize", measureCharRects);
      ctxGsap.revert();
      document.body.style.overflow = "";
    };
  }, [disabled, handleComplete, measureCharRects]);

  if (isFinished || disabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="TCE Cyclothon loading screen"
      className="fixed inset-0 z-[9999] bg-white text-black overflow-hidden select-none flex flex-col justify-between"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* ============================================================== */}
      {/* 1. TOP HEADER: SKIP BUTTON ALONE                               */}
      {/* ============================================================== */}
      <header className="relative z-40 px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-end">
        <button
          type="button"
          onClick={handleComplete}
          aria-label="Skip loading animation"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/15 text-black/75 hover:text-black font-mono text-xs transition-all cursor-pointer"
        >
          <FastForward size={13} />
          <span>SKIP</span>
          <kbd className="hidden md:inline px-1 py-0.5 rounded bg-black/10 text-[10px] text-black/60 border border-black/10">
            ESC
          </kbd>
        </button>
      </header>

      {/* ============================================================== */}
      {/* 2. CENTER OF SCREEN: LOADING TEXT & PROGRESS                   */}
      {/* ============================================================== */}
      <div
        ref={textContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center max-w-4xl px-4 pointer-events-none select-none"
      >
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-widest uppercase leading-none text-black whitespace-nowrap">
          {allCharacters.map((c) => (
            <span
              key={`char-${c.index}`}
              ref={(el) => {
                charElementsRef.current[c.index] = el;
              }}
              className={`inline-block transition-transform duration-75 text-black ${
                c.isSpace ? "w-2 sm:w-3 md:w-4" : ""
              }`}
              style={{
                willChange: "clip-path, opacity, transform",
              }}
            >
              {c.char}
            </span>
          ))}
        </h1>

        {showProgress && (
          <div
            ref={progressRef}
            className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-black/45 mt-4 tabular-nums"
          >
            {progress}%
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 3. CYCLIST SILHOUETTE (OVERLAPPING TEXT OR BOTTOM ANCHORED)     */}
      {/* ============================================================== */}
      <div
        ref={cyclistWrapperRef}
        className={`absolute z-20 pointer-events-none ${
          position === "overlap"
            ? "w-[160px] sm:w-[200px] md:w-[240px] lg:w-[270px]"
            : "w-[110px] sm:w-[140px] md:w-[175px] lg:w-[200px]"
        }`}
        style={{
          left: 0,
          top: position === "overlap" ? "50%" : "auto",
          bottom: position === "overlap" ? "auto" : 0,
          willChange: "transform",
        }}
      >
        <CyclistSilhouette
          t={animTime}
          crank={crankAngle}
          wheel={wheelAngle}
          wheelieAngle={wheelieAngle}
          className="w-full block"
        />
      </div>
    </div>
  );
}
