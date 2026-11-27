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
              ? "border-forest-green shadow-card ring-1 ring-forest-green"
                : "border-border shadow-sm"
            )}
            onClick={() => setActiveIndex(i)}
            tabIndex={0}
            role="button"
            aria-label={`Checkpoint: ${cp.name}`}
            onKeyDown={(e) => e.key === "Enter" && setActiveIndex(i)}
          >
            {/* Image placeholder */}
            <div className="h-44 bg-gradient-to-br from-primary-tint via-background to-primary-tint relative overflow-hidden flex items-center justify-center">
              <MapPin size={32} className="text-forest-green/60" aria-hidden="true" />
            </div>

            {/* Card body */}
            <div className="p-5">
              <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-1">
                {cp.landmark}
              </p>
              <h3 className="text-base font-light text-foreground leading-snug mb-3">
                {cp.name}
              </h3>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-forest-green">
                  {cp.route.category} · {cp.route.label}
                </span>
                <span className="font-medium text-muted">{cp.kmMarker} km</span>
              </div>
              {cp.hasWaterStation && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest-green">
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
                i === activeIndex ? "w-6 h-2 bg-forest-green" : "w-2 h-2 bg-border hover:bg-forest-green/50"
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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-forest-green text-white disabled:opacity-30 hover:bg-deep-green motion-safe:transition-colors motion-safe:duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === allCheckpoints.length - 1}
            aria-label="Next checkpoint"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-forest-green text-white disabled:opacity-30 hover:bg-deep-green motion-safe:transition-colors motion-safe:duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
