import { eventConfig } from "@/data/eventConfig";
import { CountdownTimer } from "./CountdownTimer";
import { Calendar, MapPin, Clock, Bike } from "lucide-react";

export function TelemetryBanner() {
  const { event } = eventConfig;

  const stats = [
    { icon: Bike, label: "Max Distance", value: "25 KM", sub: "Champion Route" },
    {
      icon: Calendar,
      label: "Event Date",
      value: event.date ? new Date(event.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "TBD",
      sub: event.date ? "Save the date" : "Announcement soon",
    },
    {
      icon: Clock,
      label: "Flag-off Time",
      value: event.flagOffTime ?? "TBD",
      sub: "Report by 05:30 AM",
    },
    {
      icon: MapPin,
      label: "Starting Point",
      value: "TCE Gate",
      sub: event.city + ", " + event.state,
    },
  ];

  return (
    <section
      id="telemetry"
      aria-labelledby="telemetry-heading"
      className="relative mx-3 md:mx-4 my-4 rounded-card overflow-hidden py-section px-gutter"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-deep-green via-forest-green to-deep-green"
        aria-hidden="true"
      />

      {/* Green ambient glow */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Giant watermark */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="block text-primary opacity-[0.07] text-[16vw] font-black leading-none tracking-tighter whitespace-nowrap"
        >
          DRUG FREE
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2
          id="telemetry-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight mb-3"
        >
          Track Every Turn,{" "}
          <span className="text-soft-mint">Ride Clean</span>
        </h2>
        <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl">
          Real-time checkpoints, live leaderboards, and a finish-line experience
          built for Madurai&apos;s anti-drug champions.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-5 py-5"
            >
              <Icon size={16} className="text-soft-mint mb-2" aria-hidden="true" />
              <p className="text-white/75 text-xs font-semibold uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className="text-white text-xl md:text-2xl font-black leading-tight">
                {value}
              </p>
              <p className="text-white/75 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-6 flex justify-start">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}
