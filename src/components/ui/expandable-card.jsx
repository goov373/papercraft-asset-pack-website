import { useState, useId } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion, AnimatePresence } from "framer-motion"
import useMeasure from "react-use-measure"
import { cn } from "@/lib/utils"

/**
 * ExpandableCard - Cards that expand to reveal more content
 *
 * Based on Cult UI's Expandable Cards, adapted for papercraft aesthetic.
 * Click to expand card to full view with smooth animations.
 *
 * Papercraft treatment:
 * - Paper card styling
 * - Tissue paper overlay backdrop
 * - Pop-up book animation feel
 *
 * Usage:
 * <ExpandableCards>
 *   <ExpandableCard
 *     title="Asset Pack"
 *     thumbnail="/thumb.jpg"
 *     description="Brief preview"
 *   >
 *     <div>Full expanded content...</div>
 *   </ExpandableCard>
 * </ExpandableCards>
 *
 * @see https://www.cult-ui.com/docs/components/expandable
 */

function ExpandableCards({ children, className }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <ExpandableCardsContext.Provider value={{ expandedId, setExpandedId }}>
      <div className={cn("relative", className)}>
        {children}

        {/* Backdrop overlay */}
        <AnimatePresence>
          {expandedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className={cn(
                "fixed inset-0 z-40",
                // Tissue paper overlay effect
                "bg-amber-950/20 backdrop-blur-sm"
              )}
            />
          )}
        </AnimatePresence>
      </div>
    </ExpandableCardsContext.Provider>
  )
}

// Context for managing expanded state
import { createContext, useContext } from "react"
const ExpandableCardsContext = createContext({
  expandedId: null,
  setExpandedId: () => {},
})

function ExpandableCard({
  children,
  title,
  description,
  thumbnail,
  className,
}) {
  const id = useId()
  const { expandedId, setExpandedId } = useContext(ExpandableCardsContext)
  const isExpanded = expandedId === id
  const [ref, _bounds] = useMeasure()

  const handleToggle = () => {
    setExpandedId(isExpanded ? null : id)
  }

  return (
    <>
      {/* Collapsed card */}
      <motion.div
        ref={ref}
        layoutId={`card-${id}`}
        onClick={handleToggle}
        className={cn(
          "relative cursor-pointer rounded-xl overflow-hidden",
          // Papercraft styling
          "bg-[var(--paper-cream,#FFFBF5)]",
          "border border-border/60",
          "[box-shadow:var(--paper-elevation-1,0_1px_2px_rgba(180,83,9,0.05),0_2px_4px_rgba(180,83,9,0.05))]",
          "transition-shadow duration-300",
          "hover:[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
          "dark:bg-amber-950/50 dark:border-border/40",
          isExpanded && "invisible",
          className
        )}
      >
        {/* Thumbnail */}
        {thumbnail && (
          <motion.div layoutId={`image-${id}`} className="aspect-video">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Card content */}
        <div className="p-4">
          <motion.h3
            layoutId={`title-${id}`}
            className="font-semibold text-foreground"
          >
            {title}
          </motion.h3>
          {description && (
            <motion.p
              layoutId={`description-${id}`}
              className="text-sm text-muted-foreground mt-1"
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Expanded card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layoutId={`card-${id}`}
            className={cn(
              "fixed z-50 overflow-hidden rounded-xl",
              // Papercraft styling
              "bg-[var(--paper-cream,#FFFBF5)]",
              "border border-border/60",
              "[box-shadow:0_8px_32px_rgba(180,83,9,0.15),0_16px_48px_rgba(180,83,9,0.1)]",
              "dark:bg-amber-950 dark:border-border/40",
              // Positioning
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto"
            )}
          >
            {/* Close button */}
            <button
              onClick={handleToggle}
              className={cn(
                "absolute top-4 right-4 z-10",
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-amber-100 hover:bg-amber-200",
                "text-muted-foreground",
                "transition-colors duration-200",
                "dark:bg-amber-800 dark:hover:bg-amber-700"
              )}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="12" y2="12" />
                <line x1="12" y1="4" x2="4" y2="12" />
              </svg>
            </button>

            {/* Thumbnail */}
            {thumbnail && (
              <motion.div layoutId={`image-${id}`} className="aspect-video">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Header content */}
            <div className="p-6 border-b border-border/40 dark:border-border/40">
              <motion.h3
                layoutId={`title-${id}`}
                className="text-xl font-semibold text-foreground"
              >
                {title}
              </motion.h3>
              {description && (
                <motion.p
                  layoutId={`description-${id}`}
                  className="text-muted-foreground mt-1"
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Expanded content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="p-6"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * ExpandableCardSimple - Simpler inline expand (no overlay)
 */
function ExpandableCardSimple({
  children,
  title,
  preview,
  className,
  defaultExpanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [ref, _bounds] = useMeasure()

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-[var(--paper-cream,#FFFBF5)]",
        "border border-border/60",
        "[box-shadow:var(--paper-elevation-1,0_1px_2px_rgba(180,83,9,0.05),0_2px_4px_rgba(180,83,9,0.05))]",
        "dark:bg-amber-950/50 dark:border-border/40",
        className
      )}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full p-4 flex items-center justify-between",
          "text-left",
          "hover:bg-amber-50/50 dark:hover:bg-amber-900/30",
          "transition-colors duration-200"
        )}
      >
        <div>
          <h3 className="font-semibold text-foreground">
            {title}
          </h3>
          {!isExpanded && preview && (
            <p className="text-sm text-muted-foreground mt-1">
              {preview}
            </p>
          )}
        </div>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground flex-shrink-0"
        >
          <polyline points="6 8 10 12 14 8" />
        </motion.svg>
      </button>

      {/* Expandable content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div ref={ref} className="p-4 pt-0 border-t border-border/40 dark:border-border/40">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ExpandableCardGrid - Grid of expandable cards
 */
function ExpandableCardGrid({ children, className }) {
  return (
    <ExpandableCards className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {children}
    </ExpandableCards>
  )
}

export {
  ExpandableCards,
  ExpandableCard,
  ExpandableCardSimple,
  ExpandableCardGrid,
}
