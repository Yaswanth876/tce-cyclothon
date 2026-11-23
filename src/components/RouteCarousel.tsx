"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Droplets, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Route } from "@/data/eventConfig";

interface RouteCarouselProps {
  routes: Route[];
}

export function RouteCarousel({ routes }: RouteCarouselProps) {
  // Flatten all checkpoints across routes, tagging each with its route
  const allCheckpoints = routes.flatMap((route) =>
    route.checkpoints.map((cp) => ({ ...cp, route }))
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, allCheckpoints.length - 1));
    setActiveIndex(clamped);
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[clamped] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const categoryColors: Record<string, string> = {
    "5 KM": "bg-blue-100 text-blue-700",
    "15 KM": "bg-amber-100 text-amber-700",
    "25 KM": "bg-primary-tint text-primary",
  };

  return (
    <div>
      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        role="region"
        aria-label="Route checkpoints"
      >
        {allCheckpoints.map((cp, i) => (
          <article
            key={i}
            className={cn(
              "shrink-0 w-72 md:w-80 snap-center rounded-2xl overflow-hidden border",
              "motion-safe:transition-all motion-safe:duration-200 bg-white",
              activeIndex === i
                ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                : "border-border shadow-sm"
            )}
            onClick={() => setActiveIndex(i)}
            tabIndex={0}
            role="button"
            aria-label={`Checkpoint: ${cp.name}`}
            onKeyDown={(e) => e.key === "Enter" && setActiveIndex(i)}
          >
            {/* Image placeholder */}
            <div className="h-44 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 relative overflow-hidden flex items-center justify-center">
              <MapPin size={32} className="text-zinc-400" aria-hidden="true" />
              {/* Route category badge */}
              <span
                className={cn(
                  "absolute top-3 left-3 text-[10px] font-bold rounded-full px-2.5 py-1",
                  categoryColors[cp.route.category] ?? "bg-zinc-100 text-zinc-600"
                )}
              >
                {cp.route.category} · {cp.route.label}
              </span>
              {/* Km badge */}
              <span className="absolute bottom-3 right-3 bg-primary text-white text-xs font-bold rounded-full px-2.5 py-1">
                {cp.kmMarker} km
              </span>
            </div>

            {/* Card body */}
            <div className="p-5">
              <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-1">
                {cp.landmark}
              </p>
              <h3 className="text-base font-bold text-foreground leading-snug mb-3">
                {cp.name}
              </h3>
              {cp.hasWaterStation && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary-tint rounded-full px-2.5 py-1">
                  <Droplets size={11} aria-hidden="true" /> Water Station
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Dot indicators */}
        <div className="flex gap-1.5" role="tablist" aria-label="Checkpoint indicators">
          {allCheckpoints.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to checkpoint ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "rounded-full motion-safe:transition-all motion-safe:duration-200",
                i === activeIndex ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
              )}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous checkpoint"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-white disabled:opacity-30 hover:bg-primary motion-safe:transition-colors motion-safe:duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === allCheckpoints.length - 1}
            aria-label="Next checkpoint"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-white disabled:opacity-30 hover:bg-primary motion-safe:transition-colors motion-safe:duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
