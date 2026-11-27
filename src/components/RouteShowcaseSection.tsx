import { eventConfig } from "@/data/eventConfig";
import { RouteCarousel } from "./RouteCarousel";

export function RouteShowcaseSection() {
  const { routes } = eventConfig;

  return (
    <section
      id="route"
      aria-labelledby="route-heading"
      className="py-section bg-background border-y border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="route-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight"
            >
              Choose your{" "}
              <span className="text-primary">ride</span>
            </h2>
            <p className="text-muted mt-3 text-base max-w-lg">
              Choose 5, 15, or 25 km and ride past Madurai landmarks. Find your
              distance.
            </p>
          </div>

          {/* Route summary */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 shrink-0 text-sm">
            {routes.map((r) => (
              <p key={r.id} className="font-semibold text-forest-green">
                {r.category} <span className="font-normal text-muted">{r.label}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <RouteCarousel routes={routes} />
      </div>
    </section>
  );
}
