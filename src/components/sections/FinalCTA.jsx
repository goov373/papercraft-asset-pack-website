import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20rem] sm:text-[28rem] lg:text-[36rem] font-bold text-white/[0.03] leading-none">
          ✂
        </span>
      </div>

      <Container className="relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to craft<br />something beautiful?
          </h2>

          <p className="text-lg text-amber-100/70 mb-10 max-w-xl mx-auto">
            150+ hand-crafted assets. Commercial license. Lifetime access. One simple price.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="text-lg px-10 bg-white text-amber-900 hover:bg-amber-50"
              asChild
            >
              <Link to="/pricing">
                Get the Pack — $39
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-sm text-amber-200/50">
            Instant download • Works with Figma, Illustrator, Canva & more
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default FinalCTA
