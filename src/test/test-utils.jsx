import { render } from '@testing-library/react'
import { StrictMode } from 'react'

/**
 * Custom render function that wraps components with necessary providers
 * @param {React.ReactElement} ui - The component to render
 * @param {object} options - Additional render options
 * @returns {import('@testing-library/react').RenderResult}
 */
function customRender(ui, options = {}) {
  const { wrapper: Wrapper, ...renderOptions } = options

  function AllProviders({ children }) {
    // Add providers here as needed (e.g., ThemeProvider, ToastProvider)
    return <StrictMode>{children}</StrictMode>
  }

  return render(ui, {
    wrapper: Wrapper ?? AllProviders,
    ...renderOptions,
  })
}

// Re-export everything from testing-library
export * from '@testing-library/react'

// Override the render method
export { customRender as render }

// Common test utilities
export function createMockRef() {
  return { current: null }
}

/**
 * Wait for a condition to be true
 * @param {() => boolean} condition
 * @param {number} timeout
 */
export async function waitForCondition(condition, timeout = 1000) {
  const start = Date.now()
  while (!condition() && Date.now() - start < timeout) {
    await new Promise(resolve => setTimeout(resolve, 10))
  }
}
