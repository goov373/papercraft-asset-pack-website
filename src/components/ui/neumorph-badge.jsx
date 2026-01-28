import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * NeumorphBadge - Soft neumorphic badge/eyebrow component
 *
 * Based on Cult UI's NeumorphEyebrow, adapted for papercraft aesthetic.
 * Creates soft, embossed badges with tactile appearance.
 *
 * Papercraft treatment:
 * - Warm cream/amber backgrounds
 * - Soft amber shadows for depth
 * - Paper-like subtle texture feel
 *
 * Usage:
 * <NeumorphBadge>NEW</NeumorphBadge>
 * <NeumorphBadge variant="highlight">Featured</NeumorphBadge>
 *
 * @see https://www.cult-ui.com/docs/components/neumorph-eyebrow
 */

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium tracking-wide uppercase",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        // Default - subtle paper appearance
        default: [
          "bg-gradient-to-b from-muted to-accent/80",
          "text-muted-foreground",
          "border border-border",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(180,83,9,0.08),0_1px_2px_rgba(180,83,9,0.06)]",
        ],
        // Highlight - more prominent
        highlight: [
          "bg-gradient-to-b from-accent/80 to-accent",
          "text-foreground",
          "border border-border",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.6),0_2px_4px_rgba(180,83,9,0.1),0_1px_2px_rgba(180,83,9,0.08)]",
        ],
        // Accent - orange tint
        accent: [
          "bg-gradient-to-b from-orange-100 to-orange-200/70",
          "text-orange-700",
          "border border-orange-300/50",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.7),0_1px_3px_rgba(234,88,12,0.1),0_1px_2px_rgba(234,88,12,0.06)]",
        ],
        // Success - green tint for positive states
        success: [
          "bg-gradient-to-b from-emerald-50 to-emerald-100/70",
          "text-emerald-700",
          "border border-emerald-200/50",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(5,150,105,0.08),0_1px_2px_rgba(5,150,105,0.06)]",
        ],
        // Muted - very subtle
        muted: [
          "bg-gradient-to-b from-stone-50 to-stone-100/70",
          "text-stone-600",
          "border border-stone-200/40",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.04)]",
        ],
        // Kraft - brown paper style
        kraft: [
          "bg-gradient-to-b from-accent/90 to-accent/70",
          "text-foreground",
          "border border-border",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(180,83,9,0.12)]",
        ],
      },
      size: {
        xs: "text-[10px] px-2 py-0.5 rounded-md",
        sm: "text-xs px-2.5 py-1 rounded-md",
        default: "text-xs px-3 py-1.5 rounded-lg",
        lg: "text-sm px-4 py-2 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function NeumorphBadge({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  )
}

/**
 * NeumorphTag - Smaller inline tag variant
 *
 * For tagging items, categories, etc.
 */
function NeumorphTag({
  children,
  variant = "default",
  className,
  onRemove,
  ...props
}) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size: "sm" }),
        "gap-1",
        onRemove && "pr-1.5",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 p-0.5 rounded hover:bg-accent/50 transition-colors"
          aria-label="Remove tag"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      )}
    </span>
  )
}

/**
 * NeumorphPill - Pill-shaped variant for status indicators
 */
function NeumorphPill({
  children,
  variant = "default",
  className,
  dot = false,
  dotColor = "bg-amber-500",
  ...props
}) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size: "sm" }),
        "rounded-full px-3",
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse", dotColor)}
        />
      )}
      {children}
    </span>
  )
}

export { NeumorphBadge, NeumorphTag, NeumorphPill, badgeVariants }
