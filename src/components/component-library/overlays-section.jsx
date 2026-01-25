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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
            <h4 className="text-sm font-medium text-amber-800 mb-3">Confirmation Dialog</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Item</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the item
                    and remove all associated data.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Delete</Button>
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

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Image Lightbox Style</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Image</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Papercraft Scissors</DialogTitle>
                  <DialogDescription>
                    Hand-crafted vector illustration
                  </DialogDescription>
                </DialogHeader>
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">✂️</span>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <Button>Download</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { OverlaysSection }
