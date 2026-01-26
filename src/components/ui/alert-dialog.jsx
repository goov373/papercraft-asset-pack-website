"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Papercraft Alert Dialog
 *
 * A modal dialog for important confirmations and alerts.
 * Like a paper card that drops onto the desk demanding attention,
 * or an important notice pinned to a corkboard.
 *
 * Papercraft tokens used:
 * - --paper-elevation-3: Maximum floating elevation (modal level)
 * - 200-300ms duration: Standard modal timing
 * - Slide + scale: Paper drops/lifts into view
 *
 * Material type: Card Stock (formal, important, attention-commanding)
 */
function AlertDialog({ ...props }) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

const AlertDialogTrigger = React.forwardRef(
  ({ "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Trigger
        ref={ref}
        aria-label={ariaLabel}
        data-slot="alert-dialog-trigger"
        {...props}
      />
    )
  }
)
AlertDialogTrigger.displayName = "AlertDialogTrigger"

function AlertDialogPortal({
  ...props
}) {
  return (<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />);
}

function AlertDialogOverlay({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        // Overlay dims background - tissue paper metaphor (semi-translucent)
        "fixed inset-0 z-50 bg-black/50",
        // Fade is acceptable for overlay dimming (not content)
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "duration-200",
        className
      )}
      {...props}
    />
  )
}

const AlertDialogContent = React.forwardRef(
  ({ className, size = "default", "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          ref={ref}
          aria-label={ariaLabel}
          data-slot="alert-dialog-content"
          data-size={size}
          className={cn(
          // Positioning: Centered modal
          "fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
          // Layout
          "grid w-full max-w-[calc(100%-2rem)] gap-4 p-6",
          "data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg",
          // Papercraft: Card stock with maximum elevation (modal level)
          "bg-card text-card-foreground",
          "rounded-lg border border-border",
          "[box-shadow:var(--paper-elevation-3)]",
          // Group context for nested styling
          "group/alert-dialog-content",
          // Animations: Paper drops into view
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          // Scale: Paper lifts/settles
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          // Slide: Paper drops from above
          "data-[state=open]:slide-in-from-top-4",
          "data-[state=closed]:slide-out-to-top-4",
          // Duration: Modal timing (slightly longer for importance)
          "duration-200",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
    )
  }
)
AlertDialogContent.displayName = "AlertDialogContent"

function AlertDialogHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props} />
  );
}

function AlertDialogFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props} />
  );
}

function AlertDialogTitle({
  className,
  ...props
}) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props} />
  );
}

function AlertDialogDescription({
  className,
  ...props
}) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

function AlertDialogMedia({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      )}
      {...props} />
  );
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(className)} {...props} />
    </Button>
  );
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(className)} {...props} />
    </Button>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
