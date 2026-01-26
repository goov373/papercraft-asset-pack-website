import { useEffect, useRef, useState, useMemo } from "react"
import { createNoise3D } from "simplex-noise"
import { cn } from "@/lib/utils"

/**
 * WavyBackground - Animated wave background
 *
 * Based on Aceternity UI's WavyBackground, adapted for papercraft aesthetic.
 * Uses Canvas API with simplex noise for smooth, organic wave animations.
 *
 * Papercraft treatment:
 * - Warm amber/orange wave colors
 * - Paper cream background
 * - Softer blur for organic feel
 *
 * Usage:
 * <WavyBackground>
 *   <h1>Hero Content</h1>
 * </WavyBackground>
 *
 * @see https://ui.aceternity.com/components/wavy-background
 */

function WavyBackground({
  children,
  className,
  containerClassName,
  // Warm papercraft colors by default
  colors = ["#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#fdba74"],
  waveWidth = 50,
  backgroundFill = "var(--paper-cream, #FFFBF5)",
  blur = 8,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}) {
  // Memoize noise function to avoid recreating on every render
  const noise = useMemo(() => createNoise3D(), [])
  const canvasRef = useRef(null)

  // Check for Safari once on initial render
  const [isSafari] = useState(() => {
    if (typeof window === "undefined") return false
    return navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
  })

  const getSpeed = useMemo(() => {
    return () => {
      switch (speed) {
        case "slow":
          return 0.001
        case "fast":
          return 0.003
        default:
          return 0.001
      }
    }
  }, [speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w, h, nt
    let animationId

    const init = () => {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
      nt = 0

      window.addEventListener("resize", handleResize)
    }

    const handleResize = () => {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }

    const drawWave = (n) => {
      nt += getSpeed()
      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth
        ctx.strokeStyle = colors[i % colors.length]
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100
          ctx.lineTo(x, y + h * 0.5)
        }
        ctx.stroke()
        ctx.closePath()
      }
    }

    const render = () => {
      ctx.fillStyle = backgroundFill
      ctx.globalAlpha = waveOpacity
      ctx.fillRect(0, 0, w, h)
      drawWave(5)
      animationId = requestAnimationFrame(render)
    }

    init()
    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [blur, colors, backgroundFill, waveOpacity, waveWidth, getSpeed, noise])

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        id="wavy-canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      {/* Background fill layer */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: backgroundFill }}
      />
      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}

/**
 * WavyBackgroundSimple - Static wave decoration
 *
 * A simpler, non-animated version for subtle decoration.
 */
function WavyBackgroundSimple({
  children,
  className,
  waveColor = "#fde68a",
  backgroundColor = "var(--paper-cream, #FFFBF5)",
  ...props
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor }}
      {...props}
    >
      {/* Top wave */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0L48 10C96 20 192 40 288 46.7C384 53 480 47 576 43.3C672 40 768 40 864 48.3C960 57 1056 73 1152 76.7C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
          fill={waveColor}
          fillOpacity="0.3"
        />
      </svg>
      {/* Content */}
      <div className="relative z-10">{children}</div>
      {/* Bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full rotate-180"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0L48 10C96 20 192 40 288 46.7C384 53 480 47 576 43.3C672 40 768 40 864 48.3C960 57 1056 73 1152 76.7C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
          fill={waveColor}
          fillOpacity="0.3"
        />
      </svg>
    </div>
  )
}

export { WavyBackground, WavyBackgroundSimple }
