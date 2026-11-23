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
    <div>
      {/* Filter pills */}
      <div
        role="tablist"
        aria-label="Route categories"
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8"
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
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold border",
              "motion-safe:transition-all motion-safe:duration-200",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              activeId === route.id
                ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                : "bg-zinc-100 text-foreground border-zinc-200 hover:bg-primary-tint hover:border-primary/30 hover:text-primary"
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
          className="rounded-2xl border border-border bg-white p-6 shadow-sm"
        >
          <div className="flex flex-wrap gap-4 mb-5">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Clock size={15} className="text-primary" />
              <span>
                <strong className="text-foreground font-semibold">Time:</strong>{" "}
                {activeRoute.estimatedTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mountain size={15} className="text-primary" />
              <span>
                <strong className="text-foreground font-semibold">Terrain:</strong>{" "}
                {activeRoute.terrain}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mountain size={15} className="text-primary" />
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
          <ol className="relative border-l-2 border-primary/20 pl-5 space-y-4" role="list">
            {activeRoute.checkpoints.map((cp, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[21px] flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold ring-2 ring-white">
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
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary-tint rounded-full px-2 py-0.5">
                        <Droplets size={10} /> Water
                      </span>
                    )}
                    <span className="text-xs font-bold text-primary tabular-nums">
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
