import { eventConfig } from "@/data/eventConfig";
import { Building2, Star, Handshake } from "lucide-react";

export function SponsorsSection() {
  const { sponsors } = eventConfig;

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="py-section px-gutter bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            id="sponsors-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight mb-3"
          >
            Meet our <span className="text-primary">partners</span>
          </h2>
          <p className="text-muted text-base max-w-lg mx-auto">
            Join TCE in promoting youth health and drug awareness in Madurai.
          </p>
        </div>

        {/* Tier 1 — Organizing Institution */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={16} className="text-deep-green" aria-hidden="true" />
            <h3 className="text-xs font-light text-deep-green uppercase tracking-widest">
              Organizing institution
            </h3>
          </div>
          <div className="rounded-card bg-primary-tint border border-deep-green/15 p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-panel bg-white border border-deep-green/15 flex items-center justify-center shrink-0">
              <Building2 size={36} className="text-deep-green" aria-hidden="true" />
            </div>
            <div>
              <p className="text-deep-green text-xl md:text-2xl font-black mb-1">
                {sponsors.organizingInstitution.name}
              </p>
              <p className="text-deep-green/80 text-sm">
                Madurai, Tamil Nadu · Est. 1957 · NAAC A++ Grade
              </p>
            </div>
          </div>
        </div>

        {/* Tier 2 — Title Sponsors */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-energy-gold" aria-hidden="true" />
            <h3 className="text-xs font-light text-deep-green uppercase tracking-widest">
              Title sponsors
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sponsors.titleSponsors.map((s, i) => (
              <div
                key={i}
                className="rounded-card bg-surface border border-border p-8 flex items-center justify-center min-h-[120px] hover:border-forest-green/30 hover:shadow-card motion-safe:transition-all motion-safe:duration-200"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-control bg-primary-tint flex items-center justify-center mx-auto mb-2">
                    <Star size={22} className="text-energy-gold" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-muted">{s.name}</p>
                  <p className="text-xs text-muted mt-0.5">Details coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3 — Event Partners */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Handshake size={16} className="text-forest-green" aria-hidden="true" />
            <h3 className="text-xs font-light text-forest-green uppercase tracking-widest">
              Event partners
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sponsors.eventPartners.map((s, i) => (
              <div
                key={i}
                className="rounded-panel bg-surface border border-border p-6 flex items-center justify-center min-h-[88px] hover:border-forest-green/30 hover:shadow-sm motion-safe:transition-all motion-safe:duration-200"
              >
                <div className="text-center">
                  <p className="text-xs font-semibold text-muted">{s.name}</p>
                  <p className="text-[10px] text-muted mt-0.5">Details coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="text-center">
          <a
            href="mailto:cyclothon@tce.edu"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white font-semibold px-8 py-3.5 text-sm motion-safe:transition-all motion-safe:duration-200 focus-visible:ring-2 focus-visible:ring-forest-green focus-visible:ring-offset-2"
          >
            <Handshake size={16} aria-hidden="true" />
            Sponsor the event
          </a>
          <p className="text-muted text-xs mt-3">
            Sponsor inquiries:{" "}
            <a href="mailto:cyclothon@tce.edu" className="text-forest-green hover:underline">
              cyclothon@tce.edu
            </a>{" "}
            {/* TODO: UPDATE WITH OFFICIAL TCE DATA */}
          </p>
        </div>
      </div>
    </section>
  );
}
