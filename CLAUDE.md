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
│   ├── sections/        # Landing page sections
│   │   ├── Hero.jsx, FAQ.jsx, Pricing.jsx, etc.
│   ├── pricing/         # Pricing-specific components
│   └── pages/           # Full page components
├── hooks/
│   ├── use-canvas-history.js  # Undo/redo state management
│   └── use-scroll-to-top.js   # Scroll reset on route changes
├── lib/
│   ├── utils.js         # cn() utility for class merging
│   └── sentry.js        # Error tracking utilities
├── test/
│   ├── setup.js         # Vitest setup with mocks
│   └── test-utils.jsx   # Custom render with providers
└── index.css            # Theme CSS variables + papercraft styles
```

## Design System

- **Primary**: Amber-600 (`--primary`)
- **Accent**: Orange-500 (`--accent`)
- **Theme**: Warm, handcrafted papercraft aesthetic
- **Paper surfaces**: `--paper-white`, `--paper-cream`, `--paper-kraft`
- See `/Docs/DESIGN_SYSTEM.md` for full spec

## Key Features

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

- **168 tests** across 15 component files
- Run with `npm test` (Vitest + jsdom)
- Custom render in `src/test/test-utils.jsx` includes RouterWrapper
- Mocks: ResizeObserver, matchMedia, pointer capture, scrollIntoView

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
  - Full test suite (168 tests)
