import { eventConfig } from "@/data/eventConfig";
import { FaqAccordion } from "./FaqAccordion";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
  const { faqs } = eventConfig;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 md:py-28 px-4 md:px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-tint text-primary text-xs font-semibold px-3 py-1.5 mb-5 border border-primary/20">
            <HelpCircle size={12} />
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight mb-3"
          >
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted text-base max-w-md mx-auto">
            Everything you need to know before race day. Can&apos;t find your
            answer?{" "}
            <a href="mailto:cyclothon@tce.edu" className="text-primary hover:underline font-semibold">
              Contact us
            </a>
            .
          </p>
        </div>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
