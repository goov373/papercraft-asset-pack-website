import { Button } from "@/components/ui/button"

/**
 * Colors Tab
 *
 * Shows current shadcn/ui color palette and provides
 * a button to launch the Tinte editor for AI-powered
 * theme generation.
 */
export function ColorsTab() {
  // Get current palette colors for preview
  const paletteColors = [
    { name: "Primary", var: "--primary" },
    { name: "Secondary", var: "--secondary" },
    { name: "Accent", var: "--accent" },
    { name: "Background", var: "--background" },
    { name: "Foreground", var: "--foreground" },
    { name: "Muted", var: "--muted" },
    { name: "Border", var: "--border" },
    { name: "Destructive", var: "--destructive" },
  ]

  return (
    <div className="space-y-6 py-4">
      {/* Tinte Integration Section */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <h4 className="font-medium text-sm mb-2">shadcn/ui Colors</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Use the Tinte editor to customize your color palette with AI-powered
          theme generation or browse community themes.
        </p>
        <Button
          onClick={() => {
            // Tinte editor button in bottom-right should already be visible
            // This is a placeholder for direct integration
            const tinteButton = document.querySelector('[data-tinte-trigger]')
            if (tinteButton) {
              tinteButton.click()
            } else {
              // Fallback: show instructions
              alert(
                "Look for the Tinte editor button in the bottom-right corner of the screen. If not visible, ensure Tinte is installed."
              )
            }
          }}
        >
          Open Tinte Editor
        </Button>
      </div>

      {/* Current Palette Preview */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Current Palette</h4>
        <div className="grid grid-cols-4 gap-2">
          {paletteColors.map(({ name, var: cssVar }) => (
            <div key={cssVar} className="text-center">
              <div
                className="w-full aspect-square rounded-md border border-border mb-1.5"
                style={{ backgroundColor: `var(${cssVar})` }}
              />
              <span className="text-[10px] text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          <strong>Tip:</strong> Changes made in Tinte are applied directly to
          CSS variables and will be reflected immediately.
        </p>
        <p>
          Use the Papercraft tab to customize paper surfaces, shadows, and
          textures that are specific to this design system.
        </p>
      </div>
    </div>
  )
}
