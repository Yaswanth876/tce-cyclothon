import { eventConfig } from "@/data/eventConfig";
import { VoicesCarousel } from "./VoicesCarousel";

export function VoicesSection() {
  const { testimonials } = eventConfig;

  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      className="py-20 md:py-28 px-4 md:px-6 bg-surface-dark"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold px-3 py-1.5 mb-6">
          Community
        </span>

        <h2
          id="voices-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-3"
        >
          Voices of{" "}
          <span className="text-primary">Riders</span>
        </h2>
        <p className="text-white/50 text-base md:text-lg mb-14 max-w-lg mx-auto">
          Hear from the students, faculty, and community members who pedal
          for a drug-free Madurai.
        </p>

        {/* Carousel */}
        <VoicesCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
