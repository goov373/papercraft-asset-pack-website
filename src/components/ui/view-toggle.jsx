import { useLocation, useNavigate } from "react-router-dom"
import { LayoutGridIcon, HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function ViewToggle() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLibrary = location.pathname === '/library'

  // Only show toggle on homepage and library pages
  if (location.pathname !== '/' && location.pathname !== '/library') {
    return null
  }

  const handleToggle = () => {
    navigate(isLibrary ? '/' : '/library')
  }

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={handleToggle}
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
