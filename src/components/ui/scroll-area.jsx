import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/**
 * Papercraft Scroll Area
 *
 * Scrollable content containers with custom scrollbars.
 * Like a stack of papers in a tray or folder where
 * you can see the edges of papers peeking out.
 *
 * Papercraft tokens used:
 * - --paper-elevation-1: Scrollbar thumb at rest (grabbable tab)
 * - --paper-elevation-2: Thumb on hover (lifted for grabbing)
 * - Scrollbar thumb styled as paper edge/tab
 * - Subtle paper texture on scroll track
 * - Warm amber colors for scroll indicators
 * - Cursor: grab/grabbing for paper physics
 *
 * Material type: Paper Stack / Document Tray
 */

function ScrollArea({
  className,
  children,
  ...props
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full rounded-[inherit]",
          // Focus states
          "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
          "transition-[color,box-shadow] outline-none",
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner className="bg-secondary/50" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        // Papercraft: Track styling
        "p-0.5",
        orientation === "vertical" && [
          "h-full w-2.5",
          // Paper edge indicator
          "border-l border-border/30",
        ],
        orientation === "horizontal" && [
          "h-2.5 flex-col",
          // Paper edge indicator
          "border-t border-border/30",
        ],
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn(
          "relative flex-1 rounded-full",
          // Papercraft: Thumb as paper tab/edge
          "bg-border",
          "border border-border/30",
          "[box-shadow:var(--paper-elevation-1)]",
          // Cursor: Grabbable paper tab
          "cursor-grab",
          // Transitions for paper physics
          "transition-[background-color,transform,box-shadow] duration-150",
          // Hover: Tab lifts toward user
          "hover:bg-accent",
          "hover:-translate-y-0.5 hover:scale-105",
          "hover:[box-shadow:var(--paper-elevation-2)]",
          // Active: Grabbing the paper tab
          "active:cursor-grabbing",
          "active:bg-primary/80",
          "active:translate-y-0 active:scale-100",
          "active:[box-shadow:var(--paper-elevation-1)]",
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar }
