import { useState, useRef, useCallback } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Card3D - 3D tilt effect card component
 *
 * Based on Aceternity UI's 3D Card Effect, adapted for papercraft aesthetic.
 * Creates an interactive 3D tilt effect on hover with perspective transforms.
 *
 * Papercraft treatment:
 * - Warm amber glare overlay
 * - Paper elevation shadows
 * - Max 15deg rotation (paper doesn't bend infinitely)
 *
 * Usage:
 * <Card3D>
 *   <Card3DContent>Your content here</Card3DContent>
 * </Card3D>
 *
 * @see https://ui.aceternity.com/components/3d-card-effect
 */

function Card3D({
  children,
  className,
  containerClassName,
  rotationIntensity = 15,
  glare = true,
  glareOpacity = 0.15,
  scale = 1.02,
  borderRadius = "1rem",
}) {
  const containerRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Calculate rotation (inverted for natural feel)
      const rotateXValue = (mouseY / (rect.height / 2)) * -rotationIntensity
      const rotateYValue = (mouseX / (rect.width / 2)) * rotationIntensity

      setRotateX(rotateXValue)
      setRotateY(rotateYValue)

      // Calculate glare position (0-100%)
      const glareX = ((e.clientX - rect.left) / rect.width) * 100
      const glareY = ((e.clientY - rect.top) / rect.height) * 100
      setGlarePosition({ x: glareX, y: glareY })
    },
    [rotationIntensity]
  )

  const handleMouseLeave = useCallback(() => {
    setRotateX(0)
    setRotateY(0)
    setGlarePosition({ x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          "relative w-full h-full",
          // Papercraft styling
          "bg-[var(--paper-cream,#FFFBF5)]",
          "border border-border/60",
          "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
          "dark:bg-card/50 dark:border-border/40",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          borderRadius,
        }}
        animate={{
          rotateX,
          rotateY,
          scale: rotateX !== 0 || rotateY !== 0 ? scale : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        whileHover={{
          boxShadow:
            "0 8px 16px rgba(180, 83, 9, 0.1), 0 16px 32px rgba(180, 83, 9, 0.08)",
        }}
      >
        {/* Content */}
        {children}

        {/* Glare overlay */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ borderRadius }}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(253, 230, 138, ${glareOpacity}), transparent 50%)`,
                opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

/**
 * Card3DContent - Content wrapper for Card3D
 *
 * Adds 3D transform depth to child elements.
 */
function Card3DContent({
  children,
  className,
  translateZ = 50,
  ...props
}) {
  return (
    <div
      className={cn("relative p-6", className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card3DItem - Individual item with 3D depth
 *
 * For elements that should have their own depth level.
 */
function Card3DItem({
  children,
  className,
  translateZ = 20,
  // eslint-disable-next-line no-unused-vars -- Tag is used as JSX element
  as: Tag = "div",
  ...props
}) {
  return (
    <Tag
      className={cn(className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * Card3DSimple - Simpler version with less configuration
 *
 * For quick 3D effects without fine-tuning.
 */
function Card3DSimple({ children, className }) {
  return (
    <Card3D className={className}>
      <Card3DContent>{children}</Card3DContent>
    </Card3D>
  )
}

export { Card3D, Card3DContent, Card3DItem, Card3DSimple }
