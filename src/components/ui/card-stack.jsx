import { useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * CardStack - Stacked card carousel component
 *
 * Based on Aceternity UI's CardStack, adapted for papercraft aesthetic.
 * Cards stack on top of each other and cycle automatically.
 *
 * Papercraft treatment:
 * - Paper card styling with warm shadows
 * - Amber accent colors
 * - Paper elevation shadows
 *
 * Usage:
 * const items = [
 *   { id: 1, name: "John", designation: "Designer", content: <p>Great work!</p> },
 *   { id: 2, name: "Jane", designation: "Developer", content: <p>Love it!</p> },
 * ]
 * <CardStack items={items} />
 *
 * @see https://ui.aceternity.com/components/card-stack
 */

function CardStack({
  items,
  offset = 10,
  scaleFactor = 0.06,
  interval = 5000,
  className,
}) {
  const [cards, setCards] = useState(items)

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]
        newArray.unshift(newArray.pop())
        return newArray
      })
    }, interval)

    return () => clearInterval(cycleInterval)
  }, [interval])

  return (
    <div className={cn("relative h-60 w-60 md:h-72 md:w-96", className)}>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute w-full h-full rounded-xl p-6",
              // Papercraft styling
              "bg-[var(--paper-cream,#FFFBF5)]",
              "border border-border/60",
              "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
              // Dark mode
              "dark:bg-card/50 dark:border-border/40"
            )}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Content area */}
              <div className="flex-1 text-foreground text-sm leading-relaxed">
                {card.content}
              </div>

              {/* Author info */}
              <div className="mt-4 pt-4 border-t border-border/40 dark:border-border/40">
                <p className="font-semibold text-foreground">
                  {card.name}
                </p>
                {card.designation && (
                  <p className="text-xs text-muted-foreground">
                    {card.designation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/**
 * CardStackSimple - Simpler variant without auto-rotation
 *
 * For manual navigation or static display.
 */
function CardStackSimple({
  items,
  offset = 8,
  scaleFactor = 0.04,
  className,
  onCardClick,
}) {
  const [cards, setCards] = useState(items)

  const handleClick = (clickedIndex) => {
    if (clickedIndex === 0) return // Top card already

    setCards((prevCards) => {
      const newArray = [...prevCards]
      // Move clicked card to top
      const [clickedCard] = newArray.splice(clickedIndex, 1)
      newArray.push(clickedCard)
      return newArray
    })

    onCardClick?.(cards[clickedIndex])
  }

  return (
    <div className={cn("relative h-60 w-60 md:h-72 md:w-96", className)}>
      {cards.map((card, index) => {
        const isTop = index === cards.length - 1

        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute w-full h-full rounded-xl p-6 cursor-pointer",
              "bg-[var(--paper-cream,#FFFBF5)]",
              "border border-border/60",
              "[box-shadow:var(--paper-elevation-1,0_1px_2px_rgba(180,83,9,0.05),0_2px_4px_rgba(180,83,9,0.05))]",
              isTop &&
                "[box-shadow:var(--paper-elevation-2,0_4px_8px_rgba(180,83,9,0.08),0_8px_16px_rgba(180,83,9,0.05))]",
              "dark:bg-card/50 dark:border-border/40"
            )}
            onClick={() => handleClick(index)}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: (cards.length - 1 - index) * -offset,
              scale: 1 - (cards.length - 1 - index) * scaleFactor,
              zIndex: index,
            }}
            whileHover={
              isTop
                ? {
                    y: -4,
                    boxShadow:
                      "0 8px 16px rgba(180,83,9,0.12), 0 16px 32px rgba(180,83,9,0.08)",
                  }
                : {}
            }
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 text-foreground text-sm leading-relaxed">
                {card.content}
              </div>
              <div className="mt-4 pt-4 border-t border-border/40 dark:border-border/40">
                <p className="font-semibold text-foreground">
                  {card.name}
                </p>
                {card.designation && (
                  <p className="text-xs text-muted-foreground">
                    {card.designation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export { CardStack, CardStackSimple }
