import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PaperFilters } from '@/components/ui/paper-filters'
import { LandingPage } from '@/components/landing-page'
import { ComponentLibrary } from '@/components/component-library'
import PricingPage from '@/components/pages/PricingPage'
import PreviewPage from '@/components/pages/PreviewPage'
import NotFoundPage from '@/components/pages/NotFoundPage'
import { ViewToggle } from '@/components/ui/view-toggle'
import { CursorProvider } from '@/components/ui/custom-cursor'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { captureError, addBreadcrumb } from '@/lib/sentry'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'

// Inner component that uses router hooks
function AppContent() {
  useScrollToTop()

  return (
    <div className="paper-texture-overlay">
      <PaperFilters />
      <ErrorBoundary
        onError={(error, errorInfo) => {
          captureError(error, { componentStack: errorInfo?.componentStack })
        }}
        onReset={() => {
          addBreadcrumb('Error boundary reset', 'ui')
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/library" element={<ComponentLibrary />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
      <ViewToggle />
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CursorProvider enabled={true}>
        <AppContent />
      </CursorProvider>
    </BrowserRouter>
  )
}

export default App
