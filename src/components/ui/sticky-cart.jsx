import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Trash2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/context/CartContext"
import { formatPrice, MINIMUM_CART, TOTAL_PRICE } from "@/data/assets"

/**
 * StickyCart - Floating cart widget in bottom-right
 *
 * Features:
 * - Collapsed: circular button with count badge
 * - Expanded: card showing items, total, checkout
 * - Warning when under $6.99 minimum
 * - Framer Motion animations
 */
function StickyCart() {
  const [expanded, setExpanded] = useState(false)
  const cartRef = useRef(null)
  const { cartTotals, selectedItemsList, clearCart, toggleItem, selectAll } = useCart()

  const { itemCount, price, meetsMinimum, amountToMinimum } = cartTotals

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && expanded) {
        setExpanded(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [expanded])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (expanded && cartRef.current && !cartRef.current.contains(e.target)) {
        setExpanded(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [expanded])

  // Don't show if cart is empty
  if (itemCount === 0) {
    return null
  }

  return (
    <div
      ref={cartRef}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "w-80 max-h-[70vh] flex flex-col",
              "rounded-xl overflow-hidden",
              "bg-[var(--paper-kraft)] text-amber-950",
              "border border-amber-300/40",
              "[box-shadow:var(--paper-elevation-3)]",
              "dark:bg-amber-900/90 dark:text-amber-100 dark:border-amber-700/40"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-amber-300/40">
              <div className="flex items-center gap-2">
                <ShoppingCart className="size-5" />
                <span className="font-semibold">Your Cart</span>
                <Badge variant="secondary" className="font-normal">
                  {itemCount} items
                </Badge>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="p-1.5 rounded-lg hover:bg-amber-200/50 transition-colors"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Warning if under minimum */}
            {!meetsMinimum && (
              <div
                role="alert"
                className="flex items-center gap-2 px-4 py-2 bg-amber-200/60 text-amber-900 text-sm"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>Add {formatPrice(amountToMinimum)} more to checkout</span>
              </div>
            )}

            {/* Items list */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-4 space-y-2">
                {selectedItemsList.slice(0, 20).map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-amber-100/40"
                  >
                    <span className="text-xl" aria-hidden="true">
                      {asset.emoji}
                    </span>
                    <span className="flex-1 text-sm truncate">{asset.name}</span>
                    <button
                      onClick={() => toggleItem(asset.id)}
                      className="p-1 rounded hover:bg-amber-200/60 text-amber-700"
                      aria-label={`Remove ${asset.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
                {selectedItemsList.length > 20 && (
                  <p className="text-sm text-center text-amber-700 py-2">
                    +{selectedItemsList.length - 20} more items
                  </p>
                )}
              </div>
            </ScrollArea>

            {/* Footer with totals */}
            <div className="p-4 border-t border-amber-300/40 space-y-3">
              {/* Price breakdown */}
              <div className="flex justify-between text-sm">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold">{formatPrice(price)}</span>
              </div>

              {/* Full pack deal */}
              {itemCount < 150 && (
                <button
                  onClick={selectAll}
                  className="w-full text-xs text-center text-amber-700 hover:text-amber-900 underline"
                >
                  Get all 150 for {formatPrice(TOTAL_PRICE)} (save {formatPrice(150 * 0.26 - TOTAL_PRICE)})
                </button>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  disabled={!meetsMinimum}
                  className="flex-1"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => setExpanded(true)}
            className={cn(
              "relative w-14 h-14 rounded-full",
              "flex items-center justify-center",
              "bg-primary text-primary-foreground",
              "[box-shadow:var(--paper-elevation-2)]",
              "hover:[box-shadow:var(--paper-elevation-3)]",
              "hover:scale-105",
              "active:scale-95",
              "transition-all duration-150"
            )}
            aria-label={`Shopping cart, ${itemCount} items, ${formatPrice(price)}`}
          >
            <ShoppingCart className="size-6" />

            {/* Count badge */}
            <Badge
              className={cn(
                "absolute -top-1 -right-1 min-w-[1.5rem] h-6",
                "flex items-center justify-center",
                !meetsMinimum && "bg-amber-500"
              )}
            >
              {itemCount}
            </Badge>

            {/* Price pill */}
            <span
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2",
                "px-2 py-0.5 rounded-full",
                "text-xs font-semibold",
                "bg-white text-foreground",
                "[box-shadow:var(--paper-elevation-1)]"
              )}
            >
              {formatPrice(price)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export { StickyCart }
