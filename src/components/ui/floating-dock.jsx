import { useRef, useState } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * FloatingDock - macOS-style floating dock navigation
 *
 * Based on Aceternity UI's Floating Dock, adapted for papercraft aesthetic.
 * Icons magnify on hover with smooth spring animations.
 *
 * Papercraft treatment:
 * - Warm paper tray appearance
 * - Amber accent colors
 * - Soft elevation shadows
 *
 * Usage:
 * <FloatingDock
 *   items={[
 *     { icon: <IconHome />, label: "Home", href: "/" },
 *     { icon: <IconPalette />, label: "Gallery", href: "/gallery" },
 *   ]}
 * />
 *
 * @see https://ui.aceternity.com/components/floating-dock
 */

function FloatingDock({
  items,
  className,
  desktopClassName,
  mobileClassName,
}) {
  return (
    <>
      {/* Desktop dock */}
      <FloatingDockDesktop
        items={items}
        className={cn("hidden md:flex", desktopClassName, className)}
      />
      {/* Mobile dock */}
      <FloatingDockMobile
        items={items}
        className={cn("flex md:hidden", mobileClassName, className)}
      />
    </>
  )
}

function FloatingDockDesktop({ items, className }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-end gap-2 px-4 py-3 rounded-2xl",
        // Papercraft styling
        "bg-[var(--paper-cream,#FFFBF5)]/95",
        "backdrop-blur-md",
        "border border-border/60",
        "[box-shadow:0_4px_24px_rgba(180,83,9,0.12),0_8px_32px_rgba(180,83,9,0.08)]",
        "dark:bg-amber-950/90 dark:border-border/40",
        className
      )}
    >
      {items.map((item) => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  )
}

function DockIcon({ item, mouseX }) {
  const ref = useRef(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Size transformation based on distance
  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48])
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48])

  // Icon size inside the button
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [24, 36, 24])

  // Spring animations for smooth feel
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onClick={item.onClick}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center rounded-xl",
        // Papercraft styling
        "bg-gradient-to-b from-amber-50 to-amber-100",
        "border border-border/60",
        "[box-shadow:0_2px_4px_rgba(180,83,9,0.08)]",
        "transition-colors duration-200",
        "hover:from-amber-100 hover:to-amber-200",
        "dark:from-amber-900/50 dark:to-amber-800/50 dark:border-border/40"
      )}
    >
      {/* Icon */}
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center text-muted-foreground"
      >
        {item.icon}
      </motion.div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className={cn(
            "absolute -top-10 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap",
            "bg-amber-900 text-amber-50",
            "dark:bg-amber-100 dark:text-amber-900"
          )}
        >
          {item.label}
          {/* Arrow */}
          <div
            className={cn(
              "absolute -bottom-1 left-1/2 -translate-x-1/2",
              "w-2 h-2 rotate-45",
              "bg-amber-900 dark:bg-amber-100"
            )}
          />
        </motion.div>
      )}
    </motion.a>
  )
}

function FloatingDockMobile({ items, className }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Expanded items */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-16 right-0 flex flex-col gap-2"
        >
          {items.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                item.onClick?.(e)
                setIsOpen(false)
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.05 },
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "bg-[var(--paper-cream,#FFFBF5)]",
                "border border-border/60",
                "[box-shadow:0_2px_8px_rgba(180,83,9,0.12)]",
                "text-foreground",
                "dark:bg-amber-900/90 dark:border-border/40"
              )}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-b from-amber-400 to-amber-500",
          "border border-amber-500",
          "[box-shadow:0_4px_12px_rgba(180,83,9,0.2)]",
          "text-white",
          "dark:from-amber-600 dark:to-amber-700"
        )}
      >
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </motion.svg>
      </motion.button>
    </div>
  )
}

/**
 * FloatingDockStatic - Non-fixed version for inline use
 */
function FloatingDockStatic({ items, className }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex items-end gap-2 px-4 py-3 rounded-2xl w-fit",
        "bg-[var(--paper-cream,#FFFBF5)]",
        "border border-border/60",
        "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
        "dark:bg-amber-950/50 dark:border-border/40",
        className
      )}
    >
      {items.map((item) => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  )
}

export { FloatingDock, FloatingDockDesktop, FloatingDockMobile, FloatingDockStatic }
