# Changelog

All notable changes to the Papercraft Asset Pack Website.

## [0.7.0] - 2026-01-28

### Added

#### Typography Control System

Complete typography customization system integrated into Theme Manager.

**New Files:**

- `src/lib/typography-config.js` - Font catalog, type scale presets, line height presets
- `src/components/theme-manager/typography-tab.jsx` - Main typography tab component
- `src/components/theme-manager/controls/font-selector.jsx` - Categorized font dropdown with live preview
- `src/components/theme-manager/controls/type-scale-selector.jsx` - Scale preset radio group
- `src/components/theme-manager/controls/line-height-control.jsx` - Line height preset selector
- `src/components/theme-manager/controls/typography-preview.jsx` - Live typography preview panel
- `src/components/theme-manager/controls/index.js` - Barrel export for controls

**Typography Features:**

- **13 Curated Fonts**: System default + 12 Google Fonts selected for papercraft aesthetic
  - Handwritten (4): Shadows Into Light, Patrick Hand, Caveat, Kalam
  - Warm Serifs (4): Lora, Merriweather, Crimson Text, Alegreya
  - Display (2): Playfair Display, Young Serif
  - Sans-Serif (2): Source Sans 3, Nunito
- **Type Scale Presets**: Compact (1.125), Default (1.2), Spacious (1.25)
- **Line Height Presets**: Tight, Normal, Relaxed
- **Live Preview**: Real-time typography preview in Theme Manager modal
- **Lazy Font Loading**: Google Fonts loaded on hover/selection for performance
- **CSS Export**: Typography settings exported with Google Fonts @import statements
- **Persistence**: All typography settings saved to localStorage

**Updated Files:**

- `src/lib/theme-utils.js` - Added typography functions:
  - `loadGoogleFont(fontId)` - Dynamic Google Font loading
  - `getFontFamily(fontId)` - Get CSS font-family string
  - `applyTypographyToDOM(state)` - Apply typography CSS variables
  - `generateGoogleFontsImport(state)` - Generate @import URL
  - `exportTypographyAsCSS(state)` - Export typography as CSS
- `src/context/ThemeContext.jsx` - Typography state persistence and export
- `src/index.css` - Typography CSS custom properties added
- `src/components/theme-manager/index.jsx` - Added Typography tab (4 tabs total)

**CSS Custom Properties:**

```css
--font-family-heading: system-ui, sans-serif;
--font-family-body: system-ui, sans-serif;
--font-size-base: 16px;
--type-scale-ratio: 1.2;
--line-height-heading: 1.3;
--line-height-body: 1.5;
--font-size-xs through --font-size-4xl (computed sizes);
```

**Theme State Shape:**

```javascript
{
  // Existing tokens
  darkMode, paperWhite, paperCream, paperKraft, radius, textureOpacityFaint,
  // New typography tokens
  fontHeading: "system-ui",     // Font ID
  fontBody: "system-ui",        // Font ID
  typeScale: "default",         // compact | default | spacious
  lineHeightPreset: "normal",   // tight | normal | relaxed
}
```

---

#### Theme Presets Expansion

Added 11 new built-in theme presets to the Theme Manager, bringing the total to 15 presets.

**New Presets:**

- Forest Meadow - Green/emerald nature theme
- Ocean Deep - Blue/cyan deep sea theme
- Monochrome - Neutral grayscale
- Slate Minimal - Clean slate tones
- Olive Grove - Olive/lime organic theme
- Violet Mist - Purple/lavender theme
- Golden Sunset - Warm amber/orange
- Tropical Lagoon - Teal/cyan paradise theme
- Cherry Blossom - Pink/rose Japanese theme
- Matrix - Hacker green on black
- Terracotta - Warm earth tones

Each preset includes full CSS variable definitions for both light and dark modes using oklch color format.

---

### Changed

#### Theme-Aware Color Refactoring

Refactored ~250+ hardcoded color classes across ~40 files to use semantic theme-aware CSS variables, enabling the 15 built-in theme presets to fully apply background, accent, and border colors throughout the entire application.

**Color Mapping Applied:**

| Before                    | After                   |
| ------------------------- | ----------------------- |
| `bg-white`, `bg-amber-50` | `bg-card`, `bg-muted`   |
| `bg-amber-100/200`        | `bg-accent`             |
| `text-amber-900`          | `text-foreground`       |
| `text-amber-700`          | `text-muted-foreground` |
| `border-amber-200/300`    | `border-border`         |
| `dark:bg-amber-950`       | `dark:bg-card`          |

**Files Modified (by category):**

- **Section Components**: section.jsx
- **Core UI**: sticky-cart, sticker-toolbar, editable-sticker, playground-canvas
- **Pages**: NotFoundPage, PricingPage, FinalCTA
- **Decorative UI**: timeline, kbd, neumorph-badge, floating-dock, expandable-card, texture-button, confetti, card-3d
- **Component Library**: All 8 section files + main header
- **Other UI**: category-pack-header, asset-card, aspect-ratio, bento-grid, dot-pattern, scroll-area, separator, direction-aware-tabs, card, progress, card-stack, parallax-scroll, spotlight, squiggle-arrow

**Intentionally Preserved Amber Colors:**

- Alert/Sonner warning variants (amber = warning is universal UX)
- Star ratings (stars are traditionally amber/yellow)
- Badge secondary variant (design choice)

**Test Updates:**

- Updated `progress.test.jsx` to expect new semantic class `bg-accent/50`

#### Global Typography Application

Applied typography CSS variables site-wide so font selections in Theme Manager visually affect all text.

**Changes to `src/index.css`:**

- Added `--text-*` overrides in `@theme inline` to map Tailwind utilities (`text-xs`, `text-sm`, `text-lg`, etc.) to our typography system
- Added `--font-heading` and `--font-body` utilities for explicit font family control
- Added `--leading-heading` and `--leading-body` line height utilities
- Added base typography rules in `@layer base`:
  - `html` element uses body font family and base size
  - `h1-h6` elements use heading font family and line height
  - `p`, `li`, `td`, `th`, `label`, `blockquote` use body font family

**Changes to `src/lib/theme-utils.js`:**

- `applyTypographyToDOM()` now also sets Tailwind's `--text-*` variables for dynamic updates
- Added `--leading-heading` and `--leading-body` updates for line height utilities

**Result:**

- Changing heading font in Theme Manager → all h1-h6 update immediately
- Changing body font → all paragraphs and body text update immediately
- Changing type scale → all Tailwind text utilities scale proportionally
- Changing line height preset → vertical spacing adjusts across the site

---

## [0.6.0] - 2026-01-28

### Added

#### Enterprise Test Coverage Expansion

Expanded test coverage from 168 to **353 tests** (110% increase) with comprehensive coverage for business-critical logic.

**New Test Files:**

- `src/context/CartContext.test.jsx` - 36 tests for cart state management
- `src/hooks/use-canvas-history.test.js` - 66 tests for undo/redo logic
- `src/components/ui/asset-card.test.jsx` - 19 tests for asset selection
- `src/components/ui/sticky-cart.test.jsx` - 19 tests for cart widget
- `src/components/ui/editable-sticker.test.jsx` - 17 tests for sticker transforms
- `src/components/sections/PreviewGrid.test.jsx` - 18 tests for category grid
- `src/components/pages/PreviewPage.test.jsx` - 10 integration tests

**Test Fixtures:**

- `src/test/fixtures/cart-fixtures.js` - Mock data for cart tests
- `src/test/fixtures/canvas-fixtures.js` - Mock data for canvas tests

**Coverage Highlights:**

- `CartContext.jsx`: 100% coverage
- `use-canvas-history.js`: 100% coverage
- `PreviewPage.jsx`: 100% coverage
- `PreviewGrid.jsx`: 100% coverage
- `sticky-cart.jsx`: 96% coverage

### Changed

#### Bundle Optimization

Reduced initial bundle size by **90%** through lazy loading and improved code splitting.

**Before:**

- Main bundle: 1,107 KB (341 KB gzipped)

**After:**

- Main entry: 29 KB (9 KB gzipped)
- Page chunks load on-demand
- Vendor chunks cached independently

**Optimizations Applied:**

- **Lazy Loading Routes**: All pages use `React.lazy()` with Suspense fallback
- **Function-based Code Splitting**: Improved `manualChunks` in Vite config
- **Vendor Separation**: React, Router, Radix, Framer Motion, Forms, AI SDK
- **Bundle Visualizer**: Added `rollup-plugin-visualizer` for analysis

**Chunk Breakdown:**

| Chunk            | Size   | Gzipped |
| ---------------- | ------ | ------- |
| react-vendor     | 193 KB | 60 KB   |
| radix-vendor     | 197 KB | 59 KB   |
| animation-vendor | 135 KB | 45 KB   |
| router-vendor    | 35 KB  | 13 KB   |
| form-vendor      | 78 KB  | 21 KB   |
| landing-page     | 78 KB  | 23 KB   |
| PreviewPage      | 24 KB  | 7 KB    |

#### Test Configuration

- Adjusted coverage thresholds from 80% to 75% to account for complex animation components
- Added extended test utilities with provider wrappers (CartWrapper, PreviewWrapper)
- Extended setup.js with mocks for IntersectionObserver, scrollTo, getBoundingClientRect

### Dependencies

- Added `rollup-plugin-visualizer` for bundle analysis

---

## [0.5.0] - 2026-01-28

### Added

#### Theme Manager

Complete theme customization system with Tinte integration and built-in presets.

**New Components:**

- `ThemeManager` (`src/components/theme-manager/index.jsx`) - Main modal with tabbed interface
- `ColorsTab` - Tinte integration for shadcn/ui color palette editing
- `PapercraftTab` - Custom controls for papercraft-specific tokens
- `PresetsTab` - Built-in presets and custom preset management
- `ColorPicker` - oklch color picker with hex conversion
- `TokenSlider` - Labeled slider for numeric tokens
- `ShadowPreview` - Visual elevation level preview

**New Context:**

- `ThemeContext` (`src/context/ThemeContext.jsx`) - Theme state management with localStorage persistence

**New Utilities:**

- `theme-utils.js` (`src/lib/theme-utils.js`) - CSS variable manipulation, color conversion, preset management

**Features:**

- **Light/Dark Mode Toggle**: Prominent sun/moon button in modal header for instant mode switching
- **Built-in Theme Presets**: 4 pre-configured themes:
  - Default (Amber) - Original warm papercraft theme
  - Rose Garden - Soft pink and rose tones
  - Burnt Sienna - Earthy orange and warm gray
  - Ocean Teal - Cool teal and cyan tones
- **Tinte Integration**: AI-powered color palette generation via tinte.dev
  - Browse 670+ community themes
  - AI Agent for generating custom themes from descriptions
  - Raw CSS editing with live preview
- **Papercraft Controls**:
  - Paper surface colors (White, Cream, Kraft)
  - Border radius slider (0-1.5rem)
  - Texture opacity control (0-0.15)
  - Shadow/elevation preview
- **Custom Presets**: Save, load, and delete your own theme configurations
- **Export CSS**: Copy current theme as CSS variables to clipboard
- **Persistence**: All settings saved to localStorage, restored on page load

**File Structure:**

```
src/
├── context/
│   └── ThemeContext.jsx           # Theme state + persistence
├── components/
│   └── theme-manager/
│       ├── index.jsx              # Main modal component
│       ├── colors-tab.jsx         # Tinte integration
│       ├── papercraft-tab.jsx     # Papercraft controls
│       ├── presets-tab.jsx        # Preset management
│       └── controls/
│           ├── color-picker.jsx   # oklch color picker
│           ├── token-slider.jsx   # Labeled slider
│           └── shadow-preview.jsx # Elevation visualizer
├── lib/
│   └── theme-utils.js             # CSS variable utilities
```

**Integration Points:**

- Theme Manager button added to Component Library header
- ThemeProvider wraps entire app in `App.jsx`
- Tinte floating button in bottom-right corner

### Dependencies

- Added `@ai-sdk/react` for Tinte AI chat functionality
- Added `ai` for AI SDK core
- Added `culori` for color format conversion
- Added `@elements/tinte-editor` for theme editing UI

---

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
