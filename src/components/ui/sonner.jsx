import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

/**
 * Papercraft-styled toast notifications
 *
 * Usage in your app root:
 * import { Toaster } from "@/components/ui/sonner"
 *
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <Toaster />
 *     </>
 *   )
 * }
 *
 * Trigger toasts:
 * import { toast } from "sonner"
 * toast("Event created")
 * toast.success("Saved successfully")
 * toast.error("Something went wrong")
 */
function Toaster({ ...props }) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          // Base toast styling - paper card feel
          toast: [
            "group toast",
            "bg-card text-card-foreground border-border",
            "rounded-lg border",
            "[box-shadow:var(--paper-elevation-2)]",
            // Smooth entrance animation
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-80",
          ].join(" "),
          // Title styling
          title: "font-medium text-foreground",
          // Description styling
          description: "text-muted-foreground text-sm",
          // Action button styling
          actionButton: [
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90",
            "rounded-md px-3 py-1.5 text-sm font-medium",
            "[box-shadow:var(--paper-elevation-1)]",
          ].join(" "),
          // Cancel button styling
          cancelButton: [
            "bg-muted text-muted-foreground",
            "hover:bg-muted/80",
            "rounded-md px-3 py-1.5 text-sm font-medium",
          ].join(" "),
          // Close button
          closeButton: [
            "bg-card border-border",
            "hover:bg-muted",
            "[box-shadow:var(--paper-elevation-1)]",
          ].join(" "),
          // Variant-specific styles
          success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/50 dark:text-green-100",
          error: "border-destructive/30 bg-destructive/10 text-destructive",
          warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100",
          info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-100",
        },
      }}
      style={{
        "--normal-bg": "hsl(var(--card))",
        "--normal-text": "hsl(var(--card-foreground))",
        "--normal-border": "hsl(var(--border))",
        "--border-radius": "var(--radius)",
      }}
      {...props}
    />
  )
}

export { Toaster }
