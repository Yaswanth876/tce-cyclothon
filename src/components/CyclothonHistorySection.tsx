const EDITIONS = [
  {
    period: "March 2020",
    edition: "Inaugural ride",
    title: "Pedal for a Purpose",
    description:
      "A ride for cancer awareness and healthier lifestyles, held on International Women's Day.",
    impact: "300+ riders · Cancer awareness",
  },
  {
    period: "October 2024",
    edition: "Season 2",
    title: "Cycle to Recycle",
    description:
      "Cyclists rode a 21 KM Madurai circuit to promote plastic reuse and environmental care.",
    impact: "450+ riders · 21 KM circuit",
  },
  {
    period: "Current edition",
    edition: "Madurai District Edition",
    title: "Pedal No to Drug",
    description:
      "Young people unite around drug awareness, with 5 KM, 15 KM, and 25 KM rides.",
    impact: "Three ride distances · SDG 3.5",
  },
];

export function CyclothonHistorySection() {
  return (
    <section
      aria-labelledby="history-heading"
      className="border-t border-border bg-background px-gutter py-section"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-forest-green">
            A growing tradition
          </p>
          <h2
            id="history-heading"
            className="text-3xl font-light leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Each ride carries the story forward
          </h2>
        </header>

        <ol className="grid gap-9 md:grid-cols-3 md:gap-8">
          {EDITIONS.map((edition) => (
            <li key={edition.title} className="relative border-t border-border pt-5">
              <span
                aria-hidden="true"
                className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-forest-green ring-4 ring-background"
              />
              <p className="text-sm font-semibold text-forest-green">
                {edition.period}
              </p>
              <p className="mt-1 text-xs font-light text-muted">
                {edition.edition}
              </p>
              <h3 className="mt-5 text-xl font-light tracking-tight text-foreground">
                {edition.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                {edition.description}
              </p>
              <p className="mt-5 border-t border-border pt-4 text-xs font-semibold text-foreground/70">
                {edition.impact}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
