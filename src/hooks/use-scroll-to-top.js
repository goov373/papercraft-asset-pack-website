import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook that scrolls to the top of the page on route changes.
 * Ensures pages always start at the top when navigating.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
