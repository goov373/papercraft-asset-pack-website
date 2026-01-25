import { Shield, RefreshCw, Zap } from "lucide-react"

const defaultBadges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: RefreshCw, label: "30-Day Refund" },
  { icon: Zap, label: "Instant Download" },
]

function TrustBadges({ badges = defaultBadges, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-1.5 text-amber-700/70 text-xs"
        >
          <badge.icon className="size-3.5" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  )
}

export { TrustBadges, defaultBadges }
