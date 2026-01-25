import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Drawer } from "vaul"
import { cn } from "@/lib/utils"

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#preview", label: "Preview" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-foreground">
            Papercraft Pack
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button>Get the Pack</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Drawer.Root direction="right">
              <Drawer.Trigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Drawer.Content className="fixed right-0 top-0 bottom-0 w-[280px] bg-background z-50 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-bold text-foreground">Menu</span>
                    <Drawer.Close asChild>
                      <Button variant="ghost" size="icon">
                        <X className="size-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </Drawer.Close>
                  </div>
                  <div className="flex flex-col p-4 gap-4">
                    {navLinks.map((link) => (
                      <Drawer.Close key={link.href} asChild>
                        <a
                          href={link.href}
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
                        >
                          {link.label}
                        </a>
                      </Drawer.Close>
                    ))}
                    <Drawer.Close asChild>
                      <Button className="mt-4 w-full">Get the Pack</Button>
                    </Drawer.Close>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Nav
