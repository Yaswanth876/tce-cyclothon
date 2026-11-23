import { Bike, MapPin, Calendar } from "lucide-react";
import { RegisterButton } from "./RegisterButton";
import { eventConfig } from "@/data/eventConfig";

export function HeroSection() {
  const { event } = eventConfig;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative mx-3 md:mx-4 mt-0 rounded-3xl overflow-hidden min-h-[80vh] md:min-h-[88vh] flex flex-col justify-end"
    >
      {/* Background — dark placeholder gradient (swap for real photo via next/image) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-obsidian via-charcoal to-[#0d1f0a]"
        aria-hidden="true"
      />

      {/* Subtle green glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #4C9F38 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Giant watermark */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="block text-[16vw] md:text-[13vw] font-black text-white/[0.04] tracking-tighter leading-none whitespace-nowrap"
          style={{ marginBottom: "-0.1em" }}
        >
          CYCLOTHON
        </span>
      </div>

      {/* Telemetry badge — top right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 text-right">
          <p className="text-white/60 text-xs font-medium mb-0.5">Max Distance</p>
          <p className="text-white text-3xl font-black tracking-tight leading-none">25 KM</p>
          <p className="text-primary text-xs font-semibold mt-0.5 uppercase tracking-widest">Champion</p>
        </div>
      </div>

      {/* TCE badge — top left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-tce-maroon/80 backdrop-blur-sm border border-tce-maroon text-white text-xs font-semibold px-3 py-1.5">
          <Bike size={12} />
          Organized by TCE
        </span>
      </div>

      {/* Main content — bottom left */}
      <div className="relative z-10 p-6 md:p-12 pb-8 md:pb-12 max-w-3xl">
        {/* SDG pill */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold px-3 py-1.5">
            🎯 UN SDG 3 · Target 3.5 — Anti-Drug Awareness
          </span>
        </div>

        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4"
        >
          Pedal to <br className="hidden md:block" />
          <span className="text-primary">No Drug</span>
        </h1>

        <p className="text-white/60 text-base md:text-lg mb-2 font-medium max-w-lg">
          {event.edition} &mdash; {event.venue}
        </p>

        {/* Event meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm text-white/50">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary" />
            {event.date ?? "Date to be announced"}
          </span>
          <span className="w-px h-3 bg-white/20" aria-hidden="true" />
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" />
            {event.city}, {event.state}
          </span>
          <span className="w-px h-3 bg-white/20" aria-hidden="true" />
          <span>Flag-off: {event.flagOffTime ?? "TBD"}</span>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["5 KM · Fun Ride", "15 KM · Challenger", "25 KM · Champion"].map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-3 py-1.5"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <RegisterButton size="lg" label="Register Now →" />
          <a
            href="#route"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 font-semibold px-8 py-4 text-base motion-safe:transition-all motion-safe:duration-200"
          >
            Explore Route
          </a>
        </div>
      </div>
    </section>
  );
}
