import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * NumberTicker - Papercraft animated number counter
 *
 * Based on Magic UI's NumberTicker, adapted for papercraft aesthetic.
 * Smoothly animates from a start value to an end value when in view.
 *
 * Papercraft treatment:
 * - Uses amber text color by default
 * - Tabular figures for consistent width
 * - Smooth spring animation for handcrafted feel
 *
 * Usage:
 * <NumberTicker value={500} />
 * <NumberTicker value={99.9} decimalPlaces={1} />
 * <NumberTicker value={1000} direction="down" startValue={1500} />
 *
 * @see https://magicui.design/docs/components/number-ticker
 */
function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}) {
  const ref = useRef(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [motionValue, isInView, delay, value, direction, startValue])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider tabular-nums",
        "text-foreground", // Papercraft warm color
        className
      )}
      {...props}
    >
      {startValue}
    </span>
  )
}

export { NumberTicker }
