import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoIcon, AlertTriangleIcon, TrashIcon, SettingsIcon, MenuIcon } from "lucide-react"

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

function OverlaysSection() {
  const [controlledOpen, setControlledOpen] = useState(false)

  return (
    <div>
      {/* Tooltip */}
      <ComponentShowcase
        title="Tooltip"
        description="Small paper label that floats near the trigger on hover. Like a paper tag or label maker strip."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Tooltips</h4>
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <InfoIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More information</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SettingsIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Tooltip Positions</h4>
            <div className="flex flex-wrap gap-4 justify-center py-8">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Tooltip on left</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tooltip on right</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Popover */}
      <ComponentShowcase
        title="Popover"
        description="Floating paper card that appears on click. Like a sticky note or index card that pops up."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Popover</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
                <div className="grid gap-4 pt-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Popover Positions</h4>
            <div className="flex flex-wrap gap-4 justify-center py-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Top</Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                  <p className="text-sm">Popover content positioned at top</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Bottom</Button>
                </PopoverTrigger>
                <PopoverContent side="bottom">
                  <p className="text-sm">Popover content positioned at bottom</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Left</Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                  <p className="text-sm">Popover content positioned at left</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Right</Button>
                </PopoverTrigger>
                <PopoverContent side="right">
                  <p className="text-sm">Popover content positioned at right</p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Hover Card */}
      <ComponentShowcase
        title="Hover Card"
        description="Preview card that lifts into view on hover. Like a file card that slides out from a stack."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">User Preview Card</h4>
            <div className="flex gap-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="p-0 h-auto">@papercraft_studio</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex justify-between space-x-4">
                    <div className="size-12 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-2xl">
                      ✂️
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-semibold text-amber-900">Papercraft Studio</h4>
                      <p className="text-sm text-muted-foreground">
                        Creating beautiful vector assets for your projects.
                      </p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          Joined December 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="p-0 h-auto">@design_assets</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex justify-between space-x-4">
                    <div className="size-12 rounded-full bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center text-2xl">
                      🎨
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-semibold text-amber-900">Design Assets</h4>
                      <p className="text-sm text-muted-foreground">
                        Premium design resources for creators.
                      </p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          Joined January 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Alert Dialog */}
      <ComponentShowcase
        title="Alert Dialog"
        description="Modal dialog for important confirmations. Like an urgent paper notice demanding attention."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Destructive Action</h4>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <TrashIcon className="text-red-600" />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Yes, delete account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Warning Confirmation</h4>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Discard Changes</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-amber-100">
                    <AlertTriangleIcon className="text-amber-600" />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes that will be lost if you continue.
                    Are you sure you want to discard them?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Editing</AlertDialogCancel>
                  <AlertDialogAction>Discard Changes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Small Variant</h4>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">Log Out</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Log Out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </ComponentShowcase>

      {/* Sheet */}
      <ComponentShowcase
        title="Sheet"
        description="Paper panel that slides from the edge. Like a folder or document sliding from a filing cabinet."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Sheet Directions</h4>
            <div className="flex flex-wrap gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Right Sheet</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4 px-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-name">Name</Label>
                      <Input id="sheet-name" defaultValue="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-username">Username</Label>
                      <Input id="sheet-username" defaultValue="@johndoe" />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button>Save changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Left Sheet</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                      Browse through the application sections.
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 py-4 px-4">
                    <Button variant="ghost" className="justify-start">Home</Button>
                    <Button variant="ghost" className="justify-start">Products</Button>
                    <Button variant="ghost" className="justify-start">About</Button>
                    <Button variant="ghost" className="justify-start">Contact</Button>
                  </nav>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Top Sheet</Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>
                      You have 3 unread notifications.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 px-4">
                    <p className="text-sm text-muted-foreground">
                      Notification content would go here...
                    </p>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Bottom Sheet</Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Quick Actions</SheetTitle>
                    <SheetDescription>
                      Choose an action to perform.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex gap-4 justify-center py-4 px-4">
                    <Button variant="secondary">Share</Button>
                    <Button variant="secondary">Copy Link</Button>
                    <Button variant="secondary">Download</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Drawer */}
      <ComponentShowcase
        title="Drawer"
        description="Gesture-enabled panel with drag support. Like pulling open a drawer from a desk."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Bottom Drawer (Swipeable)</h4>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <MenuIcon className="size-4 mr-2" />
                  Open Drawer
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Quick Settings</DrawerTitle>
                  <DrawerDescription>
                    Adjust your preferences. Swipe down to close.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark Mode</span>
                    <Button variant="outline" size="sm">Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notifications</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Language</span>
                    <Button variant="outline" size="sm">English</Button>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Directional Drawers</h4>
            <div className="flex flex-wrap gap-4">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button variant="secondary">Left Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Sidebar</DrawerTitle>
                    <DrawerDescription>
                      Navigation and tools.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">
                      Sidebar content here...
                    </p>
                  </div>
                </DrawerContent>
              </Drawer>

              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="secondary">Right Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Details Panel</DrawerTitle>
                    <DrawerDescription>
                      Additional information.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">
                      Details content here...
                    </p>
                  </div>
                </DrawerContent>
              </Drawer>

              <Drawer direction="top">
                <DrawerTrigger asChild>
                  <Button variant="secondary">Top Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Search</DrawerTitle>
                    <DrawerDescription>
                      Find what you're looking for.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <Input placeholder="Search..." />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Dialog */}
      <ComponentShowcase
        title="Dialog"
        description="Modal dialog for focused interactions. Use for confirmations, forms, or detailed content views."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Basic Dialog</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a description that provides context about the dialog content.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Dialog content goes here. You can put any content including forms,
                    images, or other components.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Dialog with Form</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Controlled Dialog</h4>
            <p className="text-sm text-amber-600 mb-3">
              Open state controlled externally. Current state: {controlledOpen ? "Open" : "Closed"}
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setControlledOpen(true)}>Open Controlled</Button>
              <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Controlled Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog is controlled by external state.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      You can close this by clicking outside, pressing Escape,
                      or using the button below.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setControlledOpen(false)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { OverlaysSection }
