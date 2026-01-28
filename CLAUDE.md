# Papercraft Asset Pack Website

## Quick Context

- React 19 + Vite 7 + Tailwind CSS 4 + shadcn/ui
- JavaScript (not TypeScript)
- Landing page for selling papercraft vector asset packs
- Interactive sticker playground for asset preview

## Key Commands

- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Production build
- `npm test` - Run tests with Vitest
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook (port 6006)
- `npx shadcn@latest add [component]` - Add UI components

## Architecture

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.jsx, card.jsx, badge.jsx  # shadcn/ui base
│   │   ├── editable-sticker.jsx   # Transform wrapper
│   │   ├── sticker-toolbar.jsx    # Floating action toolbar
│   │   └── playground-canvas.jsx  # Interactive sticker canvas
│   ├── theme-manager/   # Theme customization system
│   │   ├── index.jsx              # Main modal component
│   │   ├── colors-tab.jsx         # Tinte integration
│   │   ├── typography-tab.jsx     # Typography controls
│   │   ├── papercraft-tab.jsx     # Papercraft controls
│   │   ├── presets-tab.jsx        # Preset management
│   │   └── controls/              # Font selector, type scale, line height
│   ├── sections/        # Landing page sections
│   │   ├── Hero.jsx, FAQ.jsx, Pricing.jsx, etc.
│   ├── pricing/         # Pricing-specific components
│   └── pages/           # Full page components
├── context/
│   └── ThemeContext.jsx # Theme state management + persistence
├── hooks/
│   ├── use-canvas-history.js  # Undo/redo state management
│   └── use-scroll-to-top.js   # Scroll reset on route changes
├── lib/
│   ├── utils.js         # cn() utility for class merging
│   ├── sentry.js        # Error tracking utilities
│   ├── theme-utils.js   # CSS variable utilities + presets + typography
│   └── typography-config.js  # Font catalog, type scales, line heights
├── test/
│   ├── setup.js         # Vitest setup with mocks
│   └── test-utils.jsx   # Custom render with providers
└── index.css            # Theme CSS variables + papercraft styles
```

## Design System

- **Theme**: Warm, handcrafted papercraft aesthetic (fully theme-aware)
- **Primary**: Theme-defined via `--primary` (default: Amber-600)
- **Accent**: Theme-defined via `--accent` (default: Orange-500)
- **Paper surfaces**: `--paper-white`, `--paper-cream`, `--paper-kraft`
- See `/Docs/DESIGN_SYSTEM.md` for full spec

### Semantic Color Classes

Always use semantic Tailwind classes instead of hardcoded colors to ensure theme compatibility:

| Use This                   | Not This                               |
| -------------------------- | -------------------------------------- |
| `bg-background`, `bg-card` | `bg-white`                             |
| `bg-muted`                 | `bg-amber-50`                          |
| `bg-accent`                | `bg-amber-100`, `bg-amber-200`         |
| `text-foreground`          | `text-amber-900`                       |
| `text-muted-foreground`    | `text-amber-700`, `text-amber-600`     |
| `border-border`            | `border-amber-200`, `border-amber-300` |
| `text-primary`             | `text-amber-600`, `text-amber-500`     |
| `dark:bg-card`             | `dark:bg-amber-950`                    |

**Exceptions** (intentionally hardcoded):

- Warning alerts/toasts - amber represents warning state
- Star ratings - stars are traditionally amber/yellow
- Specific decorative elements where amber is the design intent

## Key Features

### Theme Manager

Real-time theme customization system accessible via Component Library:

- **Location**: "Theme Manager" button in Component Library header
- **Light/Dark Toggle**: Sun/moon button in modal header for instant mode switching
- **Built-in Presets**: 15 presets including Default, Rose Garden, Forest Meadow, Ocean Deep, Matrix, Cherry Blossom, and more
- **Tinte Integration**: AI-powered color palette generation, 670+ community themes
- **Typography Controls**: 13 curated Google Fonts, type scale presets, line height control
- **Papercraft Controls**: Paper surfaces, border radius, texture opacity
- **Custom Presets**: Save/load your own theme configurations
- **Persistence**: All settings saved to localStorage

```jsx
// Access theme state programmatically
import { useTheme } from "@/context/ThemeContext";

const { themeState, setDarkMode, setToken } = useTheme();
setDarkMode(true); // Enable dark mode
setToken("radius", 0.5); // Set border radius
setToken("fontHeading", "playfair-display"); // Set heading font
setToken("typeScale", "spacious"); // Set type scale
```

### Typography System

Font customization with 13 curated Google Fonts:

- **Fonts**: System default + 4 handwritten + 4 serifs + 2 display + 2 sans-serif
- **Type Scale**: Compact (1.125), Default (1.2), Spacious (1.25)
- **Line Height**: Tight, Normal, Relaxed presets
- **Live Preview**: Real-time preview in Theme Manager modal
- **CSS Export**: Includes Google Fonts @import statements

```jsx
// Typography utilities
import { loadGoogleFont, getFontFamily } from "@/lib/theme-utils";

loadGoogleFont("playfair-display"); // Load font dynamically
const family = getFontFamily("lora"); // Get CSS font-family string
```

### Sticker Playground

Interactive asset preview with transform controls:

- **EditableSticker**: Drag, scale (corner handles), rotate (top handle)
- **StickerToolbar**: Delete, duplicate, flip, layer order, shadow toggle, confetti
- **useCanvasHistory**: Undo/redo with Cmd+Z / Cmd+Shift+Z
- Touch gestures via `@use-gesture/react` (pinch-to-zoom, two-finger rotate)

### Notebook Paper

High-fidelity ruled paper styling in FAQ section:

- Baseline grid alignment (32px line-height)
- Subtle paper texture via SVG noise
- Realistic hole punches with depth shadows
- Red margin line with ink bleed effect

### Navigation System

Route-based state persistence:

- **View toggle**: Uses `/` and `/library` routes instead of useState
- **Tab state**: Synced to URL via `useSearchParams` (`/library?tab=buttons`)
- **Scroll management**: `useScrollToTop` hook resets scroll on route changes
- **404 handling**: Catch-all route with papercraft-styled NotFoundPage

### Error Tracking (Sentry)

Production error monitoring:

- `initSentry()` - Initialize with environment config
- `captureError(error, context)` - Manual error capture
- Environment variables: `VITE_SENTRY_DSN`, `VITE_SENTRY_ENVIRONMENT`

### Error Boundary

React Error Boundary with papercraft fallback:

- Wraps app routes in `src/App.jsx`
- Shows error details in development
- "Try again" button to reset
- Integrates with Sentry for error reporting

## Testing

- **353 tests** across 22 test files
- Run with `npm test` (Vitest + jsdom)
- Coverage threshold: 75% (statements, branches, functions, lines)
- Custom render in `src/test/test-utils.jsx` includes CartWrapper, PreviewWrapper
- Mocks: ResizeObserver, matchMedia, IntersectionObserver, pointer capture, scrollIntoView

### Key Test Files

- `CartContext.test.jsx` - 36 tests (100% coverage)
- `use-canvas-history.test.js` - 66 tests (100% coverage)
- `PreviewPage.test.jsx` - 10 integration tests
- `PreviewGrid.test.jsx` - 18 tests
- `sticky-cart.test.jsx` - 19 tests

### Test Fixtures

```
src/test/fixtures/
├── cart-fixtures.js    # Mock assets, categories, cart states
└── canvas-fixtures.js  # Mock stickers, transforms, helpers
```

## Build & Bundle

### Lazy Loading

All routes use `React.lazy()` for code splitting:

- Pages load on-demand when navigated to
- Suspense fallback shows spinner during load
- TinteEditor loads only when opened

### Bundle Analysis

Run `npm run build` to generate `dist/stats.html` visualization.

**Key Chunks:**

- `react-vendor` - React runtime (193 KB)
- `radix-vendor` - UI primitives (197 KB)
- `animation-vendor` - Framer Motion (135 KB)
- `router-vendor` - React Router (35 KB)
- Page chunks - Load on navigation (24-78 KB each)

## Storybook

Component documentation at `npm run storybook`:

- Stories in `src/components/ui/*.stories.jsx`
- Papercraft background themes (white, cream, kraft, dark)
- Accessibility addon for a11y testing

## Routes

```
/           - Landing page (LandingPage.jsx)
/library    - Component Library (component-library.jsx)
/pricing    - Pricing page (PricingPage.jsx)
/preview    - Asset preview with cart (PreviewPage.jsx)
*           - 404 page (NotFoundPage.jsx)
```

## Component Patterns

- Use shadcn/ui components from `@/components/ui/`
- Create variants with class-variance-authority (CVA)
- Merge classes with `cn()` from `@/lib/utils`
- Place page sections in `@/components/sections/`

## CSS Custom Properties (index.css)

### Notebook Paper

```css
--notebook-line-height: 32px --notebook-margin-left: 3.5rem
  --notebook-paper-color: #fefdfb
  --notebook-line-color: oklch(0.82 0.015 240 / 0.35);
```

### Elevations

```css
--paper-elevation-0  /* Flat/pressed */
--paper-elevation-1  /* Default resting */
--paper-elevation-2  /* Hover/lifted */
--paper-elevation-3  /* Modal/floating */
```

### Typography

```css
--font-family-heading  /* Heading font stack */
--font-family-body     /* Body font stack */
--font-size-base       /* Base font size (16px default) */
--type-scale-ratio     /* Scale ratio (1.2 default) */
--font-size-xs/sm/lg/xl/2xl/3xl/4xl  /* Computed sizes */
--line-height-heading  /* Heading line height (1.3 default) */
--line-height-body     /* Body line height (1.5 default) */
```

### Theme Utilities (theme-utils.js)

```javascript
// CSS variable manipulation
setCSSVariable("--paper-white", "oklch(0.99 0.01 90)");
applyThemeToDOM(themeState);

// Color conversion
hexToOklch("#d97706"); // → "oklch(0.65 0.17 55)"
oklchToHex("oklch(0.65 0.17 55)"); // → "#d97706"

// Built-in presets
import { BUILT_IN_PRESETS, applyBuiltInPreset } from "@/lib/theme-utils";
applyBuiltInPreset("rose-garden"); // Apply preset by ID

// Typography
loadGoogleFont("playfair-display"); // Load font dynamically
getFontFamily("lora"); // → '"Lora", Georgia, serif'
applyTypographyToDOM(themeState); // Apply typography CSS vars
exportTypographyAsCSS(themeState); // Export with @import
```

### Typography Config (typography-config.js)

```javascript
import {
  FONT_CATALOG,
  TYPE_SCALES,
  LINE_HEIGHTS,
} from "@/lib/typography-config";

// Font catalog with 13 fonts (system + 12 Google Fonts)
FONT_CATALOG["playfair-display"].name; // "Playfair Display"
FONT_CATALOG["playfair-display"].weights; // [400, 500, 600, 700, 800, 900]

// Type scale presets
TYPE_SCALES.default.ratio; // 1.2
TYPE_SCALES.default.baseFontSize; // 16

// Line height presets
LINE_HEIGHTS.normal.heading; // 1.3
LINE_HEIGHTS.normal.body; // 1.5
```

## Documentation

### Core Documentation

- `/Docs/COMPONENT_API.md` - Props & usage reference for all 122 components
- `/Docs/DEVELOPMENT_GUIDE.md` - Getting started, common tasks, code conventions
- `/Docs/ARCHITECTURE.md` - System overview, data flow, component hierarchy
- `/Docs/TESTING.md` - Test setup, patterns, and examples
- `/Docs/DEPLOYMENT.md` - Build process, hosting options, CI/CD

### Feature Documentation

- `/Docs/PREVIEW_PAGE.md` - Preview page with shopping cart implementation
- `/Docs/DESIGN_SYSTEM.md` - Complete design system reference
- `/Docs/landing-page-design-spec.md` - Page layout specifications
- `/Docs/shadcn-customization-guide.md` - Component customization

### Project Files

- `/.env.example` - Environment variables template
- `/CHANGELOG.md` - Version history with technical notes
- `/.github/workflows/ci.yml` - GitHub Actions CI (build, lint, test)

## CI/CD

- **Pre-commit**: Husky + lint-staged runs ESLint on staged files
- **GitHub Actions**: Runs on push/PR to main
  - Build verification
  - ESLint checks
  - Full test suite (353 tests)
