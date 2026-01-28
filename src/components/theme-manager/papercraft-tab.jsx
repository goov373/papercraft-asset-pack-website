import { useTheme } from "@/context/ThemeContext"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "./controls/color-picker"
import { TokenSlider } from "./controls/token-slider"
import { ShadowPreview } from "./controls/shadow-preview"

/**
 * Papercraft Tab
 *
 * Custom controls for papercraft-specific tokens:
 * - Dark mode toggle
 * - Paper surface colors
 * - Border radius
 * - Texture opacity
 * - Shadow preview
 */
export function PapercraftTab() {
  const { themeState, setToken, setDarkMode } = useTheme()

  return (
    <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="space-y-0.5">
          <Label htmlFor="dark-mode" className="text-sm font-medium">
            Dark Mode
          </Label>
          <p className="text-xs text-muted-foreground">
            Switch between light and dark themes
          </p>
        </div>
        <Switch
          id="dark-mode"
          checked={themeState.darkMode}
          onCheckedChange={setDarkMode}
        />
      </div>

      {/* Paper Surfaces */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-1">Paper Surfaces</h4>
          <p className="text-xs text-muted-foreground">
            Customize the background colors for different paper types
          </p>
        </div>

        <ColorPicker
          label="Paper White"
          value={themeState.paperWhite}
          onChange={(value) => setToken("paperWhite", value)}
        />

        <ColorPicker
          label="Paper Cream"
          value={themeState.paperCream}
          onChange={(value) => setToken("paperCream", value)}
        />

        <ColorPicker
          label="Paper Kraft"
          value={themeState.paperKraft}
          onChange={(value) => setToken("paperKraft", value)}
        />
      </div>

      {/* Border Radius */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-1">Shape</h4>
          <p className="text-xs text-muted-foreground">
            Adjust the roundness of UI elements
          </p>
        </div>

        <TokenSlider
          label="Border Radius"
          value={themeState.radius}
          onChange={(value) => setToken("radius", value)}
          min={0}
          max={1.5}
          step={0.0625}
          unit="rem"
          description="Base radius applied to buttons, cards, and inputs"
        />
      </div>

      {/* Texture */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-1">Texture</h4>
          <p className="text-xs text-muted-foreground">
            Control the paper texture overlay intensity
          </p>
        </div>

        <TokenSlider
          label="Texture Opacity"
          value={themeState.textureOpacityFaint}
          onChange={(value) => setToken("textureOpacityFaint", value)}
          min={0}
          max={0.15}
          step={0.005}
          description="Subtle noise texture for paper effect"
        />
      </div>

      {/* Shadow Preview */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-1">Elevation Preview</h4>
          <p className="text-xs text-muted-foreground">
            Current shadow styling at each elevation level
          </p>
        </div>

        <ShadowPreview />
      </div>
    </div>
  )
}
