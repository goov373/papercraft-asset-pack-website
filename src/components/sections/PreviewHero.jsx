 
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { formatPrice, TOTAL_PRICE, assets, categories } from "@/data/assets"

/**
 * PreviewHero - Page header for the preview page
 */
function PreviewHero() {
  const categoryCount = categories.filter((c) => c.id !== "all").length

  return (
    <section className="pt-24 pb-8 bg-gradient-to-b from-secondary/30 to-background">
      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <Badge variant="secondary" className="mb-4">
            {assets.length} Hand-crafted Assets
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preview All Assets
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-6">
            Browse and select individual assets or full category packs.
            Add to cart and checkout with exactly what you need.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{assets.length}</span>
              <span>assets</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{categoryCount}</span>
              <span>categories</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{formatPrice(TOTAL_PRICE)}</span>
              <span>for all</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export { PreviewHero }
