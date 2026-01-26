import { useRef, useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Timeline - Scroll-based vertical timeline component
 *
 * Based on Aceternity UI's Timeline, adapted for papercraft aesthetic.
 * Creates a vertical timeline with scroll-triggered animations.
 *
 * Papercraft treatment:
 * - Amber accent line
 * - Paper card entries
 * - Warm typography colors
 *
 * Usage:
 * const data = [
 *   { title: "2024", content: <div>Content here</div> },
 *   { title: "2023", content: <div>More content</div> },
 * ]
 * <Timeline data={data} />
 *
 * @see https://ui.aceternity.com/components/timeline
 */

function Timeline({ data, className }) {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      ref={containerRef}
      className={cn("w-full font-sans", className)}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left side - Sticky title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline dot */}
              <div
                className={cn(
                  "h-10 w-10 absolute left-3 md:left-3 rounded-full flex items-center justify-center",
                  "bg-gradient-to-b from-amber-100 to-amber-200",
                  "border-2 border-amber-300",
                  "[box-shadow:0_2px_8px_rgba(180,83,9,0.15)]"
                )}
              >
                <div className="h-4 w-4 rounded-full bg-amber-500" />
              </div>
              {/* Title */}
              <h3
                className={cn(
                  "hidden md:block text-xl md:pl-20 md:text-4xl font-bold",
                  "text-foreground"
                )}
              >
                {item.title}
              </h3>
            </div>

            {/* Right side - Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Mobile title */}
              <h3
                className={cn(
                  "md:hidden block text-2xl mb-4 text-left font-bold",
                  "text-foreground"
                )}
              >
                {item.title}
              </h3>
              {/* Content card */}
              <div
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[var(--paper-cream,#FFFBF5)]",
                  "border border-border/60",
                  "[box-shadow:var(--paper-elevation-1,0_1px_2px_rgba(180,83,9,0.05),0_2px_4px_rgba(180,83,9,0.05))]",
                  "dark:bg-amber-950/30 dark:border-border/40"
                )}
              >
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Timeline line background */}
        <div
          style={{ height: height + "px" }}
          className={cn(
            "absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]",
            "bg-gradient-to-b from-transparent via-amber-200 to-transparent",
            "dark:via-amber-800"
          )}
        >
          {/* Animated progress line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={cn(
              "absolute inset-x-0 top-0 w-[2px]",
              "bg-gradient-to-t from-amber-500 via-amber-400 to-transparent",
              "rounded-full"
            )}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * TimelineSimple - Non-scroll version for simpler use cases
 *
 * Static timeline without scroll animations.
 */
function TimelineSimple({ data, className }) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-200 dark:bg-amber-800" />

      {/* Timeline items */}
      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Dot */}
            <div
              className={cn(
                "absolute left-0 top-1 w-8 h-8 rounded-full",
                "bg-gradient-to-b from-amber-100 to-amber-200",
                "border-2 border-amber-300",
                "flex items-center justify-center",
                "[box-shadow:0_2px_4px_rgba(180,83,9,0.1)]"
              )}
            >
              <div className="w-3 h-3 rounded-full bg-amber-500" />
            </div>

            {/* Content */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h4>
              <div
                className={cn(
                  "p-4 rounded-lg",
                  "bg-[var(--paper-cream,#FFFBF5)]",
                  "border border-border/60",
                  "dark:bg-amber-950/30 dark:border-border/40"
                )}
              >
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * TimelineHorizontal - Horizontal timeline variant
 *
 * For displaying events in a horizontal flow.
 */
function TimelineHorizontal({ data, className }) {
  return (
    <div className={cn("relative", className)}>
      {/* Horizontal line */}
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-amber-200 dark:bg-amber-800" />

      {/* Timeline items */}
      <div className="flex gap-8 overflow-x-auto pb-4">
        {data.map((item, index) => (
          <div key={index} className="relative flex-shrink-0 pt-10 w-64">
            {/* Dot */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 rounded-full",
                "bg-gradient-to-b from-amber-100 to-amber-200",
                "border-2 border-amber-300",
                "flex items-center justify-center",
                "[box-shadow:0_2px_4px_rgba(180,83,9,0.1)]"
              )}
            >
              <div className="w-3 h-3 rounded-full bg-amber-500" />
            </div>

            {/* Content */}
            <div
              className={cn(
                "p-4 rounded-lg text-center",
                "bg-[var(--paper-cream,#FFFBF5)]",
                "border border-border/60",
                "dark:bg-amber-950/30 dark:border-border/40"
              )}
            >
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h4>
              <div className="text-sm text-muted-foreground">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Timeline, TimelineSimple, TimelineHorizontal }
