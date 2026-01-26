"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Papercraft Popover
 *
 * A floating paper card that appears on click.
 * Like a sticky note or index card that pops up
 * with additional information or controls.
 *
 * Papercraft tokens used:
 * - --paper-elevation-2: Floating paper shadow
 * - 200ms duration: Standard overlay timing
 * - Subtle rotation: Paper authenticity
 *
 * Material type: Card Stock (substantial, interactive)
 */
function Popover({ ...props }) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

const PopoverTrigger = React.forwardRef(
  ({ "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        aria-label={ariaLabel}
        data-slot="popover-trigger"
        {...props}
      />
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 8, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          aria-label={ariaLabel}
          data-slot="popover-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
          // Base: Floating paper card
          "z-50 w-72 p-4 rounded-lg outline-hidden",
          // Papercraft: Elevated paper with warm background
          "bg-card text-card-foreground",
          "border border-border",
          "[box-shadow:var(--paper-elevation-2)]",
          // Subtle paper tilt for handcrafted feel
          "rotate-[0.3deg]",
          // Animations: Paper slides/lifts into view
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          // Scale for lift effect (paper lifts toward user)
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          // Slide direction based on side - paper slides in
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          // Exit slides - paper slides away
          "data-[state=closed]:data-[side=bottom]:slide-out-to-top-2",
          "data-[state=closed]:data-[side=left]:slide-out-to-right-2",
          "data-[state=closed]:data-[side=right]:slide-out-to-left-2",
          "data-[state=closed]:data-[side=top]:slide-out-to-bottom-2",
          // Transform origin for natural lift
          "origin-(--radix-popover-content-transform-origin)",
          // Duration: Standard overlay timing
          "duration-200",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

function PopoverAnchor({ ...props }) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function PopoverDescription({ className, ...props }) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}
