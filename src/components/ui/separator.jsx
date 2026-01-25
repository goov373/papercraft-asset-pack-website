import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Separator - Paper division line with multiple variants
 *
 * Papercraft treatment:
 * - default: Subtle gradient fade like a fold line
 * - fold: Embossed fold line with highlight/shadow
 * - torn: Jagged torn paper edge
 * - cut: Clean cut line with subtle shadow
 * - dashed: Dashed cutting guide
 * - dotted: Dotted fold guide
 */
const separatorVariants = cva(
  "shrink-0",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-transparent via-amber-300/50 to-transparent",
          "data-[orientation=vertical]:bg-gradient-to-b",
        ],
        fold: [
          "bg-gradient-to-r from-transparent via-amber-400/40 to-transparent",
          "[box-shadow:0_1px_0_0_rgba(255,255,255,0.5),inset_0_1px_0_0_rgba(0,0,0,0.05)]",
          "data-[orientation=vertical]:bg-gradient-to-b",
          "data-[orientation=vertical]:[box-shadow:1px_0_0_0_rgba(255,255,255,0.5),inset_1px_0_0_0_rgba(0,0,0,0.05)]",
        ],
        torn: [
          "bg-amber-200/60",
          "h-[3px]",
          "[mask-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 3' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1.5 Q 5 0, 10 1.5 T 20 1.5 T 30 1.5 T 40 1.5 T 50 1.5 T 60 1.5 T 70 1.5 T 80 1.5 T 90 1.5 T 100 1.5 V 3 H 0 Z' fill='black'/%3E%3C/svg%3E\")]",
          "[mask-size:50px_3px]",
          "[mask-repeat:repeat-x]",
        ],
        cut: [
          "bg-border",
          "[box-shadow:0_1px_2px_-1px_rgba(0,0,0,0.1)]",
        ],
        dashed: [
          "bg-transparent",
          "border-t border-dashed border-amber-400/60",
          "data-[orientation=vertical]:border-t-0 data-[orientation=vertical]:border-l",
        ],
        dotted: [
          "bg-transparent",
          "border-t border-dotted border-amber-400/60",
          "data-[orientation=vertical]:border-t-0 data-[orientation=vertical]:border-l",
        ],
      },
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
    },
    compoundVariants: [
      {
        variant: "torn",
        orientation: "horizontal",
        className: "h-[3px] w-full",
      },
      {
        variant: "dashed",
        orientation: "horizontal",
        className: "h-0 border-t",
      },
      {
        variant: "dotted",
        orientation: "horizontal",
        className: "h-0 border-t",
      },
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
)

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, orientation }),
        className
      )}
      {...props}
    />
  );
}

export { Separator, separatorVariants }
