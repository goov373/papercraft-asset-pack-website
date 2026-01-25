# Testing Guide

This guide covers the testing setup, patterns, and best practices for the Papercraft Asset Pack Website.

---

## Table of Contents

- [Test Stack](#test-stack)
- [Running Tests](#running-tests)
- [Test Configuration](#test-configuration)
- [Test File Organization](#test-file-organization)
- [Writing Tests](#writing-tests)
  - [Component Tests](#component-tests)
  - [Hook Tests](#hook-tests)
  - [Context Tests](#context-tests)
  - [Utility Function Tests](#utility-function-tests)
- [Testing Patterns](#testing-patterns)
- [Mocking](#mocking)
- [Accessibility Testing](#accessibility-testing)
- [Coverage](#coverage)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## Test Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vitest | 4.0.18 | Test runner (Vite-native) |
| @testing-library/react | 16.3.2 | React component testing |
| @testing-library/jest-dom | 6.9.1 | Custom DOM matchers |
| jsdom | 27.4.0 | Browser environment simulation |

---

## Running Tests

### Commands

```bash
# Run tests in watch mode (default for development)
npm test

# Run tests once (for CI)
npm run test:run

# Run tests with visual UI
npm run test:ui

# Run specific test file
npm test src/components/ui/button.test.jsx

# Run tests matching a pattern
npm test -- --grep "Button"

# Run tests with coverage
npm test -- --coverage
```

### Watch Mode Features

In watch mode, press:
- `a` - Run all tests
- `f` - Run only failed tests
- `p` - Filter by filename pattern
- `t` - Filter by test name pattern
- `q` - Quit watch mode

---

## Test Configuration

### vitest.config.js

```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',        // Browser-like environment
    globals: true,               // No need to import describe, it, expect
    setupFiles: './src/test/setup.js',  // Setup before each test file
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Match Vite aliases
    },
  },
})
```

### Setup File: src/test/setup.js

```javascript
import '@testing-library/jest-dom'
```

This imports custom matchers like `toBeInTheDocument()`, `toHaveTextContent()`, etc.

---

## Test File Organization

### Location Options

**Option A: Colocated (Recommended)**

Test files next to the component they test:

```
src/components/ui/
├── button.jsx
├── button.test.jsx    # Tests for Button
├── card.jsx
└── card.test.jsx      # Tests for Card
```

**Option B: Separate Directory**

All tests in a `__tests__` folder:

```
src/components/ui/
├── __tests__/
│   ├── button.test.jsx
│   └── card.test.jsx
├── button.jsx
└── card.jsx
```

### Naming Conventions

| Pattern | Example |
|---------|---------|
| `*.test.jsx` | `button.test.jsx` |
| `*.test.js` | `utils.test.js` |
| `*.spec.jsx` | `button.spec.jsx` |
| `*.spec.js` | `utils.spec.js` |

All patterns are recognized by Vitest.

---

## Writing Tests

### Component Tests

#### Basic Component Test

```jsx
// src/components/ui/button.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline')
  })

  it('applies size classes', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
  })
})
```

#### Testing User Interactions

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button interactions', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button disabled onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })
})
```

#### Testing Conditional Rendering

```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AssetCard } from './asset-card'

describe('AssetCard', () => {
  const mockAsset = {
    id: 'scissors-001',
    name: 'Classic Scissors',
    emoji: '✂️',
    category: 'scissors',
  }

  it('shows selected state when isSelected is true', () => {
    render(
      <AssetCard
        asset={mockAsset}
        isSelected={true}
        onToggle={() => {}}
      />
    )

    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })

  it('shows unselected state when isSelected is false', () => {
    render(
      <AssetCard
        asset={mockAsset}
        isSelected={false}
        onToggle={() => {}}
      />
    )

    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false')
  })
})
```

---

### Hook Tests

#### Testing useCanvasHistory

```jsx
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCanvasHistory, deleteSticker, duplicateSticker } from '@/hooks/use-canvas-history'

describe('useCanvasHistory', () => {
  const initialStickers = [
    { id: '1', emoji: '✂️', x: 0, y: 0 },
    { id: '2', emoji: '📄', x: 100, y: 100 },
  ]

  it('initializes with provided state', () => {
    const { result } = renderHook(() => useCanvasHistory(initialStickers))

    expect(result.current.canvasState).toEqual(initialStickers)
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('tracks history when pushState is called', () => {
    const { result } = renderHook(() => useCanvasHistory(initialStickers))

    act(() => {
      result.current.pushState([
        ...initialStickers,
        { id: '3', emoji: '🖊️', x: 200, y: 200 },
      ])
    })

    expect(result.current.canvasState).toHaveLength(3)
    expect(result.current.canUndo).toBe(true)
  })

  it('supports undo', () => {
    const { result } = renderHook(() => useCanvasHistory(initialStickers))

    // Add a sticker
    act(() => {
      result.current.pushState([
        ...initialStickers,
        { id: '3', emoji: '🖊️', x: 200, y: 200 },
      ])
    })

    // Undo
    act(() => {
      result.current.undo()
    })

    expect(result.current.canvasState).toHaveLength(2)
    expect(result.current.canRedo).toBe(true)
  })

  it('supports redo', () => {
    const { result } = renderHook(() => useCanvasHistory(initialStickers))

    // Add and undo
    act(() => {
      result.current.pushState([
        ...initialStickers,
        { id: '3', emoji: '🖊️', x: 200, y: 200 },
      ])
      result.current.undo()
    })

    // Redo
    act(() => {
      result.current.redo()
    })

    expect(result.current.canvasState).toHaveLength(3)
  })

  it('clears history', () => {
    const { result } = renderHook(() => useCanvasHistory(initialStickers))

    act(() => {
      result.current.pushState([...initialStickers, { id: '3' }])
      result.current.clearHistory([])
    })

    expect(result.current.canvasState).toEqual([])
    expect(result.current.canUndo).toBe(false)
  })
})

describe('helper functions', () => {
  it('deleteSticker removes a sticker', () => {
    const stickers = [{ id: '1' }, { id: '2' }]
    const result = deleteSticker(stickers, '1')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('duplicateSticker creates a copy with offset', () => {
    const stickers = [{ id: '1', x: 100, y: 100 }]
    const result = duplicateSticker(stickers, '1', () => 'new-id')

    expect(result).toHaveLength(2)
    expect(result[1].id).toBe('new-id')
    expect(result[1].x).toBe(120)
    expect(result[1].y).toBe(120)
  })
})
```

---

### Context Tests

#### Testing CartContext

```jsx
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartProvider, useCart } from '@/context/CartContext'

// Wrapper component for providing context
const wrapper = ({ children }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.selectedItems.size).toBe(0)
    expect(result.current.cartTotals.itemCount).toBe(0)
    expect(result.current.cartTotals.price).toBe(0)
  })

  it('toggleItem adds and removes items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    // Add item
    act(() => {
      result.current.toggleItem('scissors-001')
    })

    expect(result.current.isItemSelected('scissors-001')).toBe(true)
    expect(result.current.cartTotals.itemCount).toBe(1)

    // Remove item
    act(() => {
      result.current.toggleItem('scissors-001')
    })

    expect(result.current.isItemSelected('scissors-001')).toBe(false)
    expect(result.current.cartTotals.itemCount).toBe(0)
  })

  it('calculates price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.toggleItem('scissors-001')
      result.current.toggleItem('scissors-002')
      result.current.toggleItem('scissors-003')
    })

    // 3 items × $0.26 = $0.78
    expect(result.current.cartTotals.price).toBeCloseTo(0.78)
  })

  it('tracks minimum cart requirement', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    // Add a few items (not enough for minimum)
    act(() => {
      for (let i = 1; i <= 10; i++) {
        result.current.toggleItem(`scissors-${String(i).padStart(3, '0')}`)
      }
    })

    // 10 × $0.26 = $2.60, minimum is $6.99
    expect(result.current.cartTotals.meetsMinimum).toBe(false)
    expect(result.current.cartTotals.amountToMinimum).toBeGreaterThan(0)
  })

  it('clearCart removes all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.toggleItem('scissors-001')
      result.current.toggleItem('scissors-002')
      result.current.clearCart()
    })

    expect(result.current.cartTotals.itemCount).toBe(0)
  })

  it('selectAll selects all 150 items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.selectAll()
    })

    expect(result.current.cartTotals.itemCount).toBe(150)
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useCart())
    }).toThrow('useCart must be used within a CartProvider')

    consoleSpy.mockRestore()
  })
})
```

---

### Utility Function Tests

```jsx
// src/lib/utils.test.js
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'included', false && 'excluded')).toBe('base included')
  })

  it('handles array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('deduplicates Tailwind classes', () => {
    // tailwind-merge handles conflicts
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })
})
```

```jsx
// src/data/assets.test.js
import { describe, it, expect } from 'vitest'
import {
  assets,
  categories,
  getAssetsByCategory,
  getCategoryById,
  formatPrice,
  PRICE_PER_ITEM,
  MINIMUM_CART,
} from './assets'

describe('assets data', () => {
  it('has 150 assets', () => {
    expect(assets).toHaveLength(150)
  })

  it('has correct category structure', () => {
    categories.forEach(cat => {
      expect(cat).toHaveProperty('id')
      expect(cat).toHaveProperty('label')
      expect(cat).toHaveProperty('count')
      expect(cat).toHaveProperty('emoji')
    })
  })

  it('getAssetsByCategory returns all for "all"', () => {
    expect(getAssetsByCategory('all')).toHaveLength(150)
  })

  it('getAssetsByCategory filters correctly', () => {
    const scissors = getAssetsByCategory('scissors')
    expect(scissors.every(a => a.category === 'scissors')).toBe(true)
    expect(scissors.length).toBe(18)
  })

  it('getCategoryById returns correct category', () => {
    const paper = getCategoryById('paper')
    expect(paper.label).toBe('Paper & Cardstock')
  })

  it('formatPrice formats correctly', () => {
    expect(formatPrice(9.99)).toBe('$9.99')
    expect(formatPrice(10)).toBe('$10.00')
    expect(formatPrice(0.26)).toBe('$0.26')
  })

  it('has correct pricing constants', () => {
    expect(PRICE_PER_ITEM).toBe(0.26)
    expect(MINIMUM_CART).toBe(6.99)
  })
})
```

---

## Testing Patterns

### Testing Component Variants

```jsx
describe('Button variants', () => {
  const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']

  variants.forEach(variant => {
    it(`renders ${variant} variant`, () => {
      render(<Button variant={variant}>Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
    })
  })
})
```

### Testing Accessibility

```jsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Button accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('is focusable', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveFocus()
  })

  it('has correct role', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### Testing Async Operations

```jsx
import { render, screen, waitFor } from '@testing-library/react'

it('loads data asynchronously', async () => {
  render(<AsyncComponent />)

  // Wait for loading to complete
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

---

## Mocking

### Mocking Functions

```jsx
import { vi } from 'vitest'

const mockCallback = vi.fn()

// Assert calls
expect(mockCallback).toHaveBeenCalled()
expect(mockCallback).toHaveBeenCalledTimes(2)
expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2')

// Mock return values
mockCallback.mockReturnValue(42)
mockCallback.mockResolvedValue({ data: 'async' })
```

### Mocking Modules

```jsx
import { vi } from 'vitest'

// Mock an entire module
vi.mock('@/data/assets', () => ({
  assets: [{ id: '1', name: 'Test' }],
  PRICE_PER_ITEM: 1.00,
}))

// Mock specific exports
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
  }
})
```

### Mocking Window APIs

```jsx
describe('responsive behavior', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(max-width: 768px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  it('detects mobile viewport', () => {
    // Your test using useIsMobile or similar
  })
})
```

---

## Accessibility Testing

### Using jest-axe

Install: `npm install -D jest-axe`

```jsx
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Component accessibility', () => {
  it('has no a11y violations', async () => {
    const { container } = render(<MyComponent />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

### Manual Accessibility Checks

```jsx
it('has proper ARIA attributes', () => {
  render(<Dialog open>Content</Dialog>)

  const dialog = screen.getByRole('dialog')
  expect(dialog).toHaveAttribute('aria-modal', 'true')
})

it('has accessible labels', () => {
  render(<Input label="Email" />)
  expect(screen.getByLabelText('Email')).toBeInTheDocument()
})
```

---

## Coverage

### Running Coverage

```bash
npm test -- --coverage
```

### Coverage Configuration

Add to `vitest.config.js`:

```javascript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{js,jsx}',
        '**/*.d.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
})
```

### Coverage Goals

| Category | Target | Notes |
|----------|--------|-------|
| UI Components | 70%+ | Focus on variants, states, interactions |
| Hooks | 90%+ | Full logic coverage |
| Context | 90%+ | All actions and computed values |
| Utilities | 100% | Pure functions are easy to test |

---

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## Troubleshooting

### Test Not Finding Component

```
Error: Unable to find role="button"
```

**Solutions:**
- Check component is rendering (no errors)
- Use `screen.debug()` to see current DOM
- Verify correct role/testId

### Module Not Found

```
Error: Cannot find module '@/components/ui/button'
```

**Solutions:**
- Ensure `@/` alias is in `vitest.config.js`
- Check file path is correct

### Act Warnings

```
Warning: An update to Component inside a test was not wrapped in act(...)
```

**Solutions:**
- Wrap state updates in `act()`:
```jsx
act(() => {
  result.current.someAction()
})
```
- Use `waitFor` for async updates:
```jsx
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

### Testing Library Queries

| Query | Use When |
|-------|----------|
| `getBy*` | Element should be present (throws if not) |
| `queryBy*` | Element might not be present (returns null) |
| `findBy*` | Element appears asynchronously (returns promise) |

Priority (most accessible first):
1. `getByRole`
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

---

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
