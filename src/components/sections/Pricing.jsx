import { motion } from "framer-motion"
import { Check, Shield, RefreshCw, Zap } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
          <Card className="relative border-2 border-primary shadow-xl">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              Best Value
            </Badge>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Complete Pack</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold text-foreground">$39</span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" size="lg">
                Get the Pack Now
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-1.5 text-muted-foreground text-xs"
                  >
                    <badge.icon className="size-3.5" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}

export default Pricing
