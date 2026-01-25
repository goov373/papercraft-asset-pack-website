import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Compare - Image comparison slider component
 *
 * Based on Aceternity UI's Compare, adapted for papercraft aesthetic.
 * Allows before/after image comparison with drag or hover interaction.
 *
 * Papercraft treatment:
 * - Warm amber handle bar
 * - Paper-like border styling
 * - Soft shadows
 *
 * Usage:
 * <Compare
 *   firstImage="/before.jpg"
 *   secondImage="/after.jpg"
 *   slideMode="drag"
 * />
 *
 * @see https://ui.aceternity.com/components/compare
 */

function Compare({
  firstImage,
  secondImage,
  className,
  firstImageClassName,
  secondImageClassName,
  initialSliderPercentage = 50,
  slideMode = "hover", // "hover" | "drag"
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}) {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const autoplayRef = useRef(null)

  // Calculate slider position based on mouse/touch position
  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderXPercent(percent)
  }, [])

  // Mouse handlers for drag mode
  const handleMouseDown = (e) => {
    if (slideMode !== "drag") return
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }

  const handleMouseMove = useCallback(
    (e) => {
      if (slideMode === "drag" && !isDragging) return
      if (slideMode === "hover" || isDragging) {
        updateSliderPosition(e.clientX)
      }
    },
    [slideMode, isDragging, updateSliderPosition]
  )

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage)
    }
    setIsDragging(false)
  }

  // Touch handlers
  const handleTouchStart = (e) => {
    if (slideMode !== "drag") return
    setIsDragging(true)
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging && slideMode === "drag") return
      updateSliderPosition(e.touches[0].clientX)
    },
    [isDragging, slideMode, updateSliderPosition]
  )

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return

    const animate = () => {
      setSliderXPercent((prev) => {
        // Oscillate between 20% and 80%
        const direction = prev <= 20 ? 1 : prev >= 80 ? -1 : Math.random() > 0.5 ? 1 : -1
        return prev + direction * 0.5
      })
    }

    autoplayRef.current = setInterval(animate, autoplayDuration / 120)
    return () => clearInterval(autoplayRef.current)
  }, [autoplay, autoplayDuration])

  // Global mouse up listener for drag mode
  useEffect(() => {
    if (slideMode !== "drag") return

    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener("mouseup", handleGlobalMouseUp)
    window.addEventListener("touchend", handleGlobalMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
      window.removeEventListener("touchend", handleGlobalMouseUp)
    }
  }, [slideMode])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[400px] overflow-hidden rounded-xl",
        // Papercraft border styling
        "border-2 border-border/60",
        "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
        slideMode === "drag" ? "cursor-ew-resize" : "cursor-col-resize",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Second image (right side / "after") - Full width, shown through clip */}
      <div className="absolute inset-0">
        <img
          src={secondImage}
          alt="After"
          className={cn(
            "w-full h-full object-cover select-none pointer-events-none",
            secondImageClassName
          )}
          draggable={false}
        />
      </div>

      {/* First image (left side / "before") - Clipped */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
        }}
      >
        <img
          src={firstImage}
          alt="Before"
          className={cn(
            "w-full h-full object-cover select-none pointer-events-none",
            firstImageClassName
          )}
          draggable={false}
        />
      </motion.div>

      {/* Slider handle */}
      <AnimatePresence>
        {showHandlebar && (
          <motion.div
            className="absolute top-0 bottom-0 w-1 -ml-0.5 z-30"
            style={{
              left: `${sliderXPercent}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Vertical line */}
            <div className="absolute inset-0 bg-amber-500 shadow-lg" />

            {/* Handle knob */}
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-10 h-10 rounded-full",
                "bg-gradient-to-b from-amber-400 to-amber-500",
                "border-2 border-white",
                "[box-shadow:0_2px_8px_rgba(180,83,9,0.3),0_4px_16px_rgba(180,83,9,0.2)]",
                "flex items-center justify-center"
              )}
            >
              {/* Arrows icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-white"
              >
                <path
                  d="M6 10L3 7M3 7L6 4M3 7H9M14 10L17 13M17 13L14 16M17 13H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20">
        <span className="px-2 py-1 text-xs font-medium text-foreground bg-white/90 rounded-md shadow-sm">
          Before
        </span>
      </div>
      <div className="absolute bottom-4 right-4 z-20">
        <span className="px-2 py-1 text-xs font-medium text-foreground bg-white/90 rounded-md shadow-sm">
          After
        </span>
      </div>
    </div>
  )
}

/**
 * CompareSimple - Simpler side-by-side comparison
 *
 * For static before/after comparison without slider.
 */
function CompareSimple({
  firstImage,
  secondImage,
  firstLabel = "Before",
  secondLabel = "After",
  className,
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <div className="relative">
        <img
          src={firstImage}
          alt={firstLabel}
          className="w-full h-full object-cover rounded-lg border border-border/60"
        />
        <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-medium text-foreground bg-white/90 rounded-md">
          {firstLabel}
        </span>
      </div>
      <div className="relative">
        <img
          src={secondImage}
          alt={secondLabel}
          className="w-full h-full object-cover rounded-lg border border-border/60"
        />
        <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-medium text-foreground bg-white/90 rounded-md">
          {secondLabel}
        </span>
      </div>
    </div>
  )
}

export { Compare, CompareSimple }
