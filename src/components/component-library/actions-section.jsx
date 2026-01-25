import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextureButton } from "@/components/ui/texture-button"
import { SquiggleArrow, SquiggleUnderline, SquiggleCircle } from "@/components/ui/squiggle-arrow"
import { NeumorphBadge, NeumorphTag, NeumorphPill } from "@/components/ui/neumorph-badge"
import {
  DirectionAwareTabs,
  DirectionAwareTabsList,
  DirectionAwareTabsTrigger,
  DirectionAwareTabsContent,
  DirectionAwareTabsSimple,
} from "@/components/ui/direction-aware-tabs"
import { FloatingDockStatic } from "@/components/ui/floating-dock"
import { DownloadIcon, HeartIcon, ShareIcon, TrashIcon, ArrowRight, Check, X, Home, Search, Settings, User, Bell, Palette } from "lucide-react"

function ComponentShowcase({ title, description, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="bg-white/50 rounded-lg p-6 border border-amber-200">
        {children}
      </div>
    </div>
  )
}

function ActionsSection() {
  return (
    <div>
      <ComponentShowcase
        title="Button"
        description="Papercraft-styled button with elevation shadows, hover lift effect, and active press animation."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Button>
                <DownloadIcon />
                Download
              </Button>
              <Button variant="secondary">
                <HeartIcon />
                Like
              </Button>
              <Button variant="outline">
                <ShareIcon />
                Share
              </Button>
              <Button variant="destructive">
                <TrashIcon />
                Delete
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Icon Only</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="icon-xs">
                <HeartIcon />
              </Button>
              <Button size="icon-sm">
                <HeartIcon />
              </Button>
              <Button size="icon">
                <HeartIcon />
              </Button>
              <Button size="icon-lg">
                <HeartIcon />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">States</h4>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Badge"
        description="Small label components with subtle paper treatment and multiple variants for different contexts."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="link">Link</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Special Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="sticky">Sticky Note</Badge>
              <Badge variant="torn">Torn Edge</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">
                <HeartIcon className="size-3" />
                Popular
              </Badge>
              <Badge variant="secondary">
                <DownloadIcon className="size-3" />
                Download
              </Badge>
              <Badge variant="destructive">
                <TrashIcon className="size-3" />
                Deleted
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">As Links</h4>
            <div className="flex flex-wrap gap-3">
              <Badge asChild variant="default">
                <a href="#">Clickable Default</a>
              </Badge>
              <Badge asChild variant="secondary">
                <a href="#">Clickable Secondary</a>
              </Badge>
              <Badge asChild variant="outline">
                <a href="#">Clickable Outline</a>
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Use Cases</h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">New</Badge>
              <Badge variant="default">Featured</Badge>
              <Badge variant="destructive">Sale</Badge>
              <Badge variant="outline">Coming Soon</Badge>
              <Badge variant="sticky">Note</Badge>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Texture Button"
        description="Neumorphic tactile button with layered gradients. Based on Cult UI's TextureButton with papercraft amber styling."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <TextureButton variant="craft">Craft (Default)</TextureButton>
              <TextureButton variant="primary">Primary</TextureButton>
              <TextureButton variant="secondary">Secondary</TextureButton>
              <TextureButton variant="accent">Accent</TextureButton>
              <TextureButton variant="ghost">Ghost</TextureButton>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <TextureButton size="sm">Small</TextureButton>
              <TextureButton size="default">Default</TextureButton>
              <TextureButton size="lg">Large</TextureButton>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <TextureButton>
                <DownloadIcon className="size-4 mr-2" />
                Download Pack
              </TextureButton>
              <TextureButton variant="accent">
                <HeartIcon className="size-4 mr-2" />
                Save Favorite
              </TextureButton>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Comparison</h4>
            <p className="text-sm text-muted-foreground mb-3">TextureButton vs regular Button</p>
            <div className="flex flex-wrap items-center gap-4">
              <TextureButton>Texture Button</TextureButton>
              <Button>Regular Button</Button>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Squiggle Arrow"
        description="Hand-drawn SVG arrows with organic, craft-like appearance. Perfect for pointing to CTAs or annotations."
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
              <SquiggleArrow variant="bouncy" className="text-amber-500" />
              <Button>Click Me</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Squiggle Underline</h4>
            <div className="flex flex-wrap gap-6">
              <SquiggleUnderline>Important Text</SquiggleUnderline>
              <SquiggleUnderline variant="double" className="text-amber-700">Double Line</SquiggleUnderline>
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

      <ComponentShowcase
        title="Neumorph Badge"
        description="Soft neumorphic badges with embossed appearance. Based on Cult UI's NeumorphEyebrow with warm papercraft styling."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <NeumorphBadge variant="default">DEFAULT</NeumorphBadge>
              <NeumorphBadge variant="highlight">HIGHLIGHT</NeumorphBadge>
              <NeumorphBadge variant="accent">ACCENT</NeumorphBadge>
              <NeumorphBadge variant="success">SUCCESS</NeumorphBadge>
              <NeumorphBadge variant="muted">MUTED</NeumorphBadge>
              <NeumorphBadge variant="kraft">KRAFT</NeumorphBadge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <NeumorphBadge size="xs">EXTRA SMALL</NeumorphBadge>
              <NeumorphBadge size="sm">SMALL</NeumorphBadge>
              <NeumorphBadge size="default">DEFAULT</NeumorphBadge>
              <NeumorphBadge size="lg">LARGE</NeumorphBadge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Neumorph Tags</h4>
            <p className="text-sm text-muted-foreground mb-3">Tags with optional remove button.</p>
            <div className="flex flex-wrap gap-3">
              <NeumorphTag>Vector</NeumorphTag>
              <NeumorphTag variant="highlight">Premium</NeumorphTag>
              <NeumorphTag onRemove={() => {}}>Removable</NeumorphTag>
              <NeumorphTag variant="accent" onRemove={() => {}}>Category</NeumorphTag>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Neumorph Pills</h4>
            <p className="text-sm text-muted-foreground mb-3">Pill-shaped with optional status dot.</p>
            <div className="flex flex-wrap gap-3">
              <NeumorphPill>Status</NeumorphPill>
              <NeumorphPill dot>Active</NeumorphPill>
              <NeumorphPill variant="success" dot dotColor="bg-emerald-500">Online</NeumorphPill>
              <NeumorphPill variant="accent" dot dotColor="bg-orange-500">Pending</NeumorphPill>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Comparison</h4>
            <p className="text-sm text-muted-foreground mb-3">NeumorphBadge vs regular Badge</p>
            <div className="flex flex-wrap items-center gap-4">
              <NeumorphBadge>NEUMORPH</NeumorphBadge>
              <Badge>Regular Badge</Badge>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Direction Aware Tabs"
        description="Tabs with direction-aware sliding indicator. Based on Cult UI with warm amber indicator styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Tabs</h4>
            <p className="text-sm text-muted-foreground mb-3">Notice how the indicator slides based on direction.</p>
            <DirectionAwareTabs defaultValue="overview">
              <DirectionAwareTabsList>
                <DirectionAwareTabsTrigger value="overview">Overview</DirectionAwareTabsTrigger>
                <DirectionAwareTabsTrigger value="features">Features</DirectionAwareTabsTrigger>
                <DirectionAwareTabsTrigger value="pricing">Pricing</DirectionAwareTabsTrigger>
              </DirectionAwareTabsList>
              <DirectionAwareTabsContent value="overview">
                <p className="text-muted-foreground">
                  Welcome to the overview section. This tab system provides a smooth,
                  direction-aware animation when switching between tabs.
                </p>
              </DirectionAwareTabsContent>
              <DirectionAwareTabsContent value="features">
                <ul className="text-muted-foreground space-y-2">
                  <li>• 500+ vector assets</li>
                  <li>• SVG and PNG formats</li>
                  <li>• Commercial license</li>
                  <li>• Regular updates</li>
                </ul>
              </DirectionAwareTabsContent>
              <DirectionAwareTabsContent value="pricing">
                <div className="text-muted-foreground">
                  <p className="font-semibold">$49 one-time</p>
                  <p className="text-sm mt-1">Lifetime access with free updates</p>
                </div>
              </DirectionAwareTabsContent>
            </DirectionAwareTabs>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">More Tabs</h4>
            <p className="text-sm text-muted-foreground mb-3">Works with any number of tabs.</p>
            <DirectionAwareTabs defaultValue="icons">
              <DirectionAwareTabsList>
                <DirectionAwareTabsTrigger value="icons">Icons</DirectionAwareTabsTrigger>
                <DirectionAwareTabsTrigger value="illustrations">Illustrations</DirectionAwareTabsTrigger>
                <DirectionAwareTabsTrigger value="patterns">Patterns</DirectionAwareTabsTrigger>
                <DirectionAwareTabsTrigger value="mockups">Mockups</DirectionAwareTabsTrigger>
              </DirectionAwareTabsList>
              <DirectionAwareTabsContent value="icons">
                <p className="text-muted-foreground">200+ unique icons in multiple styles.</p>
              </DirectionAwareTabsContent>
              <DirectionAwareTabsContent value="illustrations">
                <p className="text-muted-foreground">150+ hand-crafted scene illustrations.</p>
              </DirectionAwareTabsContent>
              <DirectionAwareTabsContent value="patterns">
                <p className="text-muted-foreground">50+ seamless background patterns.</p>
              </DirectionAwareTabsContent>
              <DirectionAwareTabsContent value="mockups">
                <p className="text-muted-foreground">25+ presentation mockup templates.</p>
              </DirectionAwareTabsContent>
            </DirectionAwareTabs>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Simple API</h4>
            <p className="text-sm text-muted-foreground mb-3">Simplified version with array of tabs.</p>
            <DirectionAwareTabsSimple
              tabs={[
                { value: "day", label: "Day", content: <p className="text-muted-foreground">Daily view content</p> },
                { value: "week", label: "Week", content: <p className="text-muted-foreground">Weekly view content</p> },
                { value: "month", label: "Month", content: <p className="text-muted-foreground">Monthly view content</p> },
              ]}
            />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Floating Dock"
        description="macOS-style dock navigation with magnification effect. Based on Aceternity UI with paper tray styling."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Static Dock</h4>
            <p className="text-sm text-muted-foreground mb-3">Hover over icons to see the magnification effect.</p>
            <div className="flex justify-center">
              <FloatingDockStatic
                items={[
                  { icon: <Home className="w-full h-full" />, label: "Home", href: "#" },
                  { icon: <Search className="w-full h-full" />, label: "Search", href: "#" },
                  { icon: <Palette className="w-full h-full" />, label: "Gallery", href: "#" },
                  { icon: <Bell className="w-full h-full" />, label: "Notifications", href: "#" },
                  { icon: <User className="w-full h-full" />, label: "Profile", href: "#" },
                  { icon: <Settings className="w-full h-full" />, label: "Settings", href: "#" },
                ]}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Fewer Items</h4>
            <div className="flex justify-center">
              <FloatingDockStatic
                items={[
                  { icon: <Home className="w-full h-full" />, label: "Home", href: "#" },
                  { icon: <HeartIcon className="w-full h-full" />, label: "Favorites", href: "#" },
                  { icon: <DownloadIcon className="w-full h-full" />, label: "Downloads", href: "#" },
                ]}
              />
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The full FloatingDock component is fixed-positioned for
              actual navigation. Use FloatingDockStatic for inline demos like this. The dock
              includes a mobile variant that appears as an expandable FAB.
            </p>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { ActionsSection }
