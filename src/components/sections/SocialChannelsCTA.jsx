import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstagramIcon, MailIcon, CheckIcon, ArrowRight } from "lucide-react"

// Custom icons
function PinterestIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

function DribbbleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.531a10.162 10.162 0 012.25 6.344c-.328-.063-3.609-.734-6.922-.313-.078-.172-.141-.344-.219-.531-.219-.516-.453-1.031-.703-1.531 3.672-1.5 5.344-3.656 5.594-3.969zM12 1.828c2.578 0 4.938.984 6.703 2.578-.203.281-1.719 2.297-5.234 3.609-1.641-3.016-3.453-5.484-3.734-5.859A10.27 10.27 0 0112 1.828zM7.547 3.063c.266.359 2.047 2.844 3.719 5.781-4.688 1.25-8.828 1.219-9.281 1.219.656-3.063 2.672-5.656 5.562-7zM1.828 12v-.313c.438.016 5.234.078 10.25-1.438.281.563.563 1.125.813 1.703-.125.031-.266.078-.391.125-5.234 1.688-8.016 6.313-8.266 6.719a10.194 10.194 0 01-2.406-6.796zM12 22.172a10.132 10.132 0 01-6.25-2.156c.203-.391 2.25-4.344 8.016-6.344l.063-.016c1.438 3.734 2.031 6.875 2.188 7.781a10.217 10.217 0 01-4.017.735zm5.781-1.891c-.109-.641-.656-3.625-2.016-7.297 3.109-.5 5.828.313 6.172.422a10.185 10.185 0 01-4.156 6.875z" />
    </svg>
  )
}

const socialLinks = [
  { name: "Instagram", icon: InstagramIcon, href: "#", color: "hover:text-pink-500" },
  { name: "Pinterest", icon: PinterestIcon, href: "#", color: "hover:text-red-600" },
  { name: "Dribbble", icon: DribbbleIcon, href: "#", color: "hover:text-pink-400" },
]

function SocialChannelsCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitted(true)
  }

  return (
    <section className="py-20 md:py-28 border-t border-border/50">
      <Container>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Newsletter signup - the focal point */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Stay in the loop
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Get 3 free assets
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Join our newsletter for freebies, tutorials, and first access to new drops.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border-border"
                  required
                />
                <Button type="submit" className="shrink-0">
                  Subscribe
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-success"
              >
                <CheckIcon className="size-5" />
                <span className="font-medium">Check your inbox for your free assets!</span>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Social links - minimal treatment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Follow along
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`group flex items-center gap-4 text-foreground ${social.color} transition-colors`}
                >
                  <social.icon className="size-5" />
                  <span className="font-medium">{social.name}</span>
                  <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default SocialChannelsCTA
