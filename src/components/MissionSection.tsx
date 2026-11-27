import { eventConfig } from "@/data/eventConfig";
import { CategoryPills } from "./CategoryPills";
import { RegisterButton } from "./RegisterButton";

export function MissionSection() {
  const { routes } = eventConfig;

  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="py-section px-gutter"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid min-w-0 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left column */}
          <div className="min-w-0">
            <h2
              id="mission-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight mb-5"
            >
              Ride for a{" "}
              <span className="text-primary">drug-free Madurai</span>
            </h2>

            <p className="text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              TCE Cyclothon turns cycling into drug-awareness action. Every
              kilometer supports a healthier future for Madurai&apos;s next
              generation.
            </p>

            {/* Category pills + route detail — interactive */}
            <CategoryPills routes={routes} />
          </div>

          {/* Right column */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* Anti-Drug Pledge card */}
            <div
              className="rounded-2xl p-7 md:p-9"
              style={{ backgroundColor: "var(--brand-deep-green)" }}
            >
              <h3 className="text-white text-xl md:text-2xl font-light mb-2 leading-snug">
                Take a{" "}
                <span className="text-soft-mint">stand against drugs</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Sign the pledge. Ride with Madurai&apos;s youth for a
                drug-free future.
              </p>
              <RegisterButton
                label="Join the ride"
                size="md"
                className="w-full sm:w-auto"
              />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Expected riders", value: "500+" },
                { label: "Longest ride", value: "25" },
                { label: "Checkpoints", value: "13" },
                { label: "SDG target", value: "3.5" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-panel bg-background border border-border p-5 text-center"
                >
                  <p className="text-3xl font-black text-primary mb-1">{value}</p>
                  <p className="text-xs text-muted font-light">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
