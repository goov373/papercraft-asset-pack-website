import { cn } from "@/lib/utils"

/**
 * TextureOverlay - Papercraft texture overlay component
 *
 * Based on Cult UI's TextureOverlay, adapted for papercraft aesthetic.
 * Uses pure CSS gradients to create various texture patterns.
 *
 * Papercraft treatment:
 * - Warm amber tints instead of pure black
 * - Paper grain is the default texture
 * - Subtle opacity for authentic paper feel
 *
 * Usage:
 * <div className="relative">
 *   <TextureOverlay texture="paperGrain" />
 *   <Content />
 * </div>
 *
 * @see https://www.cult-ui.com/docs/components/texture-overlay
 */

/**
 * Texture patterns using amber-900 base tint: rgba(180, 83, 9, X)
 * Opacity varies by pattern: 0.03 (faint) to 0.25 (intense)
 */
const texturePatterns = {
  // Paper grain - default, subtle crossed lines like real paper
  paperGrain:
    "bg-[repeating-linear-gradient(0deg,rgba(180,83,9,0.06)_0px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(180,83,9,0.06)_0px,transparent_1px,transparent_4px),repeating-linear-gradient(45deg,rgba(180,83,9,0.03)_0px,transparent_1px,transparent_5px)]",

  // Dots - small scattered dots
  dots: "bg-[radial-gradient(circle_at_1px_1px,rgba(180,83,9,0.25)_1px,transparent_0)] bg-[length:8px_8px]",

  // Grid - graph paper style
  grid: "bg-[linear-gradient(rgba(180,83,9,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(180,83,9,0.15)_1px,transparent_1px)] bg-[length:12px_12px]",

  // Noise - fine grain texture
  noise:
    "bg-[radial-gradient(circle_at_2px_2px,rgba(180,83,9,0.15)_1px,transparent_0)] bg-[length:6px_6px]",

  // Crosshatch - woven fabric look
  crosshatch:
    "bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(180,83,9,0.15)_2px,rgba(180,83,9,0.15)_4px),repeating-linear-gradient(-45deg,transparent,transparent_2px,rgba(180,83,9,0.15)_2px,rgba(180,83,9,0.15)_4px)]",

  // Diagonal - angled lines
  diagonal:
    "bg-[repeating-linear-gradient(-45deg,rgba(180,83,9,0.12),rgba(180,83,9,0.12)_1px,transparent_1px,transparent_6px)]",

  // Scattered dots - organic dot pattern
  scatteredDots:
    "bg-[radial-gradient(circle_at_3px_7px,rgba(180,83,9,0.18)_1px,transparent_0),radial-gradient(circle_at_11px_2px,rgba(180,83,9,0.18)_1px,transparent_0),radial-gradient(circle_at_7px_12px,rgba(180,83,9,0.18)_1px,transparent_0)] bg-[length:16px_16px]",

  // Halftone - printing style dots
  halftone:
    "bg-[radial-gradient(circle,rgba(180,83,9,0.25)_25%,transparent_25%)] bg-[length:10px_10px] bg-[position:0_0,5px_5px]",

  // Horizontal lines - notebook paper
  horizontalLines:
    "bg-[repeating-linear-gradient(0deg,rgba(180,83,9,0.15)_0px,rgba(180,83,9,0.15)_1px,transparent_1px,transparent_4px)]",

  // Vertical lines
  verticalLines:
    "bg-[repeating-linear-gradient(90deg,rgba(180,83,9,0.15)_0px,rgba(180,83,9,0.15)_1px,transparent_1px,transparent_4px)]",

  // Linen - fabric-like texture
  linen:
    "bg-[repeating-linear-gradient(0deg,rgba(180,83,9,0.04)_0px,transparent_1px,transparent_2px),repeating-linear-gradient(90deg,rgba(180,83,9,0.04)_0px,transparent_1px,transparent_2px)]",

  // Canvas - coarse fabric texture
  canvas:
    "bg-[repeating-linear-gradient(0deg,rgba(180,83,9,0.08)_0px,transparent_2px,transparent_4px),repeating-linear-gradient(90deg,rgba(180,83,9,0.08)_0px,transparent_2px,transparent_4px)]",

  // None - no texture
  none: "",
}

function TextureOverlay({
  texture = "paperGrain",
  opacity = 1,
  className,
  ...props
}) {
  if (texture === "none") return null

  const pattern = texturePatterns[texture] || texturePatterns.paperGrain

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        pattern,
        className
      )}
      style={{ opacity }}
      {...props}
    />
  )
}

/**
 * Available texture types for TypeScript/documentation reference
 */
const textureTypes = [
  "paperGrain",
  "dots",
  "grid",
  "noise",
  "crosshatch",
  "diagonal",
  "scatteredDots",
  "halftone",
  "horizontalLines",
  "verticalLines",
  "linen",
  "canvas",
  "none",
]

export { TextureOverlay, texturePatterns, textureTypes }
