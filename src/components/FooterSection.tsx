import { eventConfig } from "@/data/eventConfig";
import { Share2, MessageCircle, Link2, Play, Bike } from "lucide-react";

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Home", href: "#hero" },
    { label: "Mission", href: "#mission" },
    { label: "Previous Gallery", href: "#gallery" },
    { label: "Route Map", href: "#route" },
    { label: "Rider Kit", href: "#kit" },
    { label: "Register", href: eventConfig.event.registrationUrl },
  ],
  Resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Voices", href: "#voices" },
    { label: "Contact", href: "mailto:cyclothon@tce.edu" },
  ],
};

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Share2,
  twitter: MessageCircle,
  linkedin: Link2,
  youtube: Play,
};

export function FooterSection() {
  const { event, institution, socialLinks } = eventConfig;

  return (
    <footer>
      {/* Quick pledge bar */}
      <div className="bg-primary-tint border-t border-primary/20 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground text-center sm:text-left">
            🌿 Cycling for a drug-free Madurai — every pedal counts.
          </p>
          <a
            href={event.registrationUrl}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-white font-semibold px-6 py-2.5 text-sm hover:bg-primary-hover motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Take the Pledge
          </a>
        </div>
      </div>

      {/* Main footer body */}
      <div className="bg-surface-dark py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
            {/* Col 1 — Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Bike size={20} className="text-primary" aria-hidden="true" />
                <span className="font-black text-white text-lg tracking-tight">
                  TCE Cyclothon
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                {event.tagline}
              </p>
              <p className="text-white/30 text-xs mb-4">
                {institution.name}
                <br />
                {event.city}, {event.state}
              </p>
              <span className="inline-flex items-center rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold px-3 py-1.5">
                SDG 3 · Target 3.5
              </span>
            </div>

            {/* Nav cols */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                  {heading}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-white/40 text-sm hover:text-white motion-safe:transition-colors focus-visible:text-primary"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect col */}
            <div>
              <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                Connect
              </h3>
              <div className="flex gap-3 mb-6">
                {Object.entries(socialLinks)
                  .filter(([, url]) => url && url !== "#")
                  .map(([key]) => {
                    const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                    return Icon ? (
                      <a
                        key={key}
                        href={socialLinks[key as keyof typeof socialLinks]}
                        aria-label={key}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                      >
                        <Icon size={16} className="text-white" aria-hidden="true" />
                      </a>
                    ) : null;
                  })}
                {/* Show all placeholders if all are # */}
                {Object.values(socialLinks).every((v) => v === "#") &&
                  Object.entries(SOCIAL_ICONS).map(([key, Icon]) => (
                    <a
                      key={key}
                      href="#"
                      aria-label={key}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center motion-safe:transition-colors"
                    >
                      <Icon size={16} className="text-white" aria-hidden="true" />
                    </a>
                  ))}
              </div>
              <p className="text-white/40 text-xs mb-2">Stay updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email for updates"
                  className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm px-4 py-2.5 outline-none focus:border-primary motion-safe:transition-colors"
                />
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary-hover motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Bottom cyclist banner */}
          <div className="relative rounded-3xl overflow-hidden h-36 md:h-48 mb-10 bg-gradient-to-r from-[#0d1a0a] via-charcoal to-obsidian flex items-center justify-center">
            {/* Subtle green glow */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, #4C9F38 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 text-center">
              <p className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                TCE CYCLOTHON
              </p>
              <p className="text-primary font-semibold text-sm md:text-base mt-1 tracking-widest uppercase">
                Pedal to No Drug · Madurai District Edition
              </p>
            </div>
          </div>

          {/* Legal */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs text-center sm:text-left">
            <p>
              © 2026 {institution.name}. All rights reserved.
            </p>
            <p>
              Organized under UN SDG 3 · Target 3.5 — Substance Abuse Prevention
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
