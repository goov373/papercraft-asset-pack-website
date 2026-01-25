import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  // Base: Paper strip track
  [
    "relative w-full overflow-hidden",
    "bg-secondary/50 border border-border/50",
    // Subtle inset shadow for track depth
    "[box-shadow:var(--paper-shadow-inset)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default: Rounded paper strip
        default: "h-2 rounded-full",

        // Thick: Larger progress bar
        thick: "h-4 rounded-full",

        // Paper: Rectangular like a paper strip
        paper: "h-3 rounded-sm",

        // Craft: Kraft paper style
        kraft: [
          "h-3 rounded-sm",
          "bg-amber-100/50 border-amber-200/50",
        ].join(" "),
      },
      size: {
        sm: "h-1",
        default: "h-2",
        md: "h-3",
        lg: "h-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const indicatorVariants = cva(
  // Base indicator styles
  [
    "h-full w-full flex-1",
    "transition-all duration-300 ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary rounded-full",
        thick: "bg-primary rounded-full",
        paper: "bg-primary rounded-sm",
        kraft: "bg-amber-600 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Progress({ className, value, variant, size, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ variant, size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(indicatorVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants }
