import { useState, useMemo } from "react"
 
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import {
  DirectionAwareTabs,
  DirectionAwareTabsList,
  DirectionAwareTabsTrigger,
} from "@/components/ui/direction-aware-tabs"
import { AssetCard } from "@/components/ui/asset-card"
import { CategoryPackHeader } from "@/components/ui/category-pack-header"
import { useCart } from "@/context/CartContext"
import { categories, getAssetsByCategory } from "@/data/assets"
import { ChevronDown } from "lucide-react"

const ITEMS_PER_PAGE = 18 // 6 columns × 3 rows

/**
 * PreviewGrid - Main grid with category tabs and pagination
 */
function PreviewGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const { toggleItem, togglePack, isItemSelected, isPackSelected, isPackPartiallySelected } = useCart()

  // Get filtered assets based on active category
  const filteredAssets = useMemo(() => {
    return getAssetsByCategory(activeCategory)
  }, [activeCategory])

  // Visible assets with pagination
  const visibleAssets = useMemo(() => {
    return filteredAssets.slice(0, visibleCount)
  }, [filteredAssets, visibleCount])

  const remainingCount = filteredAssets.length - visibleCount
  const hasMore = remainingCount > 0

  // Reset visible count when category changes
  const handleCategoryChange = (value) => {
    setActiveCategory(value)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  // Get current category info
  const currentCategory = categories.find((c) => c.id === activeCategory)

  return (
    <section className="py-8">
      <Container>
        {/* Category tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <DirectionAwareTabs
            value={activeCategory}
            onValueChange={handleCategoryChange}
          >
            <DirectionAwareTabsList className="inline-flex w-max">
              {categories.map((category) => (
                <DirectionAwareTabsTrigger
                  key={category.id}
                  value={category.id}
                  className="whitespace-nowrap"
                >
                  <span className="mr-1.5">{category.emoji}</span>
                  {category.label}
                </DirectionAwareTabsTrigger>
              ))}
            </DirectionAwareTabsList>
          </DirectionAwareTabs>
        </div>

        {/* Category pack header (not shown for "All") */}
        {activeCategory !== "all" && currentCategory && (
          <CategoryPackHeader
            category={currentCategory}
            isSelected={isPackSelected(activeCategory)}
            isPartiallySelected={isPackPartiallySelected(activeCategory)}
            onTogglePack={togglePack}
            sticky
          />
        )}

        {/* Asset grid */}
        <div
          role="listbox"
          aria-label="Select assets"
          aria-multiselectable="true"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6"
        >
          {visibleAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
            >
              <AssetCard
                asset={asset}
                isSelected={isItemSelected(asset.id)}
                onToggle={toggleItem}
              />
            </motion.div>
          ))}
        </div>

        {/* View more button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewMore}
              className="gap-2"
            >
              <span>View More</span>
              <span className="text-muted-foreground">
                ({remainingCount} remaining)
              </span>
              <ChevronDown className="size-4" />
            </Button>
          </div>
        )}

        {/* End of list indicator */}
        {!hasMore && visibleAssets.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing all {filteredAssets.length} assets
            {activeCategory !== "all" && ` in ${currentCategory?.label}`}
          </div>
        )}
      </Container>
    </section>
  )
}

export { PreviewGrid }
