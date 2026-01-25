"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

/**
 * Command - Paper search slip with stacked results
 *
 * Papercraft treatment:
 * - Warm paper background with subtle elevation
 * - Search input like a paper label strip
 * - Results stack like index cards
 * - Selection highlights with paper lift effect
 */
function Command({
  className,
  ...props
}) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        // Base paper card styling
        "bg-amber-50/80 text-amber-900 flex h-full w-full flex-col overflow-hidden rounded-md",
        // Paper elevation and border
        "border border-amber-200/60",
        "[box-shadow:var(--paper-elevation-2)]",
        className
      )}
      {...props} />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}>
        <Command
          className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        // Paper label strip styling
        "flex h-10 items-center gap-2 border-b border-amber-200/60 px-3",
        "bg-amber-100/50"
      )}>
      <SearchIcon className="size-4 shrink-0 text-amber-600" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-amber-500 flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden",
          "text-amber-900",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props} />
    </div>
  );
}

function CommandList({
  className,
  ...props
}) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        // Paper stack background
        "bg-amber-50/60",
        className
      )}
      {...props} />
  );
}

function CommandEmpty({
  ...props
}) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm text-amber-600/70"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-amber-900 overflow-hidden p-1",
        // Group heading styling - like a paper tab label
        "[&_[cmdk-group-heading]]:text-amber-700",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide",
        className
      )}
      {...props} />
  );
}

function CommandSeparator({
  className,
  ...props
}) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(
        // Paper fold line separator
        "-mx-1 h-px",
        "bg-gradient-to-r from-transparent via-amber-300/50 to-transparent",
        className
      )}
      {...props} />
  );
}

function CommandItem({
  className,
  ...props
}) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        // Base paper card styling
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        "text-amber-900",
        // Icon styling
        "[&_svg:not([class*='text-'])]:text-amber-600",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Selected state - paper lift effect
        "data-[selected=true]:bg-amber-100",
        "data-[selected=true]:-translate-y-0.5",
        "data-[selected=true]:[box-shadow:var(--paper-elevation-1)]",
        // Transition
        "transition-all duration-150 ease-out",
        // Disabled state
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      {...props} />
  );
}

function CommandShortcut({
  className,
  ...props
}) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        // Typewriter key styling
        "ml-auto text-xs tracking-widest",
        "text-amber-600/70",
        "font-mono",
        className
      )}
      {...props} />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
