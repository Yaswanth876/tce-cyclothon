import { eventConfig } from "@/data/eventConfig";
import { KitItemViewer } from "./KitItemViewer";

export function RiderKitSection() {
  const { riderKit } = eventConfig;

  return (
    <section
      id="kit"
      aria-labelledby="kit-heading"
      className="py-20 md:py-28 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="inline-flex items-center rounded-full bg-primary-tint text-primary text-xs font-semibold px-3 py-1.5 mb-5 border border-primary/20">
            Rider Kit
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                id="kit-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight"
              >
                Your{" "}
                <span className="text-primary">SDG 3 Rider Kit</span>
              </h2>
              <p className="text-muted mt-3 text-base max-w-lg">
                Every registered rider receives an exclusive kit celebrating
                Madurai&apos;s commitment to a drug-free future.
              </p>
            </div>
            <div className="shrink-0">
              <div className="rounded-2xl bg-zinc-50 border border-border px-6 py-4 text-center">
                <p className="text-3xl font-black text-primary">5</p>
                <p className="text-xs text-muted font-medium">Kit Items</p>
              </div>
            </div>
          </div>
        </div>

        <KitItemViewer items={riderKit} />
      </div>
    </section>
  );
}
