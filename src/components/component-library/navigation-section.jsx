import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

function NavigationSection() {
  return (
    <div>
      <ComponentShowcase
        title="Tabs"
        description="Organize content into switchable panels. Great for filtering or categorizing content."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Default Tabs</h4>
            <Tabs defaultValue="tab1" className="max-w-lg">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Features</TabsTrigger>
                <TabsTrigger value="tab3">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4">
                <p className="text-sm text-muted-foreground">
                  This is the overview tab content. Click other tabs to switch content panels.
                </p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4">
                <p className="text-sm text-muted-foreground">
                  Features content goes here. Each tab has its own content panel.
                </p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4">
                <p className="text-sm text-muted-foreground">
                  Reviews and testimonials would appear in this panel.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Disabled Tab</h4>
            <Tabs defaultValue="active1" className="max-w-lg">
              <TabsList>
                <TabsTrigger value="active1">Active</TabsTrigger>
                <TabsTrigger value="active2">Also Active</TabsTrigger>
                <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
              </TabsList>
              <TabsContent value="active1" className="p-4">
                <p className="text-sm text-muted-foreground">
                  This tab is active and clickable.
                </p>
              </TabsContent>
              <TabsContent value="active2" className="p-4">
                <p className="text-sm text-muted-foreground">
                  This tab is also clickable.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Many Tabs</h4>
            <Tabs defaultValue="all" className="max-w-2xl">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="scissors">Scissors</TabsTrigger>
                <TabsTrigger value="paper">Paper</TabsTrigger>
                <TabsTrigger value="writing">Writing</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="decor">Decor</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="p-4">
                <p className="text-sm text-muted-foreground">Showing all items</p>
              </TabsContent>
              <TabsContent value="scissors" className="p-4">
                <p className="text-sm text-muted-foreground">Scissors category</p>
              </TabsContent>
              <TabsContent value="paper" className="p-4">
                <p className="text-sm text-muted-foreground">Paper category</p>
              </TabsContent>
              <TabsContent value="writing" className="p-4">
                <p className="text-sm text-muted-foreground">Writing category</p>
              </TabsContent>
              <TabsContent value="tools" className="p-4">
                <p className="text-sm text-muted-foreground">Tools category</p>
              </TabsContent>
              <TabsContent value="decor" className="p-4">
                <p className="text-sm text-muted-foreground">Decor category</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Accordion"
        description="Expandable/collapsible content sections. Perfect for FAQs and progressive disclosure."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Single Expand (Default)</h4>
            <Accordion type="single" collapsible defaultValue="item-1" className="max-w-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>What file formats are included?</AccordionTrigger>
                <AccordionContent>
                  The pack includes SVG, PNG, AI (Adobe Illustrator), EPS, and PDF formats.
                  All vector files are fully editable and scalable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I use these commercially?</AccordionTrigger>
                <AccordionContent>
                  Yes! Commercial license is included with your purchase. You can use
                  these assets in client work and products for sale.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do I get free updates?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Once you purchase, you get lifetime access to all future
                  updates and additions at no extra cost.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Multiple Expand</h4>
            <p className="text-sm text-amber-600 mb-3">Multiple items can be open at once.</p>
            <Accordion type="multiple" className="max-w-lg">
              <AccordionItem value="multi-1">
                <AccordionTrigger>First Section</AccordionTrigger>
                <AccordionContent>
                  This section can stay open while you open others.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="multi-2">
                <AccordionTrigger>Second Section</AccordionTrigger>
                <AccordionContent>
                  Open this without closing the first one.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="multi-3">
                <AccordionTrigger>Third Section</AccordionTrigger>
                <AccordionContent>
                  All three can be expanded simultaneously.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { NavigationSection }
