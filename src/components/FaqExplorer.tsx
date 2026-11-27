"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { FAQ_CATEGORIES, FAQS, type FaqFilterId } from "@/data/faqData";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "./FaqAccordion";

export function FaqExplorer() {
  const [activeCategory, setActiveCategory] =
    useState<FaqFilterId>("getting-started");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const searchableText = `${faq.question} ${faq.answer}`.toLowerCase();
    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("all");
  };

  return (
    <div className="min-w-0">
      <div className="relative">
        <label className="sr-only" htmlFor="faq-search">
          Search FAQ questions and answers
        </label>
        <Search
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your questions..."
          className="min-h-16 w-full rounded-full border border-border bg-background py-4 pl-14 pr-6 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
      </div>

      <div className="-mx-1 mb-7 mt-5 overflow-x-auto px-1 pb-1 scrollbar-hide">
        <div
          role="group"
          aria-label="Filter questions by category"
          className="flex min-w-max gap-2"
        >
          {FAQ_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none",
                  isSelected
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-muted hover:bg-primary-tint hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filteredFaqs.length}{" "}
        {filteredFaqs.length === 1 ? "question" : "questions"} found
      </p>

      {filteredFaqs.length > 0 ? (
        <FaqAccordion items={filteredFaqs} />
      ) : (
        <div
          role="status"
          className="border-y border-border py-10 text-center sm:py-12"
        >
          <h3 className="text-lg font-semibold text-foreground">
            No matching questions
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Try a different search or choose another category.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
