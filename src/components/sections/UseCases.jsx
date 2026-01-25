import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const useCases = [
  {
    title: "Social Media Graphics",
    description: "Create eye-catching posts and stories with handcrafted elements",
    image: "social-media",
  },
  {
    title: "Educational Materials",
    description: "Design engaging worksheets, presentations, and learning resources",
    image: "education",
  },
  {
    title: "Branding & Packaging",
    description: "Add a handmade touch to logos, labels, and product packaging",
    image: "branding",
  },
  {
    title: "Website & App Design",
    description: "Bring warmth and personality to digital interfaces",
    image: "web-design",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function UseCases() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Perfect For"
          subtitle="See how designers are using these assets in their projects"
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {useCases.map((useCase) => (
            <motion.div key={useCase.title} variants={itemVariants}>
              <Card variant="interactive" className="h-full group">
                <div className="aspect-[4/3] bg-muted/50 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      {useCase.image}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      View Example
                    </Button>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default UseCases
