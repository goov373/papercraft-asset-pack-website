import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { formatPrice, PRICE_PER_ITEM } from "@/data/assets"

/**
 * AssetCard - Individual asset display with selection checkbox
 *
 * Features:
 * - Papercraft card styling (interactive variant)
 * - Checkbox with 44px touch target
 * - Entire card clickable for selection
 * - Accessible: aria-selected, keyboard support
 */
function AssetCard({ asset, isSelected, onToggle }) {
  const handleClick = () => {
    onToggle(asset.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onToggle(asset.id)
    }
  }

  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={asset.name}
      className={cn(
        // Base card styles
        "relative flex flex-col items-center p-4 rounded-xl cursor-pointer",
        "bg-[var(--paper-cream)] text-foreground",
        "[box-shadow:var(--paper-elevation-1)]",
        // Transitions
        "transition-[transform,box-shadow,background-color,ring-color]",
        "[transition-duration:var(--paper-duration-normal)]",
        "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        // Hover state
        "hover:[transform:translateY(-4px)] hover:[box-shadow:var(--paper-elevation-2)]",
        // Active/press state
        "active:[transform:translateY(1px)] active:[box-shadow:var(--paper-elevation-0)]",
        "active:[transition-duration:var(--paper-duration-instant)]",
        // Focus state
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // Selected state
        isSelected && [
          "ring-2 ring-primary/60",
          "bg-accent/40 dark:bg-accent/20",
        ]
      )}
    >
      {/* Checkbox with 44px touch target */}
      <label
        className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(asset.id)}
          aria-label={`Select ${asset.name}`}
        />
      </label>

      {/* Emoji display */}
      <div className="text-4xl mb-2 select-none" aria-hidden="true">
        {asset.emoji}
      </div>

      {/* Asset name */}
      <p className="text-sm font-medium text-center line-clamp-2 leading-tight mb-1">
        {asset.name}
      </p>

      {/* Price */}
      <p className="text-xs text-muted-foreground font-semibold">
        {formatPrice(PRICE_PER_ITEM)}
      </p>
    </div>
  )
}

export { AssetCard }
