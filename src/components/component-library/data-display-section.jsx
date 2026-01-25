import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/ui/star-rating"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Marquee, MarqueeContainer, MarqueeItem } from "@/components/ui/marquee"
import { NumberTicker } from "@/components/ui/number-ticker"

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

// Sample data for table
const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
]

function DataDisplaySection() {
  return (
    <div>
      {/* Separator Component */}
      <ComponentShowcase
        title="Separator"
        description="Visual dividers styled as paper fold lines, torn edges, or cut marks. Like natural divisions on a sheet of paper."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default (Fold Line)</h4>
            <p className="text-sm text-muted-foreground mb-4">A subtle paper fold line divider.</p>
            <div className="py-4">
              <p className="text-sm mb-4">Content above the separator</p>
              <Separator />
              <p className="text-sm mt-4">Content below the separator</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variant: Fold</h4>
            <p className="text-sm text-muted-foreground mb-4">Paper crease with shadow effect.</p>
            <div className="py-4">
              <Separator variant="fold" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variant: Torn</h4>
            <p className="text-sm text-muted-foreground mb-4">Rough paper tear edge.</p>
            <div className="py-4">
              <Separator variant="torn" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variant: Cut</h4>
            <p className="text-sm text-muted-foreground mb-4">Clean paper cut with subtle shadow.</p>
            <div className="py-4">
              <Separator variant="cut" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variant: Dashed</h4>
            <p className="text-sm text-muted-foreground mb-4">Scissors cut guide line.</p>
            <div className="py-4">
              <Separator variant="dashed" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variant: Dotted</h4>
            <p className="text-sm text-muted-foreground mb-4">Perforation line for tearing.</p>
            <div className="py-4">
              <Separator variant="dotted" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Vertical Orientation</h4>
            <p className="text-sm text-muted-foreground mb-4">Separators can also be vertical.</p>
            <div className="flex h-20 items-center gap-4">
              <span>Left</span>
              <Separator orientation="vertical" />
              <span>Center</span>
              <Separator orientation="vertical" variant="dashed" />
              <span>Right</span>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Table Component */}
      <ComponentShowcase
        title="Table"
        description="Data tables styled as notebook paper with ruled lines. Like a ledger or grid paper worksheet."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Table</h4>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.method}</TableCell>
                    <TableCell className="text-right">{invoice.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$1,750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Interactive Rows</h4>
            <p className="text-sm text-muted-foreground mb-4">Hover over rows to see the paper lift effect.</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Papercraft Animals Pack</TableCell>
                  <TableCell>Illustrations</TableCell>
                  <TableCell className="text-right">$29.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Origami Textures</TableCell>
                  <TableCell>Textures</TableCell>
                  <TableCell className="text-right">$19.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Paper Elements Bundle</TableCell>
                  <TableCell>Bundles</TableCell>
                  <TableCell className="text-right">$49.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentShowcase>

      {/* ScrollArea Component */}
      <ComponentShowcase
        title="Scroll Area"
        description="Scrollable containers with paper-styled scrollbars. Like a stack of papers in a document tray."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Vertical Scroll</h4>
            <p className="text-sm text-muted-foreground mb-4">Scroll through content with paper-edge scrollbar.</p>
            <ScrollArea className="h-48 w-full rounded-md border border-amber-200 p-4">
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="p-3 rounded bg-background/50 border border-amber-100">
                    <p className="text-sm font-medium">Item {i + 1}</p>
                    <p className="text-xs text-muted-foreground">This is a scrollable paper item in the list.</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Horizontal Scroll</h4>
            <p className="text-sm text-muted-foreground mb-4">Horizontal scrolling for wide content.</p>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-amber-200 p-4">
              <div className="flex gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-40 shrink-0 p-3 rounded bg-amber-50/50 border border-amber-100">
                    <p className="text-sm font-medium">Card {i + 1}</p>
                    <p className="text-xs text-muted-foreground">Horizontal scroll item</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Long Text Content</h4>
            <ScrollArea className="h-32 w-full rounded-md border border-amber-200 p-4">
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </ScrollArea>
          </div>
        </div>
      </ComponentShowcase>

      {/* Collapsible Component */}
      <ComponentShowcase
        title="Collapsible"
        description="Expandable sections that fold open like paper. Content reveals with a paper-unfold animation."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Collapsible</h4>
            <p className="text-sm text-muted-foreground mb-4">Click to expand/collapse the content.</p>
            <Collapsible className="w-full max-w-md">
              <CollapsibleTrigger>
                <span>What file formats are included?</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="pt-3 text-sm text-muted-foreground">
                  All asset packs include SVG, PNG (multiple sizes), and PDF formats.
                  Some packs also include editable source files in Adobe Illustrator (.ai) format.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Multiple Collapsibles (FAQ Style)</h4>
            <div className="space-y-3 max-w-md">
              <Collapsible>
                <CollapsibleTrigger>
                  <span>Can I use these for commercial projects?</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="pt-3 text-sm text-muted-foreground">
                    Yes! All our assets come with a commercial license that allows use in
                    client projects, products for sale, and marketing materials.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger>
                  <span>How do I download my purchase?</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="pt-3 text-sm text-muted-foreground">
                    After purchase, you'll receive an email with download links. You can also
                    access your purchases anytime from your account dashboard.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger>
                  <span>Do you offer refunds?</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="pt-3 text-sm text-muted-foreground">
                    Due to the digital nature of our products, we generally don't offer refunds.
                    However, if you experience any issues, please contact our support team.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Avatar Component */}
      <ComponentShowcase
        title="Avatar"
        description="Display user profile images with fallback initials. Commonly used in testimonials and user interfaces."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Image</h4>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">shadcn</p>
                <p className="text-sm text-muted-foreground">@shadcn</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Fallback Initials</h4>
            <p className="text-sm text-muted-foreground mb-3">When no image is available, shows initials.</p>
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-accent text-accent-foreground">MJ</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-destructive/10 text-destructive">ER</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Different Sizes</h4>
            <div className="flex items-end gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="size-10">
                <AvatarFallback className="text-sm">MD</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Avatar className="size-16">
                <AvatarFallback className="text-lg">XL</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Avatar Group</h4>
            <p className="text-sm text-muted-foreground mb-3">Overlapping avatars for showing multiple users.</p>
            <div className="flex -space-x-3">
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-secondary text-secondary-foreground">B</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-accent text-accent-foreground">C</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-muted text-muted-foreground">+5</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">In Testimonial Card</h4>
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border max-w-sm">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Graphic Designer</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Star Rating Component */}
      <ComponentShowcase
        title="Star Rating"
        description="Display ratings using filled and unfilled stars. Used in testimonials and product reviews."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Full Ratings</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span className="text-sm text-muted-foreground">5 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={4} />
                <span className="text-sm text-muted-foreground">4 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={3} />
                <span className="text-sm text-muted-foreground">3 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={2} />
                <span className="text-sm text-muted-foreground">2 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={1} />
                <span className="text-sm text-muted-foreground">1 star</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Different Sizes</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <StarRating rating={5} className="[&>svg]:size-3" />
                <span className="text-sm text-muted-foreground">Small</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={5} className="[&>svg]:size-6" />
                <span className="text-sm text-muted-foreground">Large</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">In Context</h4>
            <div className="p-4 bg-card rounded-lg border border-border max-w-md">
              <StarRating rating={5} className="mb-3" />
              <blockquote className="text-foreground mb-4">
                "These papercraft assets saved me hours of work. The quality is incredible!"
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">Graphic Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Marquee Component */}
      <ComponentShowcase
        title="Marquee"
        description="Infinite scrolling content display. Perfect for logo bars, testimonials, or showcasing items in a continuous loop."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Marquee</h4>
            <p className="text-sm text-muted-foreground mb-4">Horizontal infinite scroll with pause on hover.</p>
            <MarqueeContainer fadeWidth="w-1/6">
              <Marquee pauseOnHover className="[--duration:20s]">
                {["Figma", "Canva", "Adobe", "Sketch", "Framer"].map((brand) => (
                  <MarqueeItem key={brand}>
                    <span className="text-sm font-medium text-muted-foreground">{brand}</span>
                  </MarqueeItem>
                ))}
              </Marquee>
            </MarqueeContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Reverse Direction</h4>
            <p className="text-sm text-muted-foreground mb-4">Marquee scrolling in reverse direction.</p>
            <MarqueeContainer fadeWidth="w-1/6">
              <Marquee reverse pauseOnHover className="[--duration:25s]">
                {["SVG", "PNG", "AI", "EPS", "PDF", "Figma"].map((format) => (
                  <MarqueeItem key={format}>
                    <span className="text-sm font-medium text-muted-foreground">{format}</span>
                  </MarqueeItem>
                ))}
              </Marquee>
            </MarqueeContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Without Fade Edges</h4>
            <p className="text-sm text-muted-foreground mb-4">Full edge-to-edge scrolling without gradient fade.</p>
            <MarqueeContainer fadeEdges={false}>
              <Marquee pauseOnHover className="[--duration:15s]">
                {["Animals", "Nature", "Icons", "Patterns", "Textures"].map((category) => (
                  <MarqueeItem key={category}>
                    <span className="text-sm font-medium text-muted-foreground">{category}</span>
                  </MarqueeItem>
                ))}
              </Marquee>
            </MarqueeContainer>
          </div>
        </div>
      </ComponentShowcase>

      {/* NumberTicker Component */}
      <ComponentShowcase
        title="Number Ticker"
        description="Animated number counter that counts up when scrolled into view. Great for statistics and metrics."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Basic Counter</h4>
            <p className="text-sm text-muted-foreground mb-4">Numbers animate when the element enters the viewport.</p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <NumberTicker value={500} className="text-4xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Assets</p>
              </div>
              <div className="text-center">
                <NumberTicker value={12} className="text-4xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Categories</p>
              </div>
              <div className="text-center">
                <NumberTicker value={6} className="text-4xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Formats</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Decimal Places</h4>
            <p className="text-sm text-muted-foreground mb-4">Display numbers with decimal precision.</p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <NumberTicker value={4.9} decimalPlaces={1} className="text-4xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Rating</p>
              </div>
              <div className="text-center">
                <NumberTicker value={99.5} decimalPlaces={1} className="text-4xl font-bold" />
                <span className="text-2xl font-bold text-muted-foreground">%</span>
                <p className="text-sm text-muted-foreground mt-1">Satisfaction</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Delay</h4>
            <p className="text-sm text-muted-foreground mb-4">Staggered animation with custom delays.</p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <NumberTicker value={150} delay={0} className="text-3xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Illustrations</p>
              </div>
              <div className="text-center">
                <NumberTicker value={200} delay={0.3} className="text-3xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Icons</p>
              </div>
              <div className="text-center">
                <NumberTicker value={50} delay={0.6} className="text-3xl font-bold" />
                <p className="text-sm text-muted-foreground mt-1">Patterns</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { DataDisplaySection }
