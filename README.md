# Papercraft Asset Pack Website

A premium landing page for showcasing and selling papercraft vector asset packs. Features an interactive sticker playground, high-fidelity notebook paper styling, and a warm handcrafted aesthetic.

## Tech Stack

- **React 19** - UI framework with latest features
- **Vite 7** - Fast build tool with HMR
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component primitives
- **Framer Motion** - Animations and gestures
- **@use-gesture/react** - Touch gesture support

## Features

### Interactive Sticker Playground
Preview assets with full transform controls:
- Drag, scale, and rotate stickers
- Touch gestures (pinch-to-zoom, two-finger rotate)
- Floating toolbar with quick actions
- Undo/redo with keyboard shortcuts

### High-Fidelity Paper Effects
- Notebook paper with baseline grid alignment
- Subtle paper textures via SVG noise
- Realistic hole punches with depth shadows
- Paper elevation system (flat to floating)

### Complete Landing Page
- Hero section with animated stickers
- Asset category showcase (bento grid)
- Interactive gallery with category tabs
- Testimonials carousel
- Pricing with comparison
- FAQ accordion on notebook paper

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` with hot reload enabled.

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── sections/        # Landing page sections
│   ├── pricing/         # Pricing components
│   └── pages/           # Full page components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
└── index.css            # Theme & papercraft styles

Docs/                    # Design system documentation
```

## Documentation

- [Design System](./Docs/DESIGN_SYSTEM.md) - Colors, typography, components
- [Landing Page Spec](./Docs/landing-page-design-spec.md) - Page layout details
- [Changelog](./CHANGELOG.md) - Version history with technical notes

## Design Philosophy

The site embodies a **warm, handcrafted aesthetic** inspired by physical papercraft:
- Amber/orange color palette
- Paper surface colors (cream, kraft)
- Subtle textures and deckled edges
- Organic shadows and lift effects
- Editorial asymmetric layouts

## License

Private project - All rights reserved.
