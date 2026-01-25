import { useCallback } from "react"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Graphic Designer",
    avatar: "",
    rating: 5,
    quote:
      "These papercraft assets saved me hours of work. The quality is incredible and they fit perfectly with my educational design projects.",
  },
  {
    name: "Marcus Johnson",
    role: "Content Creator",
    avatar: "",
    rating: 5,
    quote:
      "I use these assets for all my social media graphics now. They add such a unique, handmade feel that my audience loves.",
  },
  {
    name: "Emily Rodriguez",
    role: "Brand Designer",
    avatar: "",
    rating: 5,
    quote:
      "The attention to detail is amazing. Each asset feels genuinely hand-crafted. Worth every penny!",
  },
  {
    name: "David Park",
    role: "UI/UX Designer",
    avatar: "",
    rating: 5,
    quote:
      "Finally found a set of illustrations that don't look generic. These bring so much warmth to my app designs.",
  },
  {
    name: "Lisa Thompson",
    role: "Teacher & Designer",
    avatar: "",
    rating: 5,
    quote:
      "My students love the worksheets I create with these assets. They make learning materials so much more engaging!",
  },
]

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <Container>
        <SectionHeading
          title="Loved by Designers"
          subtitle="See what our customers are saying"
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <StarRating rating={testimonial.rating} className="mb-4" />
                      <blockquote className="text-foreground mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Testimonials
