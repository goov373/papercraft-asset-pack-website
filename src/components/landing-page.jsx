import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import TrustBar from "@/components/sections/TrustBar"
import CollectionsShowcase from "@/components/sections/CollectionsShowcase"
import UseCases from "@/components/sections/UseCases"
import AssetGallery from "@/components/sections/AssetGallery"
import WhatsIncluded from "@/components/sections/WhatsIncluded"
import Testimonials from "@/components/sections/Testimonials"
import GetStarted from "@/components/sections/GetStarted"
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
        <CollectionsShowcase />
        <UseCases />
        <AssetGallery />
        <WhatsIncluded />
        <Testimonials />
        <GetStarted />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export { LandingPage }
