import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, PRICE_PER_ITEM } from "@/data/assets"
import { Package, PackageMinus } from "lucide-react"

/**
 * CategoryPackHeader - Section header with pack selection toggle
 *
 * Features:
 * - Category name + emoji
 * - Item count badge
 * - "Add All to Cart" / "Remove Pack" toggle
 * - Pack total price display
 * - Sticky behavior when scrolling
 */
function CategoryPackHeader({
  category,
  isSelected,
  isPartiallySelected,
  onTogglePack,
  sticky = false,
}) {
  const packPrice = category.count * PRICE_PER_ITEM
  const countId = `pack-count-${category.id}`

  return (
    <div
      className={cn(
        "flex items-center justify-between py-4",
        "border-b border-amber-200/60",
        sticky && "sticky top-16 z-10 bg-background/95 backdrop-blur-sm"
      )}
    >
      {/* Left: Category info */}
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {category.emoji}
        </span>
        <h3
          className="font-semibold text-foreground text-lg"
          aria-describedby={countId}
        >
          {category.label}
        </h3>
        <Badge id={countId} variant="secondary" className="font-normal">
          {category.count} items
        </Badge>
      </div>

      {/* Right: Price and toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {formatPrice(packPrice)} for pack
        </span>
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          onClick={() => onTogglePack(category.id)}
          className="min-w-[120px]"
        >
          {isSelected ? (
            <>
              <PackageMinus className="size-4 mr-1.5" />
              Remove Pack
            </>
          ) : (
            <>
              <Package className="size-4 mr-1.5" />
              {isPartiallySelected ? "Add Rest" : "Add All"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export { CategoryPackHeader }
