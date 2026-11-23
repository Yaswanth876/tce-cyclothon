import { eventConfig } from "@/data/eventConfig";
import { RouteCarousel } from "./RouteCarousel";

export function RouteShowcaseSection() {
  const { routes } = eventConfig;

  return (
    <section
      id="route"
      aria-labelledby="route-heading"
      className="py-20 md:py-28 bg-zinc-50 border-y border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary-tint text-primary text-xs font-semibold px-3 py-1.5 mb-4 border border-primary/20">
              Route Map
            </span>
            <h2
              id="route-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight"
            >
              Master the{" "}
              <span className="text-primary">Route</span>
            </h2>
            <p className="text-muted mt-3 text-base max-w-lg">
              Three distances across Madurai&apos;s most iconic landmarks.
              Every checkpoint brings you closer to a drug-free finish line.
            </p>
          </div>

          {/* Route summary badges */}
          <div className="flex gap-3 shrink-0">
            {routes.map((r) => (
              <div
                key={r.id}
                className="text-center rounded-xl bg-white border border-border px-4 py-3 shadow-sm"
              >
                <p className="text-xl font-black text-primary">{r.category}</p>
                <p className="text-xs text-muted font-medium">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <RouteCarousel routes={routes} />
      </div>
    </section>
  );
}
