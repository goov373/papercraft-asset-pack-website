"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * Papercraft Drawer
 *
 * A paper panel that slides from screen edges with gesture support.
 * Like a drawer in a desk or filing cabinet that you pull open
 * with a satisfying paper-sliding motion.
 *
 * Papercraft tokens used:
 * - --paper-elevation-3: Deep shadow for drawer depth
 * - Gesture-based interaction via vaul
 * - Paper edge treatments on borders
 *
 * Material type: Filing Drawer / Paper Tray
 */
function Drawer({ ...props }) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

const DrawerTrigger = React.forwardRef(
  ({ "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <DrawerPrimitive.Trigger
        ref={ref}
        aria-label={ariaLabel}
        data-slot="drawer-trigger"
        {...props}
      />
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

function DrawerPortal({ ...props }) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        // Overlay dims background - tissue paper metaphor
        "fixed inset-0 z-50 bg-black/50",
        // Fade is acceptable for overlay dimming (not content)
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        // Standard overlay timing
        "duration-200",
        className
      )}
      {...props}
    />
  )
}

const DrawerContent = React.forwardRef(
  ({ className, children, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <DrawerPortal data-slot="drawer-portal">
        <DrawerOverlay />
        <DrawerPrimitive.Content
          ref={ref}
          aria-label={ariaLabel}
          data-slot="drawer-content"
          className={cn(
          // Base: Sliding drawer panel
          "fixed z-50 flex h-auto flex-col",
          // Papercraft: Paper card background with elevation
          "bg-card text-card-foreground",
          "[box-shadow:var(--paper-elevation-3)]",
          // Group for child styling
          "group/drawer-content",
          // Direction-specific styling
          // Top drawer
          "data-[vaul-drawer-direction=top]:inset-x-0",
          "data-[vaul-drawer-direction=top]:top-0",
          "data-[vaul-drawer-direction=top]:mb-24",
          "data-[vaul-drawer-direction=top]:max-h-[80vh]",
          "data-[vaul-drawer-direction=top]:rounded-b-lg",
          "data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=top]:border-border",
          // Bottom drawer (most common)
          "data-[vaul-drawer-direction=bottom]:inset-x-0",
          "data-[vaul-drawer-direction=bottom]:bottom-0",
          "data-[vaul-drawer-direction=bottom]:mt-24",
          "data-[vaul-drawer-direction=bottom]:max-h-[80vh]",
          "data-[vaul-drawer-direction=bottom]:rounded-t-lg",
          "data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=bottom]:border-border",
          // Right drawer
          "data-[vaul-drawer-direction=right]:inset-y-0",
          "data-[vaul-drawer-direction=right]:right-0",
          "data-[vaul-drawer-direction=right]:w-3/4",
          "data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=right]:border-border",
          "data-[vaul-drawer-direction=right]:sm:max-w-sm",
          // Left drawer
          "data-[vaul-drawer-direction=left]:inset-y-0",
          "data-[vaul-drawer-direction=left]:left-0",
          "data-[vaul-drawer-direction=left]:w-3/4",
          "data-[vaul-drawer-direction=left]:border-r",
          "data-[vaul-drawer-direction=left]:border-border",
          "data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {/* Papercraft: Drag handle styled as paper grip */}
        <div
          className={cn(
            "mx-auto mt-4 hidden h-1.5 w-16 shrink-0 rounded-full",
            // Papercraft: Warm handle color
            "bg-border/60",
            "group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
          )}
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 md:gap-1.5",
        // Papercraft: Center text for drawer directions
        "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center",
        "group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        "md:text-left",
        // Papercraft: Subtle divider
        "border-b border-border/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 p-4",
        // Papercraft: Subtle top divider
        "border-t border-border/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        // Papercraft: Warm title color
        "font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
