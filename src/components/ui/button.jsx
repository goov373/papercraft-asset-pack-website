import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles with papercraft treatment
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    // Papercraft shadow and transitions
    "[box-shadow:var(--paper-elevation-1)]",
    "transition-[transform,box-shadow,background-color]",
    "[transition-duration:var(--paper-duration-normal)]",
    "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
    // Hover lift effect
    "hover:[transform:translateY(-2px)] hover:[box-shadow:var(--paper-elevation-2)]",
    // Active press effect
    "active:[transform:translateY(1px)_scale(0.98)] active:[box-shadow:var(--paper-elevation-0)]",
    "active:[transition-duration:var(--paper-duration-instant)]",
    // Focus and disabled states
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
    "disabled:pointer-events-none disabled:opacity-50 disabled:[filter:grayscale(30%)] disabled:[box-shadow:var(--paper-elevation-0)]",
    // Accessibility
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default: Card stock feel
        default: "bg-primary text-primary-foreground",
        // Destructive: Construction paper, bold
        destructive: [
          "bg-destructive text-white",
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        ].join(" "),
        // Outline: Lighter paper with border
        outline: [
          "border bg-card text-foreground",
          "hover:bg-accent/50 hover:text-accent-foreground",
          "dark:bg-card/80 dark:border-border dark:hover:bg-accent/30",
        ].join(" "),
        // Secondary: Soft paper feel
        secondary: "bg-secondary text-secondary-foreground",
        // Ghost: No paper shadow
        ghost: [
          "[box-shadow:none]",
          "hover:bg-accent/80 hover:text-accent-foreground hover:[box-shadow:none]",
          "active:[box-shadow:none]",
          "dark:hover:bg-accent/50",
        ].join(" "),
        // Link: Text-only, no paper treatment
        link: [
          "text-primary underline-offset-4 hover:underline",
          "[box-shadow:none] hover:[box-shadow:none] hover:[transform:none]",
          "active:[transform:none] active:[box-shadow:none]",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
