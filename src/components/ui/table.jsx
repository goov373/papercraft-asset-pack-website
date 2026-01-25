"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Papercraft Table
 *
 * Data tables styled as paper documents.
 * Like notebook paper with ruled lines, ledger paper,
 * or a grid paper worksheet.
 *
 * Papercraft tokens used:
 * - --paper-elevation-1: Table container has subtle elevation
 * - Warm amber grid lines like ruled notebook paper
 * - Header row has paper label styling
 * - Row hover shows paper lift effect
 *
 * Material type: Notebook Paper / Ledger / Grid Paper
 */

function Table({
  className,
  ...props
}) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto",
        // Papercraft: Paper card container
        "rounded-lg border border-border/80",
        "bg-card",
        "[box-shadow:var(--paper-elevation-1)]",
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        // Papercraft: Header like paper label strip
        "[&_tr]:border-b [&_tr]:border-border",
        "bg-background/70",
        className
      )}
      {...props}
    />
  );
}

function TableBody({
  className,
  ...props
}) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:last-child]:border-0",
        className
      )}
      {...props}
    />
  );
}

function TableFooter({
  className,
  ...props
}) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        // Papercraft: Footer like paper summary strip
        "border-t border-border",
        "bg-background/50 font-medium",
        "[&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({
  className,
  ...props
}) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // Papercraft: Ruled line styling
        "border-b border-secondary/80",
        // Interactive: Row lifts slightly on hover
        "transition-[background-color,transform,box-shadow] duration-150",
        "hover:bg-background/50",
        "hover:-translate-y-px hover:[box-shadow:0_2px_4px_-2px_rgba(0,0,0,0.05)]",
        // Selected state
        "data-[state=selected]:bg-secondary/60",
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  ...props
}) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // Papercraft: Header cell styling
        "h-11 px-3 text-left align-middle font-semibold whitespace-nowrap",
        "text-foreground",
        // Vertical divider between columns
        "border-r border-border/50 last:border-r-0",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({
  className,
  ...props
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // Papercraft: Cell styling
        "p-3 align-middle whitespace-nowrap",
        // Subtle vertical divider for grid paper feel
        "border-r border-secondary/30 last:border-r-0",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        // Papercraft: Caption like handwritten note
        "mt-3 text-sm text-muted-foreground/70",
        "italic",
        className
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
