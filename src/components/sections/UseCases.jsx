 
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"

const useCases = [
  {
    title: "Social Media",
    description: "Eye-catching posts, stories, and content graphics",
  },
  {
    title: "Education",
    description: "Worksheets, presentations, and learning materials",
  },
  {
    title: "Branding",
    description: "Logos, labels, packaging, and brand collateral",
  },
  {
    title: "Web & App",
    description: "UI elements, illustrations, and digital interfaces",
  },
]

function UseCases() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Large decorative type + intro */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Large decorative word */}
            <div className="relative mb-6">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-border/50 select-none leading-none">
                Create
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Perfect for any project
            </h2>
            <p className="text-muted-foreground">
              From social posts to product packaging, these assets adapt to whatever you're building.
            </p>
          </motion.div>

          {/* Right: Use cases list */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Use cases
            </h3>

            <div className="space-y-0">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  className="group border-t border-border/60 py-6 first:border-t-0 first:pt-0"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {useCase.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {useCase.description}
                      </p>
                    </div>
                    <ArrowRight className="size-5 text-border group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="mt-8 text-sm text-muted-foreground border-l-2 border-border pl-4">
              All assets work seamlessly in Figma, Illustrator, Canva, Sketch, and any tool that supports SVG.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default UseCases
