import { useRef } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * BlurFade - Scroll-triggered blur fade animation
 *
 * Based on Magic UI's BlurFade, adapted for papercraft aesthetic.
 * Elements fade in with a blur effect when they enter the viewport.
 *
 * Papercraft treatment:
 * - Subtle, smooth animation that feels handcrafted
 * - Configurable direction and blur amount
 * - Works great for staggered content reveals
 *
 * Usage:
 * <BlurFade delay={0.1}>
 *   <Card>Content</Card>
 * </BlurFade>
 *
 * // Staggered list
 * {items.map((item, i) => (
 *   <BlurFade key={i} delay={0.1 * i} inView>
 *     <Card>{item}</Card>
 *   </BlurFade>
 * ))}
 *
 * @see https://magicui.design/docs/components/blur-fade
 */
function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "up",
  inView = true,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult

  const defaultVariants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  }

  const combinedVariants = variant || defaultVariants

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * BlurFadeStagger - Container for staggered blur fade animations
 *
 * Convenience wrapper that calculates delays for child elements.
 *
 * Usage:
 * <BlurFadeStagger staggerDelay={0.1}>
 *   <BlurFadeItem>Item 1</BlurFadeItem>
 *   <BlurFadeItem>Item 2</BlurFadeItem>
 * </BlurFadeStagger>
 */
function BlurFadeStagger({
  children,
  className,
  staggerDelay = 0.1,
  baseDelay = 0,
  ...props
}) {
  return (
    <div className={cn(className)} {...props}>
      {Array.isArray(children)
        ? children.map((child, index) =>
            child ? (
              <BlurFade
                key={index}
                delay={baseDelay + index * staggerDelay}
                inView
              >
                {child}
              </BlurFade>
            ) : null
          )
        : children}
    </div>
  )
}

export { BlurFade, BlurFadeStagger }
