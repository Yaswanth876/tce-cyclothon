"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CinematicPreloader } from "./CinematicPreloader";
import { Play } from "lucide-react";

export function PreloaderManager() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [runKey, setRunKey] = useState(0);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  const handleComplete = useCallback(() => {
    setShowPreloader(false);
    setHasCompletedOnce(true);
  }, []);

  const triggerReplay = useCallback(() => {
    setRunKey((k) => k + 1);
    setShowPreloader(true);
  }, []);

  useEffect(() => {
    const handleReplayEvent = () => triggerReplay();
    window.addEventListener("replay-preloader", handleReplayEvent);
    return () => window.removeEventListener("replay-preloader", handleReplayEvent);
  }, [triggerReplay]);

  return (
    <>
      {showPreloader && (
        <CinematicPreloader key={runKey} onComplete={handleComplete} />
      )}

      {/* Floating Replay Intro pill for convenience once loaded */}
      {hasCompletedOnce && !showPreloader && (
        <aside
          aria-label="Presentation controls"
          className="fixed bottom-9 left-5 z-40 hidden sm:block animate-fade-in"
        >
          <button
            type="button"
            onClick={triggerReplay}
            title="Replay cinematic cyclist loading sequence"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian/85 hover:bg-obsidian backdrop-blur-md border border-white/15 text-white/80 hover:text-white font-mono text-[11px] shadow-lg hover:shadow-primary/20 transition-all cursor-pointer group"
          >
            <Play size={12} className="text-primary fill-primary group-hover:scale-110 transition-transform" />
            <span>Replay Intro</span>
          </button>
        </aside>
      )}
    </>
  );
}
