import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

function TrustBar() {
  return (
    <section className="py-8 bg-secondary/50 border-y border-border">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground mb-6">
            Trusted by designers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
            {/* Placeholder logos - replace with actual logos */}
            {["Figma", "Canva", "Adobe", "Sketch", "Framer"].map((brand) => (
              <span
                key={brand}
                className="text-lg font-semibold text-muted-foreground/70"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default TrustBar
