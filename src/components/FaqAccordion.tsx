"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/data/faqData";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-border" role="list">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const questionId = `faq-question-${item.id}`;
        const answerId = `faq-answer-${item.id}`;

        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              id={questionId}
              className={cn(
                "flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-foreground",
                "transition-colors hover:text-primary motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="relative flex size-8 shrink-0 items-center justify-center text-primary"
              >
                <Plus
                  size={20}
                  className={cn(
                    "absolute transition-[opacity,transform] duration-200 motion-reduce:transition-none",
                    isOpen ? "scale-75 rotate-90 opacity-0" : "scale-100 opacity-100"
                  )}
                />
                <Minus
                  size={20}
                  className={cn(
                    "absolute transition-[opacity,transform] duration-200 motion-reduce:transition-none",
                    isOpen ? "scale-100 opacity-100" : "scale-75 -rotate-90 opacity-0"
                  )}
                />
              </span>
            </button>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-3xl pb-6 pr-8 text-base leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
