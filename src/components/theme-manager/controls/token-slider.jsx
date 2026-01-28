import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

/**
 * Token Slider
 *
 * A labeled slider for adjusting numeric token values.
 * Shows the current value and optional description.
 */
export function TokenSlider({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  unit = "",
  className,
}) {
  // Format display value
  const displayValue =
    typeof value === "number" ? value.toFixed(step < 0.1 ? 2 : step < 1 ? 1 : 0) : value

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-mono text-muted-foreground">
          {displayValue}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
