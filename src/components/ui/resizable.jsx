"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import { Group, Panel, Separator } from "react-resizable-panels"

import { cn } from "@/lib/utils"

/**
 * Resizable - Paper panels with fold/tear handles
 *
 * Papercraft treatment:
 * - Handle looks like a paper fold grip
 * - Hover shows grab cursor with subtle highlight
 * - Active state shows paper being held
 */
function ResizablePanelGroup({
  className,
  ...props
}) {
  return (
    <Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props} />
  );
}

function ResizablePanel({
  className,
  ...props
}) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn(
        // Paper panel styling
        "bg-background/50",
        className
      )}
      {...props}
    />
  );
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        // Paper fold line
        "relative flex items-center justify-center",
        "bg-gradient-to-r from-transparent via-amber-300/50 to-transparent",
        "w-px data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:bg-gradient-to-b",
        // Hit area
        "after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        // Cursor
        "cursor-col-resize data-[panel-group-direction=vertical]:cursor-row-resize",
        // Focus
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:outline-hidden",
        // Hover - highlight the fold
        "hover:bg-gradient-to-r hover:from-transparent hover:via-amber-400/70 hover:to-transparent",
        "data-[panel-group-direction=vertical]:hover:bg-gradient-to-b",
        // Transition
        "transition-colors duration-150",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}>
      {withHandle && (
        <div
          className={cn(
            "z-10 flex h-5 w-4 items-center justify-center rounded-sm",
            // Paper handle styling
            "bg-secondary border border-border/60",
            "[box-shadow:var(--paper-elevation-1)]",
            "text-primary",
            // Hover
            "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-2)]",
            // Active
            "active:translate-y-0 active:[box-shadow:var(--paper-elevation-0)]",
            "transition-all duration-150"
          )}>
          <GripVerticalIcon className="size-3" />
        </div>
      )}
    </Separator>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
