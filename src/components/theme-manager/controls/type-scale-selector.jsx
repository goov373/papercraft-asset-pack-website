import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { TYPE_SCALES } from "@/lib/typography-config"

/**
 * Type Scale Selector
 *
 * Radio group for selecting type scale presets (Compact, Default, Spacious).
 * Shows the scale ratio and base font size for each option.
 */
export function TypeScaleSelector({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Type Scale</label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {Object.entries(TYPE_SCALES).map(([id, scale]) => (
          <div
            key={id}
            className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onChange(id)}
          >
            <RadioGroupItem value={id} id={`scale-${id}`} />
            <Label
              htmlFor={`scale-${id}`}
              className="flex-1 cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{scale.name}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {scale.ratio}× · {scale.baseFontSize}px
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {scale.description}
              </p>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Visual scale preview */}
      <div className="flex items-end gap-1 pt-2 border-t">
        <span className="text-xs text-muted-foreground mr-2">Preview:</span>
        {[0.694, 0.833, 1, 1.2, 1.44].map((multiplier, i) => {
          const scale = TYPE_SCALES[value] || TYPE_SCALES.default
          const size = Math.round(scale.baseFontSize * multiplier)
          return (
            <span
              key={i}
              className="text-foreground font-medium transition-all duration-200"
              style={{ fontSize: `${size}px`, lineHeight: 1.2 }}
            >
              Aa
            </span>
          )
        })}
      </div>
    </div>
  )
}
