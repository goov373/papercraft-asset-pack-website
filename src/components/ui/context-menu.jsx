"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Papercraft Context Menu
 *
 * A quick paper slip that appears at the cursor on right-click.
 * Like a note card that slides onto the desk at the point of interest,
 * or a paper menu slip placed precisely where needed.
 *
 * Papercraft tokens used:
 * - --paper-elevation-2: Floating menu shadow
 * - Slide animations: Paper slides into view
 * - Subtle rotation: Handcrafted paper feel
 *
 * Material type: Menu Cards / Quick Notes
 */
function ContextMenu({ ...props }) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({ ...props }) {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
}

function ContextMenuGroup({ ...props }) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

function ContextMenuPortal({ ...props }) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
}

function ContextMenuSub({ ...props }) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({ ...props }) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
}

function ContextMenuSubTrigger({ className, inset, children, ...props }) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        // Base: Sub menu trigger
        "flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-hidden select-none",
        // Papercraft: Lift on focus/open
        "transition-all duration-150",
        "focus:bg-amber-50 focus:text-amber-900",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        "data-[state=open]:bg-amber-50 data-[state=open]:text-amber-900",
        // Icon styling
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({ className, ...props }) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        // Base: Sub menu panel
        "z-50 min-w-[8rem] overflow-hidden rounded-lg p-1",
        // Papercraft: Elevated paper card
        "bg-card text-card-foreground",
        "border border-border",
        "[box-shadow:var(--paper-elevation-2)]",
        // Animations: Paper slides in
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "origin-(--radix-context-menu-content-transform-origin)",
        "duration-200",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuContent({ className, ...props }) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          // Base: Floating paper menu at cursor
          "z-50 min-w-[8rem] overflow-hidden rounded-lg p-1",
          "max-h-(--radix-context-menu-content-available-height) overflow-y-auto",
          // Papercraft: Card stock with floating elevation
          "bg-card text-card-foreground",
          "border border-border",
          "[box-shadow:var(--paper-elevation-2)]",
          // Subtle paper tilt for handcrafted feel
          "rotate-[-0.3deg]",
          // Animations: Paper slides into place
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "origin-(--radix-context-menu-content-transform-origin)",
          "duration-200",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({ className, inset, variant = "default", ...props }) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Base: Menu item
        "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none",
        // Papercraft: Subtle lift on focus
        "transition-all duration-150",
        "focus:bg-amber-50 focus:text-amber-900",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        // Destructive variant
        "data-[variant=destructive]:text-destructive",
        "data-[variant=destructive]:focus:bg-red-50",
        "data-[variant=destructive]:focus:text-destructive",
        "data-[variant=destructive]:*:[svg]:!text-destructive",
        // Icon styling
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // States
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({ className, children, checked, ...props }) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        // Base: Checkbox item
        "relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
        // Papercraft: Subtle lift on focus
        "transition-all duration-150",
        "focus:bg-amber-50 focus:text-amber-900",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        // States
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-amber-600" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({ className, children, ...props }) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        // Base: Radio item
        "relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
        // Papercraft: Subtle lift on focus
        "transition-all duration-150",
        "focus:bg-amber-50 focus:text-amber-900",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        // States
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-amber-600 text-amber-600" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({ className, inset, ...props }) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        // Papercraft: Warm label color
        "px-2 py-1.5 text-sm font-semibold text-amber-900",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({ className, ...props }) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(
        // Papercraft: Subtle paper fold line
        "-mx-1 my-1 h-px bg-amber-200/60",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuShortcut({ className, ...props }) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        // Papercraft: Muted shortcut text
        "ml-auto text-xs tracking-widest text-amber-600/70",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
