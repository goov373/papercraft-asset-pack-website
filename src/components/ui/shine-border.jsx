import { cn } from "@/lib/utils"

/**
 * ShineBorder - Papercraft animated border glow
 *
 * Based on Magic UI's ShineBorder, adapted for papercraft aesthetic.
 * Creates an animated gradient border that sweeps around the element.
 *
 * Papercraft treatment:
 * - Warm amber/orange gradient by default
 * - Subtle glow that complements paper textures
 * - Position absolute, use inside a relative container
 *
 * Usage:
 * <div className="relative">
 *   <ShineBorder />
 *   <Card>Content</Card>
 * </div>
 *
 * @see https://magicui.design/docs/components/shine-border
 */
function ShineBorder({
  borderWidth = 2,
  duration = 14,
  // Warm papercraft colors by default
  shineColor = ["#d97706", "#f97316", "#fbbf24"],
  className,
  style,
  ...props
}) {
  return (
    <div
      style={{
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        backgroundImage: `radial-gradient(transparent, transparent, ${
          Array.isArray(shineColor) ? shineColor.join(",") : shineColor
        }, transparent, transparent)`,
        backgroundSize: "300% 300%",
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "var(--border-width)",
        ...style,
      }}
      className={cn(
        "motion-safe:animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        className
      )}
      {...props}
    />
  )
}

/**
 * ShineBorderCard - Pre-composed card with shine border effect
 *
 * Convenience wrapper that combines a card container with shine border.
 */
function ShineBorderCard({
  borderWidth = 2,
  duration = 14,
  shineColor = ["#d97706", "#f97316", "#fbbf24"],
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      <ShineBorder
        borderWidth={borderWidth}
        duration={duration}
        shineColor={shineColor}
      />
      {children}
    </div>
  )
}

export { ShineBorder, ShineBorderCard }
