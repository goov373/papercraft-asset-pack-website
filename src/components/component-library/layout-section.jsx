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
import { MoreHorizontalIcon, Palette, Layers, Sparkles, Star } from "lucide-react"

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
    </div>
  )
}

export { LayoutSection }
