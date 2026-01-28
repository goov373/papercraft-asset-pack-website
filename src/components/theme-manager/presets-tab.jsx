import { useState, useEffect } from "react"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { TrashIcon, DownloadIcon, CheckIcon } from "lucide-react"
import {
  BUILT_IN_PRESETS,
  applyBuiltInPreset,
  getActivePresetId,
  setActivePresetId,
} from "@/lib/theme-utils"

/**
 * Presets Tab
 *
 * Save, load, and manage theme presets.
 * Includes built-in presets and user-created presets.
 */
export function PresetsTab() {
  const {
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    resetToDefaults,
    exportThemeAsCSS,
  } = useTheme()

  const [newPresetName, setNewPresetName] = useState("")
  const [showSaved, setShowSaved] = useState(false)
  const [activePreset, setActivePreset] = useState(() => getActivePresetId())

  // Apply active preset on mount only
  useEffect(() => {
    if (activePreset && activePreset !== "default") {
      applyBuiltInPreset(activePreset)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally only run on mount
  }, [])

  const handleSavePreset = () => {
    if (newPresetName.trim()) {
      savePreset(newPresetName.trim())
      setNewPresetName("")
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }
  }

  const handleApplyBuiltInPreset = (presetId) => {
    applyBuiltInPreset(presetId)
    setActivePresetId(presetId)
    setActivePreset(presetId)
  }

  const handleExport = () => {
    const css = exportThemeAsCSS()
    navigator.clipboard.writeText(css)
    alert("Theme CSS copied to clipboard!")
  }

  const handleReset = () => {
    handleApplyBuiltInPreset("default")
    resetToDefaults()
  }

  return (
    <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
      {/* Built-in Presets */}
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-1">Theme Presets</h4>
          <p className="text-xs text-muted-foreground">
            Choose a color scheme for your site
          </p>
        </div>

        <div className="grid gap-2">
          {BUILT_IN_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyBuiltInPreset(preset.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                "border-2",
                activePreset === preset.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-muted/30"
              )}
            >
              {/* Color swatches */}
              <div className="flex gap-1 shrink-0">
                <div
                  className="w-6 h-6 rounded border border-border/50"
                  style={{ backgroundColor: preset.colors.primary }}
                  title="Primary"
                />
                <div
                  className="w-6 h-6 rounded border border-border/50"
                  style={{ backgroundColor: preset.colors.accent }}
                  title="Accent"
                />
                <div
                  className="w-6 h-6 rounded border border-border/50"
                  style={{ backgroundColor: preset.colors.background }}
                  title="Background"
                />
              </div>

              {/* Name and description */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium text-sm",
                  activePreset === preset.id && "text-primary"
                )}>
                  {preset.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {preset.description}
                </p>
              </div>

              {/* Active indicator */}
              {activePreset === preset.id && (
                <CheckIcon className="w-4 h-4 text-primary shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Save New Preset */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div>
          <h4 className="font-medium text-sm mb-1">Save Custom Preset</h4>
          <p className="text-xs text-muted-foreground">
            Save your current settings as a reusable preset
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="Preset name..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSavePreset()
            }}
          />
          <Button onClick={handleSavePreset} disabled={!newPresetName.trim()}>
            {showSaved ? (
              <>
                <CheckIcon className="w-4 h-4 mr-1" />
                Saved
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {/* User Saved Presets */}
      {presets.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Your Saved Presets</h4>
          <div className="space-y-2">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg",
                  "bg-muted/50 border border-border",
                  "hover:border-primary/30 transition-colors"
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(preset.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loadPreset(preset.id)}
                  >
                    Load
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deletePreset(preset.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="flex-1">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export CSS
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset to Defaults
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Export copies CSS variables to clipboard. Reset restores factory settings.
        </p>
      </div>
    </div>
  )
}
