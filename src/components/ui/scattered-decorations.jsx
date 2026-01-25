import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// Default papercraft emoji sets for different contexts
const DECORATION_SETS = {
  supplies: ["✂️", "📏", "✏️", "📎", "📐", "🖍️", "📌", "🎀"],
  paper: ["📄", "📝", "📃", "🗒️", "📋", "🏷️", "📑", "🗂️"],
  creative: ["⭐", "✨", "💫", "🌟", "🎨", "🖼️", "🎭", "🎪"],
  mixed: ["✂️", "📄", "✏️", "⭐", "📎", "🎀", "📏", "✨"],
}

// Position presets for common layouts
const POSITION_PRESETS = {
  // Decorations at the left and right edges
  edges: [
    { side: "left", top: "10%", offset: "-20px" },
    { side: "left", top: "50%", offset: "-30px" },
    { side: "left", top: "85%", offset: "-15px" },
    { side: "right", top: "15%", offset: "-25px" },
    { side: "right", top: "60%", offset: "-20px" },
    { side: "right", top: "90%", offset: "-30px" },
  ],
  // Decorations at the corners
  corners: [
    { side: "left", top: "5%", offset: "10px" },
    { side: "right", top: "5%", offset: "10px" },
    { side: "left", top: "95%", offset: "10px" },
    { side: "right", top: "95%", offset: "10px" },
  ],
  // Scattered across the area
  scattered: [
    { side: "left", top: "8%", offset: "5%" },
    { side: "right", top: "12%", offset: "8%" },
    { side: "left", top: "35%", offset: "12%" },
    { side: "right", top: "45%", offset: "5%" },
    { side: "left", top: "70%", offset: "8%" },
    { side: "right", top: "80%", offset: "10%" },
  ],
  // Top edge only (for section headers)
  top: [
    { side: "left", top: "0%", offset: "15%" },
    { side: "right", top: "0%", offset: "15%" },
    { side: "left", top: "-5%", offset: "35%" },
    { side: "right", top: "-5%", offset: "35%" },
  ],
  // Bottom edge only (for section footers)
  bottom: [
    { side: "left", top: "100%", offset: "15%" },
    { side: "right", top: "100%", offset: "15%" },
  ],
}

// Subtle floating animation
const floatAnimation = {
  y: [0, -8, 0],
  rotate: [0, 3, 0, -3, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

// Individual decoration item
function DecorationItem({
  emoji,
  position,
  rotation,
  size,
  opacity,
  index,
  animate,
  reducedMotion,
}) {
  const style = useMemo(() => {
    const baseStyle = {
      position: "absolute",
      top: position.top,
      fontSize: size,
      opacity: opacity,
      transform: `rotate(${rotation}deg)`,
      pointerEvents: "none",
      userSelect: "none",
      zIndex: 0,
    }

    if (position.side === "left") {
      baseStyle.left = position.offset
    } else {
      baseStyle.right = position.offset
    }

    return baseStyle
  }, [position, rotation, size, opacity])

  if (reducedMotion || !animate) {
    return (
      <span style={style} aria-hidden="true">
        {emoji}
      </span>
    )
  }

  return (
    <motion.span
      style={style}
      aria-hidden="true"
      animate={{
        y: [0, -6 - (index % 3) * 2, 0],
        rotate: [rotation, rotation + 4, rotation, rotation - 4, rotation],
      }}
      transition={{
        duration: 5 + (index % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5,
      }}
    >
      {emoji}
    </motion.span>
  )
}

/**
 * ScatteredDecorations - Floating papercraft decorations for sections
 *
 * @param {string} preset - Position preset: "edges", "corners", "scattered", "top", "bottom"
 * @param {string} set - Emoji set: "supplies", "paper", "creative", "mixed"
 * @param {string[]} emojis - Custom emoji array (overrides set)
 * @param {number} count - Number of decorations to show (default: based on preset)
 * @param {string} size - Emoji size: "sm", "md", "lg", "xl"
 * @param {number} opacity - Opacity value 0-1 (default: 0.4)
 * @param {boolean} animate - Enable floating animation (default: true)
 * @param {string} className - Additional CSS classes
 */
function ScatteredDecorations({
  preset = "edges",
  set = "supplies",
  emojis,
  count,
  size = "md",
  opacity = 0.4,
  animate = true,
  className,
}) {
  const reducedMotion = useReducedMotion()

  // Get emoji set
  const emojiSet = emojis || DECORATION_SETS[set] || DECORATION_SETS.supplies

  // Get position preset
  const positions = POSITION_PRESETS[preset] || POSITION_PRESETS.edges

  // Determine how many decorations to show
  const decorationCount = count || positions.length

  // Get size value
  const sizeMap = {
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
  }
  const fontSize = sizeMap[size] || sizeMap.md

  // Generate decorations with consistent random values (seeded by index)
  const decorations = useMemo(() => {
    return positions.slice(0, decorationCount).map((pos, index) => ({
      emoji: emojiSet[index % emojiSet.length],
      position: pos,
      rotation: ((index * 37) % 40) - 20, // Pseudo-random rotation -20 to +20
      id: `deco-${index}`,
    }))
  }, [positions, decorationCount, emojiSet])

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {decorations.map((deco, index) => (
        <DecorationItem
          key={deco.id}
          emoji={deco.emoji}
          position={deco.position}
          rotation={deco.rotation}
          size={fontSize}
          opacity={opacity}
          index={index}
          animate={animate}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  )
}

// Export preset names for documentation
ScatteredDecorations.presets = Object.keys(POSITION_PRESETS)
ScatteredDecorations.sets = Object.keys(DECORATION_SETS)

export { ScatteredDecorations, DECORATION_SETS, POSITION_PRESETS }
