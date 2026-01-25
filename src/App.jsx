import { useState } from "react"
import { PaperFilters } from '@/components/ui/paper-filters'
import { LandingPage } from '@/components/landing-page'
import { ComponentLibrary } from '@/components/component-library'
import { ViewToggle } from '@/components/ui/view-toggle'

function App() {
  const [view, setView] = useState('website')

  return (
    <>
      <PaperFilters />
      {view === 'website' ? <LandingPage /> : <ComponentLibrary />}
      <ViewToggle
        view={view}
        onToggle={() => setView(v => v === 'website' ? 'library' : 'website')}
      />
    </>
  )
}

export default App
