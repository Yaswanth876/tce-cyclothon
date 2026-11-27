import { ArrowUpRight, MessageCircle } from "lucide-react";
import { FaqExplorer } from "./FaqExplorer";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-background px-4 py-20 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16 xl:gap-24">
        <div>
          <h2
            id="faq-heading"
            className="text-4xl font-black leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="block">A little clarity.</span>
            <span className="block text-muted">A lot less</span>
            <span className="block text-muted">guesswork.</span>
          </h2>

          <a
            href="mailto:cyclothon@tce.edu"
            aria-label="Email the TCE Cyclothon team"
            className="group mt-9 flex min-h-24 w-full max-w-sm items-center gap-4 rounded-3xl border border-accent/10 bg-accent-tint px-5 py-5 transition-[transform,background-color] duration-200 hover:bg-accent-tint motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background text-accent"
            >
              <MessageCircle size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">
                Still have a question?
              </span>
              <span className="mt-1 block text-sm text-muted">
                Contact the organizers
              </span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>

        <FaqExplorer />
      </div>
    </section>
  );
}
