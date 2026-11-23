"use client";

import { useState, useEffect } from "react";
import { eventConfig } from "@/data/eventConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer() {
  const { event } = eventConfig;

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!event.date) return;
    const target = new Date(event.date);
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [event.date]);

  if (!event.date) {
    return (
      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4 text-center">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
          Countdown
        </p>
        <p className="text-primary font-bold text-lg">Date TBD</p>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div
      className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4"
      aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      role="timer"
    >
      <p className="text-white/60 text-xs font-semibold uppercase tracking-widest text-center mb-2">
        Countdown
      </p>
      <div className="flex gap-3 items-center" aria-hidden="true">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hrs" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Sec" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-3">
            {i > 0 && <span className="text-primary/60 font-black text-xl">:</span>}
            <div className="text-center">
              <span className="font-mono text-3xl font-black text-primary tabular-nums block leading-none">
                {pad(value)}
              </span>
              <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
