import { motion } from "framer-motion"
import { FileImage, Layers, Download } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const stats = [
  { icon: FileImage, value: "150+", label: "Vector Assets" },
  { icon: Layers, value: "6", label: "Categories" },
  { icon: Download, value: "SVG & PNG", label: "File Formats" },
]

const features = [
  "Fully editable vector files",
  "Commercial license included",
  "Organized layer structure",
  "Multiple color variations",
  "High-resolution PNG exports",
  "Regular free updates",
]

const formats = ["SVG", "PNG", "AI", "EPS", "PDF"]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function WhatsIncluded() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <Container>
        <SectionHeading
          title="What's Included"
          subtitle="Everything you need for your creative projects"
        />

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <stat.icon className="size-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Features Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Features
            </h3>
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Checkbox checked disabled id={feature} />
                  <Label
                    htmlFor={feature}
                    className="text-muted-foreground cursor-default"
                  >
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* File Formats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              File Formats
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {formats.map((format) => (
                <Badge key={format} variant="secondary" className="text-sm">
                  {format}
                </Badge>
              ))}
            </div>
            <Card className="p-6 bg-muted/50">
              <p className="text-muted-foreground text-sm">
                All assets are provided in multiple formats for maximum
                compatibility with your favorite design tools including Figma,
                Sketch, Adobe Illustrator, and more.
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default WhatsIncluded
