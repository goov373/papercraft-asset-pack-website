import { cn } from "@/lib/utils"

/**
 * Marquee - Papercraft infinite scroll component
 *
 * Based on Magic UI's Marquee, adapted for papercraft aesthetic.
 * Perfect for logo bars, testimonial scrolls, or asset showcases.
 *
 * Papercraft treatment:
 * - Warm gradient fade edges (amber instead of white)
 * - Subtle paper card background option
 * - Configurable gap using CSS custom property
 *
 * @see https://magicui.design/docs/components/marquee
 */
function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2",
        "[--duration:40s] [--gap:1rem]",
        "[gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around",
              "[gap:var(--gap)]",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              }
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

/**
 * MarqueeContainer - Optional wrapper with fade edges
 *
 * Provides the gradient fade effect at the edges.
 * Can be used without if you want edge-to-edge scrolling.
 */
function MarqueeContainer({
  className,
  fadeEdges = true,
  fadeWidth = "w-1/6",
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden",
        className
      )}
      {...props}
    >
      {children}

      {/* Left fade - warm amber gradient */}
      {fadeEdges && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0",
              "bg-gradient-to-r from-background to-transparent",
              fadeWidth
            )}
          />
          {/* Right fade - warm amber gradient */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0",
              "bg-gradient-to-l from-background to-transparent",
              fadeWidth
            )}
          />
        </>
      )}
    </div>
  )
}

/**
 * MarqueeItem - Paper card style item for marquee content
 *
 * Use this for consistent paper-styled items in the marquee.
 * Perfect for logos, testimonials, or asset previews.
 */
function MarqueeItem({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "px-4 py-2",
        "bg-amber-50/50 rounded-lg",
        "border border-amber-200/40",
        "[box-shadow:var(--paper-elevation-0)]",
        "hover:[box-shadow:var(--paper-elevation-1)]",
        "transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Marquee, MarqueeContainer, MarqueeItem }
