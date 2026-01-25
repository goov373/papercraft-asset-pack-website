import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const valuePoints = [
  "150+ hand-crafted vector assets",
  "Commercial license included",
  "Lifetime access & free updates",
]

function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Add Some Handmade Magic to Your Designs?
          </h2>

          <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
            {valuePoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Check className="size-4 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button size="lg" className="text-lg px-8">
              Get the Pack – $39
            </Button>
          </div>

          <Badge variant="secondary" className="text-sm">
            30-day money-back guarantee
          </Badge>
        </motion.div>
      </Container>
    </section>
  )
}

export default FinalCTA
