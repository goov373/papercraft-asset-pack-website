import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles with subtle paper treatment
  [
    "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium",
    "w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none overflow-hidden",
    // Subtle paper shadow
    "[box-shadow:0_1px_2px_hsl(var(--shadow-color)/0.08)]",
    // Transitions
    "transition-[color,box-shadow,transform,background-color]",
    "[transition-duration:var(--paper-duration-fast)]",
    // Focus states
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default: Small paper label
        default: [
          "bg-primary text-primary-foreground",
          "[a&]:hover:bg-primary/90 [a&]:hover:[transform:translateY(-1px)]",
        ].join(" "),
        // Secondary: Soft paper feel
        secondary: [
          "bg-secondary text-secondary-foreground",
          "[a&]:hover:bg-secondary/90 [a&]:hover:[transform:translateY(-1px)]",
        ].join(" "),
        // Destructive: Bold construction paper
        destructive: [
          "bg-destructive text-white",
          "[a&]:hover:bg-destructive/90 [a&]:hover:[transform:translateY(-1px)]",
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        ].join(" "),
        // Outline: Border badge
        outline: [
          "border-border text-foreground",
          "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:hover:[transform:translateY(-1px)]",
        ].join(" "),
        // Ghost: No shadow
        ghost: [
          "[box-shadow:none]",
          "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ].join(" "),
        // Link: Text-only
        link: [
          "text-primary underline-offset-4 [a&]:hover:underline",
          "[box-shadow:none]",
        ].join(" "),
        // Sticky: Mini post-it style
        sticky: [
          "bg-amber-200 text-amber-900 dark:bg-amber-800/60 dark:text-amber-100",
          "[box-shadow:var(--paper-shadow-sticky)]",
          "rounded-sm",
          "[a&]:hover:[transform:translateY(-1px)]",
        ].join(" "),
        // Torn: Edge effect (requires SVG filter)
        torn: [
          "bg-card text-card-foreground border-border",
          "[filter:url(#edge-torn)] rounded-none",
          "[a&]:hover:[transform:translateY(-1px)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
