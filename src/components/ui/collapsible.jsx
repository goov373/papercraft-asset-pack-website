"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Papercraft Collapsible
 *
 * Expandable/collapsible content sections.
 * Like a folded paper section that unfolds to reveal
 * hidden content, or a paper fan that opens.
 *
 * Papercraft tokens used:
 * - --paper-elevation-1: Collapsible container and trigger hover
 * - --paper-elevation-0: Trigger active/pressed state
 * - Paper unfold animation (slide from top, no fade)
 * - Trigger lifts on hover (-translate-y-0.5)
 * - Trigger presses on active (translate-y-0)
 * - Chevron rotates 180deg on open (200ms)
 *
 * Material type: Folded Paper Section / Paper Fan
 */

function Collapsible({
  className,
  ...props
}) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn(
        // Papercraft: Paper card container
        "rounded-lg border border-amber-200/80",
        "bg-card",
        "[box-shadow:var(--paper-elevation-1)]",
        className
      )}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        // Base: Full-width trigger
        "flex w-full items-center justify-between gap-2",
        "px-4 py-3 text-sm font-medium",
        "rounded-lg",
        // Papercraft: Interactive paper element
        "transition-[background-color,transform,box-shadow] duration-150",
        // Hover: Paper lifts
        "hover:bg-amber-50/50",
        "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        // Active/Press: Paper flattens
        "active:translate-y-0 active:scale-[0.99]",
        "active:[box-shadow:var(--paper-elevation-0)]",
        // Focus states
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // Open state: Settled with subtle pressed feel
        "data-[state=open]:bg-amber-50/70",
        "data-[state=open]:rounded-b-none",
        "data-[state=open]:translate-y-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className={cn(
        "size-4 text-amber-600",
        "transition-transform duration-200",
        // Rotate when open
        "[[data-state=open]_&]:rotate-180",
      )} />
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
}

function CollapsibleContent({
  className,
  ...props
}) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        // Papercraft: Content area
        "px-4 pb-4 pt-3",
        // Border top to separate from trigger
        "border-t border-amber-200/50",
        // Paper unfold animation - NO fade (paper is opaque)
        "overflow-hidden",
        // Transform origin from top for paper fold effect
        "origin-top",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        // Slide only - paper unfolds from crease
        "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
        // Subtle scale for paper fold/unfold feel
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "duration-200",
        className
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
