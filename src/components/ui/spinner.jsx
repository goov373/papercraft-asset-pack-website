import { cva } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  // Base: Spinning animation
  "animate-spin text-muted-foreground",
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        default: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * Papercraft-styled loading spinner
 *
 * Uses the Loader2 icon which spins smoothly.
 * For a more papercraft feel, consider using custom SVG
 * with origami pinwheel or paper airplane animation.
 */
function Spinner({ className, size, ...props }) {
  return (
    <Loader2Icon
      data-slot="spinner"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
}

/**
 * Alternative: Origami-style pinwheel spinner
 * A more unique papercraft aesthetic
 */
function PinwheelSpinner({ className, size = "default", ...props }) {
  const sizeClasses = {
    xs: "size-3",
    sm: "size-4",
    default: "size-5",
    md: "size-6",
    lg: "size-8",
    xl: "size-12",
  }

  return (
    <svg
      data-slot="pinwheel-spinner"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "animate-spin",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Four paper triangles forming a pinwheel */}
      <path
        d="M12 2L12 12L2 12"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M22 12L12 12L12 2"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M12 22L12 12L22 12"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M2 12L12 12L12 22"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Center pin */}
      <circle
        cx="12"
        cy="12"
        r="1.5"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Loading dots - paper circles that bounce
 */
function LoadingDots({ className, ...props }) {
  return (
    <div
      data-slot="loading-dots"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <span className="size-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
      <span className="size-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
      <span className="size-2 rounded-full bg-current animate-bounce" />
    </div>
  )
}

export { Spinner, PinwheelSpinner, LoadingDots, spinnerVariants }
