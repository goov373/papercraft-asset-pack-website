# Development Guide

This guide covers getting started, common development tasks, coding conventions, and troubleshooting for the Papercraft Asset Pack Website.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Common Development Tasks](#common-development-tasks)
  - [Adding a New Section](#adding-a-new-section)
  - [Adding a New Page](#adding-a-new-page)
  - [Adding a UI Component](#adding-a-ui-component)
  - [Adding State Management](#adding-state-management)
  - [Working with the Cart](#working-with-the-cart)
- [Styling Patterns](#styling-patterns)
  - [Using cn() for Class Merging](#using-cn-for-class-merging)
  - [Paper Elevation System](#paper-elevation-system)
  - [CSS Custom Properties](#css-custom-properties)
  - [Responsive Design](#responsive-design)
  - [Touch Target Requirements](#touch-target-requirements)
  - [Animation Guidelines](#animation-guidelines)
- [Code Conventions](#code-conventions)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Code Editor**: VS Code recommended

### VS Code Extensions (Recommended)

```
ES7+ React/Redux/React-Native snippets
Tailwind CSS IntelliSense
ESLint
Prettier - Code formatter
Path Intellisense
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Papercraft asset pack website"

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all JS/JSX files |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once (CI mode) |
| `npm run test:ui` | Run Vitest with visual UI |

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (88 files)
│   ├── sections/        # Landing page sections (18 files)
│   ├── pages/           # Full page components (2 files)
│   └── pricing/         # Pricing-specific components (5 files)
├── context/
│   └── CartContext.jsx  # Cart state management
├── data/
│   └── assets.js        # Asset data and pricing constants
├── hooks/
│   └── use-canvas-history.js  # Undo/redo history hook
├── lib/
│   └── utils.js         # cn() utility for class merging
├── App.jsx              # Root component with routing
├── main.jsx             # Application entry point
└── index.css            # Global styles and CSS variables
```

### Path Aliases

The project uses `@/` as an alias for `./src/`. Configure your IDE to recognize this:

```javascript
// Import from anywhere using @/
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
```

---

## Common Development Tasks

### Adding a New Section

Sections are self-contained components that make up the landing page.

**Step 1: Create the section file**

```jsx
// src/components/sections/NewSection.jsx
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

function NewSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Section Title
          </h2>
          <p className="mt-4 text-muted-foreground">
            Section description text.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default NewSection
```

**Step 2: Add to the landing page**

```jsx
// src/components/landing-page.jsx
import NewSection from "@/components/sections/NewSection"

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        {/* ... other sections ... */}
        <NewSection />  {/* Add your section */}
        <Footer />
      </main>
    </div>
  )
}
```

**Section Best Practices:**

- Use `<Container>` for consistent max-width and padding
- Use `py-20 md:py-32` for vertical spacing
- Add Framer Motion animations with `whileInView` for scroll-triggered effects
- Use `viewport={{ once: true }}` to animate only on first scroll
- Export as default for easy importing

---

### Adding a New Page

Pages are top-level route components that contain their own sections.

**Step 1: Create the page file**

```jsx
// src/components/pages/NewPage.jsx
import Nav from "@/components/sections/Nav"
import Footer from "@/components/sections/Footer"
import { Container } from "@/components/ui/container"

function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-16"> {/* Account for fixed nav */}
        <Container>
          <h1 className="text-4xl font-bold text-foreground">
            Page Title
          </h1>
          {/* Page content */}
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default NewPage
```

**Step 2: Add the route**

```jsx
// src/App.jsx
import NewPage from "@/components/pages/NewPage"

function App() {
  return (
    <BrowserRouter>
      <CursorProvider enabled={true}>
        <div className="paper-texture-overlay">
          <PaperFilters />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/newpage" element={<NewPage />} /> {/* Add route */}
          </Routes>
          <Toaster />
        </div>
      </CursorProvider>
    </BrowserRouter>
  )
}
```

**Step 3: Update navigation links**

```jsx
// src/components/sections/Nav.jsx - add to nav items
{ label: "New Page", href: "/newpage" }

// src/components/sections/Footer.jsx - add to footerLinks
product: [
  { label: "Preview", href: "/preview" },
  { label: "New Page", href: "/newpage" },
]
```

---

### Adding a UI Component

#### Option A: Add shadcn/ui Component

shadcn/ui components can be added via CLI:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add [component-name]
```

This downloads the component to `src/components/ui/` where you can customize it.

#### Option B: Create Custom Component

**Step 1: Create component with CVA variants**

```jsx
// src/components/ui/custom-card.jsx
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const customCardVariants = cva(
  // Base styles (always applied)
  "rounded-lg border border-border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card shadow-card",
        paper: "bg-[var(--paper-cream)] shadow-paper-1",
        kraft: "bg-[var(--paper-kraft)] shadow-paper-kraft",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-card-hover hover:-translate-y-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

function CustomCard({
  className,
  variant,
  size,
  interactive,
  children,
  ...props
}) {
  return (
    <div
      className={cn(customCardVariants({ variant, size, interactive }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { CustomCard, customCardVariants }
```

**Step 2: Use the component**

```jsx
import { CustomCard } from "@/components/ui/custom-card"

// Default usage
<CustomCard>Content here</CustomCard>

// With variants
<CustomCard variant="paper" size="lg" interactive>
  Click me
</CustomCard>

// With additional classes
<CustomCard className="my-4">
  Extra margin
</CustomCard>
```

---

### Adding State Management

For cross-component state, use React Context:

**Step 1: Create the context**

```jsx
// src/context/NewContext.jsx
import { createContext, useContext, useState, useMemo } from "react"

const NewContext = createContext(null)

export function NewProvider({ children }) {
  const [state, setState] = useState({
    // Initial state
  })

  // Computed values
  const computed = useMemo(() => ({
    // Derived state
  }), [state])

  // Actions
  const actions = {
    doSomething: (value) => {
      setState(prev => ({ ...prev, value }))
    },
    reset: () => {
      setState({ /* initial state */ })
    },
  }

  return (
    <NewContext.Provider value={{ state, ...computed, ...actions }}>
      {children}
    </NewContext.Provider>
  )
}

export function useNew() {
  const context = useContext(NewContext)
  if (!context) {
    throw new Error("useNew must be used within NewProvider")
  }
  return context
}
```

**Step 2: Wrap components that need the context**

```jsx
// In a page or layout component
import { NewProvider } from "@/context/NewContext"

function MyPage() {
  return (
    <NewProvider>
      <ComponentThatNeedsContext />
    </NewProvider>
  )
}
```

**Step 3: Use the context in components**

```jsx
import { useNew } from "@/context/NewContext"

function MyComponent() {
  const { state, doSomething } = useNew()

  return (
    <button onClick={() => doSomething("value")}>
      Current: {state.value}
    </button>
  )
}
```

---

### Working with the Cart

The Preview page uses `CartContext` for shopping cart state.

#### Reading Cart State

```jsx
import { useCart } from "@/context/CartContext"

function MyComponent() {
  const {
    selectedItems,        // Set of selected asset IDs
    cartTotals,           // { itemCount, price, meetsMinimum, amountToMinimum, itemsToMinimum }
    isItemSelected,       // (assetId) => boolean
    isPackSelected,       // (categoryId) => boolean
    isPackPartiallySelected, // (categoryId) => boolean
  } = useCart()

  return (
    <div>
      Items: {cartTotals.itemCount}
      Total: ${cartTotals.price.toFixed(2)}
    </div>
  )
}
```

#### Modifying Cart

```jsx
const { toggleItem, togglePack, clearCart, selectAll } = useCart()

// Toggle single item
toggleItem("scissors-001")

// Toggle entire category pack
togglePack("scissors")

// Clear all selections
clearCart()

// Select all 150 items
selectAll()
```

---

## Styling Patterns

### Using cn() for Class Merging

The `cn()` utility from `src/lib/utils.js` combines `clsx` and `tailwind-merge`:

```jsx
import { cn } from "@/lib/utils"

// Basic usage - merges classes
<div className={cn("p-4 bg-card", "rounded-lg")}>

// Conditional classes
<div className={cn(
  "p-4",
  isActive && "bg-primary",
  isDisabled && "opacity-50 pointer-events-none"
)}>

// Override Tailwind classes (tailwind-merge handles conflicts)
<div className={cn("p-4", className)}>
// If className="p-8", the result is "p-8" (not "p-4 p-8")

// Array syntax
<div className={cn([
  "base-class",
  condition && "conditional-class"
])}>
```

---

### Paper Elevation System

The design system uses a 4-level elevation scale for depth:

| Level | Variable | Use Case |
|-------|----------|----------|
| 0 | `--paper-elevation-0` | Pressed/active state |
| 1 | `--paper-elevation-1` | Default resting state |
| 2 | `--paper-elevation-2` | Hover/lifted state |
| 3 | `--paper-elevation-3` | Modal/floating elements |

**Usage in Tailwind:**

```jsx
// Using CSS variable directly
<div className="[box-shadow:var(--paper-elevation-1)]">

// Using theme shadow utilities
<div className="shadow-paper-1 hover:shadow-paper-2">

// Using semantic shadows
<div className="shadow-card hover:shadow-card-hover">
```

**Interactive Pattern:**

```jsx
// Standard hover lift effect
<div className="
  [box-shadow:var(--paper-elevation-1)]
  hover:[box-shadow:var(--paper-elevation-2)]
  hover:[transform:translateY(-4px)]
  active:[box-shadow:var(--paper-elevation-0)]
  active:[transform:translateY(1px)]
  transition-all duration-200
">
```

---

### CSS Custom Properties

#### Color Tokens

```css
/* Theme colors */
--background      /* Page background */
--foreground      /* Primary text */
--card            /* Card backgrounds */
--primary         /* Primary brand color (amber-600) */
--secondary       /* Secondary elements */
--muted           /* Muted backgrounds */
--muted-foreground /* Muted text */
--accent          /* Accent color (orange-500) */
--border          /* Border color */
--ring            /* Focus ring color */

/* Paper colors */
--paper-white     /* White paper surface */
--paper-cream     /* Cream/off-white paper */
--paper-kraft     /* Brown kraft paper */
```

**Usage:**

```jsx
<div className="bg-[var(--paper-cream)]">
<span className="text-muted-foreground">
<div className="border-border">
```

#### Transition Tokens

```css
--paper-duration-instant: 100ms  /* Press feedback */
--paper-duration-fast: 150ms     /* Quick feedback */
--paper-duration-normal: 250ms   /* Standard transitions */
--paper-transition-settle: 0.3s cubic-bezier(0.22, 1, 0.36, 1)
```

---

### Responsive Design

Use Tailwind's mobile-first breakpoints:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| (default) | 0px | Mobile styles |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

**Examples:**

```jsx
// Responsive grid
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

// Responsive spacing
<section className="py-12 md:py-20 lg:py-32">

// Responsive text
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">

// Hide/show at breakpoints
<div className="hidden md:block">  {/* Hidden on mobile */}
<div className="md:hidden">        {/* Hidden on desktop */}
```

---

### Touch Target Requirements

All interactive elements must have a minimum 44x44px touch target for accessibility:

```jsx
// Checkbox with proper touch target
<label className="w-11 h-11 flex items-center justify-center cursor-pointer">
  <Checkbox className="h-5 w-5" /> {/* Visual size can be smaller */}
</label>

// Icon button
<button className="size-11 flex items-center justify-center">
  <Icon className="size-5" />
</button>

// List item
<button className="min-h-11 px-4 py-2 w-full text-left">
  Menu Item
</button>
```

---

### Animation Guidelines

Use Framer Motion for animations:

**Scroll-triggered animations:**

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Staggered children:**

```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i} variants={item}>
      {i}
    </motion.li>
  ))}
</motion.ul>
```

**Respect reduced motion:**

```jsx
// CSS handles this automatically for paper-interactive class
// For custom animations, check preference:
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches

<motion.div
  animate={{ y: prefersReducedMotion ? 0 : -10 }}
>
```

---

## Code Conventions

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| UI Components | kebab-case | `button.jsx`, `sticky-cart.jsx` |
| Section Components | PascalCase | `Hero.jsx`, `WhatsIncluded.jsx` |
| Page Components | PascalCase | `PreviewPage.jsx` |
| Hooks | camelCase with `use-` | `use-canvas-history.js` |
| Context | PascalCase | `CartContext.jsx` |
| Utilities | camelCase | `utils.js` |

### Component Naming

- **UI components**: PascalCase, match filename without extension
- **Export**: Named export for components with variants, default export for standalone

```jsx
// Named exports (with variants)
export { Button, buttonVariants }

// Default export (standalone)
export default WhatsIncluded
```

### Import Ordering

```jsx
// 1. React and framework imports
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// 2. Third-party libraries
import { Check, X } from "lucide-react"

// 3. Internal UI components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// 4. Internal sections/pages
import Hero from "@/components/sections/Hero"

// 5. Contexts and hooks
import { useCart } from "@/context/CartContext"

// 6. Utilities and data
import { cn } from "@/lib/utils"
import { assets } from "@/data/assets"
```

### ESLint Rules

The project uses these ESLint configurations:

- `eslint:recommended`
- `react-hooks/recommended`
- `react-refresh/vite`

Custom rule:
```javascript
'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
// Ignores unused variables starting with uppercase or underscore
```

Run linting:
```bash
npm run lint
```

---

## Troubleshooting

### Dev Server Issues

**Problem: Port already in use**
```
Port 5173 is in use, trying another one...
```

Vite automatically finds an available port. Check the terminal output for the actual URL.

**Problem: HMR not working**

1. Check for syntax errors in the console
2. Try a hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Restart the dev server: `Ctrl+C` then `npm run dev`

### Build Errors

**Problem: Import path not resolved**

Check that you're using the `@/` alias correctly:
```jsx
// Correct
import { Button } from "@/components/ui/button"

// Incorrect
import { Button } from "../../components/ui/button"
```

**Problem: Tailwind classes not applying**

1. Ensure the file is in `src/` (content path in Tailwind config)
2. Check for typos in class names
3. Check that you're using `cn()` correctly for conditional classes

### Component Issues

**Problem: Context value is null**

Ensure the component is wrapped in the provider:
```jsx
// This will throw an error
function App() {
  return <ComponentUsingCart />  // Not wrapped!
}

// Correct
function App() {
  return (
    <CartProvider>
      <ComponentUsingCart />
    </CartProvider>
  )
}
```

**Problem: Radix UI component not styled**

shadcn/ui components require specific class names. Check the component file in `src/components/ui/` for the expected structure.

### Performance Issues

**Problem: Slow initial load**

1. Check bundle size: `npm run build` then look at output sizes
2. Look for large dependencies being imported entirely
3. Use dynamic imports for heavy components:
```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

**Problem: Laggy animations**

1. Use `transform` and `opacity` for animations (GPU accelerated)
2. Add `will-change: transform` for known animated elements
3. Avoid animating `width`, `height`, `top`, `left` (causes layout shifts)

### Common Console Warnings

**Warning: Each child in a list should have a unique "key" prop**
```jsx
// Add unique keys to mapped elements
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

**Warning: A component is changing an uncontrolled input to be controlled**
```jsx
// Initialize state with empty string, not undefined
const [value, setValue] = useState("")  // Not useState()
```

---

## Additional Resources

- **COMPONENT_API.md** - Complete props reference for all components
- **ARCHITECTURE.md** - System overview and data flow
- **DESIGN_SYSTEM.md** - Full design system specification
- **PREVIEW_PAGE.md** - Preview page technical documentation
