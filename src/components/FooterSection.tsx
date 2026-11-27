
import { eventConfig } from "@/data/eventConfig";
import { ArrowUpRight, Bike } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Mission", href: "#mission" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Event poster", href: "/images/gallery/tce-cyclothon-launch.jpg" },
  { label: "Get in touch", href: "mailto:cyclothon@tce.edu" },
  { label: "Back to top", href: "#hero" },
];

export function FooterSection() {
  const { event } = eventConfig;

  return (
    <footer className="bg-background px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto w-full overflow-hidden rounded-[2rem] bg-deep-green text-white">

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-7 sm:gap-10 sm:px-10 sm:py-10 md:gap-12 md:px-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:gap-16 lg:px-24">
          <div className="min-w-0">
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.06em]">
              Pedal for change.
              <span className="mt-1 block text-soft-mint">
                Keep Madurai drug-free.
              </span>
            </h2>

            <p className="mt-6 max-w-xl break-words text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg lg:mt-10">
              {event.edition} · {event.city}, {event.state}. Every ride moves us
              toward a healthier future.
            </p>

            <a
              href={event.registrationUrl}
              className="mt-8 inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-normal text-deep-green motion-safe:transition-colors hover:bg-soft-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-10 sm:w-fit sm:px-7 lg:mt-12"
            >
              Take the pledge
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto size-40 sm:size-48 md:size-56 lg:size-64 xl:size-72"
          >
            <span className="absolute left-[5%] top-[5%] size-[48%] rounded-full bg-primary" />
            <span className="absolute right-[5%] top-[5%] size-[48%] rounded-full bg-soft-mint" />
            <span className="absolute bottom-[5%] left-[5%] size-[48%] rounded-full bg-energy-gold" />
            <span className="absolute bottom-[5%] right-[5%] size-[48%] rounded-full bg-white/90" />
            <span className="absolute inset-[27%] flex items-center justify-center rounded-full border border-white/15 bg-deep-green">
              <Bike
                strokeWidth={1.6}
                className="size-7 text-soft-mint sm:size-8 md:size-9 lg:size-[38px]"
              />
            </span>
          </div>
        </div>

        <div className="mx-6 border-t border-white/15 sm:mx-10 lg:mx-16" />

        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-10 sm:py-5 md:px-16 lg:px-24">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm text-white/75 sm:gap-x-4">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={`${label}-${href}`}>
                  <a
                    href={href}
                    className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-mint motion-reduce:transition-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}
