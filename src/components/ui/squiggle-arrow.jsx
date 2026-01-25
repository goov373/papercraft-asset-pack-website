import { cn } from "@/lib/utils"

/**
 * SquiggleArrow - Hand-drawn style arrow component
 *
 * Based on Cult UI's SquigglyArrow, adapted for papercraft aesthetic.
 * Uses SVG Bezier curves to create organic, hand-drawn looking arrows.
 *
 * Papercraft treatment:
 * - Default warm amber color
 * - Slightly thicker stroke for craft feel
 * - Three variants: wavy, bouncy, smooth
 *
 * Usage:
 * <SquiggleArrow variant="wavy" direction="right" />
 * <SquiggleArrow variant="bouncy" className="text-orange-500" />
 *
 * @see https://www.cult-ui.com/docs/components/squiggle-arrow
 */

const paths = {
  wavy: {
    body: "M 15 50 Q 35 35, 55 48 T 95 52 Q 115 48, 135 50 Q 145 52, 155 48",
    head: "M 155 48 Q 147 44, 143 42 M 155 48 Q 148 53, 144 56",
  },
  bouncy: {
    body: "M 15 50 Q 45 32, 65 50 Q 85 68, 105 50 Q 125 32, 145 50 Q 152 54, 158 50",
    head: "M 158 50 Q 149 45, 145 43 M 158 50 Q 150 56, 146 59",
  },
  smooth: {
    body: "M 15 50 Q 60 38, 100 48 Q 135 56, 158 50",
    head: "M 158 50 Q 149 45, 145 43 M 158 50 Q 150 56, 146 59",
  },
}

const rotations = {
  right: "rotate(0)",
  left: "rotate(180 100 50)",
  down: "rotate(90 100 50)",
  up: "rotate(-90 100 50)",
}

function SquiggleArrow({
  width = 200,
  height = 100,
  strokeWidth = 3,
  className,
  direction = "right",
  variant = "wavy",
  ...props
}) {
  const selectedPath = paths[variant] || paths.wavy
  const rotation = rotations[direction] || rotations.right

  return (
    <svg
      width={width}
      height={height}
      viewBox="-10 -10 220 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        // Default to warm amber color
        "text-primary",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <title>Hand-drawn arrow</title>
      <g transform={rotation}>
        {/* Arrow body */}
        <path
          d={selectedPath.body}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow head */}
        <path
          d={selectedPath.head}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

/**
 * SquiggleUnderline - Hand-drawn underline decoration
 *
 * A simpler variant for underlining text or elements.
 */
function SquiggleUnderline({
  width = 150,
  height = 20,
  strokeWidth = 2.5,
  className,
  variant = "wavy",
  ...props
}) {
  const underlinePaths = {
    wavy: "M 5 10 Q 20 5, 35 10 T 65 10 Q 80 5, 95 10 T 125 10 Q 140 5, 145 10",
    bouncy: "M 5 10 Q 25 2, 45 10 Q 65 18, 85 10 Q 105 2, 125 10 Q 140 15, 145 10",
    smooth: "M 5 10 Q 75 5, 145 10",
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-amber-500", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d={underlinePaths[variant] || underlinePaths.wavy}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * SquiggleCircle - Hand-drawn circle decoration
 *
 * For circling or highlighting content.
 */
function SquiggleCircle({
  size = 100,
  strokeWidth = 2.5,
  className,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-amber-500", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M 50 5 Q 85 8, 92 50 Q 88 85, 50 95 Q 15 92, 8 50 Q 12 15, 50 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export { SquiggleArrow, SquiggleUnderline, SquiggleCircle }
