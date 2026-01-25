import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  // Base papercraft styles
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm",
    "grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start",
    "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    // Papercraft shadow
    "[box-shadow:var(--paper-elevation-1)]",
    // Transitions
    "transition-[box-shadow,transform,background-color]",
    "duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default: Clean paper card
        default: [
          "bg-card text-card-foreground border-border",
        ].join(" "),

        // Destructive: Red construction paper feel
        destructive: [
          "bg-destructive/10 text-destructive border-destructive/30",
          "[&>svg]:text-destructive",
          "*:data-[slot=alert-description]:text-destructive/80",
        ].join(" "),

        // Info: Blue paper note
        info: [
          "bg-blue-50 text-blue-900 border-blue-200",
          "dark:bg-blue-950/50 dark:text-blue-100 dark:border-blue-800",
          "[&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        ].join(" "),

        // Success: Green paper note
        success: [
          "bg-green-50 text-green-900 border-green-200",
          "dark:bg-green-950/50 dark:text-green-100 dark:border-green-800",
          "[&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        ].join(" "),

        // Warning: Amber/yellow paper note
        warning: [
          "bg-amber-50 text-amber-900 border-amber-200",
          "dark:bg-amber-950/50 dark:text-amber-100 dark:border-amber-800",
          "[&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        ].join(" "),

        // Sticky: Post-it note style
        sticky: [
          "bg-amber-100 text-amber-900 border-transparent",
          "dark:bg-amber-800/60 dark:text-amber-100",
          "[box-shadow:var(--paper-shadow-sticky)]",
          "[transform:rotate(-0.5deg)]",
          "rounded-sm",
        ].join(" "),

        // Kraft: Brown paper bag style
        kraft: [
          "bg-amber-100/80 text-amber-950 border-amber-300/50",
          "dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-700/50",
          "[box-shadow:var(--paper-shadow-kraft)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({ className, variant, ...props }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
