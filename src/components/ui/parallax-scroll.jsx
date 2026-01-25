import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * ParallaxScroll - Two-column parallax scrolling effect
 *
 * Based on Aceternity UI's Parallax Scroll, adapted for papercraft aesthetic.
 * Creates a visually striking effect where columns scroll in opposite directions.
 *
 * Papercraft treatment:
 * - Paper card items with amber borders
 * - Warm elevation shadows
 * - Smooth scroll physics
 *
 * Usage:
 * <ParallaxScroll
 *   items={[
 *     { id: 1, content: <div>Item 1</div> },
 *     { id: 2, content: <div>Item 2</div> },
 *   ]}
 * />
 *
 * @see https://ui.aceternity.com/components/parallax-scroll
 */

function ParallaxScroll({
  items,
  className,
  speed = 1,
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Split items into two columns
  const firstColumn = items.filter((_, i) => i % 2 === 0)
  const secondColumn = items.filter((_, i) => i % 2 === 1)

  // Opposite scroll transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200 * speed])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200 * speed])

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[200vh]", className)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex gap-4 h-full items-center justify-center p-4">
          {/* First column - scrolls up */}
          <motion.div
            style={{ y: y1 }}
            className="flex flex-col gap-4"
          >
            {firstColumn.map((item) => (
              <ParallaxItem key={item.id}>
                {item.content}
              </ParallaxItem>
            ))}
          </motion.div>

          {/* Second column - scrolls down */}
          <motion.div
            style={{ y: y2 }}
            className="flex flex-col gap-4"
          >
            {secondColumn.map((item) => (
              <ParallaxItem key={item.id}>
                {item.content}
              </ParallaxItem>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/**
 * ParallaxItem - Individual item in the parallax scroll
 */
function ParallaxItem({ children, className }) {
  return (
    <div
      className={cn(
        "w-64 md:w-80 rounded-xl overflow-hidden",
        // Papercraft styling
        "bg-[var(--paper-cream,#FFFBF5)]",
        "border border-border/60",
        "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
        "dark:bg-amber-950/50 dark:border-border/40",
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * ParallaxScrollImages - Image-focused parallax scroll
 */
function ParallaxScrollImages({
  images,
  className,
  speed = 1,
}) {
  const items = images.map((src, i) => ({
    id: i,
    content: (
      <img
        src={src}
        alt={`Parallax image ${i + 1}`}
        className="w-full h-48 md:h-64 object-cover"
      />
    ),
  }))

  return <ParallaxScroll items={items} className={className} speed={speed} />
}

/**
 * ParallaxScrollThreeColumn - Three column variant
 */
function ParallaxScrollThreeColumn({
  items,
  className,
  speed = 1,
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Split items into three columns
  const firstColumn = items.filter((_, i) => i % 3 === 0)
  const secondColumn = items.filter((_, i) => i % 3 === 1)
  const thirdColumn = items.filter((_, i) => i % 3 === 2)

  // Different scroll transforms for each column
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150 * speed])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100 * speed])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200 * speed])

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[250vh]", className)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex gap-4 h-full items-center justify-center p-4">
          <motion.div style={{ y: y1 }} className="flex flex-col gap-4">
            {firstColumn.map((item) => (
              <ParallaxItem key={item.id}>{item.content}</ParallaxItem>
            ))}
          </motion.div>

          <motion.div style={{ y: y2 }} className="flex flex-col gap-4">
            {secondColumn.map((item) => (
              <ParallaxItem key={item.id}>{item.content}</ParallaxItem>
            ))}
          </motion.div>

          <motion.div style={{ y: y3 }} className="flex flex-col gap-4 hidden md:flex">
            {thirdColumn.map((item) => (
              <ParallaxItem key={item.id}>{item.content}</ParallaxItem>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/**
 * ParallaxScrollSimple - Simplified single-column parallax
 */
function ParallaxScrollSimple({
  children,
  className,
  speed = 0.5,
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * ParallaxCard - Card with parallax background
 */
function ParallaxCard({
  children,
  backgroundImage,
  className,
  speed = 0.3,
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "border border-border/60",
        "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
        "dark:border-border/40",
        className
      )}
    >
      {/* Parallax background */}
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-10 -bottom-10"
        >
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 to-transparent" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export {
  ParallaxScroll,
  ParallaxItem,
  ParallaxScrollImages,
  ParallaxScrollThreeColumn,
  ParallaxScrollSimple,
  ParallaxCard,
}
