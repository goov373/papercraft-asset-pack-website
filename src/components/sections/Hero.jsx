import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { StarRating } from "@/components/ui/star-rating"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <Container>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-6">150+ Hand-Crafted Elements</Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              Beautiful Papercraft{" "}
              <span className="text-primary">Vector Assets</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              Hand-drawn classroom supplies, craft tools, and creative elements
              for your next design project.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <Button size="lg" className="text-base">
                Get the Pack – $39
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                Preview Gallery
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 justify-center lg:justify-start"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <StarRating rating={5} size="default" />
              <span className="text-muted-foreground text-sm">
                Loved by 2,000+ designers
              </span>
            </motion.div>
          </div>

          {/* Hero Image Placeholder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-secondary to-muted rounded-3xl flex items-center justify-center border-2 border-border shadow-lg">
              <div className="text-center p-8">
                <p className="text-muted-foreground text-lg">
                  Hero Image Placeholder
                </p>
                <p className="text-muted-foreground/60 text-sm mt-2">
                  Scattered papercraft assets
                </p>
              </div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-xl rotate-12"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-lg -rotate-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Hero
