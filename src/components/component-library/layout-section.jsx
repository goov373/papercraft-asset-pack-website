import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BentoGrid, BentoCard, BentoCardSimple } from "@/components/ui/bento-grid"
import { DotPattern, GridPattern } from "@/components/ui/dot-pattern"
import { TextureOverlay } from "@/components/ui/texture-overlay"
import { WavyBackground, WavyBackgroundSimple } from "@/components/ui/wavy-background"
import { Card3D, Card3DContent, Card3DItem, Card3DSimple } from "@/components/ui/card-3d"
import { ExpandableCards, ExpandableCard, ExpandableCardSimple, ExpandableCardGrid } from "@/components/ui/expandable-card"
import { ParallaxScrollSimple, ParallaxCard } from "@/components/ui/parallax-scroll"
import { MoreHorizontalIcon, Palette, Layers, Sparkles, Star, Package, Image, FileText } from "lucide-react"

function ComponentShowcase({ title, description, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-amber-900 mb-2">{title}</h3>
      <p className="text-amber-700 mb-4">{description}</p>
      <div className="bg-white/50 rounded-lg p-6 border border-amber-200">
        {children}
      </div>
    </div>
  )
}

function LayoutSection() {
  return (
    <div>
      <ComponentShowcase
        title="Card"
        description="Container component with papercraft elevation shadows and multiple variants for different visual styles."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Default Card</h4>
            <div className="max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description with additional context.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is the main content area of the card. You can put any content here.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Interactive Card</h4>
            <p className="text-sm text-amber-600 mb-3">Lifts on hover, presses on click.</p>
            <div className="max-w-md">
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover to see the lift effect.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click or hover on this card to see the papercraft animation effects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Sticky Note Card</h4>
            <p className="text-sm text-amber-600 mb-3">Post-it note style with slight rotation.</p>
            <div className="max-w-md">
              <Card variant="sticky">
                <CardHeader>
                  <CardTitle>Sticky Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Remember to update the documentation before the release!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Notebook Card</h4>
            <p className="text-sm text-amber-600 mb-3">Lined paper with red margin.</p>
            <div className="max-w-md">
              <Card variant="notebook">
                <CardHeader>
                  <CardTitle>Notebook Entry</CardTitle>
                  <CardDescription>January 24, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Today I learned about papercraft design systems and how to create
                    beautiful tactile UI components.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Kraft Paper Card</h4>
            <p className="text-sm text-amber-600 mb-3">Brown kraft paper aesthetic.</p>
            <div className="max-w-md">
              <Card variant="kraft">
                <CardHeader>
                  <CardTitle>Kraft Package</CardTitle>
                  <CardDescription>Natural and organic feel.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Perfect for eco-friendly or rustic themed designs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Card with Action</h4>
            <p className="text-sm text-amber-600 mb-3">Header with action button.</p>
            <div className="max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle>Project Update</CardTitle>
                  <CardDescription>Last edited 2 hours ago</CardDescription>
                  <CardAction>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontalIcon />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The action button is positioned in the top-right corner of the header.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">Save</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Card Grid Example</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle className="text-base">Basic Pack</CardTitle>
                  <CardDescription>50 assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Free</Badge>
                </CardContent>
              </Card>
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle className="text-base">Pro Pack</CardTitle>
                  <CardDescription>200 assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="default">Popular</Badge>
                </CardContent>
              </Card>
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle className="text-base">Ultimate Pack</CardTitle>
                  <CardDescription>500+ assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="destructive">Sale</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Container"
        description="Responsive max-width wrapper that centers content and provides consistent horizontal padding."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Default Container</h4>
            <p className="text-sm text-amber-600 mb-3">Max-width: 1280px with responsive padding.</p>
            <div className="bg-amber-100/50 border border-dashed border-amber-300 rounded-lg p-2">
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Usage Pattern</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Title Only</h4>
            <div className="bg-muted/50 rounded-lg p-6">
              <SectionHeading title="Simple Section Title" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Title + Subtitle</h4>
            <div className="bg-muted/50 rounded-lg p-6">
              <SectionHeading
                title="Featured Assets"
                subtitle="Hand-crafted vector illustrations for your projects"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Real Examples</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Bento Grid</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Simple Bento Cards</h4>
            <p className="text-sm text-amber-600 mb-3">For display-only cards without CTAs.</p>
            <BentoGrid>
              <BentoCardSimple title="Icons" description="200+ unique icons">
                <div className="mt-2 text-amber-500">
                  <Palette className="h-8 w-8" />
                </div>
              </BentoCardSimple>
              <BentoCardSimple title="Illustrations" description="150+ scenes">
                <div className="mt-2 text-amber-500">
                  <Layers className="h-8 w-8" />
                </div>
              </BentoCardSimple>
              <BentoCardSimple title="Patterns" description="50+ backgrounds">
                <div className="mt-2 text-amber-500">
                  <Sparkles className="h-8 w-8" />
                </div>
              </BentoCardSimple>
            </BentoGrid>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Dot Pattern"
        description="Perforated paper dot pattern background. Based on Magic UI's DotPattern with warm amber styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Dot Pattern</h4>
            <div className="relative h-48 rounded-lg overflow-hidden bg-amber-50 border border-amber-200">
              <DotPattern className="opacity-50" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Content over dot pattern</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Glowing Dots</h4>
            <p className="text-sm text-amber-600 mb-3">Dots animate with a subtle glow effect.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-amber-50 border border-amber-200">
              <DotPattern glow className="opacity-60" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Animated glow effect</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Dense Dots</h4>
            <p className="text-sm text-amber-600 mb-3">Smaller spacing for denser pattern.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-amber-50 border border-amber-200">
              <DotPattern width={10} height={10} className="opacity-40" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Dense dot pattern</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Grid Pattern"
        description="Graph paper grid pattern background. Perfect for craft/technical aesthetics."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Grid Pattern</h4>
            <div className="relative h-48 rounded-lg overflow-hidden bg-white border border-amber-200">
              <GridPattern className="opacity-60" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Content over grid pattern</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Dense Grid</h4>
            <p className="text-sm text-amber-600 mb-3">Smaller grid cells.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-white border border-amber-200">
              <GridPattern width={20} height={20} className="opacity-50" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Dense grid pattern</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Large Grid</h4>
            <p className="text-sm text-amber-600 mb-3">Larger grid cells for subtle effect.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-white border border-amber-200">
              <GridPattern width={60} height={60} strokeWidth={2} className="opacity-40" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Large grid pattern</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Texture Overlay"
        description="CSS-based paper texture overlays. Based on Cult UI's TextureOverlay with warm amber tinting for authentic paper feel."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Paper Grain (Default)</h4>
            <div className="relative h-48 rounded-lg overflow-hidden border border-amber-200">
              <div className="absolute inset-0 bg-[var(--paper-cream)]" />
              <TextureOverlay texture="paperGrain" opacity={0.8} />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-800 font-medium">Natural paper grain texture</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Texture Types</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="dots" opacity={0.6} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Dots</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="grid" opacity={0.5} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Grid</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="crosshatch" opacity={0.4} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Crosshatch</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="linen" opacity={0.6} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Linen</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="canvas" opacity={0.5} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Canvas</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="noise" opacity={0.3} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Noise</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="diagonalLines" opacity={0.4} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Diagonal</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-amber-200">
                <div className="absolute inset-0 bg-amber-50" />
                <TextureOverlay texture="horizontalLines" opacity={0.4} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-amber-700">Horizontal</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Kraft Paper Effect</h4>
            <div className="relative h-48 rounded-lg overflow-hidden border border-amber-300">
              <div className="absolute inset-0 bg-amber-100" />
              <TextureOverlay texture="paperGrain" opacity={1} />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-amber-900 font-medium">Brown kraft paper style</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Wavy Background"
        description="Animated wave background using Canvas and simplex-noise. Based on Aceternity UI with warm amber color scheme."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Animated Waves</h4>
            <p className="text-sm text-amber-600 mb-3">Canvas-based smooth wave animation.</p>
            <div className="relative h-64 rounded-lg overflow-hidden border border-amber-200">
              <WavyBackground
                className="flex items-center justify-center h-full"
                containerClassName="h-full"
                blur={6}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-amber-900">Hero Content</h3>
                  <p className="text-amber-700 mt-2">Content appears above the waves</p>
                </div>
              </WavyBackground>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Simple Wave (Static SVG)</h4>
            <p className="text-sm text-amber-600 mb-3">Non-animated version for lighter weight.</p>
            <div className="rounded-lg overflow-hidden border border-amber-200">
              <WavyBackgroundSimple className="py-16">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-amber-900">Static Waves</h3>
                  <p className="text-amber-700 mt-1">SVG-based wave decoration</p>
                </div>
              </WavyBackgroundSimple>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Custom Wave Color</h4>
            <div className="rounded-lg overflow-hidden border border-amber-200">
              <WavyBackgroundSimple
                className="py-12"
                waveColor="#fdba74"
                backgroundColor="#fffbf5"
              >
                <div className="text-center">
                  <p className="text-amber-800 font-medium">Orange wave variation</p>
                </div>
              </WavyBackgroundSimple>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="3D Card"
        description="Interactive 3D tilt effect card that responds to mouse position. Based on Aceternity UI with warm amber glare."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Default 3D Card</h4>
            <p className="text-sm text-amber-600 mb-3">Hover to see the tilt effect with glare.</p>
            <div className="flex justify-center">
              <Card3D className="w-72">
                <Card3DContent className="p-6">
                  <h4 className="font-semibold text-amber-900">Premium Pack</h4>
                  <p className="text-sm text-amber-700 mt-2">
                    Hover over this card to see it tilt and follow your cursor.
                  </p>
                  <Button size="sm" className="mt-4">Explore</Button>
                </Card3DContent>
              </Card3D>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">3D Card with Items</h4>
            <p className="text-sm text-amber-600 mb-3">Elements inside can have different depth levels.</p>
            <div className="flex justify-center">
              <Card3D className="w-80">
                <Card3DContent className="p-6">
                  <Card3DItem translateZ={20}>
                    <Badge variant="secondary">Featured</Badge>
                  </Card3DItem>
                  <Card3DItem translateZ={40} className="mt-3">
                    <h4 className="text-xl font-bold text-amber-900">Asset Collection</h4>
                  </Card3DItem>
                  <Card3DItem translateZ={30} className="mt-2">
                    <p className="text-sm text-amber-700">
                      500+ hand-crafted vectors in one pack.
                    </p>
                  </Card3DItem>
                  <Card3DItem translateZ={60} className="mt-4">
                    <Button>Get Access</Button>
                  </Card3DItem>
                </Card3DContent>
              </Card3D>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Simple 3D Card</h4>
            <p className="text-sm text-amber-600 mb-3">Quick one-liner API for simple use cases.</p>
            <div className="flex justify-center gap-4">
              <Card3DSimple className="w-48 h-32 flex items-center justify-center">
                <Palette className="w-8 h-8 text-amber-600" />
              </Card3DSimple>
              <Card3DSimple className="w-48 h-32 flex items-center justify-center" glare={false}>
                <Layers className="w-8 h-8 text-amber-600" />
              </Card3DSimple>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Expandable Card"
        description="Cards that expand to reveal more content with smooth animations. Based on Cult UI with tissue paper backdrop."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Click to Expand</h4>
            <p className="text-sm text-amber-600 mb-3">Click any card to see it expand with full details.</p>
            <ExpandableCards className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ExpandableCard
                title="Icon Pack"
                description="200+ unique icons"
                thumbnail="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=250&fit=crop&auto=format"
              >
                <div className="space-y-3">
                  <p className="text-amber-700">
                    A comprehensive collection of hand-drawn icons perfect for any project.
                  </p>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• SVG and PNG formats</li>
                    <li>• Multiple sizes included</li>
                    <li>• Regular updates</li>
                  </ul>
                  <Button className="w-full">Download Pack</Button>
                </div>
              </ExpandableCard>
              <ExpandableCard
                title="Illustration Set"
                description="150+ scenes"
                thumbnail="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=250&fit=crop&auto=format"
              >
                <div className="space-y-3">
                  <p className="text-amber-700">
                    Beautiful illustrations for landing pages, apps, and presentations.
                  </p>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• Editable source files</li>
                    <li>• Commercial license</li>
                    <li>• Color customizable</li>
                  </ul>
                  <Button className="w-full">Download Pack</Button>
                </div>
              </ExpandableCard>
              <ExpandableCard
                title="Pattern Bundle"
                description="50+ backgrounds"
                thumbnail="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=250&fit=crop&auto=format"
              >
                <div className="space-y-3">
                  <p className="text-amber-700">
                    Seamless patterns for backgrounds, textures, and decorative elements.
                  </p>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• Tileable designs</li>
                    <li>• High resolution</li>
                    <li>• Print ready</li>
                  </ul>
                  <Button className="w-full">Download Pack</Button>
                </div>
              </ExpandableCard>
            </ExpandableCards>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Simple Inline Expand</h4>
            <p className="text-sm text-amber-600 mb-3">Accordion-style expansion without overlay.</p>
            <div className="max-w-md space-y-3">
              <ExpandableCardSimple title="What's included?" preview="500+ vector assets">
                <p className="text-sm text-amber-700">
                  This pack includes over 500 carefully crafted vector assets including icons,
                  illustrations, patterns, and decorative elements. All files come in SVG,
                  PNG, and source format.
                </p>
              </ExpandableCardSimple>
              <ExpandableCardSimple title="License details" preview="Commercial use allowed">
                <p className="text-sm text-amber-700">
                  All assets come with a commercial license allowing unlimited use in personal
                  and commercial projects. No attribution required.
                </p>
              </ExpandableCardSimple>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Parallax Scroll"
        description="Scroll-based parallax effects for dynamic content. Based on Aceternity UI with papercraft styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Simple Parallax</h4>
            <p className="text-sm text-amber-600 mb-3">Content moves at a different rate than scroll.</p>
            <div className="h-48 rounded-lg overflow-hidden border border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100">
              <ParallaxScrollSimple className="h-full" speed={0.3}>
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Package className="w-12 h-12 text-amber-600" />
                  <h4 className="text-xl font-semibold text-amber-900">Scroll to see effect</h4>
                  <p className="text-amber-700">This content moves slower than the scroll</p>
                </div>
              </ParallaxScrollSimple>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Parallax Card</h4>
            <p className="text-sm text-amber-600 mb-3">Card with parallax background image.</p>
            <ParallaxCard
              backgroundImage="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=400&fit=crop&auto=format"
              className="h-64 max-w-lg mx-auto"
              speed={0.4}
            >
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h4 className="text-xl font-bold text-white">Featured Collection</h4>
                  <p className="text-amber-100 mt-1">Scroll to see the parallax background effect</p>
                </div>
              </div>
            </ParallaxCard>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> The full multi-column ParallaxScroll component requires
              more vertical space (200vh+). Use ParallaxScrollSimple or ParallaxCard for
              smaller sections like this demo.
            </p>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { LayoutSection }
