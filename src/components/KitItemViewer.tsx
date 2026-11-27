"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { KitItem } from "@/data/eventConfig";
import { Shirt, Hash, Medal, Droplets, FileCheck } from "lucide-react";

const KIT_ICONS: Record<string, React.ElementType> = {
  jersey: Shirt,
  bib: Hash,
  medal: Medal,
  hydration: Droplets,
  ecert: FileCheck,
};

interface KitItemViewerProps {
  items: KitItem[];
}

export function KitItemViewer({ items }: KitItemViewerProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const selected = items.find((i) => i.id === selectedId) ?? items[0];
  const SelectedIcon = KIT_ICONS[selected?.id ?? ""] ?? Shirt;

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
      {/* Large preview */}
      <div>
        <div className="rounded-card bg-background border border-border h-72 md:h-96 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, color-mix(in srgb, var(--brand-deep-green) 10%, transparent) 0, color-mix(in srgb, var(--brand-deep-green) 10%, transparent) 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden="true"
          />
          <SelectedIcon size={64} className="text-muted relative z-10" aria-hidden="true" />
          <p className="text-muted text-base font-semibold relative z-10">{selected?.name}</p>
          <span className="text-xs text-muted relative z-10">Image coming soon</span>
        </div>

        {/* Detail */}
        {selected && (
          <div className="mt-6">
            <h3 className="text-xl font-light text-foreground mb-2">{selected.name}</h3>
            <p className="text-muted text-sm leading-relaxed mb-4">{selected.description}</p>
            <p className="text-xs text-muted">
              <span className="font-semibold text-foreground">Ride options: </span>
              {selected.includedInCategories.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Thumbnail selector */}
      <div
        className="flex md:flex-col flex-row gap-3 overflow-x-auto md:overflow-x-visible scrollbar-hide"
        role="listbox"
        aria-label="Kit items"
      >
        {items.map((item) => {
          const Icon = KIT_ICONS[item.id] ?? Shirt;
          return (
            <button
              key={item.id}
              role="option"
              aria-selected={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 text-center",
                "motion-safe:transition-all motion-safe:duration-200",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selectedId === item.id
                  ? "border-primary bg-primary-tint ring-1 ring-primary shadow-sm"
                  :                   "border-border bg-background hover:border-forest-green/30 hover:bg-primary-tint/50"
              )}
            >
              <Icon
                size={22}
                className={selectedId === item.id ? "text-forest-green" : "text-muted"}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-[10px] font-semibold leading-tight px-1",
                  selectedId === item.id ? "text-forest-green" : "text-muted"
                )}
              >
                {item.name.split(" ").slice(0, 2).join(" ")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
