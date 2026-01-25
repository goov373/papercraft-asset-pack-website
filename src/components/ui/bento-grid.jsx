import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * BentoGrid - Papercraft responsive grid layout
 *
 * Based on Magic UI's BentoGrid, adapted for papercraft aesthetic.
 * Creates a visually interesting grid layout with varying card sizes.
 *
 * Papercraft treatment:
 * - Warm amber paper shadows
 * - Paper elevation on hover
 * - Rounded corners with subtle border
 *
 * Usage:
 * <BentoGrid>
 *   <BentoCard className="col-span-2" ... />
 *   <BentoCard ... />
 * </BentoGrid>
 *
 * @see https://magicui.design/docs/components/bento-grid
 */
function BentoGrid({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-4",
        "sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * BentoCard - Individual card in the Bento grid
 *
 * Papercraft treatment:
 * - Paper cream background
 * - Warm amber shadows and borders
 * - Lift effect on hover
 * - Paper-styled CTA button
 */
function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
        // Papercraft light styles
        "bg-[var(--paper-cream)] border border-border/60",
        "[box-shadow:var(--paper-elevation-1)]",
        // Hover lift effect
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:[box-shadow:var(--paper-elevation-2)]",
        className
      )}
      {...props}
    >
      {/* Background/Image area */}
      <div className="relative overflow-hidden">{background}</div>

      {/* Content area */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          {Icon && (
            <Icon className="h-10 w-10 origin-left transform-gpu text-muted-foreground transition-all duration-300 ease-in-out group-hover:scale-75" />
          )}
          <h3 className="text-lg font-semibold text-foreground">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground/80 line-clamp-2">{description}</p>
        </div>

        {/* Mobile CTA - always visible */}
        {href && cta && (
          <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center pt-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
            <Button
              variant="link"
              asChild
              size="sm"
              className="pointer-events-auto p-0 text-primary hover:text-foreground"
            >
              <a href={href}>
                {cta}
                <ArrowRight className="ms-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Desktop CTA - appears on hover */}
      {href && cta && (
        <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
          <Button
            variant="link"
            asChild
            size="sm"
            className="pointer-events-auto p-0 text-primary hover:text-foreground"
          >
            <a href={href}>
              {cta}
              <ArrowRight className="ms-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-amber-900/[.02]" />
    </div>
  )
}

/**
 * BentoCardSimple - Simpler card variant without CTA
 *
 * For cases where you just want a display card without interaction.
 */
function BentoCardSimple({
  title,
  description,
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "group relative col-span-1 flex flex-col overflow-hidden rounded-xl",
        "bg-[var(--paper-cream)] border border-border/60",
        "[box-shadow:var(--paper-elevation-1)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:[box-shadow:var(--paper-elevation-2)]",
        className
      )}
      {...props}
    >
      {/* Content area */}
      <div className="p-5 flex flex-col gap-2">
        {title && (
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground/80">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}

export { BentoGrid, BentoCard, BentoCardSimple }
