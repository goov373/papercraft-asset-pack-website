"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Base styles
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        // Subtle paper treatment: warm text color
        "text-foreground",
        // Disabled states with paper grayscale
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:[filter:grayscale(30%)]",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:[filter:grayscale(30%)]",
        className
      )}
      {...props} />
  );
}

export { Label }
