import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import TrustBar from "@/components/sections/TrustBar"
import AssetGallery from "@/components/sections/AssetGallery"
import WhatsIncluded from "@/components/sections/WhatsIncluded"
import UseCases from "@/components/sections/UseCases"
import Testimonials from "@/components/sections/Testimonials"
import Pricing from "@/components/sections/Pricing"
import FAQ from "@/components/sections/FAQ"
import FinalCTA from "@/components/sections/FinalCTA"
import Footer from "@/components/sections/Footer"

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <AssetGallery />
        <WhatsIncluded />
        <UseCases />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export { LandingPage }
