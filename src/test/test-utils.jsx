import { render } from '@testing-library/react'
import { StrictMode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'

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

/**
 * Wrapper with MemoryRouter for components that use React Router
 */
export function RouterWrapper({ children, initialEntries = ['/'] }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <StrictMode>{children}</StrictMode>
    </MemoryRouter>
  )
}

/**
 * Wrapper with CartProvider for cart-related tests
 */
export function CartWrapper({ children }) {
  return (
    <CartProvider>
      <StrictMode>{children}</StrictMode>
    </CartProvider>
  )
}

/**
 * Wrapper with both Router and Cart providers (for preview page tests)
 */
export function PreviewWrapper({ children, initialEntries = ['/preview'] }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <CartProvider>
        <StrictMode>{children}</StrictMode>
      </CartProvider>
    </MemoryRouter>
  )
}

/**
 * Render with CartProvider wrapper
 */
export function renderWithCart(ui, options = {}) {
  return render(ui, { wrapper: CartWrapper, ...options })
}

/**
 * Render with Router wrapper
 */
export function renderWithRouter(ui, { initialEntries = ['/'], ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <RouterWrapper initialEntries={initialEntries}>{children}</RouterWrapper>
    ),
    ...options,
  })
}

/**
 * Render with all providers (Router + Cart) for preview page tests
 */
export function renderWithProviders(ui, { initialEntries = ['/preview'], ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <PreviewWrapper initialEntries={initialEntries}>{children}</PreviewWrapper>
    ),
    ...options,
  })
}

/**
 * Create a mock keyboard event for testing keyboard shortcuts
 */
export function createMockKeyboardEvent(key, options = {}) {
  return new KeyboardEvent('keydown', {
    key,
    code: key,
    metaKey: options.meta || false,
    ctrlKey: options.ctrl || false,
    shiftKey: options.shift || false,
    altKey: options.alt || false,
    bubbles: true,
    cancelable: true,
    ...options,
  })
}
