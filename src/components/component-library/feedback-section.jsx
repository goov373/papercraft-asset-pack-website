import { useState } from "react"
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Bell,
} from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner, PinwheelSpinner, LoadingDots } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

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

function FeedbackSection() {
  const [progress, setProgress] = useState(45)

  return (
    <div>
      <ComponentShowcase
        title="Alert"
        description="Papercraft-styled alerts for displaying important messages. Multiple variants for different contexts."
      >
        <div className="space-y-4 max-w-2xl">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default</h4>
            <Alert>
              <Bell className="size-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with a paper card appearance and subtle shadow.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Semantic Variants</h4>
            <div className="space-y-3">
              <Alert variant="info">
                <Info className="size-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational message on blue paper.
                </AlertDescription>
              </Alert>

              <Alert variant="success">
                <CheckCircle className="size-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your action was completed successfully.
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please review this before continuing.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Special Variants</h4>
            <div className="space-y-3">
              <Alert variant="sticky">
                <AlertTitle>Sticky Note</AlertTitle>
                <AlertDescription>
                  This looks like a post-it note with a slight rotation.
                </AlertDescription>
              </Alert>

              <Alert variant="kraft">
                <AlertTitle>Kraft Paper</AlertTitle>
                <AlertDescription>
                  Brown kraft paper style for an organic feel.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Toast (Sonner)"
        description="Toast notifications that slide in from the top. Click the buttons to see different toast types."
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Toast Types</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => toast("This is a default toast message")}
              >
                Default Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.success("Operation completed successfully!")}
              >
                Success Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.error("Something went wrong")}
              >
                Error Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.warning("Please review before continuing")}
              >
                Warning Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info("Here's some helpful information")}
              >
                Info Toast
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">With Actions</h4>
            <Button
              variant="outline"
              onClick={() =>
                toast("File uploaded", {
                  description: "document.pdf was uploaded successfully",
                  action: {
                    label: "View",
                    onClick: () => console.log("View clicked"),
                  },
                })
              }
            >
              Toast with Action
            </Button>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Loading Toast</h4>
            <Button
              variant="outline"
              onClick={() => {
                const toastId = toast.loading("Uploading file...")
                setTimeout(() => {
                  toast.success("File uploaded!", { id: toastId })
                }, 2000)
              }}
            >
              Loading → Success
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Note: Add {"<Toaster />"} to your app root to enable toasts.
          </p>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Progress"
        description="Paper-styled progress bars for showing completion status."
      >
        <div className="space-y-6 max-w-md">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Progress</h4>
            <Progress value={progress} />
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>
                -10%
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>
                +10%
              </Button>
              <span className="text-sm text-muted-foreground ml-2">{progress}%</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sizes</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Small</p>
                <Progress value={65} size="sm" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Default</p>
                <Progress value={65} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Medium</p>
                <Progress value={65} size="md" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Large</p>
                <Progress value={65} size="lg" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variants</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Paper</p>
                <Progress value={75} variant="paper" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Kraft</p>
                <Progress value={75} variant="kraft" />
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Skeleton"
        description="Paper-styled loading placeholders for content that's still loading."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Skeleton</h4>
            <div className="space-y-2 max-w-md">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Variants</h4>
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Avatar</p>
                <Skeleton variant="avatar" className="size-12" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Text Lines</p>
                <div className="space-y-2 w-48">
                  <Skeleton variant="text" className="w-full" />
                  <Skeleton variant="text" className="w-3/4" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Image</p>
                <Skeleton variant="image" className="w-48" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Card Skeleton</h4>
            <div className="max-w-sm">
              <Skeleton variant="card" className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton variant="avatar" className="size-10" />
                  <div className="space-y-2 flex-1">
                    <Skeleton variant="text" className="w-24" />
                    <Skeleton variant="text" className="w-16" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" className="w-4/5" />
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Spinner"
        description="Loading spinners with papercraft styling for indicating async operations."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Spinner</h4>
            <div className="flex items-end gap-4">
              <div className="text-center">
                <Spinner size="xs" />
                <p className="text-xs text-muted-foreground mt-2">xs</p>
              </div>
              <div className="text-center">
                <Spinner size="sm" />
                <p className="text-xs text-muted-foreground mt-2">sm</p>
              </div>
              <div className="text-center">
                <Spinner size="default" />
                <p className="text-xs text-muted-foreground mt-2">default</p>
              </div>
              <div className="text-center">
                <Spinner size="md" />
                <p className="text-xs text-muted-foreground mt-2">md</p>
              </div>
              <div className="text-center">
                <Spinner size="lg" />
                <p className="text-xs text-muted-foreground mt-2">lg</p>
              </div>
              <div className="text-center">
                <Spinner size="xl" />
                <p className="text-xs text-muted-foreground mt-2">xl</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Pinwheel Spinner</h4>
            <p className="text-sm text-muted-foreground mb-3">Origami-inspired pinwheel animation.</p>
            <div className="flex items-end gap-4">
              <div className="text-center">
                <PinwheelSpinner size="sm" className="text-primary" />
                <p className="text-xs text-muted-foreground mt-2">sm</p>
              </div>
              <div className="text-center">
                <PinwheelSpinner size="default" className="text-primary" />
                <p className="text-xs text-muted-foreground mt-2">default</p>
              </div>
              <div className="text-center">
                <PinwheelSpinner size="lg" className="text-primary" />
                <p className="text-xs text-muted-foreground mt-2">lg</p>
              </div>
              <div className="text-center">
                <PinwheelSpinner size="xl" className="text-primary" />
                <p className="text-xs text-muted-foreground mt-2">xl</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Loading Dots</h4>
            <div className="flex items-center gap-4">
              <LoadingDots className="text-primary" />
              <LoadingDots className="text-muted-foreground" />
              <LoadingDots className="text-amber-600" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">In Context</h4>
            <div className="flex gap-4">
              <Button disabled>
                <Spinner size="sm" className="mr-2" />
                Loading...
              </Button>
              <Button variant="outline" disabled>
                <PinwheelSpinner size="sm" className="mr-2 text-primary" />
                Processing
              </Button>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { FeedbackSection }
