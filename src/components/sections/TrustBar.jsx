import { Container } from "@/components/ui/container"
import { Marquee, MarqueeContainer } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

/**
 * Logo item for the marquee
 * Uses paper-card styling for each brand
 */
function LogoItem({ name, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "px-6 py-3",
        "bg-background/50 rounded-lg",
        "border border-border/40",
        "[box-shadow:var(--paper-elevation-0)]",
        "hover:[box-shadow:var(--paper-elevation-1)]",
        "transition-all duration-200",
        "hover:-translate-y-0.5",
        className
      )}
    >
      <span className="text-base font-semibold text-muted-foreground/70 whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

const brands = [
  "Figma",
  "Canva",
  "Adobe",
  "Sketch",
  "Framer",
  "Notion",
  "Linear",
  "Vercel",
]

function TrustBar() {
  return (
    <section className="py-10 bg-gradient-to-b from-muted/50 to-transparent border-y border-border/40">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary text-sm font-medium mb-6 tracking-wide uppercase">
            Trusted by designers at
          </p>
        </motion.div>
      </Container>

      {/* Full-width marquee section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MarqueeContainer fadeWidth="w-1/6">
          <Marquee
            pauseOnHover
            className="[--duration:30s] [--gap:1rem]"
          >
            {brands.map((brand) => (
              <LogoItem key={brand} name={brand} />
            ))}
          </Marquee>
        </MarqueeContainer>
      </motion.div>
    </section>
  )
}

export default TrustBar
