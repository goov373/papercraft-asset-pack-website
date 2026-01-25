import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Papercraft Toggle
 *
 * A paper button that shows pressed/raised states.
 * When off, it's flat. When on, it lifts up like
 * a paper tab that's been flipped.
 */
const toggleVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-md text-sm font-medium",
    "border border-transparent",
    // Papercraft base
    "bg-card",
    "[box-shadow:var(--paper-elevation-0)]",
    // Transitions
    "transition-[box-shadow,background-color,transform]",
    "[transition-duration:150ms]",
    // Hover: Slight lift
    "hover:bg-muted hover:text-muted-foreground",
    "hover:[box-shadow:var(--paper-elevation-1)]",
    "hover:-translate-y-0.5",
    // Active/pressed: Flatten
    "active:translate-y-0",
    "active:[box-shadow:var(--paper-elevation-0)]",
    // On state: Raised paper with accent color
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "data-[state=on]:border-accent/50",
    "data-[state=on]:[box-shadow:var(--paper-elevation-2)]",
    "data-[state=on]:-translate-y-0.5",
    // Focus
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "outline-none",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:[filter:grayscale(30%)]",
    // Invalid
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    // Icons
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: [
          "border border-input bg-card",
          "[box-shadow:var(--paper-elevation-1)]",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),
        paper: [
          "bg-card border border-border",
          "[box-shadow:var(--paper-elevation-1)]",
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
          "data-[state=on]:border-primary",
        ].join(" "),
      },
      size: {
        default: "h-9 px-3 min-w-9",
        sm: "h-8 px-2.5 min-w-8",
        lg: "h-10 px-4 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({ className, variant, size, ...props }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
