import { LayoutGridIcon, HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function ViewToggle({ view, onToggle }) {
  const isLibrary = view === 'library'

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 gap-2"
    >
      {isLibrary ? (
        <>
          <HomeIcon className="size-4" />
          View Website
        </>
      ) : (
        <>
          <LayoutGridIcon className="size-4" />
          View Components
        </>
      )}
    </Button>
  )
}

export { ViewToggle }
