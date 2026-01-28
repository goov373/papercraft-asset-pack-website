import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { LINE_HEIGHTS } from "@/lib/typography-config"

/**
 * Line Height Control
 *
 * Radio group for selecting line height presets (Tight, Normal, Relaxed).
 * Shows both heading and body line height values.
 */
export function LineHeightControl({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Line Height</label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {Object.entries(LINE_HEIGHTS).map(([id, preset]) => (
          <div
            key={id}
            className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onChange(id)}
          >
            <RadioGroupItem value={id} id={`lh-${id}`} />
            <Label
              htmlFor={`lh-${id}`}
              className="flex-1 cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{preset.name}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  H: {preset.heading} · B: {preset.body}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {preset.description}
              </p>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Visual line height preview */}
      <div className="pt-2 border-t">
        <span className="text-xs text-muted-foreground block mb-2">
          Preview:
        </span>
        <div className="grid grid-cols-2 gap-4">
          {/* Heading preview */}
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Heading
            </span>
            <div
              className="text-sm font-semibold bg-muted/30 rounded p-2 transition-all duration-200"
              style={{
                lineHeight: LINE_HEIGHTS[value]?.heading || 1.3,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
          {/* Body preview */}
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Body
            </span>
            <div
              className="text-xs bg-muted/30 rounded p-2 transition-all duration-200"
              style={{
                lineHeight: LINE_HEIGHTS[value]?.body || 1.5,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
