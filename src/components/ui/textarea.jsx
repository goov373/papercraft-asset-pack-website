import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        "flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base md:text-sm",
        // Papercraft: Inset shadow for recessed paper feel
        "bg-card border-input",
        "[box-shadow:var(--paper-shadow-inset)]",
        // Transitions
        "transition-[color,box-shadow,border-color]",
        "[transition-duration:var(--paper-duration-fast)]",
        // Focus: Lifts slightly
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "focus-visible:[box-shadow:var(--paper-elevation-1)]",
        // Text and placeholder
        "placeholder:text-muted-foreground",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:[filter:grayscale(30%)]",
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

export { Textarea }
