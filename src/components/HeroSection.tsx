import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { RegisterButton } from "./RegisterButton";
import { eventConfig } from "@/data/eventConfig";

export function HeroSection() {
  const { event } = eventConfig;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative mx-3 md:mx-4 mt-0 rounded-3xl overflow-hidden min-h-[80vh] md:min-h-[88vh] flex flex-col justify-center"
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        <Image
          src="/images/tce.webp"
          alt=""
          fill
          sizes="(min-width: 768px) calc(100vw - 2rem), calc(100vw - 1.5rem)"
          fetchPriority="high"
          className="object-cover object-[center_45%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 82% 14%, color-mix(in srgb, var(--brand-primary) 14%, transparent) 0%, transparent 43%), linear-gradient(125deg, rgba(251, 253, 251, 0.97) 0%, color-mix(in srgb, var(--brand-off-white) 88%, transparent) 48%, color-mix(in srgb, var(--brand-soft-mint) 62%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 sm:px-10 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <h1
            id="hero-heading"
            className="mb-6 text-[clamp(3.25rem,8vw,7.25rem)] font-light leading-[0.98] tracking-[-0.06em] text-deep-green"
          >
            Pedal
            <span className="block">No to Drug</span>
          </h1>

          <p className="mb-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {event.edition} &mdash; {event.venue}
          </p>

          <div className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal sm:text-base">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="shrink-0 text-forest-green" />
              {event.date ?? "Date to be announced"}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-forest-green" />
              {event.city}, {event.state}
            </span>
            <span>Flag-off: {event.flagOffTime ?? "TBD"}</span>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <RegisterButton size="lg" label="Register Now →" />
            <a
              href="#route"
              className="inline-flex items-center justify-center rounded-full border border-forest-green/40 px-8 py-4 text-base font-normal text-forest-green motion-safe:transition-colors motion-safe:duration-200 hover:border-forest-green hover:bg-forest-green/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
            >
              Explore Route
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
