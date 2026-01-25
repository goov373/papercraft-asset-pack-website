import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DownloadIcon, HeartIcon, ShareIcon, TrashIcon } from "lucide-react"

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

function ActionsSection() {
  return (
    <div>
      <ComponentShowcase
        title="Button"
        description="Papercraft-styled button with elevation shadows, hover lift effect, and active press animation."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Variants</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Icons</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Icon Only</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">States</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Variants</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Special Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="sticky">Sticky Note</Badge>
              <Badge variant="torn">Torn Edge</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Icons</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">As Links</h4>
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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Use Cases</h4>
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
    </div>
  )
}

export { ActionsSection }
