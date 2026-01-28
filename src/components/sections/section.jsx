import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Section - Papercraft page section wrapper
 *
 * Papercraft treatment:
 * - Subtle paper texture background option
 * - Theme-aware gradient backgrounds
 * - Paper fold divider between sections
 * - Consistent padding and max-width
 */
const sectionVariants = cva(
  [
    "relative px-4 py-12 sm:py-20 md:py-28",
  ],
  {
    variants: {
      variant: {
        default: "",
        paper: [
          // Subtle paper background
          "bg-muted/30",
        ],
        kraft: [
          // Kraft paper style
          "bg-gradient-to-b from-accent/50 to-muted/30",
        ],
        accent: [
          // Warm accent section
          "bg-gradient-to-br from-accent via-muted to-card",
        ],
      },
      divider: {
        none: "",
        fold: [
          // Paper fold line at top
          "before:absolute before:top-0 before:left-0 before:right-0 before:h-px",
          "before:bg-gradient-to-r before:from-transparent before:via-border/50 before:to-transparent",
        ],
        torn: [
          // Torn edge effect at top
          "before:absolute before:top-0 before:left-0 before:right-0 before:h-1",
          "before:bg-border/40",
          "before:[mask-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2 Q 5 0, 10 2 T 20 2 T 30 2 T 40 2 T 50 2 T 60 2 T 70 2 T 80 2 T 90 2 T 100 2 L 100 4 L 0 4 Z' fill='black'/%3E%3C/svg%3E\")]",
          "before:[mask-size:100px_4px]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      divider: "none",
    },
  }
)

function Section({
  className,
  variant,
  divider,
  children,
  ...props
}) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ variant, divider }), className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export { Section, sectionVariants }
