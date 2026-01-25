import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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
          <Link to="/" className="text-xl font-bold text-foreground">
            Papercraft Pack
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/preview"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Preview
            </Link>
            <Button asChild>
              <Link to="/pricing">Get the Pack</Link>
            </Button>
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
                    <Drawer.Close asChild>
                      <Link
                        to="/preview"
                        className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
                      >
                        Preview
                      </Link>
                    </Drawer.Close>
                    <Drawer.Close asChild>
                      <Button className="mt-4 w-full" asChild>
                        <Link to="/pricing">Get the Pack</Link>
                      </Button>
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
