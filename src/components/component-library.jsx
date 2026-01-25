import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormControlsSection } from "@/components/component-library/form-controls-section"
import { ActionsSection } from "@/components/component-library/actions-section"
import { LayoutSection } from "@/components/component-library/layout-section"
import { NavigationSection } from "@/components/component-library/navigation-section"
import { OverlaysSection } from "@/components/component-library/overlays-section"
import { DataDisplaySection } from "@/components/component-library/data-display-section"
import { FeedbackSection } from "@/components/component-library/feedback-section"
import { SpecializedInputsSection } from "@/components/component-library/specialized-inputs-section"
import { UtilityLayoutSection } from "@/components/component-library/utility-layout-section"

const categories = [
  { id: "form-controls", label: "Form Controls", component: FormControlsSection },
  { id: "actions", label: "Actions & Feedback", component: ActionsSection },
  { id: "feedback", label: "Feedback", component: FeedbackSection },
  { id: "layout", label: "Layout", component: LayoutSection },
  { id: "navigation", label: "Navigation", component: NavigationSection },
  { id: "overlays", label: "Overlays", component: OverlaysSection },
  { id: "data-display", label: "Data Display", component: DataDisplaySection },
  { id: "specialized-inputs", label: "Specialized Inputs", component: SpecializedInputsSection },
  { id: "utility-layout", label: "Utility & Layout", component: UtilityLayoutSection },
]

function ComponentLibrary() {
  const [activeCategory, setActiveCategory] = useState("form-controls")

  const ActiveSection = categories.find(c => c.id === activeCategory)?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="border-b border-amber-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-amber-900">Component Library</h1>
          <p className="text-amber-700 text-sm mt-1">
            Papercraft-styled UI components
          </p>
        </div>
      </header>

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
          {ActiveSection && <ActiveSection />}
        </main>
      </div>
    </div>
  )
}

export { ComponentLibrary }
