// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace (motion.div)
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ConfettiButton } from "@/components/ui/confetti"
import { FeatureList } from "@/components/pricing/FeatureList"
import { TrustBadges } from "@/components/pricing/TrustBadges"
import { PriceDisplay } from "@/components/pricing/PriceDisplay"
import Nav from "@/components/sections/Nav"
import Footer from "@/components/sections/Footer"

const faqItems = [
  {
    q: "What's included in the pack?",
    a: "150+ hand-crafted vector assets across 6 categories: plants, animals, food, objects, decorations, and patterns. All in SVG, PNG, AI, and EPS formats."
  },
  {
    q: "Can I use these commercially?",
    a: "Yes! The commercial license lets you use assets in unlimited personal and client projects, products for sale, and digital/print materials."
  },
  {
    q: "What if I'm not satisfied?",
    a: "We offer a 30-day money-back guarantee. If you're not happy with the pack, just reach out and we'll refund your purchase."
  },
  {
    q: "Do I get free updates?",
    a: "Absolutely. You get lifetime access and all future updates to the pack at no additional cost."
  },
]

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left: Large price as visual anchor */}
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                  One-time purchase
                </h3>
                <PriceDisplay price="$39" suffix="" size="large" className="mb-6" />
                <p className="text-muted-foreground mb-8 max-w-sm">
                  Get instant access to the complete papercraft asset pack. No subscriptions, no hidden fees.
                </p>
                <FeatureList />
              </motion.div>

              {/* Right: CTA and details */}
              <motion.div
                className="lg:col-span-7 lg:pt-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-[var(--paper-cream)] rounded-2xl p-8 md:p-12 border border-border/60 shadow-lg">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    Complete Papercraft Pack
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    Everything you need to add warmth and character to your creative projects.
                  </p>

                  <ConfettiButton confettiCount={50} className="w-full sm:w-auto">
                    <Button size="lg" className="text-lg px-10 w-full sm:w-auto">
                      Purchase Now
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </ConfettiButton>

                  <TrustBadges className="mt-8 pt-8 border-t border-border/60" />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Questions
                </h3>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Frequently asked
                </h2>
              </motion.div>

              <motion.div
                className="lg:col-span-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="space-y-0">
                  {faqItems.map((item) => (
                    <div
                      key={item.q}
                      className="border-t border-border/60 py-6 first:border-t-0 first:pt-0"
                    >
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {item.q}
                      </h4>
                      <p className="text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
          <Container>
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-primary-foreground/70 mb-8">
                Join thousands of creators using Papercraft Pack in their projects.
              </p>
              <Button
                size="lg"
                className="text-lg px-10 bg-card text-card-foreground hover:bg-accent"
              >
                Get the Pack — $39
              </Button>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default PricingPage
