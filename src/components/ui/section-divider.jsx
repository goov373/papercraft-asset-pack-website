import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// Different emoji sets for variety between dividers
const DIVIDER_THEMES = {
  supplies: ["✂️", "📏", "✏️", "📎", "🎀"],
  creative: ["⭐", "✨", "💫", "🌟", "🎨"],
  paper: ["📄", "📝", "📃", "🗒️", "📋"],
  mixed: ["✂️", "📄", "✏️", "⭐", "📎"],
}

// Generate pseudo-random but consistent values based on index
function getItemStyle(index, total) {
  const baseRotation = ((index * 47) % 30) - 15 // -15 to +15 degrees
  const verticalOffset = ((index * 23) % 20) - 10 // -10px to +10px
  const horizontalSpread = (index / (total - 1)) * 100 // 0% to 100%

  return {
    rotation: baseRotation,
    yOffset: verticalOffset,
    xPosition: horizontalSpread,
  }
}

/**
 * SectionDivider - Animated decorative divider between sections
 *
 * @param {string} theme - Emoji theme: "supplies", "creative", "paper", "mixed"
 * @param {number} count - Number of decorative items (default: 5)
 * @param {string} size - Size: "sm", "md", "lg"
 * @param {number} opacity - Opacity 0-1 (default: 0.4)
 * @param {boolean} animate - Enable floating animation (default: true)
 * @param {string} className - Additional CSS classes
 */
function SectionDivider({
  theme = "mixed",
  count = 5,
  size = "md",
  opacity = 0.4,
  animate = true,
  className,
}) {
  const reducedMotion = useReducedMotion()

  const sizeMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const emojis = DIVIDER_THEMES[theme] || DIVIDER_THEMES.mixed

  const items = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      emoji: emojis[index % emojis.length],
      style: getItemStyle(index, count),
      id: `divider-${index}`,
    }))
  }, [count, emojis])

  const shouldAnimate = animate && !reducedMotion

  return (
    <div
      className={cn(
        "relative h-16 md:h-20 overflow-hidden pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-full">
          {items.map((item, index) => (
            <motion.span
              key={item.id}
              className={cn(
                "absolute top-1/2",
                sizeMap[size] || sizeMap.md
              )}
              style={{
                left: `${item.style.xPosition}%`,
                opacity: opacity,
                transform: `translateX(-50%) translateY(calc(-50% + ${item.style.yOffset}px)) rotate(${item.style.rotation}deg)`,
              }}
              {...(shouldAnimate && {
                animate: {
                  y: [
                    item.style.yOffset,
                    item.style.yOffset - 8,
                    item.style.yOffset,
                  ],
                  rotate: [
                    item.style.rotation,
                    item.style.rotation + 3,
                    item.style.rotation,
                  ],
                },
                transition: {
                  duration: 4 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                },
              })}
            >
              {item.emoji}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Subtle gradient fade on edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

// Export theme names for documentation
SectionDivider.themes = Object.keys(DIVIDER_THEMES)

export { SectionDivider, DIVIDER_THEMES }
