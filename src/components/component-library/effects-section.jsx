import { useRef } from "react"
import { CircleDot, Palette, Layers, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Kbd } from "@/components/ui/kbd"
import { SparklesText } from "@/components/ui/sparkles-text"
import { ShineBorder, ShineBorderCard } from "@/components/ui/shine-border"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { BlurFade } from "@/components/ui/blur-fade"
import { Compare, CompareSimple } from "@/components/ui/compare"
import { Timeline, TimelineSimple, TimelineHorizontal } from "@/components/ui/timeline"
import { CardStack, CardStackSimple } from "@/components/ui/card-stack"
import { Spotlight, MultiSpotlight, SpotlightCard } from "@/components/ui/spotlight"
import { DotPattern, GridPattern } from "@/components/ui/dot-pattern"
import { TextureOverlay } from "@/components/ui/texture-overlay"
import { WavyBackground, WavyBackgroundSimple } from "@/components/ui/wavy-background"
import { Card3D, Card3DContent, Card3DItem, Card3DSimple } from "@/components/ui/card-3d"
import { ExpandableCards, ExpandableCard, ExpandableCardSimple } from "@/components/ui/expandable-card"
import { ParallaxScrollSimple, ParallaxCard } from "@/components/ui/parallax-scroll"
import { SquiggleArrow, SquiggleUnderline, SquiggleCircle } from "@/components/ui/squiggle-arrow"

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

function EffectsSection() {
  return (
    <div>
      {/* Sparkles Text */}
      <ComponentShowcase
        title="Sparkles Text"
        description="Text with animated sparkle effects. Based on Magic UI with warm amber/orange sparkles."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Sparkles</h4>
            <SparklesText className="text-4xl text-foreground">
              Magical Assets
            </SparklesText>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Custom Colors</h4>
            <SparklesText
              className="text-4xl text-foreground"
              colors={{ first: "#ec4899", second: "#8b5cf6" }}
            >
              Premium Pack
            </SparklesText>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">More Sparkles</h4>
            <SparklesText
              className="text-4xl text-foreground"
              sparklesCount={20}
            >
              Extra Sparkly!
            </SparklesText>
          </div>
        </div>
      </ComponentShowcase>

      {/* Shine Border */}
      <ComponentShowcase
        title="Shine Border"
        description="Animated gradient border effect. Perfect for highlighting featured content or premium items."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Shine Border Card</h4>
            <div className="max-w-md">
              <ShineBorderCard className="bg-[var(--paper-cream)]">
                <div className="p-6">
                  <h4 className="font-semibold text-foreground">Premium Pack</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    The animated border draws attention to this featured card.
                  </p>
                </div>
              </ShineBorderCard>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Custom Colors</h4>
            <div className="max-w-md">
              <ShineBorderCard
                shineColor={["#ec4899", "#8b5cf6", "#06b6d4"]}
                className="bg-white"
              >
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900">Colorful Border</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Custom gradient colors for different themes.
                  </p>
                </div>
              </ShineBorderCard>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Faster Animation</h4>
            <div className="max-w-md">
              <ShineBorderCard duration={4} borderWidth={3} className="bg-[var(--paper-cream)]">
                <div className="p-6">
                  <h4 className="font-semibold text-foreground">Fast & Bold</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Faster animation with thicker border.
                  </p>
                </div>
              </ShineBorderCard>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Animated Beam */}
      <AnimatedBeamShowcase />

      {/* Blur Fade */}
      <ComponentShowcase
        title="Blur Fade"
        description="Scroll-triggered blur fade animation. Elements fade in smoothly when entering the viewport."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Blur Fade</h4>
            <div className="flex gap-4">
              <BlurFade delay={0}>
                <div className="p-4 bg-accent rounded-lg border border-border">
                  <p className="text-foreground">Item 1</p>
                </div>
              </BlurFade>
              <BlurFade delay={0.2}>
                <div className="p-4 bg-accent rounded-lg border border-border">
                  <p className="text-foreground">Item 2</p>
                </div>
              </BlurFade>
              <BlurFade delay={0.4}>
                <div className="p-4 bg-accent rounded-lg border border-border">
                  <p className="text-foreground">Item 3</p>
                </div>
              </BlurFade>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Different Directions</h4>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <BlurFade direction="up" delay={0}>
                <div className="p-4 bg-muted rounded-lg border border-border text-center">
                  <p className="text-foreground text-sm">Up</p>
                </div>
              </BlurFade>
              <BlurFade direction="down" delay={0.1}>
                <div className="p-4 bg-muted rounded-lg border border-border text-center">
                  <p className="text-foreground text-sm">Down</p>
                </div>
              </BlurFade>
              <BlurFade direction="left" delay={0.2}>
                <div className="p-4 bg-muted rounded-lg border border-border text-center">
                  <p className="text-foreground text-sm">Left</p>
                </div>
              </BlurFade>
              <BlurFade direction="right" delay={0.3}>
                <div className="p-4 bg-muted rounded-lg border border-border text-center">
                  <p className="text-foreground text-sm">Right</p>
                </div>
              </BlurFade>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Staggered List</h4>
            <div className="space-y-2 max-w-sm">
              {["First item", "Second item", "Third item", "Fourth item"].map((item, i) => (
                <BlurFade key={item} delay={0.1 * i}>
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <p className="text-foreground text-sm">{item}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Compare */}
      <ComponentShowcase
        title="Compare"
        description="Before/after image comparison slider. Based on Aceternity UI with warm amber handle styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Image Comparison Slider</h4>
            <p className="text-sm text-muted-foreground mb-3">Drag mode - click and drag to compare.</p>
            <Compare
              firstImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format"
              secondImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&sat=-100&auto=format"
              slideMode="drag"
              className="max-w-xl mx-auto"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Hover Mode</h4>
            <p className="text-sm text-muted-foreground mb-3">Move mouse to reveal comparison.</p>
            <Compare
              firstImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&auto=format"
              secondImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&sat=-100&auto=format"
              slideMode="hover"
              className="max-w-xl mx-auto"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Side-by-Side Comparison</h4>
            <p className="text-sm text-muted-foreground mb-3">Static version for simple comparisons.</p>
            <CompareSimple
              firstImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop&auto=format"
              secondImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop&sat=-100&auto=format"
              firstLabel="Color"
              secondLabel="B&W"
              className="max-w-lg mx-auto"
            />
          </div>
        </div>
      </ComponentShowcase>

      {/* Card Stack */}
      <ComponentShowcase
        title="Card Stack"
        description="Stacked cards that auto-rotate or click to navigate. Based on Aceternity UI with papercraft styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Auto-Rotating Stack</h4>
            <p className="text-sm text-muted-foreground mb-3">Cards cycle automatically every 5 seconds.</p>
            <div className="flex justify-center py-8">
              <CardStack
                items={[
                  {
                    id: 1,
                    name: "Sarah Chen",
                    designation: "Designer",
                    content: (
                      <p>
                        "These papercraft assets transformed my project. The attention to detail
                        is incredible!"
                      </p>
                    ),
                  },
                  {
                    id: 2,
                    name: "Marcus Johnson",
                    designation: "Developer",
                    content: (
                      <p>
                        "Perfect for creating warm, inviting interfaces. Highly recommended for
                        any creative project."
                      </p>
                    ),
                  },
                  {
                    id: 3,
                    name: "Emily Brooks",
                    designation: "Art Director",
                    content: (
                      <p>
                        "The craftsmanship in these vectors is outstanding. They bring a unique
                        tactile quality to digital design."
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Click to Navigate</h4>
            <p className="text-sm text-muted-foreground mb-3">Click on background cards to bring them forward.</p>
            <div className="flex justify-center py-8">
              <CardStackSimple
                items={[
                  {
                    id: 1,
                    name: "Feature One",
                    content: <p>500+ hand-crafted vector illustrations ready for immediate use.</p>,
                  },
                  {
                    id: 2,
                    name: "Feature Two",
                    content: <p>Organized into 12 categories for easy browsing and selection.</p>,
                  },
                  {
                    id: 3,
                    name: "Feature Three",
                    content: <p>Regular updates with new assets added every month.</p>,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Timeline */}
      <ComponentShowcase
        title="Timeline"
        description="Scroll-based vertical timeline with animated progress. Based on Aceternity UI with amber accent styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Simple Timeline</h4>
            <p className="text-sm text-muted-foreground mb-3">Non-animated vertical timeline.</p>
            <TimelineSimple
              data={[
                {
                  title: "2024",
                  content: (
                    <p className="text-muted-foreground text-sm">
                      Launched the complete papercraft asset pack with 500+ vectors.
                    </p>
                  ),
                },
                {
                  title: "2023",
                  content: (
                    <p className="text-muted-foreground text-sm">
                      Started developing the unique papercraft design system.
                    </p>
                  ),
                },
                {
                  title: "2022",
                  content: (
                    <p className="text-muted-foreground text-sm">
                      Initial concept and style exploration for warm, tactile aesthetics.
                    </p>
                  ),
                },
              ]}
              className="max-w-md"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Horizontal Timeline</h4>
            <p className="text-sm text-muted-foreground mb-3">For displaying events in a horizontal flow.</p>
            <TimelineHorizontal
              data={[
                { title: "Jan", content: "Project kickoff" },
                { title: "Mar", content: "Design phase" },
                { title: "Jun", content: "Development" },
                { title: "Sep", content: "Launch!" },
              ]}
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The full scroll-animated Timeline component works best in
              full-page layouts. Use TimelineSimple for component library demos and smaller sections.
            </p>
          </div>
        </div>
      </ComponentShowcase>

      {/* Spotlight */}
      <ComponentShowcase
        title="Spotlight"
        description="Animated ambient glow background effect. Based on Aceternity UI with warm amber/orange lantern styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Single Spotlight</h4>
            <p className="text-sm text-muted-foreground mb-3">Warm animated glow perfect for hero sections.</p>
            <Spotlight
              className="h-64 flex items-center justify-center"
              containerClassName="rounded-lg border border-border"
              size={300}
              duration={5}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">Hero Content</h3>
                <p className="text-muted-foreground mt-2">Spotlight animates behind the content</p>
              </div>
            </Spotlight>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Multi Spotlight</h4>
            <p className="text-sm text-muted-foreground mb-3">Multiple spotlights for dramatic effect.</p>
            <MultiSpotlight
              className="h-64 flex items-center justify-center"
              containerClassName="rounded-lg border border-border"
              spotlights={[
                { fill: "#fcd34d", size: 300, position: "top-left", delay: 0 },
                { fill: "#fdba74", size: 250, position: "top-right", delay: 1.5 },
                { fill: "#fde68a", size: 200, position: "bottom-left", delay: 3 },
              ]}
              duration={6}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">Multiple Glows</h3>
                <p className="text-muted-foreground mt-2">Three animated spotlights at different positions</p>
              </div>
            </MultiSpotlight>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Spotlight Card</h4>
            <p className="text-sm text-muted-foreground mb-3">Spotlight follows your cursor on hover.</p>
            <div className="flex justify-center gap-4">
              <SpotlightCard className="w-64" fill="#fcd34d" size={150}>
                <div className="p-6">
                  <h4 className="font-semibold text-foreground">Hover Me</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    The spotlight follows your cursor.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="w-64" fill="#fdba74" size={200}>
                <div className="p-6">
                  <h4 className="font-semibold text-foreground">Orange Glow</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Custom color and larger size.
                  </p>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Dot Pattern */}
      <ComponentShowcase
        title="Dot Pattern"
        description="Perforated paper dot pattern background. Based on Magic UI's DotPattern with warm amber styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Dot Pattern</h4>
            <div className="relative h-48 rounded-lg overflow-hidden bg-muted border border-border">
              <DotPattern className="opacity-50" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Content over dot pattern</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Glowing Dots</h4>
            <p className="text-sm text-muted-foreground mb-3">Dots animate with a subtle glow effect.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-muted border border-border">
              <DotPattern glow className="opacity-60" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Animated glow effect</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Dense Dots</h4>
            <p className="text-sm text-muted-foreground mb-3">Smaller spacing for denser pattern.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-muted border border-border">
              <DotPattern width={10} height={10} className="opacity-40" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Dense dot pattern</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Grid Pattern */}
      <ComponentShowcase
        title="Grid Pattern"
        description="Graph paper grid pattern background. Perfect for craft/technical aesthetics."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Grid Pattern</h4>
            <div className="relative h-48 rounded-lg overflow-hidden bg-card border border-border">
              <GridPattern className="opacity-60" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Content over grid pattern</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Dense Grid</h4>
            <p className="text-sm text-muted-foreground mb-3">Smaller grid cells.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-card border border-border">
              <GridPattern width={20} height={20} className="opacity-50" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Dense grid pattern</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Large Grid</h4>
            <p className="text-sm text-muted-foreground mb-3">Larger grid cells for subtle effect.</p>
            <div className="relative h-48 rounded-lg overflow-hidden bg-card border border-border">
              <GridPattern width={60} height={60} strokeWidth={2} className="opacity-40" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Large grid pattern</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Texture Overlay */}
      <ComponentShowcase
        title="Texture Overlay"
        description="CSS-based paper texture overlays. Based on Cult UI's TextureOverlay with warm amber tinting for authentic paper feel."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Paper Grain (Default)</h4>
            <div className="relative h-48 rounded-lg overflow-hidden border border-border">
              <div className="absolute inset-0 bg-[var(--paper-cream)]" />
              <TextureOverlay texture="paperGrain" opacity={0.8} />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Natural paper grain texture</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Texture Types</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="dots" opacity={0.6} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Dots</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="grid" opacity={0.5} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Grid</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="crosshatch" opacity={0.4} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Crosshatch</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="linen" opacity={0.6} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Linen</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="canvas" opacity={0.5} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Canvas</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="noise" opacity={0.3} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Noise</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="diagonalLines" opacity={0.4} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Diagonal</p>
                </div>
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-muted" />
                <TextureOverlay texture="horizontalLines" opacity={0.4} />
                <div className="relative z-10 flex items-end justify-center h-full pb-2">
                  <p className="text-xs text-muted-foreground">Horizontal</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Kraft Paper Effect</h4>
            <div className="relative h-48 rounded-lg overflow-hidden border border-border">
              <div className="absolute inset-0 bg-accent" />
              <TextureOverlay texture="paperGrain" opacity={1} />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-foreground font-medium">Brown kraft paper style</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Wavy Background */}
      <ComponentShowcase
        title="Wavy Background"
        description="Animated wave background using Canvas and simplex-noise. Based on Aceternity UI with warm amber color scheme."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Animated Waves</h4>
            <p className="text-sm text-muted-foreground mb-3">Canvas-based smooth wave animation.</p>
            <div className="relative h-64 rounded-lg overflow-hidden border border-border">
              <WavyBackground
                className="flex items-center justify-center h-full"
                containerClassName="h-full"
                blur={6}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground">Hero Content</h3>
                  <p className="text-muted-foreground mt-2">Content appears above the waves</p>
                </div>
              </WavyBackground>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Simple Wave (Static SVG)</h4>
            <p className="text-sm text-muted-foreground mb-3">Non-animated version for lighter weight.</p>
            <div className="rounded-lg overflow-hidden border border-border">
              <WavyBackgroundSimple className="py-16">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">Static Waves</h3>
                  <p className="text-muted-foreground mt-1">SVG-based wave decoration</p>
                </div>
              </WavyBackgroundSimple>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Custom Wave Color</h4>
            <div className="rounded-lg overflow-hidden border border-border">
              <WavyBackgroundSimple
                className="py-12"
                waveColor="#fdba74"
                backgroundColor="#fffbf5"
              >
                <div className="text-center">
                  <p className="text-foreground font-medium">Orange wave variation</p>
                </div>
              </WavyBackgroundSimple>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* 3D Card */}
      <ComponentShowcase
        title="3D Card"
        description="Interactive 3D tilt effect card that responds to mouse position. Based on Aceternity UI with warm amber glare."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default 3D Card</h4>
            <p className="text-sm text-muted-foreground mb-3">Hover to see the tilt effect with glare.</p>
            <div className="flex justify-center">
              <Card3D className="w-72">
                <Card3DContent className="p-6">
                  <h4 className="font-semibold text-foreground">Premium Pack</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hover over this card to see it tilt and follow your cursor.
                  </p>
                  <Button size="sm" className="mt-4">Explore</Button>
                </Card3DContent>
              </Card3D>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">3D Card with Items</h4>
            <p className="text-sm text-muted-foreground mb-3">Elements inside can have different depth levels.</p>
            <div className="flex justify-center">
              <Card3D className="w-80">
                <Card3DContent className="p-6">
                  <Card3DItem translateZ={20}>
                    <Badge variant="secondary">Featured</Badge>
                  </Card3DItem>
                  <Card3DItem translateZ={40} className="mt-3">
                    <h4 className="text-xl font-bold text-foreground">Asset Collection</h4>
                  </Card3DItem>
                  <Card3DItem translateZ={30} className="mt-2">
                    <p className="text-sm text-muted-foreground">
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
            <h4 className="text-sm font-medium text-foreground mb-3">Simple 3D Card</h4>
            <p className="text-sm text-muted-foreground mb-3">Quick one-liner API for simple use cases.</p>
            <div className="flex justify-center gap-4">
              <Card3DSimple className="w-48 h-32 flex items-center justify-center">
                <Palette className="w-8 h-8 text-primary" />
              </Card3DSimple>
              <Card3DSimple className="w-48 h-32 flex items-center justify-center" glare={false}>
                <Layers className="w-8 h-8 text-primary" />
              </Card3DSimple>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Expandable Card */}
      <ComponentShowcase
        title="Expandable Card"
        description="Cards that expand to reveal more content with smooth animations. Based on Cult UI with tissue paper backdrop."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Click to Expand</h4>
            <p className="text-sm text-muted-foreground mb-3">Click any card to see it expand with full details.</p>
            <ExpandableCards className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ExpandableCard
                title="Icon Pack"
                description="200+ unique icons"
                thumbnail="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=250&fit=crop&auto=format"
              >
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    A comprehensive collection of hand-drawn icons perfect for any project.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
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
                  <p className="text-muted-foreground">
                    Beautiful illustrations for landing pages, apps, and presentations.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
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
                  <p className="text-muted-foreground">
                    Seamless patterns for backgrounds, textures, and decorative elements.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
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
            <h4 className="text-sm font-medium text-foreground mb-3">Simple Inline Expand</h4>
            <p className="text-sm text-muted-foreground mb-3">Accordion-style expansion without overlay.</p>
            <div className="max-w-md space-y-3">
              <ExpandableCardSimple title="What's included?" preview="500+ vector assets">
                <p className="text-sm text-muted-foreground">
                  This pack includes over 500 carefully crafted vector assets including icons,
                  illustrations, patterns, and decorative elements. All files come in SVG,
                  PNG, and source format.
                </p>
              </ExpandableCardSimple>
              <ExpandableCardSimple title="License details" preview="Commercial use allowed">
                <p className="text-sm text-muted-foreground">
                  All assets come with a commercial license allowing unlimited use in personal
                  and commercial projects. No attribution required.
                </p>
              </ExpandableCardSimple>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Parallax Scroll */}
      <ComponentShowcase
        title="Parallax Scroll"
        description="Scroll-based parallax effects for dynamic content. Based on Aceternity UI with papercraft styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Simple Parallax</h4>
            <p className="text-sm text-muted-foreground mb-3">Content moves at a different rate than scroll.</p>
            <div className="h-48 rounded-lg overflow-hidden border border-border bg-gradient-to-b from-muted to-accent">
              <ParallaxScrollSimple className="h-full" speed={0.3}>
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Package className="w-12 h-12 text-primary" />
                  <h4 className="text-xl font-semibold text-foreground">Scroll to see effect</h4>
                  <p className="text-muted-foreground">This content moves slower than the scroll</p>
                </div>
              </ParallaxScrollSimple>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Parallax Card</h4>
            <p className="text-sm text-muted-foreground mb-3">Card with parallax background image.</p>
            <ParallaxCard
              backgroundImage="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=400&fit=crop&auto=format"
              className="h-64 max-w-lg mx-auto"
              speed={0.4}
            >
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h4 className="text-xl font-bold text-white">Featured Collection</h4>
                  <p className="text-primary-foreground/70 mt-1">Scroll to see the parallax background effect</p>
                </div>
              </div>
            </ParallaxCard>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The full multi-column ParallaxScroll component requires
              more vertical space (200vh+). Use ParallaxScrollSimple or ParallaxCard for
              smaller sections like this demo.
            </p>
          </div>
        </div>
      </ComponentShowcase>

      {/* Squiggle Decorations */}
      <ComponentShowcase
        title="Squiggle Decorations"
        description="Hand-drawn SVG squiggles with organic, craft-like appearance. Perfect for annotations and decorative elements."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Arrow Variants</h4>
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <SquiggleArrow variant="wavy" direction="right" />
                <p className="text-xs text-muted-foreground mt-2">Wavy</p>
              </div>
              <div className="text-center">
                <SquiggleArrow variant="bouncy" direction="right" />
                <p className="text-xs text-muted-foreground mt-2">Bouncy</p>
              </div>
              <div className="text-center">
                <SquiggleArrow variant="smooth" direction="right" />
                <p className="text-xs text-muted-foreground mt-2">Smooth</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Directions</h4>
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <SquiggleArrow direction="right" />
                <p className="text-xs text-muted-foreground mt-2">Right</p>
              </div>
              <div className="text-center">
                <SquiggleArrow direction="left" />
                <p className="text-xs text-muted-foreground mt-2">Left</p>
              </div>
              <div className="text-center">
                <SquiggleArrow direction="up" />
                <p className="text-xs text-muted-foreground mt-2">Up</p>
              </div>
              <div className="text-center">
                <SquiggleArrow direction="down" />
                <p className="text-xs text-muted-foreground mt-2">Down</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <SquiggleArrow size="sm" />
                <p className="text-xs text-muted-foreground mt-2">Small</p>
              </div>
              <div className="text-center">
                <SquiggleArrow size="default" />
                <p className="text-xs text-muted-foreground mt-2">Default</p>
              </div>
              <div className="text-center">
                <SquiggleArrow size="lg" />
                <p className="text-xs text-muted-foreground mt-2">Large</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">In Context</h4>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Check this out</span>
              <SquiggleArrow variant="bouncy" className="text-primary" />
              <Button>Click Me</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Squiggle Underline</h4>
            <div className="flex flex-wrap gap-6">
              <SquiggleUnderline>Important Text</SquiggleUnderline>
              <SquiggleUnderline variant="double" className="text-primary">Double Line</SquiggleUnderline>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Squiggle Circle</h4>
            <div className="flex flex-wrap gap-6">
              <SquiggleCircle>Circled!</SquiggleCircle>
              <SquiggleCircle className="text-orange-600">Highlight</SquiggleCircle>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Kbd */}
      <ComponentShowcase
        title="Kbd (Keyboard)"
        description="Typewriter key or label maker style for keyboard shortcuts."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Typewriter Style (Default)</p>
            <div className="flex flex-wrap items-center gap-2">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
              <span className="text-muted-foreground mx-1">or</span>
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>Shift</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>P</Kbd>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Label Maker Style</p>
            <div className="flex flex-wrap items-center gap-2">
              <Kbd variant="outline">Enter</Kbd>
              <Kbd variant="outline">Space</Kbd>
              <Kbd variant="outline">Esc</Kbd>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Ghost Style</p>
            <p className="text-sm text-muted-foreground">
              Press <Kbd variant="ghost">⌘</Kbd> + <Kbd variant="ghost">S</Kbd> to save
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Sizes</p>
            <div className="flex items-center gap-3">
              <Kbd size="sm">sm</Kbd>
              <Kbd size="default">default</Kbd>
              <Kbd size="lg">lg</Kbd>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

function AnimatedBeamShowcase() {
  const containerRef = useRef(null)
  const fromRef = useRef(null)
  const toRef = useRef(null)

  return (
    <ComponentShowcase
      title="Animated Beam"
      description="Animated SVG connection beams between elements. Great for showing flow or connections."
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Connection Beam</h4>
          <div
            ref={containerRef}
            className="relative flex items-center justify-between p-8 bg-muted rounded-lg border border-border h-32"
          >
            <div
              ref={fromRef}
              className="z-10 flex items-center justify-center w-16 h-16 bg-white rounded-lg border-2 border-border shadow-md"
            >
              <CircleDot className="w-8 h-8 text-primary" />
            </div>
            <div
              ref={toRef}
              className="z-10 flex items-center justify-center w-16 h-16 bg-white rounded-lg border-2 border-border shadow-md"
            >
              <CircleDot className="w-8 h-8 text-primary" />
            </div>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={fromRef}
              toRef={toRef}
              curvature={-50}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            The AnimatedBeam connects two referenced elements with an animated gradient path.
            Use refs to mark the start and end points within a relative container.
          </p>
        </div>
      </div>
    </ComponentShowcase>
  )
}

export { EffectsSection }
