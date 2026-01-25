import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * TextureButton - Papercraft neumorphic button
 *
 * Based on Cult UI's TextureButton, adapted for papercraft aesthetic.
 * Uses layered gradients to create a tactile, embossed appearance.
 *
 * Papercraft treatment:
 * - Warm amber/orange gradient palette
 * - Paper-like texture appearance
 * - Soft shadows for embossed feel
 *
 * Usage:
 * <TextureButton variant="primary">Click me</TextureButton>
 * <TextureButton variant="craft">Papercraft Style</TextureButton>
 *
 * @see https://www.cult-ui.com/docs/components/texture-button
 */

const buttonOuterVariants = cva(
  "w-fit border transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        // Primary - warm amber gradient
        primary:
          "border-amber-700/20 bg-gradient-to-b from-amber-600/90 to-amber-700 p-[1px]",
        // Craft - paper-like appearance (default papercraft style)
        craft:
          "border-amber-300/60 bg-gradient-to-b from-amber-100 to-amber-200/80 p-[1px]",
        // Secondary - subtle warm gray
        secondary:
          "border-amber-200/40 bg-gradient-to-b from-amber-50 to-amber-100/50 p-[1px]",
        // Accent - vibrant orange
        accent:
          "border-orange-600/20 bg-gradient-to-b from-orange-500/90 to-orange-600 p-[1px]",
        // Ghost - minimal outline
        ghost: "border-amber-300/50 bg-transparent p-[1px]",
      },
      size: {
        sm: "rounded-md",
        default: "rounded-lg",
        lg: "rounded-xl",
        icon: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "craft",
      size: "default",
    },
  }
)

const buttonInnerVariants = cva(
  "w-full h-full flex items-center justify-center font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-amber-500 to-amber-600 text-white hover:from-amber-500/90 hover:to-amber-600/90",
        craft:
          "gap-2 bg-gradient-to-b from-[var(--paper-cream)] to-amber-50 text-foreground hover:from-amber-50 hover:to-amber-100/80",
        secondary:
          "gap-2 bg-gradient-to-b from-white to-amber-50/50 text-muted-foreground hover:from-amber-50/50 hover:to-amber-100/50",
        accent:
          "gap-2 bg-gradient-to-b from-orange-400 to-orange-500 text-white hover:from-orange-400/90 hover:to-orange-500/90",
        ghost:
          "gap-2 bg-transparent text-muted-foreground hover:bg-amber-50/50",
      },
      size: {
        sm: "text-xs rounded-[5px] px-3 py-1.5",
        default: "text-sm rounded-[7px] px-4 py-2",
        lg: "text-base rounded-[9px] px-6 py-2.5",
        icon: "rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "craft",
      size: "default",
    },
  }
)

const TextureButton = React.forwardRef(
  (
    {
      children,
      variant = "craft",
      size = "default",
      asChild = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonOuterVariants({ variant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          // Add subtle paper shadow
          "[box-shadow:0_2px_4px_rgba(180,83,9,0.1),0_1px_2px_rgba(180,83,9,0.06)]",
          "hover:[box-shadow:0_4px_8px_rgba(180,83,9,0.12),0_2px_4px_rgba(180,83,9,0.08)]",
          "active:[box-shadow:0_1px_2px_rgba(180,83,9,0.1)]",
          "active:translate-y-[1px]",
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <div className={cn(buttonInnerVariants({ variant, size }))}>
          {children}
        </div>
      </Comp>
    )
  }
)

TextureButton.displayName = "TextureButton"

/**
 * TextureButtonGroup - Group multiple texture buttons
 */
function TextureButtonGroup({ children, className, ...props }) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      {...props}
    >
      {children}
    </div>
  )
}

export { TextureButton, TextureButtonGroup, buttonOuterVariants, buttonInnerVariants }
