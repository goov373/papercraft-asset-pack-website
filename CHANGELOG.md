# Changelog

All notable changes to the Papercraft Asset Pack Website.

## [Unreleased]

## [0.4.0] - 2026-01-26

### Added

#### Testing Infrastructure

Comprehensive test suite with 168 tests across 15 component files.

**Test Setup:**

- Vitest with jsdom environment
- Custom test utilities (`src/test/test-utils.jsx`)
- RouterWrapper for components needing React Router
- Mocks for ResizeObserver, matchMedia, pointer capture, scrollIntoView

**Test Coverage:**

- `accordion.test.jsx` - 11 tests
- `alert.test.jsx` - 14 tests
- `badge.test.jsx` - 11 tests
- `button.test.jsx` - 3 tests
- `card.test.jsx` - 15 tests
- `checkbox.test.jsx` - 9 tests
- `dialog.test.jsx` - 14 tests
- `dropdown-menu.test.jsx` - 13 tests
- `input.test.jsx` - 9 tests
- `progress.test.jsx` - 14 tests
- `select.test.jsx` - 12 tests
- `slider.test.jsx` - 15 tests
- `switch.test.jsx` - 10 tests
- `tabs.test.jsx` - 10 tests
- `tooltip.test.jsx` - 8 tests

**CI/CD:**

- GitHub Actions workflow (`.github/workflows/ci.yml`)
- Runs build, lint, and test on push/PR
- Husky pre-commit hooks for quality gates

#### Storybook Documentation

Component documentation with Storybook 10.

**Configuration:**

- `.storybook/main.js` - Vite builder, path aliases
- `.storybook/preview.jsx` - Global decorators, papercraft backgrounds

**Stories Created:**

- `button.stories.jsx` - Variants, sizes, states
- `card.stories.jsx` - Card compositions
- `dialog.stories.jsx` - Modal patterns
- `select.stories.jsx` - Select with groups, sizes

**Papercraft Backgrounds:**

- paper-white (#FEFDFB)
- paper-cream (#FAF8F5)
- paper-kraft (#F5EEE6)
- dark (#1a1a1a)

#### Error Tracking (Sentry)

Production error monitoring with Sentry React SDK.

**New Module (`src/lib/sentry.js`):**

- `initSentry()` - Initialize with environment-aware config
- `captureError(error, context)` - Manual error capture
- `setUser(user)` / `clearUser()` - User context management
- `addBreadcrumb(message, category, data)` - Debug breadcrumbs

**Features:**

- Filters browser extension errors
- Ignores common non-actionable errors
- 10% trace sampling in production, 100% in development
- Environment variables for configuration

#### Navigation System Overhaul

Enterprise-quality navigation with URL persistence.

**New Routes:**

- `/library` - Component Library (separate from homepage)
- `*` - 404 NotFoundPage with navigation options

**URL State Persistence:**

- View toggle uses routes instead of useState
- Component Library tabs synced to URL (`/library?tab=buttons`)
- Survives browser refresh

**Scroll Management:**

- `useScrollToTop` hook resets scroll on route changes
- `scroll-behavior: smooth` CSS with reduced motion support

**New Components:**

- `NotFoundPage.jsx` - Papercraft-styled 404 page
- `use-scroll-to-top.js` - Scroll reset hook

#### Error Boundary Component

React Error Boundary with papercraft-styled fallback UI.

**Features:**

- `onError` callback for Sentry integration
- `onReset` callback for recovery tracking
- Custom fallback support (component or render function)
- Development mode shows error details
- "Try again" button to reset

### Changed

- Component Library now at dedicated `/library` route
- ViewToggle hidden on non-main pages (pricing, preview)
- ESLint config updated with proper ignores for build artifacts
- All unused imports and variables cleaned up

### Fixed

- Refresh no longer loses view state (route-based)
- Pages always start at top on navigation
- Tab selection persists in URL
- Invalid routes show 404 instead of blank page
- HMR port mismatch resolved with explicit config
- Suspense key prop prevents error flash on lazy load

### Dependencies

- Added `@sentry/react` for error tracking
- Added `@storybook/react-vite` (v10) for documentation
- Added `@storybook/addon-a11y` for accessibility checks
- Added `@storybook/addon-docs` for MDX documentation
- Added `husky` for git hooks
- Added `lint-staged` for pre-commit linting

---

## [0.3.0] - 2026-01-25

### Added

#### Sticker Playground System

Interactive sticker manipulation system for previewing assets before purchase.

**New Components:**

- `editable-sticker.jsx` - Transform wrapper with selection ring, corner scale handles, rotation handle
  - Supports mouse and touch gestures (pinch-to-zoom, two-finger rotate)
  - Min/max scale limits (0.5x to 2x)
  - Spring animations on release
  - 44px minimum touch targets for accessibility

- `sticker-toolbar.jsx` - Floating context-aware toolbar
  - 8 actions: Delete, Duplicate, Flip H/V, Layer ordering, Shadow toggle, Confetti
  - Smart positioning (repositions near canvas edges)
  - Papercraft visual styling with warm amber theme

- `use-canvas-history.js` - Undo/redo state management hook
  - Keyboard shortcuts: Cmd/Ctrl+Z (undo), Cmd/Ctrl+Shift+Z (redo)
  - 30 action history limit
  - Debounced during continuous drag (saves on release)
  - Helper functions: `cloneStickerState`, `applyStickerTransform`, `deleteSticker`, `duplicateSticker`, `bringForward`, `sendBackward`

**Integration:**

- Updated `playground-canvas.jsx` with full sticker playground functionality
- Selection state management
- All toolbar actions wired up with confetti effect

#### Notebook Paper Refinements

High-end studio-quality notebook paper styling for FAQ section.

**CSS Enhancements (`index.css`):**

- Baseline grid alignment with 32px line-height (`--notebook-line-height`)
- Subtle paper texture via SVG noise filter at 40% opacity
- Realistic red margin line with ink bleed effect
- Refined hole punches with radial gradients and depth shadows
- Dark mode support with adjusted colors

**CSS Variables Added:**

```css
--notebook-line-height: 32px --notebook-margin-left: 3.5rem
  --notebook-paper-color: #fefdfb
  --notebook-line-color: oklch(0.82 0.015 240 / 0.35)
  --notebook-margin-color: oklch(0.68 0.16 20 / 0.45);
```

**New CSS Classes:**

- `.notebook-paper` - Base ruled paper with texture
- `.notebook-paper-holes` - 3-ring binder hole punches
- `.notebook-accordion-item` - Grid-aligned accordion items
- `.notebook-trigger` - Question text baseline alignment
- `.notebook-content` - Answer text baseline alignment

#### New UI Components (Magic UI Inspired)

- `card-3d.jsx` - 3D perspective card effect
- `card-stack.jsx` - Stacked card layout
- `compare.jsx` - Before/after comparison slider
- `direction-aware-tabs.jsx` - Tabs with directional animations
- `expandable-card.jsx` - Expandable card with details
- `floating-dock.jsx` - macOS-style dock component
- `neumorph-badge.jsx` - Neumorphic badge styling
- `parallax-scroll.jsx` - Parallax scrolling container
- `spotlight.jsx` - Spotlight hover effect
- `squiggle-arrow.jsx` - Hand-drawn arrow SVG
- `texture-button.jsx` - Button with paper texture
- `texture-overlay.jsx` - Configurable texture overlay
- `timeline.jsx` - Vertical timeline component
- `wavy-background.jsx` - Animated wavy background

### Changed

- Updated FAQ component with React-based `NotebookHoles` component
- Improved grid alignment for accordion items
- Enhanced dark mode notebook paper styling

### Dependencies

- Added `@use-gesture/react` (~12KB gzipped) for touch gesture support

---

## [0.2.0] - 2026-01-24

### Added

- Dedicated pricing page with React Router
- Complete landing page with all section components
- Component library page for design system documentation
- Papercraft design system implementation for shadcn components
- Interaction and texture research documentation
- shadcn/ui customization guide

### Components Added

- Hero section with animated stickers
- Trust bar with logo marquee
- Asset categories with bento grid
- Use cases section
- Asset gallery with category tabs
- What's Included section
- Stats section with number tickers
- Testimonials carousel
- Pricing section with comparison
- FAQ accordion
- Get Started CTA section
- Footer

---

## [0.1.0] - 2026-01-24

### Added

- Initial project setup with React 19 + Vite 7
- Tailwind CSS 4 with custom amber/orange theme
- shadcn/ui component library integration
- Basic routing structure
- Design system documentation foundation
- AI-assisted development setup (CLAUDE.md)

### Design System

- Warm papercraft aesthetic with amber/orange palette
- Paper surface colors (white, cream, kraft)
- Elevation shadow system (levels 0-3)
- CSS custom properties for theming
- Paper texture overlay system

---

## Technical Notes

### Sticker Transform System Architecture

The sticker playground uses a layered architecture:

```
PlaygroundCanvas (container)
├── useCanvasHistory (state management)
├── EditableSticker (per-sticker wrapper)
│   ├── Framer Motion for transforms
│   ├── @use-gesture/react for touch
│   └── Scale/Rotation handles
└── StickerToolbar (floating UI)
    └── Action buttons with callbacks
```

**Key Implementation Details:**

1. **Transform State**: Uses Framer Motion's `useMotionValue` for performant transforms
2. **Touch Gestures**: `useGesture` hook handles pinch and rotate simultaneously
3. **History Management**: Immutable state updates with truncation on new actions
4. **Toolbar Positioning**: Calculates position relative to sticker bounds and canvas edges

### Notebook Paper Baseline Grid

The notebook paper achieves text-on-line alignment through:

1. **CSS Grid Variables**: `--notebook-line-height: 32px` defines the ruling
2. **Background Pattern**: `repeating-linear-gradient` creates ruled lines
3. **Content Alignment**: `line-height` and `padding` calculations ensure baselines land on rules
4. **Texture Layer**: SVG noise filter with `mix-blend-mode: multiply` for paper feel

```css
/* Key alignment formula */
.notebook-trigger {
  height: var(--notebook-line-height);
  align-items: flex-end;
  padding-bottom: 6px; /* Fine-tune baseline position */
}
```

### File Structure Update

```
src/
├── components/
│   ├── ui/
│   │   ├── editable-sticker.jsx    # NEW - Transform wrapper
│   │   ├── sticker-toolbar.jsx     # NEW - Floating toolbar
│   │   ├── playground-canvas.jsx   # UPDATED - Integration
│   │   └── [14 new Magic UI components]
│   └── sections/
│       └── FAQ.jsx                 # UPDATED - NotebookHoles component
├── hooks/
│   └── use-canvas-history.js       # NEW - Undo/redo hook
└── index.css                       # UPDATED - Notebook paper styles
```
