import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PaperFilters } from '@/components/ui/paper-filters'
import { ViewToggle } from '@/components/ui/view-toggle'
import { CursorProvider } from '@/components/ui/custom-cursor'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { captureError, addBreadcrumb } from '@/lib/sentry'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'
import { ThemeProvider } from '@/context/ThemeContext'
import { Spinner } from '@/components/ui/spinner'

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('@/components/landing-page').then(m => ({ default: m.LandingPage })))
const ComponentLibrary = lazy(() => import('@/components/component-library').then(m => ({ default: m.ComponentLibrary })))
const PricingPage = lazy(() => import('@/components/pages/PricingPage'))
const PreviewPage = lazy(() => import('@/components/pages/PreviewPage'))
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'))
const TinteEditor = lazy(() => import('@/components/tinte-editor').then(m => ({ default: m.TinteEditor })))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Spinner size="lg" />
    </div>
  )
}

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/library" element={<ComponentLibrary />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <ViewToggle />
      <Toaster />
      <Suspense fallback={null}>
        <TinteEditor />
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CursorProvider enabled={true}>
          <AppContent />
        </CursorProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
