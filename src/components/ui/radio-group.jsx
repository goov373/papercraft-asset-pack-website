import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

/**
 * Papercraft Radio Group
 *
 * Radio buttons styled like punched holes in paper that fill
 * with color when selected - matching the checkbox pattern.
 */
function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // Base: Punched hole in paper
        "peer aspect-square size-4 shrink-0 rounded-full border",
        // Papercraft: Inset shadow like a punched hole
        "bg-card border-input",
        "[box-shadow:var(--paper-shadow-inset)]",
        // Transitions
        "transition-[box-shadow,background-color,border-color]",
        "[transition-duration:var(--paper-duration-fast)]",
        // Hover: Border highlight
        "hover:border-primary/50",
        // Checked state: Filled paper dot
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        "data-[state=checked]:[box-shadow:var(--paper-elevation-1)]",
        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:[filter:grayscale(30%)]",
        // Dark mode
        "dark:bg-input/30 dark:data-[state=checked]:bg-primary",
        "outline-none",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        {/* Inner dot - paper circle with scale animation */}
        <div className="size-1.5 rounded-full bg-primary-foreground animate-in zoom-in-0 duration-150" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
