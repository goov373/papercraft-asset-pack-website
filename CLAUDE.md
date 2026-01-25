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
│   └── use-canvas-history.js  # Undo/redo state management
├── lib/
│   └── utils.js         # cn() utility for class merging
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

## Component Patterns
- Use shadcn/ui components from `@/components/ui/`
- Create variants with class-variance-authority (CVA)
- Merge classes with `cn()` from `@/lib/utils`
- Place page sections in `@/components/sections/`

## CSS Custom Properties (index.css)

### Notebook Paper
```css
--notebook-line-height: 32px
--notebook-margin-left: 3.5rem
--notebook-paper-color: #FEFDFB
--notebook-line-color: oklch(0.82 0.015 240 / 0.35)
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
