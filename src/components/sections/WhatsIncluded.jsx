import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Container } from "@/components/ui/container"

const features = [
  "Fully editable vectors",
  "Commercial license",
  "Organized layers",
  "Color variations",
  "Hi-res PNG exports",
  "Free updates",
]

const formats = [
  { name: "SVG", desc: "Scalable" },
  { name: "PNG", desc: "Transparent" },
  { name: "AI", desc: "Illustrator" },
  { name: "EPS", desc: "Universal" },
  { name: "PDF", desc: "Print-ready" },
]

function WhatsIncluded() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Big number + title */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Large decorative number */}
              <span
                className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold leading-none text-amber-200/60 select-none"
                style={{ fontFamily: "system-ui" }}
              >
                150
              </span>
              <span className="absolute top-4 right-0 lg:right-auto lg:left-[70%] text-4xl sm:text-5xl font-bold text-primary">+</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 -mt-8 lg:-mt-12">
              Hand-crafted<br />vector assets
            </h2>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Everything you need for your creative projects, organized across 6 categories.
            </p>
          </motion.div>

          {/* Right: Features + Formats */}
          <motion.div
            className="lg:col-span-7 space-y-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Features Grid */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-6">
                What you get
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="size-3 text-primary" />
                    </div>
                    <span className="text-sm text-amber-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formats - Paper label style */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-6">
                File formats included
              </h3>
              <div className="flex flex-wrap gap-3">
                {formats.map((format, i) => (
                  <motion.div
                    key={format.name}
                    className="group relative"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    style={{ transform: `rotate(${(i - 2) * 1.5}deg)` }}
                  >
                    <div className="px-4 py-3 bg-[var(--paper-cream)] border border-amber-200/60 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-lg font-bold text-amber-900">{format.name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-amber-600/70">{format.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Compatibility note - inline */}
            <p className="text-sm text-muted-foreground border-l-2 border-amber-200 pl-4">
              Works with Figma, Sketch, Adobe Illustrator, Canva, and any tool that supports standard vector formats.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default WhatsIncluded
