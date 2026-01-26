import { Check, Shield, RefreshCw, Zap } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ConfettiButton } from "@/components/ui/confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"

const features = [
  "150+ hand-crafted vector assets",
  "6 organized categories",
  "SVG, PNG, AI, EPS formats",
  "Commercial license included",
  "Lifetime access",
  "Free updates forever",
]

const trustBadges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: RefreshCw, label: "30-Day Refund" },
  { icon: Zap, label: "Instant Download" },
]

function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Simple Pricing"
          subtitle="One purchase, lifetime access to all assets"
        />

        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Paper ticket style card */}
          <div className="relative pt-4">
            <Badge className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              Best Value
            </Badge>
            <Card className="relative overflow-hidden border-2 border-primary/80 bg-[var(--paper-cream)] shadow-xl">
              <ShineBorder duration={10} />
              <CardHeader className="text-center pb-4 pt-10">
              <CardTitle className="text-2xl text-foreground">Complete Pack</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold text-foreground">$39</span>
                <span className="text-muted-foreground/70 ml-2">one-time</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <ConfettiButton confettiCount={30} className="w-full">
                <Button className="w-full" size="lg">
                  Get the Pack Now
                </Button>
              </ConfettiButton>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border/60">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-1.5 text-muted-foreground/70 text-xs"
                  >
                    <badge.icon className="size-3.5" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            </Card>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Pricing
