import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { oklchToHex, hexToOklch } from "@/lib/theme-utils"
import { cn } from "@/lib/utils"

/**
 * Color Picker for oklch colors
 *
 * Shows a color swatch button that opens a popover with:
 * - Native color input for visual selection
 * - Text input for direct oklch entry
 */
export function ColorPicker({ label, value, onChange, className }) {
  // Convert oklch to hex for the native color picker
  const [hexValue, setHexValue] = useState(() => oklchToHex(value))
  const [oklchValue, setOklchValue] = useState(value)

  // Sync hex when value prop changes
  useEffect(() => {
    setHexValue(oklchToHex(value))
    setOklchValue(value)
  }, [value])

  // Handle native color picker change
  const handleHexChange = (e) => {
    const newHex = e.target.value
    setHexValue(newHex)
    const newOklch = hexToOklch(newHex)
    setOklchValue(newOklch)
    onChange(newOklch)
  }

  // Handle direct oklch input
  const handleOklchChange = (e) => {
    const newOklch = e.target.value
    setOklchValue(newOklch)

    // Only update if it looks like valid oklch
    if (newOklch.startsWith("oklch(")) {
      setHexValue(oklchToHex(newOklch))
      onChange(newOklch)
    }
  }

  // Handle oklch input blur - commit value
  const handleOklchBlur = () => {
    if (oklchValue.startsWith("oklch(")) {
      onChange(oklchValue)
    } else {
      // Reset to current value if invalid
      setOklchValue(value)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-10 h-10 rounded-md border border-border",
                "[box-shadow:var(--paper-elevation-1)]",
                "hover:[box-shadow:var(--paper-elevation-2)]",
                "transition-shadow duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              style={{ backgroundColor: hexValue }}
              aria-label={`Pick color for ${label}`}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Visual Picker</Label>
                <input
                  type="color"
                  value={hexValue}
                  onChange={handleHexChange}
                  className="w-full h-8 cursor-pointer rounded border-0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Hex</Label>
                <Input
                  value={hexValue}
                  onChange={(e) => {
                    const newHex = e.target.value
                    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
                      setHexValue(newHex)
                      const newOklch = hexToOklch(newHex)
                      setOklchValue(newOklch)
                      onChange(newOklch)
                    } else {
                      setHexValue(newHex)
                    }
                  }}
                  className="font-mono text-xs h-8"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={oklchValue}
          onChange={handleOklchChange}
          onBlur={handleOklchBlur}
          className="font-mono text-xs flex-1"
          placeholder="oklch(0.98 0.01 90)"
        />
      </div>
    </div>
  )
}
