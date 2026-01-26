import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Papercraft Switch
 *
 * A paper slider that moves within a track, like a paper tab
 * sliding through a slot cut in cardstock.
 */
const Switch = React.forwardRef(
  ({ className, size = "default", "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch"
        data-size={size}
        aria-label={ariaLabel}
        className={cn(
        // Base: Paper track with inset groove
        "peer group/switch inline-flex shrink-0 items-center",
        "rounded-full border border-border",
        // Papercraft: Inset shadow like a groove cut into paper
        "bg-secondary/60",
        "[box-shadow:var(--paper-shadow-inset)]",
        // Transitions
        "transition-[box-shadow,background-color,border-color]",
        "[transition-duration:200ms]",
        // Checked state: Track changes color
        "data-[state=checked]:bg-primary/20",
        "data-[state=checked]:border-primary/40",
        // Focus state
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:[filter:grayscale(30%)]",
        // Sizes
        "data-[size=default]:h-6 data-[size=default]:w-11",
        "data-[size=sm]:h-5 data-[size=sm]:w-9",
        "data-[size=lg]:h-7 data-[size=lg]:w-14",
        "outline-none",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base: Paper circle/tab
          "pointer-events-none block rounded-full",
          "bg-card border border-border/50",
          // Papercraft: Elevated like a paper tab
          "[box-shadow:var(--paper-elevation-1)]",
          // Hover: Lift thumb before toggle
          "group-hover/switch:[box-shadow:var(--paper-elevation-2)]",
          // Active: Press down
          "group-active/switch:scale-95",
          // Transitions - smooth slide with slight bounce
          "transition-all duration-200",
          "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          // Sizes
          "group-data-[size=default]/switch:size-5",
          "group-data-[size=sm]/switch:size-4",
          "group-data-[size=lg]/switch:size-6",
          // Position: slide from left to right
          "data-[state=unchecked]:translate-x-0.5",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
          // Checked: more prominent elevation
          "data-[state=checked]:bg-primary",
          "data-[state=checked]:border-primary",
          "data-[state=checked]:[box-shadow:var(--paper-elevation-2)]"
        )}
      />
    </SwitchPrimitive.Root>
  )
  }
)
Switch.displayName = "Switch"

export { Switch }
