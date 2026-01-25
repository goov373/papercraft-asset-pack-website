import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * AspectRatio - Paper frame / mat board metaphor
 *
 * Papercraft treatment:
 * - Styled as a paper frame or mat board
 * - Content sits within the paper boundary
 * - Subtle paper elevation and warm background
 * - "Buildable in real life" - like a photo mat or paper frame
 */
const aspectRatioVariants = cva(
  [
    "relative overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: "",
        frame: [
          // Paper mat board styling
          "bg-amber-50",
          "border border-amber-200/60",
          "rounded-sm",
          "[box-shadow:var(--paper-elevation-1)]",
          // Inner content area styling
          "[&>*]:rounded-sm",
        ],
        card: [
          // Paper card styling with stronger elevation
          "bg-amber-50/90",
          "border border-amber-200/60",
          "rounded-md",
          "[box-shadow:var(--paper-elevation-2)]",
        ],
        inset: [
          // Inset/recessed paper look
          "bg-amber-100/50",
          "border border-amber-200/40",
          "rounded-sm",
          "[box-shadow:inset_0_1px_2px_rgba(0,0,0,0.05)]",
        ],
        outline: [
          // Dashed outline like a cut guide
          "border border-dashed border-amber-300/60",
          "rounded-sm",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function AspectRatio({
  className,
  variant,
  ...props
}) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      className={cn(aspectRatioVariants({ variant }), className)}
      {...props}
    />
  );
}

export { AspectRatio, aspectRatioVariants }
