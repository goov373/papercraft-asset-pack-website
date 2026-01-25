import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What file formats are included?",
    answer:
      "The pack includes SVG, PNG, AI (Adobe Illustrator), EPS, and PDF formats. All vector files are fully editable and scalable to any size without losing quality.",
  },
  {
    question: "Can I use these assets for commercial projects?",
    answer:
      "Yes! The commercial license is included with your purchase. You can use these assets in client work, products for sale, and any commercial projects. The only restriction is you cannot resell the assets as-is or include them in other asset packs.",
  },
  {
    question: "Do I get free updates?",
    answer:
      "Absolutely. Once you purchase the pack, you get lifetime access to all future updates and additions at no extra cost. We regularly add new assets based on customer feedback.",
  },
  {
    question: "What if I'm not satisfied with the purchase?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not completely satisfied with the assets, contact us within 30 days of purchase for a full refund, no questions asked.",
  },
  {
    question: "How do I download the assets after purchase?",
    answer:
      "After completing your purchase, you'll receive an email with a download link. You can also access your files anytime through your account dashboard. The download is a single ZIP file containing all assets organized by category.",
  },
  {
    question: "Are the assets compatible with Figma/Sketch/Canva?",
    answer:
      "Yes! The SVG and PNG formats work perfectly with Figma, Sketch, Canva, Adobe XD, and virtually any design tool. For Adobe Illustrator users, we also include native AI files.",
  },
  {
    question: "Can I request custom assets or modifications?",
    answer:
      "We don't offer custom work at this time, but we do take feature requests! If there's a specific type of asset you'd like to see added, let us know and we may include it in a future update.",
  },
]

function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/30">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about the asset pack"
        />

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Notebook paper styled container */}
          <div className="notebook-paper notebook-paper-holes relative">
            {/* Hole punches - positioned absolutely */}
            <NotebookHoles />

            {/* Content area - starts exactly on a ruled line */}
            <div
              className="relative"
              style={{
                /* Start content so first question baseline lands on a line */
                paddingTop: "var(--notebook-line-height)",
                paddingBottom: "calc(var(--notebook-line-height) * 0.5)",
              }}
            >
              <Accordion type="single" collapsible defaultValue="item-0">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="notebook-accordion-item"
                  >
                    <AccordionTrigger className="notebook-trigger text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="notebook-content">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a
                href="mailto:hello@papercraftpack.com"
                className="text-primary hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

/**
 * NotebookHoles - Realistic binder hole punches
 * Positioned to look like a 3-ring binder
 * Uses .notebook-hole utility class from index.css
 */
function NotebookHoles() {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10">
      {/* Top hole */}
      <div className="notebook-hole absolute left-[10px] top-[15%]" />
      {/* Middle hole */}
      <div className="notebook-hole absolute left-[10px] top-1/2 -translate-y-1/2" />
      {/* Bottom hole */}
      <div className="notebook-hole absolute left-[10px] bottom-[15%]" />
    </div>
  )
}

export default FAQ
