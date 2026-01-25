import { useState } from "react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import {
  User,
  Settings,
  CreditCard,
  Keyboard,
  LogOut,
  Plus,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  Cloud,
  LifeBuoy,
  Github,
  ChevronRight,
  Scissors,
  FileText,
  Palette,
  Home,
  Folder,
} from "lucide-react"

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
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [position, setPosition] = useState("bottom")

  return (
    <div>
      {/* Dropdown Menu */}
      <ComponentShowcase
        title="Dropdown Menu"
        description="A paper menu that unfolds from a trigger element. Like a folded menu that fans open to reveal options."
      >
        <div className="flex flex-wrap gap-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Menu</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    Keyboard shortcuts
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Submenu</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  New Document
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Folder className="mr-2 h-4 w-4" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Users
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      More...
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Checkboxes & Radios</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">View Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                >
                  Activity Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ComponentShowcase>

      {/* Context Menu */}
      <ComponentShowcase
        title="Context Menu"
        description="A quick paper slip that appears on right-click. Like a note card placed precisely where needed."
      >
        <div className="flex flex-wrap gap-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Right-click the area below</h4>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/50 text-amber-700">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem>
                  <Scissors className="mr-2 h-4 w-4" />
                  Cut
                  <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Copy
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Palette className="mr-2 h-4 w-4" />
                  Paste
                  <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>Save As...</ContextMenuItem>
                    <ContextMenuItem>Export</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Properties</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">
                  Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
      </ComponentShowcase>

      {/* Navigation Menu */}
      <ComponentShowcase
        title="Navigation Menu"
        description="A horizontal navigation with expandable content panels. Like tabbed paper folders that open to reveal organized content."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Main Navigation</h4>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink href="#" className="block">
                        <div className="text-sm font-medium">Introduction</div>
                        <p className="text-sm text-muted-foreground">Learn about our papercraft design system.</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="block">
                        <div className="text-sm font-medium">Installation</div>
                        <p className="text-sm text-muted-foreground">How to install and set up the components.</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="block">
                        <div className="text-sm font-medium">Typography</div>
                        <p className="text-sm text-muted-foreground">Fonts and text styling guidelines.</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink href="#" className="block">
                        <div className="text-sm font-medium">Buttons</div>
                        <p className="text-sm text-muted-foreground">Clickable paper elements with lift effects.</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="block">
                        <div className="text-sm font-medium">Cards</div>
                        <p className="text-sm text-muted-foreground">Paper containers for grouping content.</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="block">
                        <div className="text-sm font-medium">Forms</div>
                        <p className="text-sm text-muted-foreground">Input fields with paper texture.</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="inline-flex h-9 w-max items-center justify-center rounded-md bg-card px-4 py-2 text-sm font-medium [box-shadow:var(--paper-elevation-1)] transition-all duration-150 hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-2)] hover:bg-amber-50 hover:text-amber-900">
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </ComponentShowcase>

      {/* Menubar */}
      <ComponentShowcase
        title="Menubar"
        description="A horizontal menu bar with dropdown menus. Like a strip of connected paper tabs along the top edge."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Application Menubar</h4>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    New Window <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Find</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Find...</MenubarItem>
                      <MenubarItem>Find Next</MenubarItem>
                      <MenubarItem>Find Previous</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                  <MenubarCheckboxItem checked>Show Full URLs</MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    Reload <MenubarShortcut>⌘R</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem disabled>
                    Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    Support
                  </MenubarItem>
                  <MenubarItem>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Cloud className="mr-2 h-4 w-4" />
                    Check for Updates
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </ComponentShowcase>

      {/* Breadcrumb */}
      <ComponentShowcase
        title="Breadcrumb"
        description="A trail of navigation links showing the current location. Like paper labels marking the route through a filing system."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Breadcrumb</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Ellipsis</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Category</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Papercraft Asset Pack</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Custom Separator</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Library</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Current Page</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </ComponentShowcase>

      {/* Pagination */}
      <ComponentShowcase
        title="Pagination"
        description="Page navigation controls. Like numbered paper tabs or page corners in a book."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Pagination</h4>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Ellipsis</h4>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">9</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </ComponentShowcase>

      {/* Tabs */}
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
        </div>
      </ComponentShowcase>

      {/* Accordion */}
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
