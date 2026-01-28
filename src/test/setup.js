import '@testing-library/jest-dom'

// Mock ResizeObserver for Radix UI components
globalThis.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock pointer capture methods for Radix UI Select/Slider
Element.prototype.hasPointerCapture = () => false
Element.prototype.setPointerCapture = () => {}
Element.prototype.releasePointerCapture = () => {}

// Mock scrollIntoView for components that use it
Element.prototype.scrollIntoView = () => {}

// Mock matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock IntersectionObserver for scroll-related components
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.scrollTo for scroll-related tests
window.scrollTo = () => {}

// Mock getBoundingClientRect for transform and position calculations
if (!Element.prototype._originalGetBoundingClientRect) {
  Element.prototype._originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
  Element.prototype.getBoundingClientRect = function() {
    // Return a default rect if not overridden
    return {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }
  }
}

// Mock requestAnimationFrame for animation tests
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
