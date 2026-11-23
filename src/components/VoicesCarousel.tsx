"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/data/eventConfig";

interface VoicesCarouselProps {
  testimonials: Testimonial[];
}

export function VoicesCarousel({ testimonials }: VoicesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(testimonials.length - 1, i + 1));

  return (
    <div>
      {/* Quote */}
      <div className="max-w-2xl mx-auto mb-10 min-h-[160px] flex items-center justify-center">
        <blockquote
          className="text-white text-lg md:text-2xl italic leading-relaxed text-center motion-safe:transition-opacity motion-safe:duration-300"
          key={activeIndex}
        >
          &ldquo;{active?.quote}&rdquo;
          <footer className="mt-5 not-italic">
            <span className="block font-black text-primary text-base md:text-lg">
              {active?.name}
            </span>
            <span className="text-white/50 text-sm">{active?.role}</span>
            <span className="block mt-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
              {active?.category}
            </span>
          </footer>
        </blockquote>
      </div>

      {/* Avatar pills + nav */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Previous testimonial"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white disabled:opacity-30 hover:bg-primary-hover motion-safe:transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Testimonial selector"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View testimonial from ${t.name}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "shrink-0 flex flex-col items-center gap-1.5",
                "motion-safe:transition-all motion-safe:duration-200",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-xl"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center bg-charcoal",
                  "motion-safe:transition-all motion-safe:duration-200",
                  i === activeIndex
                    ? "border-primary scale-110 shadow-lg shadow-primary/30"
                    : "border-white/20 opacity-50 hover:opacity-80"
                )}
              >
                <User
                  size={20}
                  className={i === activeIndex ? "text-primary" : "text-white/50"}
                  aria-hidden="true"
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold max-w-[64px] text-center leading-tight",
                  i === activeIndex ? "text-primary" : "text-white/40"
                )}
              >
                {t.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === testimonials.length - 1}
          aria-label="Next testimonial"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white disabled:opacity-30 hover:bg-primary-hover motion-safe:transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
