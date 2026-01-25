import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { ConfettiButton } from "@/components/ui/confetti"
import { FeatureList, defaultFeatures } from "./FeatureList"
import { TrustBadges } from "./TrustBadges"

function PricingCard({
  title = "Complete Pack",
  price = "$39",
  suffix = "one-time",
  badge = "Best Value",
  features = defaultFeatures,
  ctaText = "Get the Pack Now",
  ctaHref = "/pricing",
  showConfetti = true,
  showTrustBadges = true,
  className = ""
}) {
  const ButtonWrapper = showConfetti ? ConfettiButton : "div"
  const buttonWrapperProps = showConfetti ? { confettiCount: 30, className: "w-full" } : { className: "w-full" }

  return (
    <div className={`relative pt-4 ${className}`}>
      {badge && (
        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          {badge}
        </Badge>
      )}
      <Card className="relative overflow-hidden border-2 border-primary/80 bg-[var(--paper-cream)] shadow-xl">
        <ShineBorder duration={10} />
        <CardHeader className="text-center pb-4 pt-10">
          <CardTitle className="text-2xl text-amber-900">{title}</CardTitle>
          <div className="mt-4">
            <span className="text-5xl font-bold text-amber-900">{price}</span>
            <span className="text-amber-700/70 ml-2">{suffix}</span>
          </div>
        </CardHeader>
        <CardContent>
          <FeatureList features={features} className="mb-8" />

          <ButtonWrapper {...buttonWrapperProps}>
            <Button className="w-full" size="lg" asChild>
              <Link to={ctaHref}>{ctaText}</Link>
            </Button>
          </ButtonWrapper>

          {showTrustBadges && (
            <TrustBadges className="mt-6 pt-6 border-t border-amber-200/60" />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { PricingCard }
