import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { BentoGrid, BentoCard, BentoCardSimple } from "@/components/ui/bento-grid"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Palette, Layers, Sparkles, Star } from "lucide-react"

function ComponentShowcase({ title, description, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="bg-card/50 rounded-lg p-6 border border-border">
        {children}
      </div>
    </div>
  )
}

function LayoutSection() {
  return (
    <div>
      <ComponentShowcase
        title="Container"
        description="Responsive max-width wrapper that centers content and provides consistent horizontal padding."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Container</h4>
            <p className="text-sm text-muted-foreground mb-3">Max-width: 1280px with responsive padding.</p>
            <div className="bg-secondary/50 border border-dashed border-border rounded-lg p-2">
              <Container>
                <div className="bg-primary/10 p-4 rounded text-center">
                  <p className="text-sm text-foreground">Content inside Container</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Container provides max-w-7xl and horizontal padding
                  </p>
                </div>
              </Container>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Usage Pattern</h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<Container>
  <SectionHeading title="..." subtitle="..." />
  {/* Section content */}
</Container>`}
            </pre>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Section Heading"
        description="Consistent section titles with optional subtitle. Centers text and provides proper spacing."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Title Only</h4>
            <div className="bg-muted/50 rounded-lg p-6">
              <SectionHeading title="Simple Section Title" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Title + Subtitle</h4>
            <div className="bg-muted/50 rounded-lg p-6">
              <SectionHeading
                title="Featured Assets"
                subtitle="Hand-crafted vector illustrations for your projects"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Real Examples</h4>
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <SectionHeading
                  title="What's Included"
                  subtitle="Everything you need to bring your designs to life"
                />
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <SectionHeading
                  title="Frequently Asked Questions"
                  subtitle="Everything you need to know about the asset pack"
                />
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Bento Grid"
        description="Responsive grid layout with visually interesting card sizes. Based on Magic UI's BentoGrid with papercraft styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Bento Grid</h4>
            <BentoGrid>
              <BentoCard
                name="Vector Assets"
                description="500+ hand-crafted vector illustrations ready for your projects."
                Icon={Palette}
                href="#"
                cta="Browse assets"
                className="lg:col-span-2"
              />
              <BentoCard
                name="Categories"
                description="12 organized collections to find exactly what you need."
                Icon={Layers}
                href="#"
                cta="View collections"
              />
              <BentoCard
                name="Premium Quality"
                description="Every asset crafted with attention to detail."
                Icon={Sparkles}
                href="#"
                cta="See examples"
              />
              <BentoCard
                name="5-Star Rated"
                description="Loved by designers and developers worldwide."
                Icon={Star}
                href="#"
                cta="Read reviews"
                className="lg:col-span-2"
              />
            </BentoGrid>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Simple Bento Cards</h4>
            <p className="text-sm text-muted-foreground mb-3">For display-only cards without CTAs.</p>
            <BentoGrid>
              <BentoCardSimple title="Icons" description="200+ unique icons">
                <div className="mt-2 text-primary">
                  <Palette className="h-8 w-8" />
                </div>
              </BentoCardSimple>
              <BentoCardSimple title="Illustrations" description="150+ scenes">
                <div className="mt-2 text-primary">
                  <Layers className="h-8 w-8" />
                </div>
              </BentoCardSimple>
              <BentoCardSimple title="Patterns" description="50+ backgrounds">
                <div className="mt-2 text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
              </BentoCardSimple>
            </BentoGrid>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Aspect Ratio"
        description="Paper frame / mat board metaphor for maintaining aspect ratios."
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">16:9</p>
            <AspectRatio ratio={16 / 9} className="bg-accent rounded-md border border-border/60 overflow-hidden">
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                16:9
              </div>
            </AspectRatio>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">1:1 (Square)</p>
            <AspectRatio ratio={1} className="bg-accent rounded-md border border-border/60 overflow-hidden">
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                1:1
              </div>
            </AspectRatio>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">4:3</p>
            <AspectRatio ratio={4 / 3} className="bg-accent rounded-md border border-border/60 overflow-hidden">
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                4:3
              </div>
            </AspectRatio>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Resizable"
        description="Paper panels with fold/tear handles for resizing."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Horizontal Panels</p>
            <div className="h-48 rounded-md border border-border/60 overflow-hidden">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Panel 1</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Panel 2</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Vertical Panels</p>
            <div className="h-64 rounded-md border border-border/60 overflow-hidden">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={40} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Top Panel</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Bottom Panel</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { LayoutSection }
