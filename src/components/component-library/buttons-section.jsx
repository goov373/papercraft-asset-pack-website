import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextureButton } from "@/components/ui/texture-button"
import { NeumorphBadge, NeumorphTag, NeumorphPill } from "@/components/ui/neumorph-badge"
import { DownloadIcon, HeartIcon, ShareIcon, TrashIcon } from "lucide-react"

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

function ButtonsSection() {
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
    </div>
  )
}

export { ButtonsSection }
