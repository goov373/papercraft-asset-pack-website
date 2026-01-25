import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Spotlight - Animated spotlight background effect
 *
 * Based on Aceternity UI's Spotlight, adapted for papercraft aesthetic.
 * Creates a warm, moving spotlight effect perfect for hero sections.
 *
 * Papercraft treatment:
 * - Warm amber/orange glow instead of white
 * - Subtle lampshade/paper lantern effect
 * - Softer opacity (0.15-0.3)
 *
 * Usage:
 * <Spotlight className="h-screen">
 *   <h1>Hero Content</h1>
 * </Spotlight>
 *
 * @see https://ui.aceternity.com/components/spotlight
 */

function Spotlight({
  children,
  className,
  containerClassName,
  fill = "#fcd34d", // amber-300 default
  size = 400,
  duration = 4,
  delay = 0,
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-[var(--paper-cream,#FFFBF5)]",
        containerClassName
      )}
    >
      {/* Spotlight SVG */}
      <SpotlightBeam
        fill={fill}
        size={size}
        duration={duration}
        delay={delay}
      />

      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}

/**
 * SpotlightBeam - The animated spotlight element
 */
function SpotlightBeam({
  fill = "#fcd34d",
  size = 400,
  duration = 4,
  delay = 0,
  className,
}) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: ["0%", "100%", "50%", "0%"],
      y: ["0%", "30%", "60%", "0%"],
      opacity: [0.2, 0.3, 0.25, 0.2],
      transition: {
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    })
  }, [controls, duration, delay])

  return (
    <motion.div
      className={cn("pointer-events-none absolute -top-40 -left-40 z-0", className)}
      animate={controls}
    >
      <svg
        width={size * 2}
        height={size * 2}
        viewBox={`0 0 ${size * 2} ${size * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="spotlight-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.4" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.15" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx={size}
          cy={size}
          rx={size}
          ry={size * 0.6}
          fill="url(#spotlight-gradient)"
        />
      </svg>
    </motion.div>
  )
}

/**
 * SpotlightBackground - Standalone spotlight without container
 *
 * For adding to existing containers.
 */
function SpotlightBackground({
  fill = "#fcd34d",
  size = 400,
  duration = 4,
  delay = 0,
  className,
  position = "top-left", // top-left | top-right | bottom-left | bottom-right | center
}) {
  const positionClasses = {
    "top-left": "-top-40 -left-40",
    "top-right": "-top-40 -right-40",
    "bottom-left": "-bottom-40 -left-40",
    "bottom-right": "-bottom-40 -right-40",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  return (
    <SpotlightBeam
      fill={fill}
      size={size}
      duration={duration}
      delay={delay}
      className={cn(positionClasses[position], className)}
    />
  )
}

/**
 * MultiSpotlight - Multiple spotlights for dramatic effect
 */
function MultiSpotlight({
  children,
  className,
  containerClassName,
  spotlights = [
    { fill: "#fcd34d", size: 400, position: "top-left", delay: 0 },
    { fill: "#fdba74", size: 300, position: "top-right", delay: 1 },
    { fill: "#fde68a", size: 350, position: "bottom-left", delay: 2 },
  ],
  duration = 5,
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-[var(--paper-cream,#FFFBF5)]",
        containerClassName
      )}
    >
      {/* Multiple spotlights */}
      {spotlights.map((spotlight, index) => (
        <SpotlightBackground
          key={index}
          fill={spotlight.fill}
          size={spotlight.size}
          position={spotlight.position}
          duration={duration}
          delay={spotlight.delay}
        />
      ))}

      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}

/**
 * SpotlightCard - Card with spotlight hover effect
 *
 * Spotlight appears on hover.
 */
function SpotlightCard({
  children,
  className,
  fill = "#fcd34d",
  size = 200,
}) {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-[var(--paper-cream,#FFFBF5)]",
        "border border-border/60",
        "[box-shadow:var(--paper-elevation-1,0_1px_2px_rgba(180,83,9,0.05),0_2px_4px_rgba(180,83,9,0.05))]",
        "transition-shadow duration-300",
        "hover:[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
        "dark:bg-amber-950/50 dark:border-border/40",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight that follows cursor */}
      <div
        className="pointer-events-none absolute z-0 transition-opacity duration-300"
        style={{
          left: mousePosition.x - size / 2,
          top: mousePosition.y - size / 2,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${fill}40 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export {
  Spotlight,
  SpotlightBeam,
  SpotlightBackground,
  MultiSpotlight,
  SpotlightCard,
}
