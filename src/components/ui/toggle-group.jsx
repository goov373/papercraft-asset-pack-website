import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

/**
 * Papercraft Toggle Group
 *
 * Connected paper tabs where one is raised at a time,
 * like folder tabs or a paper tabbed divider set.
 */
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
})

function ToggleGroup({
  className,
  variant = "outline",
  size,
  spacing = 0,
  children,
  ...props
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      className={cn(
        // Base: Connected tabs container
        "group/toggle-group flex w-fit items-center rounded-md",
        // Papercraft: Container has subtle shadow when tabs are connected
        "data-[spacing='0']:bg-card",
        "data-[spacing='0']:border data-[spacing='0']:border-border",
        "data-[spacing='0']:[box-shadow:var(--paper-elevation-1)]",
        // Spaced variant: Individual shadows per item
        spacing > 0 && "gap-1",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({ className, children, variant, size, ...props }) {
  const context = React.useContext(ToggleGroupContext)
  const isConnected = context.spacing === 0

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        // Connected tabs styling
        isConnected && [
          "w-auto min-w-0 shrink-0 px-3",
          // Remove individual shadows when connected
          "shadow-none [box-shadow:none]",
          // Remove rounded corners in middle
          "rounded-none first:rounded-l-md last:rounded-r-md",
          // Remove borders except first
          "border-l-0 first:border-l",
          // Active state: Raise this tab
          "data-[state=on]:bg-accent",
          "data-[state=on]:relative data-[state=on]:z-10",
          "data-[state=on]:[box-shadow:var(--paper-elevation-1)]",
          // Hover on connected
          "hover:bg-muted/50 hover:shadow-none hover:[box-shadow:none] hover:translate-y-0",
          // Focus handling
          "focus:z-10 focus-visible:z-10",
        ],
        // Spaced tabs - individual paper pieces
        !isConnected && [
          "[box-shadow:var(--paper-elevation-1)]",
          "data-[state=on]:[box-shadow:var(--paper-elevation-2)]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
