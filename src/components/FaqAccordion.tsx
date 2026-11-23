"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/data/eventConfig";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <dl className="divide-y divide-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-1">
            <dt>
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-4 px-1 text-left",
                  "text-base font-semibold text-foreground min-h-[48px]",
                  "hover:text-primary motion-safe:transition-colors motion-safe:duration-150",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg",
                  isOpen && "text-primary"
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "shrink-0 text-muted motion-safe:transition-transform motion-safe:duration-200",
                    isOpen && "rotate-180 text-primary"
                  )}
                  aria-hidden="true"
                />
              </button>
            </dt>
            <dd
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden",
                "motion-safe:transition-all motion-safe:duration-200"
              )}
            >
              <p className="pb-5 px-1 text-muted text-sm leading-relaxed">
                {item.answer}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
