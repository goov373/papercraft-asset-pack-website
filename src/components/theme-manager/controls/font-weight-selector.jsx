import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FONT_CATALOG } from "@/lib/typography-config"
import { useMemo } from "react"

/**
 * Font Weight Labels
 *
 * Human-readable names for font weights following CSS standard values.
 */
const WEIGHT_LABELS = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
}

/**
 * Font Weight Selector
 *
 * Radio group for selecting font weight based on the available weights
 * for the currently selected font. Shows only weights that the font supports.
 *
 * @param {Object} props
 * @param {string} props.label - Label for the selector ("Heading Weight" or "Body Weight")
 * @param {number} props.value - Current weight value (400, 500, 600, etc.)
 * @param {Function} props.onChange - Callback when weight changes
 * @param {string} props.fontId - The font ID to get available weights from
 */
export function FontWeightSelector({ label, value, onChange, fontId }) {
  // Get available weights for the selected font
  const availableWeights = useMemo(() => {
    const font = FONT_CATALOG[fontId]
    if (!font) return [400, 500, 600, 700] // Fallback to common weights
    return font.weights
  }, [fontId])

  // If current value isn't available in new font, find closest match
  const effectiveValue = useMemo(() => {
    if (availableWeights.includes(value)) return value
    // Find the closest available weight
    return availableWeights.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    )
  }, [value, availableWeights])

  // If the effective value differs from the actual value, trigger onChange
  // to sync the state (happens when font changes)
  useMemo(() => {
    if (effectiveValue !== value) {
      // Use setTimeout to avoid updating during render
      setTimeout(() => onChange(effectiveValue), 0)
    }
  }, [effectiveValue, value, onChange])

  const handleChange = (newValue) => {
    onChange(parseInt(newValue, 10))
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      <RadioGroup
        value={effectiveValue.toString()}
        onValueChange={handleChange}
        className="flex flex-wrap gap-2"
      >
        {availableWeights.map((weight) => (
          <div key={weight} className="flex items-center">
            <RadioGroupItem
              value={weight.toString()}
              id={`${label}-weight-${weight}`}
              className="sr-only peer"
            />
            <Label
              htmlFor={`${label}-weight-${weight}`}
              className="flex items-center justify-center px-3 py-2 rounded-md border cursor-pointer
                transition-colors hover:bg-muted/50
                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                peer-data-[state=checked]:text-primary"
              style={{ fontWeight: weight }}
            >
              <span className="text-sm">{weight}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Weight name display */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Selected:</span>
        <span className="font-medium text-foreground">
          {WEIGHT_LABELS[effectiveValue] || effectiveValue}
        </span>
        {availableWeights.length === 1 && (
          <span className="text-amber-600 dark:text-amber-400">
            (only weight available)
          </span>
        )}
      </div>
    </div>
  )
}
