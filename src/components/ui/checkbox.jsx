import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(
  ({ className, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        aria-label={ariaLabel}
        className={cn(
        // Base styles
        "peer size-4 shrink-0 rounded-[4px] border",
        // Papercraft: Inset shadow like a punched hole in paper
        "bg-card border-input",
        "[box-shadow:var(--paper-shadow-inset)]",
        // Transitions
        "transition-[box-shadow,background-color,border-color]",
        "[transition-duration:var(--paper-duration-fast)]",
        // Checked state: Filled paper
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=checked]:border-primary",
        "data-[state=checked]:[box-shadow:var(--paper-elevation-1)]",
        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:[filter:grayscale(30%)]",
        // Dark mode
        "dark:bg-input/30 dark:data-[state=checked]:bg-primary",
        "outline-none",
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
