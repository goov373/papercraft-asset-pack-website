import { useTheme } from "@/context/ThemeContext"
import { Button } from "@/components/ui/button"
import { RotateCcwIcon } from "lucide-react"
import {
  FontSelector,
  TypeScaleSelector,
  LineHeightControl,
  TypographyPreview,
} from "./controls"
import { DEFAULT_TYPOGRAPHY } from "@/lib/theme-utils"

/**
 * Typography Tab
 *
 * Main tab content for typography customization in the Theme Manager.
 * Provides controls for:
 * - Heading font selection
 * - Body font selection
 * - Type scale (compact/default/spacious)
 * - Line height presets
 */
export function TypographyTab() {
  const { themeState, setToken } = useTheme()

  const {
    fontHeading = "system-ui",
    fontBody = "system-ui",
    typeScale = "default",
    lineHeightPreset = "normal",
  } = themeState

  const handleReset = () => {
    setToken("fontHeading", DEFAULT_TYPOGRAPHY.fontHeading)
    setToken("fontBody", DEFAULT_TYPOGRAPHY.fontBody)
    setToken("typeScale", DEFAULT_TYPOGRAPHY.typeScale)
    setToken("lineHeightPreset", DEFAULT_TYPOGRAPHY.lineHeightPreset)
  }

  const hasChanges =
    fontHeading !== DEFAULT_TYPOGRAPHY.fontHeading ||
    fontBody !== DEFAULT_TYPOGRAPHY.fontBody ||
    typeScale !== DEFAULT_TYPOGRAPHY.typeScale ||
    lineHeightPreset !== DEFAULT_TYPOGRAPHY.lineHeightPreset

  return (
    <div className="space-y-6 py-4">
      {/* Live Preview */}
      <TypographyPreview
        fontHeading={fontHeading}
        fontBody={fontBody}
        typeScale={typeScale}
        lineHeightPreset={lineHeightPreset}
      />

      {/* Font Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Font Families</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FontSelector
            label="Heading Font"
            value={fontHeading}
            onChange={(value) => setToken("fontHeading", value)}
            recommendedFor="headings"
          />
          <FontSelector
            label="Body Font"
            value={fontBody}
            onChange={(value) => setToken("fontBody", value)}
            recommendedFor="body"
          />
        </div>
      </div>

      {/* Type Scale */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Scale & Rhythm</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <TypeScaleSelector
            value={typeScale}
            onChange={(value) => setToken("typeScale", value)}
          />
          <LineHeightControl
            value={lineHeightPreset}
            onChange={(value) => setToken("lineHeightPreset", value)}
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={!hasChanges}
          className="gap-2"
        >
          <RotateCcwIcon className="h-3.5 w-3.5" />
          Reset Typography
        </Button>
      </div>
    </div>
  )
}
