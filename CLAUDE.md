# Papercraft Asset Pack Website

## Quick Context
- React 19 + Vite 7 + Tailwind CSS 4 + shadcn/ui
- JavaScript (not TypeScript)
- Landing page for selling papercraft vector asset packs

## Key Commands
- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Production build
- `npm test` - Run tests with Vitest
- `npx shadcn@latest add [component]` - Add UI components

## Architecture
- `/src/components/ui/` - shadcn/ui components (Button, Card, Badge)
- `/src/components/sections/` - Landing page sections
- `/src/lib/utils.js` - cn() utility for class merging
- `/src/index.css` - Theme CSS variables (amber/orange palette)
- `/Docs/` - Design specifications and research

## Design System
- **Primary**: Amber-600 (`--primary`)
- **Accent**: Orange-500 (`--accent`)
- **Theme**: Warm, handcrafted papercraft aesthetic
- See `/Docs/landing-page-design-spec.md` for full spec

## Component Patterns
- Use shadcn/ui components from `@/components/ui/`
- Create variants with class-variance-authority (CVA)
- Merge classes with `cn()` from `@/lib/utils`
- Place page sections in `@/components/sections/`

## Current State
- Landing page scaffold in App.jsx
- shadcn/ui configured with custom amber theme
- Ready for section-by-section implementation per design spec
