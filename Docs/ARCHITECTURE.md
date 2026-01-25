# Architecture Overview

This document provides a comprehensive overview of the Papercraft Asset Pack Website architecture, including the tech stack, directory structure, component hierarchy, data flow patterns, and key systems.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Application Bootstrap](#application-bootstrap)
- [Component Hierarchy](#component-hierarchy)
- [Routing Architecture](#routing-architecture)
- [Data Flow Patterns](#data-flow-patterns)
- [Key Systems](#key-systems)
  - [Sticker Playground](#sticker-playground)
  - [Shopping Cart](#shopping-cart)
  - [Design System](#design-system)
- [State Management](#state-management)
- [Dependency Graph](#dependency-graph)

---

## Tech Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool & dev server |
| React Router DOM | 7.13.0 | Client-side routing |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.1.18 | Utility-first CSS |
| class-variance-authority | 0.7.1 | Component variants |
| clsx | 2.1.1 | Conditional classes |
| tailwind-merge | 3.4.0 | Tailwind class deduplication |

### UI Components

| Technology | Version | Purpose |
|------------|---------|---------|
| Radix UI | Various | Accessible primitives |
| shadcn/ui | N/A | Pre-built component patterns |
| Lucide React | 0.563.0 | Icon library |

### Animation & Interaction

| Technology | Version | Purpose |
|------------|---------|---------|
| Framer Motion | 12.29.0 | Animation library |
| @use-gesture/react | 10.3.1 | Touch gesture handling |
| react-use-measure | 2.1.7 | Element measurement |

### Additional Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| cmdk | 1.1.1 | Command palette |
| sonner | 2.0.7 | Toast notifications |
| vaul | 1.1.2 | Drawer component |
| embla-carousel-react | 8.6.0 | Carousel/slider |
| date-fns | 4.1.0 | Date utilities |
| simplex-noise | 4.0.3 | Procedural noise |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| Vitest | 4.0.18 | Test runner |
| Testing Library | 16.3.2 | React testing utilities |
| ESLint | 9.39.1 | Code linting |
| jsdom | 27.4.0 | Test DOM environment |

---

## Directory Structure

```
papercraft-asset-pack-website/
├── public/                    # Static assets (copied to dist)
│
├── src/
│   ├── components/
│   │   ├── ui/               # 88 reusable UI components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── editable-sticker.jsx
│   │   │   ├── playground-canvas.jsx
│   │   │   ├── sticky-cart.jsx
│   │   │   └── ... (85 more)
│   │   │
│   │   ├── sections/         # 18 landing page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PreviewGrid.jsx
│   │   │   └── ... (13 more)
│   │   │
│   │   ├── pages/            # 2 full page components
│   │   │   ├── PreviewPage.jsx
│   │   │   └── PricingPage.jsx
│   │   │
│   │   ├── pricing/          # 5 pricing-specific components
│   │   │   ├── PricingCard.jsx
│   │   │   ├── PriceDisplay.jsx
│   │   │   ├── FeatureList.jsx
│   │   │   ├── TrustBadges.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── landing-page.jsx  # Main landing page composition
│   │   └── component-library.jsx  # Dev component showcase
│   │
│   ├── context/
│   │   └── CartContext.jsx   # Cart state management
│   │
│   ├── data/
│   │   └── assets.js         # Asset data & pricing constants
│   │
│   ├── hooks/
│   │   └── use-canvas-history.js  # Undo/redo state hook
│   │
│   ├── lib/
│   │   └── utils.js          # cn() utility function
│   │
│   ├── test/
│   │   └── setup.js          # Vitest setup
│   │
│   ├── App.jsx               # Root component with routing
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles & CSS variables
│
├── Docs/                     # Documentation
│   ├── ARCHITECTURE.md       # This file
│   ├── COMPONENT_API.md      # Component props reference
│   ├── DESIGN_SYSTEM.md      # Design system spec
│   ├── DEVELOPMENT_GUIDE.md  # Development guide
│   └── PREVIEW_PAGE.md       # Preview page docs
│
├── CLAUDE.md                 # AI assistant context
├── CHANGELOG.md              # Version history
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── jsconfig.json             # Path aliases for IDE
└── index.html                # HTML entry point
```

---

## Application Bootstrap

The application bootstraps through these files in order:

```
index.html
    └── src/main.jsx
        └── src/App.jsx
            ├── CursorProvider (global cursor context)
            ├── PaperFilters (SVG filters for effects)
            ├── BrowserRouter (routing)
            │   └── Routes
            │       ├── "/" → LandingPage or ComponentLibrary
            │       ├── "/pricing" → PricingPage
            │       └── "/preview" → PreviewPage
            ├── ViewToggle (dev mode toggle)
            └── Toaster (toast notifications)
```

### Entry Point: `main.jsx`

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### Root Component: `App.jsx`

```jsx
function App() {
  const [view, setView] = useState('website')

  return (
    <BrowserRouter>
      <CursorProvider enabled={true}>
        <div className="paper-texture-overlay">
          <PaperFilters />
          <Routes>
            <Route path="/" element={
              view === 'website' ? <LandingPage /> : <ComponentLibrary />
            } />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
          <ViewToggle
            view={view}
            onToggle={() => setView(v => v === 'website' ? 'library' : 'website')}
          />
          <Toaster />
        </div>
      </CursorProvider>
    </BrowserRouter>
  )
}
```

---

## Component Hierarchy

### Landing Page (`/`)

```
App
└── CursorProvider
    └── paper-texture-overlay
        ├── PaperFilters
        └── LandingPage
            ├── Nav
            └── main
                ├── Hero
                │   └── PlaygroundCanvas
                │       ├── EditableSticker(s)
                │       └── StickerToolbar
                ├── TrustBar
                ├── CollectionsShowcase
                ├── UseCases
                ├── AssetGallery
                ├── WhatsIncluded
                ├── Testimonials
                ├── GetStarted
                ├── FAQ (notebook paper style)
                └── FinalCTA
            └── Footer
```

### Pricing Page (`/pricing`)

```
App
└── CursorProvider
    └── paper-texture-overlay
        └── PricingPage
            ├── Nav
            └── main
                ├── PricingCard(s)
                │   ├── PriceDisplay
                │   ├── FeatureList
                │   └── TrustBadges
                └── ...
            └── Footer
```

### Preview Page (`/preview`)

```
App
└── CursorProvider
    └── paper-texture-overlay
        └── PreviewPage
            └── CartProvider ← Context boundary
                ├── Nav
                ├── PreviewHero
                ├── PreviewGrid
                │   ├── DirectionAwareTabs (category filter)
                │   ├── CategoryPackHeader (per category)
                │   └── AssetCard(s)
                ├── Footer
                └── StickyCart (fixed position)
```

---

## Routing Architecture

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `LandingPage` / `ComponentLibrary` | Main page (toggleable) |
| `/pricing` | `PricingPage` | Pricing information |
| `/preview` | `PreviewPage` | Asset browser with cart |

### Navigation Flow

```
┌─────────────────────────────────────────────────┐
│                     Nav                          │
│  [Logo]  [Preview]  [Pricing]  [FAQ#]  [Buy CTA] │
└─────────────────────────────────────────────────┘
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
/preview       /pricing          /#faq
(PreviewPage)  (PricingPage)   (scroll to FAQ)
```

### Hash Links

The landing page uses hash links for in-page navigation:
- `#features` - Features section
- `#faq` - FAQ section
- `#pricing` - Pricing section (on landing page)

---

## Data Flow Patterns

### Pattern 1: Props Down (Most Components)

Standard React unidirectional data flow for stateless UI components.

```
Parent Component
    │
    ├── props ──▶ Child Component
    │               │
    │               └── renders UI
    │
    └── callback ◀── event handlers
```

### Pattern 2: Context (Cart State)

Cross-component state sharing for the shopping cart.

```
PreviewPage
    │
    └── CartProvider ─────────────────┐
        │                             │
        ├── PreviewGrid               │
        │   └── AssetCard             │
        │       └── useCart() ◀───────┤
        │                             │
        └── StickyCart                │
            └── useCart() ◀───────────┘

CartContext State:
┌─────────────────────────────────────┐
│  selectedItems: Set<string>         │
│                                     │
│  Computed:                          │
│  ├── cartTotals.itemCount          │
│  ├── cartTotals.price              │
│  ├── cartTotals.meetsMinimum       │
│  └── selectedItemsList[]           │
│                                     │
│  Actions:                           │
│  ├── toggleItem(assetId)           │
│  ├── togglePack(categoryId)        │
│  ├── clearCart()                   │
│  └── selectAll()                   │
└─────────────────────────────────────┘
```

### Pattern 3: Custom Hook (Canvas History)

Encapsulated state logic for undo/redo.

```
PlaygroundCanvas
    │
    └── useCanvasHistory(initialStickers)
        │
        ├── canvasState ──▶ render stickers
        │
        ├── pushState() ◀── transform complete
        │
        ├── undo() ◀─────── Cmd+Z
        │
        └── redo() ◀─────── Cmd+Shift+Z

History State:
┌─────────────────────────────────────┐
│  history: State[]  (max 30 items)   │
│  currentIndex: number               │
│                                     │
│  Derived:                           │
│  ├── canvasState = history[index]  │
│  ├── canUndo = index > 0           │
│  └── canRedo = index < length - 1  │
└─────────────────────────────────────┘
```

---

## Key Systems

### Sticker Playground

Interactive asset preview with drag, scale, rotate controls.

**Components:**

| Component | File | Purpose |
|-----------|------|---------|
| PlaygroundCanvas | `playground-canvas.jsx` | Container managing sticker state |
| EditableSticker | `editable-sticker.jsx` | Individual sticker with transform controls |
| StickerToolbar | `sticker-toolbar.jsx` | Floating action toolbar |

**Data Flow:**

```
PlaygroundCanvas
    │
    ├── stickers[] (state via useCanvasHistory)
    │   ├── id
    │   ├── emoji
    │   ├── x, y (position)
    │   ├── scale
    │   ├── rotation
    │   ├── flipH, flipV
    │   └── hasShadow
    │
    ├── selectedId (which sticker is active)
    │
    └── For each sticker:
        EditableSticker
            │
            ├── onSelect ──▶ sets selectedId
            ├── onTransformChange ──▶ live update (no history)
            └── onTransformEnd ──▶ pushState (saves to history)
```

**Gestures:**

- **Mouse drag**: Reposition sticker
- **Corner handles**: Scale sticker
- **Top handle**: Rotate sticker
- **Touch pinch**: Scale sticker
- **Touch two-finger rotate**: Rotate sticker

### Shopping Cart

À la carte asset selection with minimum cart requirement.

**Components:**

| Component | File | Purpose |
|-----------|------|---------|
| CartContext | `CartContext.jsx` | State provider |
| AssetCard | `asset-card.jsx` | Selectable asset display |
| CategoryPackHeader | `category-pack-header.jsx` | Pack toggle header |
| StickyCart | `sticky-cart.jsx` | Floating cart widget |

**State Shape:**

```javascript
// CartContext internal state
{
  selectedItems: Set<assetId>  // e.g., Set(["scissors-001", "paper-003"])
}

// Computed values (via useMemo)
cartTotals: {
  itemCount: 27,           // selectedItems.size
  price: 7.02,            // itemCount × PRICE_PER_ITEM
  meetsMinimum: true,     // price >= MINIMUM_CART
  amountToMinimum: 0,     // MINIMUM_CART - price (if not met)
  itemsToMinimum: 0,      // ceil(amountToMinimum / PRICE_PER_ITEM)
}

selectedItemsList: Asset[]  // Full asset objects for display
```

**Constants (from `assets.js`):**

```javascript
PRICE_PER_ITEM = 0.26    // $0.26 per asset
TOTAL_PRICE = 39         // $39 for all 150 assets
MINIMUM_CART = 6.99      // Minimum to checkout
```

### Design System

CSS custom properties for consistent papercraft aesthetic.

**Color Tokens:**

```css
/* Theme Colors */
--background    /* Page background (amber-50) */
--foreground    /* Text color (amber-900) */
--primary       /* Brand color (amber-600) */
--accent        /* Accent color (orange-500) */

/* Paper Surface Colors */
--paper-white   /* White paper */
--paper-cream   /* Cream/off-white paper */
--paper-kraft   /* Brown kraft paper */
```

**Elevation System:**

```css
/* Shadow Levels */
--paper-elevation-0  /* Pressed/flat */
--paper-elevation-1  /* Default resting */
--paper-elevation-2  /* Hover/lifted */
--paper-elevation-3  /* Modal/floating */

/* Usage Pattern */
.card {
  box-shadow: var(--paper-elevation-1);
}
.card:hover {
  box-shadow: var(--paper-elevation-2);
  transform: translateY(-4px);
}
```

**Texture System:**

```css
/* Paper texture (global overlay) */
.paper-texture-overlay::before {
  background-image: var(--texture-noise-svg);
  opacity: var(--texture-opacity-faint);
}

/* Notebook paper lines */
.notebook-paper {
  --notebook-line-height: 32px;
  background-image: repeating-linear-gradient(...);
}
```

---

## State Management

### Local State (useState)

Used for component-specific UI state:

```javascript
// Toggle visibility
const [isOpen, setIsOpen] = useState(false)

// Active tab selection
const [activeCategory, setActiveCategory] = useState("all")

// Pagination
const [visibleCount, setVisibleCount] = useState(18)
```

### Context State

Used for cross-component state:

| Context | Provider Location | Consumers |
|---------|-------------------|-----------|
| CartContext | PreviewPage | AssetCard, StickyCart, CategoryPackHeader |
| CursorProvider | App | Any component needing custom cursor |

### Custom Hooks

Encapsulated stateful logic:

| Hook | Purpose | Location |
|------|---------|----------|
| useCanvasHistory | Undo/redo state management | PlaygroundCanvas |
| useIsMobile | Responsive detection | Various |
| useCart | Cart context consumer | Cart-related components |

---

## Dependency Graph

### External Dependencies Flow

```
React 19
    │
    ├── react-dom (rendering)
    ├── react-router-dom (routing)
    │
    ├── framer-motion (animations)
    │   └── react-use-measure
    │
    ├── @use-gesture/react (touch)
    │
    └── Radix UI (accessibility)
        ├── @radix-ui/react-accordion
        ├── @radix-ui/react-checkbox
        ├── @radix-ui/react-dialog
        ├── @radix-ui/react-tabs
        └── ... (15+ more)
```

### Internal Module Flow

```
main.jsx
    │
    └── App.jsx
        ├── components/landing-page.jsx
        │   └── components/sections/*
        │       └── components/ui/*
        │           └── lib/utils.js
        │
        ├── components/pages/PreviewPage.jsx
        │   ├── context/CartContext.jsx
        │   │   └── data/assets.js
        │   └── components/sections/*
        │       └── components/ui/*
        │
        └── index.css (CSS variables)
```

---

## Build Output

When running `npm run build`:

```
dist/
├── index.html            # Entry HTML
├── assets/
│   ├── index-[hash].js   # Main bundle (~300KB gzipped)
│   └── index-[hash].css  # Styles (~50KB gzipped)
└── ... (static assets)
```

The build is a static SPA that can be deployed to any static hosting service.
