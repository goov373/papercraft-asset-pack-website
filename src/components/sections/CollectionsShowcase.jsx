import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Collection data
const COLLECTIONS = [
  {
    id: "scissors",
    name: "Scissors & Cutting",
    count: 18,
    emoji: "✂️",
    description: "Precision cutting tools, craft scissors, and paper cutters",
    previewEmojis: ["✂️", "🔪", "📐", "✂️", "🗡️"],
  },
  {
    id: "paper",
    name: "Paper & Cardstock",
    count: 24,
    emoji: "📄",
    description: "Sheets, cardstock, origami paper, and textured papers",
    previewEmojis: ["📄", "📝", "📃", "🗒️", "📋"],
  },
  {
    id: "writing",
    name: "Writing Tools",
    count: 32,
    emoji: "✏️",
    description: "Pencils, pens, markers, crayons, and highlighters",
    previewEmojis: ["✏️", "🖊️", "🖍️", "🖌️", "✒️"],
  },
  {
    id: "adhesives",
    name: "Adhesives & Tape",
    count: 16,
    emoji: "🎀",
    description: "Glue sticks, tape rolls, washi tape, and sticky dots",
    previewEmojis: ["🧴", "🎀", "📎", "🩹", "🔖"],
  },
  {
    id: "measuring",
    name: "Measuring Tools",
    count: 14,
    emoji: "📏",
    description: "Rulers, protractors, compasses, and measuring tapes",
    previewEmojis: ["📏", "📐", "🧭", "⚖️", "📏"],
  },
  {
    id: "decorative",
    name: "Decorative Elements",
    count: 28,
    emoji: "⭐",
    description: "Stickers, stamps, washi tape patterns, and embellishments",
    previewEmojis: ["⭐", "🌟", "💫", "✨", "🎯"],
  },
  {
    id: "storage",
    name: "Storage & Containers",
    count: 12,
    emoji: "📦",
    description: "Pencil cups, organizers, boxes, and craft caddies",
    previewEmojis: ["📦", "🗃️", "🗄️", "📥", "🏺"],
  },
  {
    id: "bonus",
    name: "Bonus: Scenes",
    count: 10,
    emoji: "🎨",
    description: "Pre-made compositions and ready-to-use scene templates",
    previewEmojis: ["🎨", "🖼️", "🎭", "🎪", "🏠"],
    isBonus: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

function CollectionCard({ collection, onClick }) {
  return (
    <motion.div variants={itemVariants}>
      <Card
        variant="interactive"
        className={`cursor-pointer h-full !p-0 overflow-hidden ${
          collection.isBonus
            ? "ring-2 ring-primary/50"
            : ""
        }`}
        onClick={() => onClick(collection)}
      >
        {/* Preview Collage - extends to card edges */}
        <div className={`relative h-32 sm:h-36 flex items-center justify-center ${
          collection.isBonus
            ? "bg-gradient-to-br from-amber-100/80 to-orange-100/60"
            : "bg-[var(--paper-cream)]"
        }`}>
          {/* Scattered emoji preview */}
          <div className="relative w-full h-full">
            {collection.previewEmojis.map((emoji, index) => (
              <span
                key={index}
                className="absolute text-2xl sm:text-3xl"
                style={{
                  left: `${15 + index * 18}%`,
                  top: `${20 + (index % 2) * 35}%`,
                  transform: `rotate(${(index - 2) * 8}deg)`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>

          {/* Bonus badge */}
          {collection.isBonus && (
            <Badge
              variant="default"
              className="absolute top-2 right-2 bg-primary text-primary-foreground"
            >
              Bonus
            </Badge>
          )}
        </div>

        <CardHeader className="py-4 bg-card">
          <div className="flex items-center gap-2">
            <span className="text-xl">{collection.emoji}</span>
            <CardTitle className="text-base">{collection.name}</CardTitle>
          </div>
          <CardDescription className="text-xs">
            {collection.count} {collection.isBonus ? "compositions" : "assets"}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

function CollectionPreviewModal({ collection, open, onClose }) {
  if (!collection) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{collection.emoji}</span>
            {collection.name}
          </DialogTitle>
          <DialogDescription>{collection.description}</DialogDescription>
        </DialogHeader>

        {/* Preview grid */}
        <div className="grid grid-cols-4 gap-3 py-4">
          {Array.from({ length: Math.min(collection.count, 12) }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg bg-gradient-to-br from-secondary to-muted flex items-center justify-center [box-shadow:var(--paper-elevation-1)]"
            >
              <span className="text-2xl opacity-60">
                {collection.previewEmojis[index % collection.previewEmojis.length]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {collection.count} {collection.isBonus ? "compositions" : "assets"} included
          </span>
          <Button size="sm">Get the Pack</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CollectionsShowcase() {
  const [selectedCollection, setSelectedCollection] = useState(null)

  const totalAssets = COLLECTIONS.reduce((sum, c) => sum + c.count, 0)

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Curated Collections"
          subtitle={`${COLLECTIONS.length} categories, ${totalAssets}+ assets, endless possibilities`}
          align="center"
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {COLLECTIONS.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onClick={setSelectedCollection}
            />
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="outline" size="lg">
            View All {totalAssets}+ Assets
          </Button>
        </motion.div>
      </Container>

      {/* Collection preview modal */}
      <CollectionPreviewModal
        collection={selectedCollection}
        open={!!selectedCollection}
        onClose={() => setSelectedCollection(null)}
      />
    </section>
  )
}

export default CollectionsShowcase
