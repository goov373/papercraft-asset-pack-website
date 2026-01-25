"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * Papercraft Pagination
 *
 * Page navigation controls with numbered buttons.
 * Like numbered paper tabs or page corners in a book,
 * or index card tabs marking different sections.
 *
 * Papercraft tokens used:
 * - --paper-elevation-1: Page buttons have subtle elevation
 * - Active page appears pressed (elevation-0)
 * - Hover lifts buttons slightly
 *
 * Material type: Page Tabs / Index Cards
 */
function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        // Base button styles
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        // Papercraft overrides
        isActive && [
          // Active: Pressed paper tab
          "bg-amber-100 text-amber-900 border-amber-300",
          "[box-shadow:var(--paper-elevation-0)]",
          "translate-y-0",
        ],
        !isActive && [
          // Inactive: Liftable paper tab
          "transition-all duration-150",
          "hover:bg-amber-50 hover:text-amber-900",
          "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        ],
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "gap-1 px-2.5 sm:pl-2.5",
        // Papercraft: Navigation button styling
        "transition-all duration-150",
        "hover:bg-amber-50 hover:text-amber-900",
        "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "gap-1 px-2.5 sm:pr-2.5",
        // Papercraft: Navigation button styling
        "transition-all duration-150",
        "hover:bg-amber-50 hover:text-amber-900",
        "hover:-translate-y-0.5 hover:[box-shadow:var(--paper-elevation-1)]",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        // Papercraft: Ellipsis indicator
        "flex size-9 items-center justify-center",
        "text-amber-600",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
