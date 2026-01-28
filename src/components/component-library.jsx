import { lazy, Suspense, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeManager } from "@/components/theme-manager"

// Lazy load section components for better initial bundle size
const LayoutSection = lazy(() => import("@/components/component-library/layout-section").then(m => ({ default: m.LayoutSection })))
const NavigationSection = lazy(() => import("@/components/component-library/navigation-section").then(m => ({ default: m.NavigationSection })))
const FormControlsSection = lazy(() => import("@/components/component-library/form-controls-section").then(m => ({ default: m.FormControlsSection })))
const ButtonsSection = lazy(() => import("@/components/component-library/buttons-section").then(m => ({ default: m.ButtonsSection })))
const DataDisplaySection = lazy(() => import("@/components/component-library/data-display-section").then(m => ({ default: m.DataDisplaySection })))
const FeedbackSection = lazy(() => import("@/components/component-library/feedback-section").then(m => ({ default: m.FeedbackSection })))
const OverlaysSection = lazy(() => import("@/components/component-library/overlays-section").then(m => ({ default: m.OverlaysSection })))
const EffectsSection = lazy(() => import("@/components/component-library/effects-section").then(m => ({ default: m.EffectsSection })))

function SectionLoader() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
      <div className="bg-white/50 rounded-lg p-6 border border-amber-200">
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}

const categories = [
  { id: "layout", label: "Layout", component: LayoutSection },
  { id: "navigation", label: "Navigation", component: NavigationSection },
  { id: "forms", label: "Forms", component: FormControlsSection },
  { id: "buttons", label: "Buttons", component: ButtonsSection },
  { id: "data-display", label: "Data Display", component: DataDisplaySection },
  { id: "feedback", label: "Feedback", component: FeedbackSection },
  { id: "overlays", label: "Overlays", component: OverlaysSection },
  { id: "effects", label: "Effects", component: EffectsSection },
]

function ComponentLibrary() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('tab') || 'layout'
  const [isThemeManagerOpen, setIsThemeManagerOpen] = useState(false)

  const setActiveCategory = (id) => {
    setSearchParams({ tab: id }, { replace: true })
  }

  const ActiveSection = categories.find(c => c.id === activeCategory)?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="border-b border-amber-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-900">Component Library</h1>
            <p className="text-amber-700 text-sm mt-1">
              Papercraft-styled UI components
            </p>
          </div>
          <Button onClick={() => setIsThemeManagerOpen(true)}>
            Theme Manager
          </Button>
        </div>
      </header>

      <ThemeManager open={isThemeManagerOpen} onOpenChange={setIsThemeManagerOpen} />

      <div className="container mx-auto px-6 py-6">
        <nav className="flex gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </nav>

        <main className="pb-24">
          <Suspense fallback={<SectionLoader />} key={activeCategory}>
            {ActiveSection && <ActiveSection />}
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export { ComponentLibrary }
