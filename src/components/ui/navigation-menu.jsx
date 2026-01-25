import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Navigation Menu - Papercraft Design System
 *
 * Material type: Tabbed folders / Card stack
 * Metaphor: A series of paper folder tabs, with content panels that unfold when selected
 *
 * Elevation: Triggers use elevation-1, viewport/content uses elevation-2
 * Animation: Slide horizontally (paper sliding between folder tabs)
 * Interaction: Tabs lift slightly on hover, active tab is elevated
 */

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props} />
  );
}

function NavigationMenuItem({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props} />
  );
}

const navigationMenuTriggerStyle = cva(
  [
    // Base styles
    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
    // Papercraft: Paper tab with elevation
    "bg-background",
    "[box-shadow:var(--paper-elevation-1)]",
    // Transitions
    "transition-[color,box-shadow,transform]",
    "duration-150",
    // Hover: Lift effect
    "hover:bg-accent hover:text-accent-foreground",
    "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-2)]",
    // Focus states
    "focus:bg-accent focus:text-accent-foreground",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
    "outline-none",
    // Open state: Elevated active tab
    "data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground",
    "data-[state=open]:-translate-y-0.5 data-[state=open]:[box-shadow:var(--paper-elevation-2)]",
    "data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" ")
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}>
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props} />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}) {
  return (
    <div
      className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          // Base styles
          "relative mt-1.5 w-full overflow-hidden rounded-md border",
          "h-[var(--radix-navigation-menu-viewport-height)]",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          "origin-top-center",
          // Papercraft: Floating content panel with elevation-2
          "bg-popover text-popover-foreground",
          "[box-shadow:var(--paper-elevation-2)]",
          // Subtle rotation for paper feel
          "rotate-[0.2deg]",
          // Animations: Slide/scale in (paper unfolds), no fade
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=open]:slide-in-from-top-2",
          "data-[state=closed]:slide-out-to-top-2",
          "duration-200",
          className
        )}
        {...props} />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        // Base styles
        "flex flex-col gap-1 rounded-md p-2 text-sm outline-none",
        // Papercraft: Link with hover lift
        "transition-[background-color,transform,box-shadow]",
        "duration-150",
        // Hover: Subtle lift like picking up paper
        "hover:bg-accent hover:text-accent-foreground",
        "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        // Focus states
        "focus:bg-accent focus:text-accent-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
        // Active state
        "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
        "data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent",
        // Icons
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props} />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}>
      <div
        className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
