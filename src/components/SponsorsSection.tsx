import { eventConfig } from "@/data/eventConfig";
import { Building2, Star, Handshake } from "lucide-react";

export function SponsorsSection() {
  const { sponsors } = eventConfig;

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="py-20 md:py-28 px-4 md:px-6 bg-zinc-50 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full bg-primary-tint text-primary text-xs font-semibold px-3 py-1.5 mb-5 border border-primary/20">
            Partners &amp; Sponsors
          </span>
          <h2
            id="sponsors-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight mb-3"
          >
            Our <span className="text-primary">Partners</span>
          </h2>
          <p className="text-muted text-base max-w-lg mx-auto">
            Together, we build a drug-free Madurai. Join our community of
            organisations committed to youth health and empowerment.
          </p>
        </div>

        {/* Tier 1 — Organizing Institution */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={16} className="text-tce-maroon" aria-hidden="true" />
            <h3 className="text-xs font-bold text-tce-maroon uppercase tracking-widest">
              Organizing Institution
            </h3>
          </div>
          <div className="rounded-2xl bg-accent-tint border border-tce-maroon/20 p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-tce-maroon/10 border border-tce-maroon/20 flex items-center justify-center shrink-0">
              <Building2 size={36} className="text-tce-maroon" aria-hidden="true" />
            </div>
            <div>
              <p className="text-tce-maroon text-xl md:text-2xl font-black mb-1">
                {sponsors.organizingInstitution.name}
              </p>
              <p className="text-tce-maroon/60 text-sm">
                Madurai, Tamil Nadu · Est. 1957 · NAAC A++ Grade
              </p>
              <span className="inline-flex items-center rounded-full bg-tce-maroon text-white text-xs font-semibold px-3 py-1 mt-3">
                Host Institution
              </span>
            </div>
          </div>
        </div>

        {/* Tier 2 — Title Sponsors */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-amber-500" aria-hidden="true" />
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Title Sponsors
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sponsors.titleSponsors.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-border p-8 flex items-center justify-center min-h-[120px] hover:border-primary/30 hover:shadow-md motion-safe:transition-all motion-safe:duration-200"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mx-auto mb-2">
                    <Star size={22} className="text-zinc-400" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-muted">{s.name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Logo coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3 — Event Partners */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Handshake size={16} className="text-zinc-500" aria-hidden="true" />
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Event Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sponsors.eventPartners.map((s, i) => (
              <div
                key={i}
                className="rounded-xl bg-white border border-border p-6 flex items-center justify-center min-h-[88px] hover:border-primary/30 hover:shadow-sm motion-safe:transition-all motion-safe:duration-200"
              >
                <div className="text-center">
                  <p className="text-xs font-semibold text-muted">{s.name}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="text-center">
          <a
            href="mailto:cyclothon@tce.edu"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3.5 text-sm motion-safe:transition-all motion-safe:duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Handshake size={16} aria-hidden="true" />
            Become a Sponsor
          </a>
          <p className="text-muted text-xs mt-3">
            Contact us at{" "}
            <a href="mailto:cyclothon@tce.edu" className="text-primary hover:underline">
              cyclothon@tce.edu
            </a>{" "}
            {/* TODO: UPDATE WITH OFFICIAL TCE DATA */}
          </p>
        </div>
      </div>
    </section>
  );
}
