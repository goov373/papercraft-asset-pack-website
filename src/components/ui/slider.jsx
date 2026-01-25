import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/**
 * Papercraft Slider
 *
 * A paper strip track with a draggable paper tab marker.
 * The track has an inset shadow like a groove, and the
 * thumb looks like a paper tab that can be slid along.
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44",
        "data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          // Base: Paper strip track
          "relative grow overflow-hidden rounded-full",
          "bg-secondary/60 border border-border/50",
          // Papercraft: Inset shadow like a groove in paper
          "[box-shadow:var(--paper-shadow-inset)]",
          // Size
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            // Filled portion - like colored paper strip
            "absolute bg-primary rounded-full",
            "data-[orientation=horizontal]:h-full",
            "data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            // Base: Paper tab marker
            "block size-5 shrink-0 rounded-full cursor-grab",
            "bg-card border-2 border-primary",
            // Papercraft: Elevated paper tab
            "[box-shadow:var(--paper-elevation-1)]",
            // Transitions
            "transition-[box-shadow,transform]",
            "[transition-duration:150ms]",
            // Hover: Lift effect
            "hover:[box-shadow:var(--paper-elevation-2)]",
            "hover:scale-110",
            // Focus: Ring + lift
            "focus-visible:outline-none",
            "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "focus-visible:[box-shadow:var(--paper-elevation-2)]",
            // Active/dragging: Press down slightly
            "active:scale-100 active:cursor-grabbing",
            "active:[box-shadow:var(--paper-elevation-1)]",
            // Disabled
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
