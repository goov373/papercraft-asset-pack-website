import { useEffect, useId, useRef, useState, useMemo } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * DotPattern - Papercraft dot pattern background
 *
 * Based on Magic UI's DotPattern, adapted for papercraft aesthetic.
 * Creates a subtle dot pattern background that looks like perforated paper.
 *
 * Papercraft treatment:
 * - Warm amber dot color by default
 * - Subtle opacity for paper-like feel
 * - Optional glow effect for emphasis
 *
 * Usage:
 * // Basic usage - subtle background
 * <div className="relative">
 *   <DotPattern className="opacity-30" />
 *   <Content />
 * </div>
 *
 * // With glowing effect
 * <DotPattern glow className="opacity-50" />
 *
 * @see https://magicui.design/docs/components/dot-pattern
 */
function DotPattern({
  width = 16,
  height = 16,
  // eslint-disable-next-line no-unused-vars
  x: _x = 0,
  // eslint-disable-next-line no-unused-vars
  y: _y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}) {
  const id = useId()
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Generate pseudo-random but stable values based on index using a simple hash
  const getStableRandomValue = (index, seed) => {
    const hash = ((index * 2654435761) ^ seed) >>> 0
    return (hash % 1000) / 1000
  }

  // Memoize dots to avoid recalculating on every render
  const dots = useMemo(() => {
    const numCols = Math.ceil(dimensions.width / width) || 1
    const numRows = Math.ceil(dimensions.height / height) || 1
    const totalDots = numCols * numRows

    return Array.from({ length: totalDots }, (_, i) => {
      const col = i % numCols
      const row = Math.floor(i / numCols)

      // Use deterministic pseudo-random values based on index
      const delay = getStableRandomValue(i, 12345) * 5
      const duration = getStableRandomValue(i, 67890) * 3 + 2

      return {
        x: col * width + cx,
        y: row * height + cy,
        delay,
        duration,
      }
    })
  }, [dimensions.width, dimensions.height, width, height, cx, cy])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        // Warm amber color for papercraft aesthetic
        "text-amber-400/60",
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <motion.circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : "currentColor"}
          initial={glow ? { opacity: 0.4, scale: 1 } : {}}
          animate={
            glow
              ? {
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1],
                }
              : {}
          }
          transition={
            glow
              ? {
                  duration: dot.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: dot.delay,
                  ease: "easeInOut",
                }
              : {}
          }
        />
      ))}
    </svg>
  )
}

/**
 * GridPattern - Papercraft grid pattern background
 *
 * Creates a subtle grid pattern that looks like graph paper or a cutting mat.
 */
function GridPattern({
  width = 40,
  height = 40,
  className,
  strokeWidth = 1,
  ...props
}) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        "stroke-amber-300/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export { DotPattern, GridPattern }
