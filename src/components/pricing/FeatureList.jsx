import { Check } from "lucide-react"

const defaultFeatures = [
  "150+ hand-crafted vector assets",
  "6 organized categories",
  "SVG, PNG, AI, EPS formats",
  "Commercial license included",
  "Lifetime access",
  "Free updates forever",
]

function FeatureList({ features = defaultFeatures, className = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="size-3 text-primary" />
          </div>
          <span className="text-foreground/80">{feature}</span>
        </li>
      ))}
    </ul>
  )
}

export { FeatureList, defaultFeatures }
