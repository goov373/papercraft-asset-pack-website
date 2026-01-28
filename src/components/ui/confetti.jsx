import { useCallback, useState } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// Paper-themed confetti pieces (uses semantic colors for theme adaptability)
const CONFETTI_SHAPES = [
  // Paper scraps (rectangles)
  { type: "scrap", color: "bg-accent", width: "w-3", height: "h-2" },
  { type: "scrap", color: "bg-primary/40", width: "w-2", height: "h-3" },
  { type: "scrap", color: "bg-muted", width: "w-4", height: "h-1" },
  // Paper dots (circles)
  { type: "dot", color: "bg-accent", size: "w-2 h-2" },
  { type: "dot", color: "bg-primary/50", size: "w-3 h-3" },
  { type: "dot", color: "bg-primary/60", size: "w-2 h-2" },
  // Paper triangles
  { type: "triangle", color: "border-accent", size: "border-l-[6px] border-r-[6px] border-b-[10px]" },
  { type: "triangle", color: "border-primary/40", size: "border-l-[8px] border-r-[8px] border-b-[12px]" },
]

// Generate a single confetti piece with random properties
function generatePiece(index) {
  const shape = CONFETTI_SHAPES[index % CONFETTI_SHAPES.length]
  const angle = (Math.random() * 60 - 30) // -30 to 30 degrees spread
  const distance = 80 + Math.random() * 120 // 80-200px travel
  const rotation = Math.random() * 720 - 360 // -360 to 360 degrees spin
  const delay = Math.random() * 0.1 // 0-100ms delay

  return {
    id: `confetti-${index}-${Date.now()}`,
    shape,
    angle,
    distance,
    rotation,
    delay,
    // Calculate end position based on angle
    endX: Math.sin((angle * Math.PI) / 180) * distance,
    endY: -Math.cos((angle * Math.PI) / 180) * distance,
  }
}

// Render a single confetti piece
function ConfettiPiece({ piece, onComplete }) {
  const { shape, endX, endY, rotation, delay } = piece

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        x: endX,
        y: endY,
        opacity: [1, 1, 0],
        scale: [0, 1, 0.8],
        rotate: rotation,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onAnimationComplete={onComplete}
    >
      {shape.type === "scrap" && (
        <div
          className={cn(
            "rounded-sm shadow-sm",
            shape.color,
            shape.width,
            shape.height
          )}
        />
      )}
      {shape.type === "dot" && (
        <div
          className={cn("rounded-full shadow-sm", shape.color, shape.size)}
        />
      )}
      {shape.type === "triangle" && (
        <div
          className={cn(
            "w-0 h-0 border-l-transparent border-r-transparent",
            shape.color,
            shape.size
          )}
        />
      )}
    </motion.div>
  )
}

/**
 * useConfetti - Hook to trigger confetti bursts
 *
 * @returns {Object} { trigger, ConfettiComponent }
 */
function useConfetti() {
  const [pieces, setPieces] = useState([])
  const reducedMotion = useReducedMotion()

  const trigger = useCallback(
    (count = 20) => {
      if (reducedMotion) return

      const newPieces = Array.from({ length: count }, (_, i) =>
        generatePiece(i)
      )
      setPieces((prev) => [...prev, ...newPieces])
    },
    [reducedMotion]
  )

  const removePiece = useCallback((id) => {
    setPieces((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const ConfettiComponent = useCallback(
    ({ className }) => (
      <div
        className={cn(
          "absolute inset-0 overflow-visible pointer-events-none z-50",
          className
        )}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence>
            {pieces.map((piece) => (
              <ConfettiPiece
                key={piece.id}
                piece={piece}
                onComplete={() => removePiece(piece.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    ),
    [pieces, removePiece]
  )

  return { trigger, ConfettiComponent }
}

/**
 * Confetti - Standalone confetti burst component
 * Triggers automatically when mounted or when `trigger` prop changes
 *
 * @param {boolean} trigger - Set to true to trigger burst
 * @param {number} count - Number of pieces (default: 20)
 * @param {Function} onComplete - Callback when animation finishes
 */
function Confetti({ trigger, count = 20, onComplete, className }) {
  const { trigger: fire, ConfettiComponent } = useConfetti()
  const reducedMotion = useReducedMotion()

  // Trigger confetti when prop changes to true
  if (trigger && !reducedMotion) {
    // Use setTimeout to avoid state update during render
    setTimeout(() => {
      fire(count)
      if (onComplete) {
        setTimeout(onComplete, 1000)
      }
    }, 0)
  }

  return <ConfettiComponent className={className} />
}

/**
 * ConfettiButton - Button wrapper that triggers confetti on click
 *
 * @param {React.ReactNode} children - Button content
 * @param {Function} onClick - Additional click handler
 * @param {number} confettiCount - Number of confetti pieces
 * @param {string} className - Additional CSS classes
 */
function ConfettiButton({
  children,
  onClick,
  confettiCount = 25,
  className,
  ...props
}) {
  const { trigger, ConfettiComponent } = useConfetti()
  const reducedMotion = useReducedMotion()

  const handleClick = useCallback(
    (e) => {
      if (!reducedMotion) {
        trigger(confettiCount)
      }
      if (onClick) {
        onClick(e)
      }
    },
    [trigger, confettiCount, onClick, reducedMotion]
  )

  return (
    <div className={cn("relative inline-block", className)}>
      <ConfettiComponent />
      <div onClick={handleClick} {...props}>
        {children}
      </div>
    </div>
  )
}

export { Confetti, ConfettiButton, useConfetti }
