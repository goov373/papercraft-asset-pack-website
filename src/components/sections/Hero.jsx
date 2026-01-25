import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { PlaygroundCanvas } from "@/components/ui/playground-canvas"

function Hero() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-5 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-6"
            >
              <span>150+ Hand-Crafted Assets</span>
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Beautiful papercraft assets for your{" "}
              <span className="text-primary">creative projects</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Hand-crafted vector illustrations, patterns, and design elements
              with a warm, tactile feel. Perfect for adding character to your
              designs.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base" asChild>
                <Link to="/pricing">
                  Get the Pack – $39
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base"
                asChild
              >
                <a href="#preview">
                  View Gallery
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right: Interactive Canvas */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PlaygroundCanvas
              variant="corkboard"
              showControls={false}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
