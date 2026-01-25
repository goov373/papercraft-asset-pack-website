import { cn } from "@/lib/utils"
import { Section } from "./section"
import { NumberTicker } from "@/components/ui/number-ticker"

/**
 * Stats - Papercraft statistics display section
 *
 * Papercraft treatment:
 * - Each stat on a paper card with subtle elevation
 * - Warm amber color palette
 * - Animated numbers with handcrafted feel (using NumberTicker)
 */

function StatCard({ label, value, suffix, description, animated = true, className }) {
  // Determine if value is numeric for animation
  const numericValue = typeof value === "number" ? value : parseInt(value, 10)
  const isNumeric = !isNaN(numericValue)

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-6 text-center",
        "bg-muted/50 rounded-lg border border-border/40",
        "[box-shadow:var(--paper-elevation-1)]",
        "hover:-translate-y-1 hover:[box-shadow:var(--paper-elevation-2)]",
        "transition-all duration-200",
        className
      )}
    >
      {label && (
        <div className="text-sm font-medium text-primary uppercase tracking-wide">
          {label}
        </div>
      )}
      <div className="flex items-baseline gap-1">
        {animated && isNumeric ? (
          <NumberTicker
            value={numericValue}
            className="text-4xl sm:text-5xl font-bold text-foreground"
          />
        ) : (
          <span className="text-4xl sm:text-5xl font-bold text-foreground">
            {value}
          </span>
        )}
        {suffix && (
          <span className="text-2xl font-semibold text-primary">
            {suffix}
          </span>
        )}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground text-pretty">
          {description}
        </div>
      )}
    </div>
  )
}

function Stats({
  title,
  items = [
    {
      label: "Assets",
      value: "500",
      suffix: "+",
      description: "Hand-crafted vector illustrations",
    },
    {
      label: "Formats",
      value: "6",
      description: "SVG, PNG, AI, EPS, PDF, Figma",
    },
    {
      label: "Categories",
      value: "12",
      description: "Organized collections",
    },
    {
      label: "Updates",
      value: "Free",
      description: "Lifetime access included",
    },
  ],
  columns = 4,
  className,
}) {
  return (
    <Section variant="paper" divider="fold" className={className}>
      <div className="flex flex-col gap-8">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center">
            {title}
          </h2>
        )}
        {items !== false && items.length > 0 && (
          <div
            className={cn(
              "grid gap-4 sm:gap-6",
              columns === 2 && "grid-cols-1 sm:grid-cols-2",
              columns === 3 && "grid-cols-1 sm:grid-cols-3",
              columns === 4 && "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {items.map((item, index) => (
              <StatCard key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

export { Stats, StatCard }
