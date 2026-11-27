"use client";

import { cn } from "@/lib/cn";
import { eventConfig } from "@/data/eventConfig";

interface RegisterButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  label?: string;
}

export function RegisterButton({
  className,
  size = "md",
  variant = "solid",
  label = "Register now",
}: RegisterButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    solid:
      "bg-forest-green text-white hover:bg-deep-green active:scale-[0.98] shadow-sm",
    outline:
      "border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white",
  };

  return (
    <a
      href={eventConfig.event.registrationUrl}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "motion-safe:transition-all motion-safe:duration-200",
        "focus-visible:ring-2 focus-visible:ring-forest-green focus-visible:ring-offset-2",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {label}
    </a>
  );
}
