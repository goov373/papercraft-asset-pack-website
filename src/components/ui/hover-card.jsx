import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

/**
 * Papercraft Hover Card
 *
 * A preview card that floats into view on hover.
 * Like lifting a paper card to reveal information underneath,
 * or a paper tab that rises to show content.
 *
 * Papercraft tokens used:
 * - --paper-elevation-2: Floating card shadow
 * - 200ms duration: Standard overlay timing
 * - Subtle rotation: Paper authenticity
 *
 * Material type: Card Stock (substantial, informational)
 */
function HoverCard({ ...props }) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

const HoverCardTrigger = React.forwardRef(
  ({ "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <HoverCardPrimitive.Trigger
        ref={ref}
        aria-label={ariaLabel}
        data-slot="hover-card-trigger"
        {...props}
      />
    )
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 8, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <HoverCardPrimitive.Portal data-slot="hover-card-portal">
        <HoverCardPrimitive.Content
          ref={ref}
          aria-label={ariaLabel}
          data-slot="hover-card-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
          // Base: Floating preview card
          "z-50 w-64 rounded-lg p-4 outline-hidden",
          // Papercraft: Elevated paper card
          "bg-card text-card-foreground",
          "border border-border",
          "[box-shadow:var(--paper-elevation-2)]",
          // Subtle paper tilt for handcrafted feel
          "rotate-[-0.3deg]",
          // Animations: Paper lifts into view
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          // Scale for lift effect
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
          "origin-(--radix-hover-card-content-transform-origin)",
          // Duration: Standard overlay timing
          "duration-200",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
