import { useState, useRef, useEffect } from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * DirectionAwareTabs - Tabs with direction-aware sliding indicator
 *
 * Based on Cult UI's Direction Aware Tabs, adapted for papercraft aesthetic.
 * The active indicator slides left or right based on which tab is selected.
 *
 * Papercraft treatment:
 * - Warm amber sliding indicator
 * - Paper card container styling
 * - Subtle elevation on active tab
 *
 * Usage:
 * <DirectionAwareTabs defaultValue="tab1">
 *   <DirectionAwareTabsList>
 *     <DirectionAwareTabsTrigger value="tab1">Tab 1</DirectionAwareTabsTrigger>
 *     <DirectionAwareTabsTrigger value="tab2">Tab 2</DirectionAwareTabsTrigger>
 *   </DirectionAwareTabsList>
 *   <DirectionAwareTabsContent value="tab1">Content 1</DirectionAwareTabsContent>
 * </DirectionAwareTabs>
 *
 * @see https://www.cult-ui.com/docs/components/direction-aware-tabs
 */

const DirectionAwareTabs = TabsPrimitive.Root

function DirectionAwareTabsList({
  children,
  className,
  ...props
}) {
  const [activeTab, setActiveTab] = useState(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const [direction, setDirection] = useState(0) // -1 left, 0 none, 1 right
  const tabsRef = useRef(null)
  const previousIndex = useRef(-1)

  // Track active tab and calculate indicator position
  useEffect(() => {
    if (!tabsRef.current) return

    const observer = new MutationObserver(() => {
      const activeElement = tabsRef.current?.querySelector('[data-state="active"]')
      if (activeElement) {
        const tabElements = Array.from(tabsRef.current.querySelectorAll('[role="tab"]'))
        const currentIndex = tabElements.indexOf(activeElement)

        // Determine direction
        if (previousIndex.current !== -1 && previousIndex.current !== currentIndex) {
          setDirection(currentIndex > previousIndex.current ? 1 : -1)
        }
        previousIndex.current = currentIndex

        // Set indicator position
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        })
        setActiveTab(activeElement.getAttribute("data-value"))
      }
    })

    observer.observe(tabsRef.current, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
    })

    // Initial position
    const activeElement = tabsRef.current?.querySelector('[data-state="active"]')
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <TabsPrimitive.List
      ref={tabsRef}
      className={cn(
        "relative inline-flex items-center gap-1 p-1 rounded-lg",
        // Papercraft styling
        "bg-amber-100/50",
        "border border-border/60",
        "[box-shadow:inset_0_1px_2px_rgba(180,83,9,0.05)]",
        "dark:bg-amber-900/20 dark:border-border/40",
        className
      )}
      {...props}
    >
      {/* Sliding indicator */}
      <motion.div
        className={cn(
          "absolute top-1 bottom-1 rounded-md z-0",
          "bg-white",
          "border border-border/60",
          "[box-shadow:0_1px_3px_rgba(180,83,9,0.08)]",
          "dark:bg-amber-800/40 dark:border-border/40"
        )}
        initial={false}
        animate={{
          left: indicatorStyle.left || 0,
          width: indicatorStyle.width || 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
      />

      {children}
    </TabsPrimitive.List>
  )
}

function DirectionAwareTabsTrigger({
  children,
  className,
  value,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      data-value={value}
      className={cn(
        "relative z-10 px-4 py-2 text-sm font-medium rounded-md",
        "text-muted-foreground transition-colors duration-200",
        // Active state
        "data-[state=active]:text-foreground",
        // Hover state
        "hover:text-foreground",
        // Focus state
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

function DirectionAwareTabsContent({
  children,
  className,
  value,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn(
        "mt-4 rounded-lg",
        // Papercraft styling
        "bg-[var(--paper-cream,#FFFBF5)]",
        "border border-border/60",
        "[box-shadow:var(--paper-elevation-1,0_1px_2px_rgba(180,83,9,0.05),0_2px_4px_rgba(180,83,9,0.05))]",
        "p-4",
        // Animation
        "data-[state=inactive]:hidden",
        "dark:bg-amber-950/30 dark:border-border/40",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TabsPrimitive.Content>
  )
}

/**
 * DirectionAwareTabsSimple - Simpler API with array of tabs
 */
function DirectionAwareTabsSimple({
  tabs,
  defaultValue,
  className,
  ...props
}) {
  const defaultTab = defaultValue || tabs[0]?.value

  return (
    <DirectionAwareTabs defaultValue={defaultTab} className={className} {...props}>
      <DirectionAwareTabsList>
        {tabs.map((tab) => (
          <DirectionAwareTabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </DirectionAwareTabsTrigger>
        ))}
      </DirectionAwareTabsList>
      {tabs.map((tab) => (
        <DirectionAwareTabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </DirectionAwareTabsContent>
      ))}
    </DirectionAwareTabs>
  )
}

export {
  DirectionAwareTabs,
  DirectionAwareTabsList,
  DirectionAwareTabsTrigger,
  DirectionAwareTabsContent,
  DirectionAwareTabsSimple,
}
