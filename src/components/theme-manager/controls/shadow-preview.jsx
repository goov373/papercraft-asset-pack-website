import { cn } from "@/lib/utils"

/**
 * Shadow Preview
 *
 * Visual preview of the 4 elevation levels.
 * Read-only visualization to show current shadow styling.
 */
export function ShadowPreview({ className }) {
  const elevations = [
    { level: 0, label: "Flat", description: "Pressed state" },
    { level: 1, label: "Rest", description: "Default" },
    { level: 2, label: "Hover", description: "Lifted" },
    { level: 3, label: "Float", description: "Modal" },
  ]

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-4 gap-3">
        {elevations.map(({ level, label, description }) => (
          <div key={level} className="text-center">
            <div
              className={cn(
                "w-full aspect-square rounded-lg mx-auto mb-2",
                "bg-card border border-border/50",
                "transition-shadow duration-200"
              )}
              style={{ boxShadow: `var(--paper-elevation-${level})` }}
            />
            <span className="text-xs font-medium block">{label}</span>
            <span className="text-[10px] text-muted-foreground">{description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
