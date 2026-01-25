import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Breadcrumb - Papercraft Design System
 *
 * Material type: Paper trail / Connected labels / Tag strips
 * Metaphor: A trail of small paper labels or tags leading back to the origin,
 * like post-it breadcrumbs or paper label strips
 *
 * Elevation: Links have subtle elevation, lift on hover
 * Animation: Color transition + slight lift
 * Interaction: Clickable labels lift toward user
 */

function Breadcrumb({
  ...props
}) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({
  className,
  ...props
}) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props} />
  );
}

function BreadcrumbItem({
  className,
  ...props
}) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props} />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        // Base: Paper label link
        "rounded-sm px-1.5 py-0.5",
        // Papercraft: Subtle label feel with lift on hover
        "transition-[color,transform,box-shadow,background-color]",
        "duration-150",
        // Hover: Paper label lifts
        "hover:text-foreground hover:bg-amber-50/50",
        "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        // Focus states
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props} />
  );
}

function BreadcrumbPage({
  className,
  ...props
}) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        // Papercraft: Current page is a distinct paper label
        "rounded-sm px-1.5 py-0.5",
        "bg-amber-50/70 text-amber-900 font-medium",
        "[box-shadow:var(--paper-elevation-1)]",
        className
      )}
      {...props} />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        // Papercraft: Subtle separator in warm amber
        "[&>svg]:size-3.5 text-amber-400",
        className
      )}
      {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
