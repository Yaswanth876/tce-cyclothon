"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
}

interface CountdownTimerProps {
  targetTimestamp: number;
  eventDateLabel: string;
}

const INDIA_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

function addCalendarMonths(timestamp: number, months: number) {
  const indiaDate = new Date(timestamp + INDIA_OFFSET_MS);
  const year = indiaDate.getUTCFullYear();
  const month = indiaDate.getUTCMonth() + months;
  const day = indiaDate.getUTCDate();
  const targetMonth = new Date(
    Date.UTC(
      year,
      month,
      1,
      indiaDate.getUTCHours(),
      indiaDate.getUTCMinutes(),
      indiaDate.getUTCSeconds(),
      indiaDate.getUTCMilliseconds(),
    ),
  );
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  targetMonth.setUTCDate(Math.min(day, lastDayOfMonth));
  return targetMonth.getTime() - INDIA_OFFSET_MS;
}

function getTimeLeft(targetTimestamp: number): TimeLeft {
  const currentTimestamp = Date.now();
  const remainingMilliseconds = Math.max(0, targetTimestamp - currentTimestamp);
  if (remainingMilliseconds === 0) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      hasStarted: true,
    };
  }

  const currentDate = new Date(currentTimestamp + INDIA_OFFSET_MS);
  const targetDate = new Date(targetTimestamp + INDIA_OFFSET_MS);
  let months = Math.max(
    0,
    (targetDate.getUTCFullYear() - currentDate.getUTCFullYear()) * 12 +
      targetDate.getUTCMonth() -
      currentDate.getUTCMonth(),
  );

  while (months > 0 && addCalendarMonths(currentTimestamp, months) > targetTimestamp) {
    months -= 1;
  }

  const remainingAfterMonths = Math.ceil(
    (targetTimestamp - addCalendarMonths(currentTimestamp, months)) / 1000,
  );

  return {
    months,
    days: Math.floor(remainingAfterMonths / 86_400),
    hours: Math.floor((remainingAfterMonths % 86_400) / 3_600),
    minutes: Math.floor((remainingAfterMonths % 3_600) / 60),
    seconds: remainingAfterMonths % 60,
    hasStarted: false,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function CountdownTimer({
  targetTimestamp,
  eventDateLabel,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const nextTimeLeft = getTimeLeft(targetTimestamp);
      setTimeLeft(nextTimeLeft);
      if (nextTimeLeft.hasStarted) {
        window.clearInterval(intervalId);
      }
    };

    const intervalId = window.setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => window.clearInterval(intervalId);
  }, [targetTimestamp]);

  const displayTime = {
    months: timeLeft?.months ?? 0,
    days: timeLeft?.days ?? 0,
    hours: timeLeft?.hours ?? 0,
    minutes: timeLeft?.minutes ?? 0,
    seconds: timeLeft?.seconds ?? 0,
    hasStarted: timeLeft?.hasStarted ?? false,
  };
  const units = [
    { value: displayTime.months, label: "Months" },
    { value: displayTime.days, label: "Days" },
    { value: displayTime.hours, label: "Hours" },
    { value: displayTime.minutes, label: "Minutes" },
    { value: displayTime.seconds, label: "Seconds" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        aria-label={
          displayTime.hasStarted
            ? "The Cyclothon has started. Time remaining: 0 months, 0 days, 0 hours, 0 minutes, 0 seconds"
            : timeLeft
              ? `Time remaining until the Cyclothon starts: ${displayTime.months} months, ${displayTime.days} days, ${displayTime.hours} hours, ${displayTime.minutes} minutes, ${displayTime.seconds} seconds`
              : `Countdown to the Cyclothon on ${eventDateLabel}`
        }
        role="timer"
        aria-live="off"
        className="flex items-start justify-between gap-1 sm:gap-2"
      >
        {units.map(({ value, label }, index) => (
          <div
            key={label}
            className="flex min-w-0 flex-1 items-start justify-center gap-1 sm:gap-2"
          >
            <div className="min-w-0 text-center">
              <span className="block whitespace-nowrap text-[clamp(1.25rem,7.2vw,3.8rem)] font-light leading-none tracking-[0.07em] tabular-nums text-white sm:text-5xl md:text-6xl">
                {pad(value)}
              </span>
              <span className="mt-2 block whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.12em] text-white/80 sm:text-[10px] sm:tracking-[0.2em] md:text-xs">
                {label}
              </span>
            </div>
            {index < units.length - 1 && (
              <span className="mt-0.5 shrink-0 text-lg font-light leading-none text-white/70 sm:mt-1 sm:text-2xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
      {displayTime.hasStarted && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 text-lg font-light text-white sm:text-xl"
        >
          The Cyclothon has started!
        </p>
      )}
    </div>
  );
}
