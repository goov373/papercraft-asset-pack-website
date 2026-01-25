import Nav from "@/components/sections/Nav"
import Footer from "@/components/sections/Footer"
import { PreviewHero } from "@/components/sections/PreviewHero"
import { PreviewGrid } from "@/components/sections/PreviewGrid"
import { StickyCart } from "@/components/ui/sticky-cart"
import { CartProvider } from "@/context/CartContext"

/**
 * PreviewPage - Full preview page with asset grid and cart
 */
function PreviewPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Nav />
        <main>
          <PreviewHero />
          <PreviewGrid />
        </main>
        <Footer />
        <StickyCart />
      </div>
    </CartProvider>
  )
}

export default PreviewPage
