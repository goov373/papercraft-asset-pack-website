import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

const categories = [
  { id: "all", label: "All" },
  { id: "scissors", label: "Scissors" },
  { id: "paper", label: "Paper" },
  { id: "writing", label: "Writing" },
  { id: "tools", label: "Tools" },
  { id: "decor", label: "Decor" },
]

// Placeholder assets - replace with actual data
const assets = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Asset ${i + 1}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
}))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

function AssetGallery() {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredAssets =
    activeTab === "all"
      ? assets
      : assets.filter((asset) => asset.category === activeTab)

  return (
    <section id="preview" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="See What's Inside"
          subtitle="Explore our collection of hand-crafted vector elements"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeTab}
            >
              {filteredAssets.map((asset) => (
                <motion.div key={asset.id} variants={itemVariants}>
                  <Card
                    variant="interactive"
                    className="aspect-square cursor-pointer group !p-0 overflow-hidden bg-[var(--paper-cream)]"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-amber-700/60 text-sm font-medium group-hover:text-amber-800 transition-colors">
                        {asset.name}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All 150+ Assets
          </Button>
        </div>

        {/* Lightbox Dialog */}
        <Dialog
          open={selectedAsset !== null}
          onOpenChange={(open) => !open && setSelectedAsset(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogTitle className="sr-only">
              {selectedAsset?.name || "Asset Preview"}
            </DialogTitle>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">
                {selectedAsset?.name} - Full Preview
              </span>
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
              >
                <X className="size-4" />
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </Container>
    </section>
  )
}

export default AssetGallery
