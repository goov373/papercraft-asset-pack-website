import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  // Base papercraft card styles
  [
    "bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6",
    // Papercraft elevation shadow
    "[box-shadow:var(--paper-elevation-1)]",
    // Smooth transitions for hover
    "transition-[transform,box-shadow]",
    "[transition-duration:var(--paper-duration-normal)]",
    "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default: Standard paper card
        default: "",
        // Interactive: Lifts on hover
        interactive: [
          "cursor-pointer",
          "hover:[transform:translateY(-4px)] hover:[box-shadow:var(--paper-elevation-2)]",
          "active:[transform:translateY(1px)] active:[box-shadow:var(--paper-elevation-0)]",
          "active:[transition-duration:var(--paper-duration-instant)]",
        ].join(" "),
        // Notebook: Lined paper with holes
        notebook: [
          "pl-10 relative",
          // Red margin line via pseudo-element handled in CSS
          "before:content-[''] before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-red-400/60",
        ].join(" "),
        // Sticky: Post-it note style
        sticky: [
          "bg-amber-100 dark:bg-amber-900/40",
          "[box-shadow:var(--paper-shadow-sticky)]",
          "[transform:perspective(1000px)_rotateX(-1deg)]",
          "[transform-origin:top_center]",
        ].join(" "),
        // Kraft: Brown kraft paper
        kraft: [
          "bg-paper-kraft text-amber-950",
          "[box-shadow:var(--paper-shadow-kraft)]",
          "dark:bg-amber-900/60 dark:text-amber-100",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (<div data-slot="card-content" className={cn("px-6", className)} {...props} />);
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props} />
  );
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
