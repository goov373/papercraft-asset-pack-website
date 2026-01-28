import { FONT_CATALOG, TYPE_SCALES, LINE_HEIGHTS } from "@/lib/typography-config"
import { getFontFamily } from "@/lib/theme-utils"

/**
 * Typography Preview
 *
 * Live preview of typography settings showing heading and body text
 * with the selected fonts, scale, and line heights.
 */
export function TypographyPreview({
  fontHeading,
  fontBody,
  typeScale,
  lineHeightPreset,
}) {
  const headingFont = FONT_CATALOG[fontHeading] || FONT_CATALOG["system-ui"]
  const bodyFont = FONT_CATALOG[fontBody] || FONT_CATALOG["system-ui"]
  const scale = TYPE_SCALES[typeScale] || TYPE_SCALES.default
  const lineHeights = LINE_HEIGHTS[lineHeightPreset] || LINE_HEIGHTS.normal

  const headingFamily = getFontFamily(fontHeading)
  const bodyFamily = getFontFamily(fontBody)

  // Calculate sizes based on scale
  const baseSize = scale.baseFontSize
  const h1Size = baseSize * scale.ratio * scale.ratio * scale.ratio
  const h2Size = baseSize * scale.ratio * scale.ratio
  const bodySize = baseSize
  const smallSize = baseSize / scale.ratio

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Live Preview
        </span>
        <div className="flex gap-2 text-[10px] text-muted-foreground">
          <span className="px-1.5 py-0.5 bg-muted rounded">
            {scale.name}
          </span>
          <span className="px-1.5 py-0.5 bg-muted rounded">
            {lineHeights.heading}/{lineHeights.body}
          </span>
        </div>
      </div>

      {/* Heading preview */}
      <div
        style={{
          fontFamily: headingFamily,
          fontSize: `${h1Size}px`,
          lineHeight: lineHeights.heading,
        }}
        className="font-bold text-foreground transition-all duration-200"
      >
        Papercraft
      </div>

      {/* Subheading preview */}
      <div
        style={{
          fontFamily: headingFamily,
          fontSize: `${h2Size}px`,
          lineHeight: lineHeights.heading,
        }}
        className="font-semibold text-foreground/90 transition-all duration-200"
      >
        Beautiful Asset Packs
      </div>

      {/* Body text preview */}
      <p
        style={{
          fontFamily: bodyFamily,
          fontSize: `${bodySize}px`,
          lineHeight: lineHeights.body,
        }}
        className="text-muted-foreground transition-all duration-200"
      >
        Create stunning designs with our curated collection of handcrafted
        vector assets. Perfect for invitations, packaging, and digital projects.
      </p>

      {/* Small text preview */}
      <p
        style={{
          fontFamily: bodyFamily,
          fontSize: `${smallSize}px`,
          lineHeight: lineHeights.body,
        }}
        className="text-muted-foreground/80 transition-all duration-200"
      >
        Includes SVG, PNG, and AI formats. Commercial license available.
      </p>

      {/* Font info */}
      <div className="pt-2 border-t flex justify-between text-[10px] text-muted-foreground">
        <span>
          Headings: <strong>{headingFont.name}</strong>
        </span>
        <span>
          Body: <strong>{bodyFont.name}</strong>
        </span>
      </div>
    </div>
  )
}
