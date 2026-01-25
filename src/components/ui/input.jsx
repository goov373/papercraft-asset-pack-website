import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base md:text-sm",
        // Papercraft: Inset shadow for recessed paper feel
        "bg-card border-input",
        "[box-shadow:var(--paper-shadow-inset)]",
        // Transitions
        "transition-[color,box-shadow,border-color]",
        "[transition-duration:var(--paper-duration-fast)]",
        // Focus: Lifts slightly like paper being selected
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "focus-visible:[box-shadow:var(--paper-elevation-1)]",
        // Text and placeholder
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        // File input
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:[filter:grayscale(30%)]",
        // Invalid states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Dark mode
        "dark:bg-input/30",
        "outline-none",
        className
      )}
      {...props} />
  );
}

export { Input }
