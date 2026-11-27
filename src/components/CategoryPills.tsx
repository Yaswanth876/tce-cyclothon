"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Route } from "@/data/eventConfig";
import { Clock, Mountain, Droplets } from "lucide-react";

interface CategoryPillsProps {
  routes: Route[];
}

export function CategoryPills({ routes }: CategoryPillsProps) {
  const [activeId, setActiveId] = useState(routes[0]?.id ?? "");
  const activeRoute = routes.find((r) => r.id === activeId) ?? routes[0];

  return (
    <div className="min-w-0">
      {/* Route tabs */}
      <div
        role="tablist"
        aria-label="Route categories"
        className="flex min-w-0 gap-6 overflow-x-auto scrollbar-hide border-b border-border mb-8"
      >
        {routes.map((route) => (
          <button
            key={route.id}
            role="tab"
            aria-selected={activeId === route.id}
            aria-controls={`tab-panel-${route.id}`}
            id={`tab-${route.id}`}
            onClick={() => setActiveId(route.id)}
            className={cn(
              "shrink-0 border-b-2 px-1 py-3 text-sm font-semibold whitespace-nowrap",
              "motion-safe:transition-colors motion-safe:duration-200",
              "focus-visible:ring-2 focus-visible:ring-forest-green focus-visible:ring-offset-2",
              activeId === route.id
                ? "border-forest-green text-forest-green"
                : "border-transparent text-muted hover:border-border hover:text-foreground"
            )}
          >
            {route.category} · {route.label}
          </button>
        ))}
      </div>

      {/* Active route detail card */}
      {activeRoute && (
        <div
          id={`tab-panel-${activeRoute.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeRoute.id}`}
          className="rounded-card border border-border bg-surface p-6 shadow-card"
        >
          <div className="flex flex-wrap gap-4 mb-5">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Clock size={15} className="text-forest-green" />
              <span>
                <strong className="text-foreground font-semibold">Time:</strong>{" "}
                {activeRoute.estimatedTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mountain size={15} className="text-forest-green" />
              <span>
                <strong className="text-foreground font-semibold">Terrain:</strong>{" "}
                {activeRoute.terrain}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mountain size={15} className="text-forest-green" />
              <span>
                <strong className="text-foreground font-semibold">Elevation:</strong>{" "}
                {activeRoute.elevation}
              </span>
            </div>
          </div>

          {/* Checkpoint list */}
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
            Checkpoints
          </p>
          <ol className="relative border-l-2 border-forest-green/20 pl-5 space-y-4" role="list">
            {activeRoute.checkpoints.map((cp, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[21px] flex items-center justify-center w-4 h-4 rounded-full bg-forest-green text-white text-[9px] font-bold ring-2 ring-surface">
                  {i + 1}
                </span>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {cp.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{cp.landmark}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {cp.hasWaterStation && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest-green">
                        <Droplets size={10} /> Water
                      </span>
                    )}
                    <span className="text-xs font-bold text-forest-green tabular-nums">
                      {cp.kmMarker} km
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
