import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PaperFilters } from '@/components/ui/paper-filters'
import { LandingPage } from '@/components/landing-page'
import { ComponentLibrary } from '@/components/component-library'
import PricingPage from '@/components/pages/PricingPage'
import PreviewPage from '@/components/pages/PreviewPage'
import { ViewToggle } from '@/components/ui/view-toggle'
import { CursorProvider } from '@/components/ui/custom-cursor'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [view, setView] = useState('website')

  return (
    <BrowserRouter>
      <CursorProvider enabled={true}>
        <div className="paper-texture-overlay">
          <PaperFilters />
          <Routes>
            <Route path="/" element={
              view === 'website' ? <LandingPage /> : <ComponentLibrary />
            } />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
          <ViewToggle
            view={view}
            onToggle={() => setView(v => v === 'website' ? 'library' : 'website')}
          />
          <Toaster />
        </div>
      </CursorProvider>
    </BrowserRouter>
  )
}

export default App
