"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Papercraft Menubar
 *
 * A horizontal menu bar with dropdown menus.
 * Like a strip of connected paper tabs along the top edge,
 * or a series of folder tabs on a filing system.
 *
 * Papercraft tokens used:
 * - --paper-elevation-1: Menu bar base elevation
 * - --paper-elevation-2: Dropdown menus float above
 * - Lift animations: Tabs and items lift on hover
 *
 * Material type: Paper Tab Strip / Menu Cards
 */
function Menubar({ className, ...props }) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        // Base: Paper tab strip
        "flex h-9 items-center gap-1 rounded-lg p-1",
        // Papercraft: Elevated paper bar
        "bg-card border border-border",
        "[box-shadow:var(--paper-elevation-1)]",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({ ...props }) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({ ...props }) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({ ...props }) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarTrigger({ className, ...props }) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        // Base: Tab trigger
        "flex items-center rounded-md px-2.5 py-1 text-sm font-medium outline-hidden select-none",
        // Papercraft: Interactive paper tab
        "transition-all duration-150",
        // Hover: Tab lifts
        "hover:bg-background hover:text-foreground",
        "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        // Focus: Visible state
        "focus:bg-background focus:text-foreground",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        // Open: Tab pressed down
        "data-[state=open]:bg-secondary data-[state=open]:text-foreground",
        "data-[state=open]:translate-y-0 data-[state=open]:[box-shadow:var(--paper-elevation-0)]",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          // Base: Floating paper menu
          "z-50 min-w-[12rem] overflow-hidden rounded-lg p-1",
          // Papercraft: Elevated menu card
          "bg-card text-card-foreground",
          "border border-border",
          "[box-shadow:var(--paper-elevation-2)]",
          // Subtle paper rotation
          "rotate-[0.2deg]",
          // Animations: Paper unfolds
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "origin-(--radix-menubar-content-transform-origin)",
          "duration-150",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({ className, inset, variant = "default", ...props }) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Base: Menu item
        "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none",
        // Papercraft: Subtle lift on focus
        "transition-all duration-150",
        "focus:bg-background focus:text-foreground",
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

function MenubarCheckboxItem({ className, children, checked, ...props }) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        // Base: Checkbox item
        "relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
        // Papercraft: Subtle lift on focus
        "transition-all duration-150",
        "focus:bg-background focus:text-foreground",
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
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-primary" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({ className, children, ...props }) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        // Base: Radio item
        "relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
        // Papercraft: Subtle lift on focus
        "transition-all duration-150",
        "focus:bg-background focus:text-foreground",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        // States
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-primary text-primary" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({ className, inset, ...props }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        // Papercraft: Warm label color
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({ className, ...props }) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn(
        // Papercraft: Subtle paper fold line
        "-mx-1 my-1 h-px bg-border/60",
        className
      )}
      {...props}
    />
  )
}

function MenubarShortcut({ className, ...props }) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        // Papercraft: Muted shortcut text
        "ml-auto text-xs tracking-widest text-primary/70",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({ ...props }) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({ className, inset, children, ...props }) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        // Base: Sub menu trigger
        "flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-none select-none",
        // Papercraft: Lift on focus/open
        "transition-all duration-150",
        "focus:bg-background focus:text-foreground",
        "focus:-translate-y-0.5 focus:[box-shadow:var(--paper-elevation-1)]",
        "data-[state=open]:bg-background data-[state=open]:text-foreground",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({ className, ...props }) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        // Base: Sub menu panel
        "z-50 min-w-[8rem] overflow-hidden rounded-lg p-1",
        // Papercraft: Elevated paper card
        "bg-card text-card-foreground",
        "border border-border",
        "[box-shadow:var(--paper-elevation-2)]",
        // Subtle opposite rotation
        "rotate-[-0.2deg]",
        // Animations: Paper slides in
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "origin-(--radix-menubar-content-transform-origin)",
        "duration-150",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
