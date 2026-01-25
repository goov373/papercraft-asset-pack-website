import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

/**
 * Kbd - Typewriter key or label maker style
 *
 * Papercraft treatment:
 * - Looks like a typewriter key or embossed label
 * - Raised appearance with paper-like shadow
 * - Monospace font for authentic look
 */
const kbdVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-mono text-xs font-medium",
    "rounded",
    "select-none",
    // Transition for interactive states
    "transition-all duration-100",
  ],
  {
    variants: {
      variant: {
        default: [
          // Typewriter key style - elevated paper key
          "bg-amber-100 text-amber-800",
          "border border-amber-300/60",
          "border-b-2 border-b-amber-400/50",
          "[box-shadow:var(--paper-elevation-1)]",
          "px-1.5 py-0.5",
          // Subtle hover lift like pressing a key
          "hover:-translate-y-px hover:[box-shadow:var(--paper-elevation-2)]",
          // Active/pressed state - key goes down
          "active:translate-y-0 active:[box-shadow:var(--paper-elevation-0)]",
          "active:border-b active:border-b-amber-300/60",
        ],
        outline: [
          // Label maker style
          "bg-transparent text-amber-700",
          "border border-amber-400/60",
          "border-dashed",
          "px-1.5 py-0.5",
          // Hover fills in slightly
          "hover:bg-amber-50/50",
        ],
        ghost: [
          // Subtle inline style
          "bg-amber-100/50 text-amber-700",
          "px-1 py-0.5",
          // Hover brightens
          "hover:bg-amber-100",
        ],
        raised: [
          // More prominent raised key style
          "bg-amber-50 text-amber-800",
          "border border-amber-200/60",
          "border-b-[3px] border-b-amber-300/70",
          "[box-shadow:var(--paper-elevation-2)]",
          "px-1.5 py-0.5",
          // Hover lifts more
          "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-3)]",
          // Press sinks fully
          "active:translate-y-0.5 active:[box-shadow:var(--paper-elevation-0)]",
          "active:border-b active:border-b-amber-200/60",
        ],
      },
      size: {
        sm: "text-[10px] px-1 py-0.5 min-w-5",
        default: "text-xs px-1.5 py-0.5 min-w-6",
        lg: "text-sm px-2 py-1 min-w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Kbd({
  className,
  variant,
  size,
  children,
  ...props
}) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </kbd>
  );
}

export { Kbd, kbdVariants }
