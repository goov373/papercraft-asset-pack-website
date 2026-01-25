import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Check, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const features = [
  "150+ hand-crafted assets",
  "Commercial license",
  "All formats (SVG, PNG, AI, EPS)",
  "Lifetime access & updates",
]

function GetStarted() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitted(true)
  }

  return (
    <section id="pricing" className="py-20 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Price as visual anchor */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-6">
              One-time purchase
            </h3>

            {/* Large price */}
            <div className="mb-6">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-amber-900 leading-none">
                $39
              </span>
            </div>

            <p className="text-muted-foreground mb-8 max-w-sm">
              Get instant access to the complete pack. No subscriptions, no hidden fees.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-primary" />
                  </div>
                  <span className="text-sm text-amber-800">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Actions */}
          <motion.div
            className="lg:col-span-7 lg:pt-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Primary CTA */}
            <div className="mb-12">
              <Button size="lg" className="text-lg px-10" asChild>
                <Link to="/pricing">
                  Get the Pack
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Secure checkout • Instant download
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-amber-200/60" />
              <span className="text-xs text-amber-600/60 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-amber-200/60" />
            </div>

            {/* Newsletter alternative */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
                Not ready yet?
              </h3>
              <p className="text-amber-900 font-medium mb-4">
                Get 3 free assets to try first
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white border-amber-200"
                    required
                  />
                  <Button type="submit" variant="outline" className="shrink-0">
                    Send
                  </Button>
                </form>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-700 text-sm font-medium"
                >
                  ✓ Check your inbox for your free assets!
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default GetStarted
