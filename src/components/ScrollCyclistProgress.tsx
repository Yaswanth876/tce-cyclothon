"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { CyclistSilhouette, THETA0 } from "@/components/preloader/CyclistSilhouette";

export function ScrollCyclistProgress() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [crankAngle, setCrankAngle] = useState(THETA0);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [bikeWidth, setBikeWidth] = useState(48);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const rafIdRef = useRef<number | null>(null);

  // Update layout bounds on mount and resize
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const vw = window.innerWidth;
      setViewportWidth(vw);
      // Responsive bike width: 38px on small mobile, 48px on tablet/desktop
      setBikeWidth(vw < 640 ? 38 : 48);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll physics & animation loop
  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    setScrollProgress(progress);

    // Realistic pedaling cadence and wheel revolution driven by scroll distance
    // ~160px of page scroll per complete pedal revolution (2π)
    // ~55px of page scroll per complete wheel revolution (2π)
    setCrankAngle(THETA0 + (scrollY / 160) * Math.PI * 2);
    setWheelAngle((scrollY / 55) * Math.PI * 2);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateScroll]);

  // Click on the progress track to smoothly jump/scrub to that position on the page
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: clickRatio * maxScroll,
      behavior: "smooth",
    });
  };

  // Horizontal translation calculation:
  // From padding on the left to (viewportWidth - bikeWidth - padding) on the right
  const padding = viewportWidth < 640 ? 6 : 12;
  const usableWidth = Math.max(0, viewportWidth - bikeWidth - padding * 2);
  const bikeX = padding + scrollProgress * usableWidth;

  const pct = Math.round(scrollProgress * 100);

  if (!mounted) {
    return null;
  }

  return (
    <aside
      aria-label="Page scroll progress"
      className="fixed bottom-0 left-0 right-0 z-40 select-none"
    >
      {/* ============================================================== */}
      {/* 1. CYCLIST SILHOUETTE (RIDES DIRECTLY ON TOP OF THE LINE)       */}
      {/* ============================================================== */}
      <div
        className="pointer-events-none absolute bottom-[3px] left-0 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bikeX}px, 0, 0)`,
        }}
      >
        {/* The Animated Cyclist Silhouette */}
        <div
          style={{
            width: `${bikeWidth}px`,
            filter:
              "drop-shadow(0 0 1.2px rgba(255,255,255,0.9)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          }}
          className="relative transition-transform duration-75"
        >
          <CyclistSilhouette
            t={5.0} // In racing posture, hands on the hoods, helmet on
            crank={crankAngle}
            wheel={wheelAngle}
            wheelieAngle={pct >= 99.5 ? 18 : 0} // Celebratory wheelie at the finish line!
            className="w-full block"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. THE PROGRESS LINE AT THE BOTTOM OF THE SCREEN               */}
      {/* ============================================================== */}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll percentage through page"
        onClick={handleTrackClick}
        title="Scroll progress. Click anywhere to jump."
        className="relative h-[3.5px] w-full bg-black/10 dark:bg-white/15 backdrop-blur-sm cursor-pointer transition-all hover:h-[5px]"
      >
        {/* Filled Progress Bar */}
        <div
          className="h-full bg-gradient-to-r from-primary via-sdg-green to-primary shadow-[0_0_8px_rgba(76,159,56,0.5)] transition-all duration-75 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
          }}
        />
      </div>
    </aside>
  );
}
