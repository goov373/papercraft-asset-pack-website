# Shadcn Blocks Research: Landing Page Components

## Purpose
Extensive list of free shadcn blocks, templates, and component libraries for building the Papercraft Asset Pack landing page.

---

## Most Relevant for Papercraft Asset Pack Site

### 1. Launch UI - TOP PICK
- **URL**: https://www.launchuicomponents.com/
- **GitHub**: Open source, MIT licensed
- **Free**: 100% free forever
- **What's included**: 100+ components for landing pages - hero sections, feature grids, pricing tables, testimonials, CTAs
- **Why relevant**: Clean, professional blocks perfect for product showcase. Designed specifically for marketing/landing pages.

### 2. Magic UI - TOP PICK
- **URL**: https://magicui.design/
- **GitHub**: https://github.com/magicuidesign/magicui
- **Free**: 150+ free components, MIT licensed
- **What's included**: Animated landing page components with Framer Motion - marquees, bento grids, animated text, sparkles, particles
- **Why relevant**: Eye-catching animations that could enhance the papercraft aesthetic. Great for hero sections and feature showcases.

### 3. Aceternity UI - TOP PICK
- **URL**: https://ui.aceternity.com/
- **Free**: Many free components (Pro tier for premium)
- **What's included**: Stunning visual effects - spotlight, aurora backgrounds, 3D cards, glowing borders, parallax scroll
- **Why relevant**: High-impact visual components that could make asset previews pop. Great for creating memorable first impressions.

### 4. Cult UI
- **URL**: https://www.cult-ui.com/
- **Free**: Essential components free
- **What's included**: Animated buttons, cards, carousels, testimonials, feature sections with Framer Motion
- **Why relevant**: Polished micro-interactions. Logo carousel perfect for showing asset samples.

---

## Block Libraries (Free Sections)

### 5. Official shadcn/ui Blocks
- **URL**: https://ui.shadcn.com/blocks
- **Free**: 100% free, open source
- **What's included**: Dashboard blocks, authentication forms, settings pages
- **Relevance**: Foundation blocks, more app-focused than landing page

### 6. Shadcnblocks
- **URL**: https://www.shadcnblocks.com/
- **GitHub**: https://github.com/shadcnblocks/shadcn-ui-blocks
- **Free**: 55+ free marketing blocks (login required for "basic" tier, no payment)
- **What's included**: Hero (12), Features (10), Pricing (8), Testimonials (6), FAQ (5), CTA (8), Footer (6)
- **Why relevant**: Comprehensive landing page sections, Tailwind 4 compatible

### 7. Shadcn Studio
- **URL**: https://shadcnstudio.com/
- **Free**: Many free blocks available
- **What's included**: 700+ blocks total - Hero (41), Features (29), Pricing (20), Testimonials (24), Gallery sections
- **Why relevant**: Huge variety, gallery blocks perfect for asset showcases

### 8. shadcnui-blocks.com
- **URL**: https://www.shadcnui-blocks.com/
- **GitHub**: https://github.com/akash3444/shadcn-ui-blocks
- **Free**: All blocks free
- **What's included**: Customized shadcn components with multiple variations per block
- **Why relevant**: Good for exploring different takes on standard sections

### 9. Origin UI
- **URL**: https://originui.com/
- **GitHub**: https://github.com/origin-space/originui
- **Free**: MIT licensed
- **What's included**: Extensive copy-paste components for app UIs
- **Why relevant**: Clean, minimal aesthetic that could complement papercraft warmth

---

## Complete Landing Page Templates

### 10. leoMirandaa/shadcn-landing-page
- **GitHub**: https://github.com/leoMirandaa/shadcn-landing-page
- **Free**: MIT licensed
- **Stack**: React + TypeScript + Tailwind + shadcn
- **What's included**: Complete landing page with hero, features, pricing, testimonials, FAQ
- **Why relevant**: Full template to reference structure and patterns

### 11. nobruf/shadcn-landing-page
- **GitHub**: https://github.com/nobruf/shadcn-landing-page
- **Free**: Open source
- **Stack**: Next.js + TypeScript + Tailwind + shadcn
- **What's included**: Modern landing page template, easy to customize
- **Why relevant**: Next.js patterns if we migrate later

### 12. silicondeck/shadcn-dashboard-landing-template
- **GitHub**: https://github.com/silicondeck/shadcn-dashboard-landing-template
- **Free**: MIT licensed
- **Stack**: Vite-React AND Next.js versions
- **What's included**: Dashboard + Landing page combo, production-ready
- **Why relevant**: Vite version matches our stack exactly

---

## Animation-Focused Libraries

### 13. Eldora UI
- **URL**: https://eldoraui.site/
- **Free**: Open source
- **What's included**: Animated components with React + Framer Motion
- **Why relevant**: Alternative to Magic UI for animations

### 14. Spectrum UI
- **GitHub**: https://github.com/arihantcodes/spectrum-ui
- **Free**: Open source
- **What's included**: Combines Aceternity + Magic UI + shadcn components
- **Why relevant**: Best of multiple animation libraries in one place

### 15. SHSF UI
- **URL**: https://www.shsfui.com
- **Free**: Open source
- **What's included**: Motion-first React components with Framer Motion
- **Why relevant**: Smooth animations for interactive elements

---

## Gallery & Showcase Components

### 16. Shadcnblocks Gallery
- **URL**: https://www.shadcnblocks.com/blocks/gallery
- **Free**: 48+ gallery blocks
- **What's included**: Image grids, lightbox, masonry, carousel, filtering
- **Why relevant**: Perfect for showcasing asset pack contents

### 17. Shadcn Studio Gallery
- **URL**: https://shadcnstudio.com/blocks/marketing-ui/gallery-component
- **Free**: Multiple gallery variants
- **What's included**: Carousel with thumbnails, autoplay, responsive grids
- **Why relevant**: Interactive product displays

### 18. Shadcnblocks Portfolio
- **URL**: https://www.shadcnblocks.com/blocks/portfolio
- **Free**: 111+ portfolio blocks
- **What's included**: Project showcases, case studies, work displays
- **Why relevant**: Could adapt for asset category showcases

---

## Aggregator & Reference Sites

### 19. Awesome Shadcn UI
- **GitHub**: https://github.com/birobirobiro/awesome-shadcn-ui
- **Also**: https://shadcn.batchtool.com/
- **What's included**: 200+ curated resources, 50+ templates, all categories
- **Why relevant**: Master reference for discovering more resources

### 20. All Shadcn
- **URL**: https://allshadcn.com/
- **What's included**: 300+ templates, components, blocks, tools aggregated
- **Why relevant**: Search and filter across multiple sources

### 21. shadcn.io
- **URL**: https://www.shadcn.io/
- **What's included**: Templates, blocks, and community contributions
- **Why relevant**: AI-native features for discovering components

---

## Current Landing Page Sections (Already Built)

The landing page already has these sections in `src/components/sections/`:

| Section | File | Status | Enhancement Opportunities |
|---------|------|--------|---------------------------|
| **Nav** | Nav.jsx | Built | Sticky nav animations from Cult UI |
| **Hero** | Hero.jsx | Built | Magic UI sparkles/particles, Aceternity spotlight |
| **TrustBar** | TrustBar.jsx | Built | Logo carousel from Cult UI |
| **Collections** | CollectionsShowcase.jsx | Built | Bento grid from Magic UI |
| **UseCases** | UseCases.jsx | Built | - |
| **AssetGallery** | AssetGallery.jsx | Built | Gallery lightbox from Shadcnblocks |
| **WhatsIncluded** | WhatsIncluded.jsx | Built | Feature cards with hover effects |
| **Testimonials** | Testimonials.jsx | Built | Animated testimonial carousel |
| **Pricing** | Pricing.jsx | Built | Shine border effect from Magic UI |
| **FAQ** | FAQ.jsx | Built | Already has accordion |
| **SocialChannelsCTA** | SocialChannelsCTA.jsx | Built | - |
| **FinalCTA** | FinalCTA.jsx | Built | Magic UI beam/glow effects |
| **Footer** | Footer.jsx | Built | - |

---

## Enhancement Priorities

### High Priority - Add from Magic UI
1. **Marquee** - For logo/trust bar infinite scroll
2. **Sparkles** - For hero section
3. **Shine Border** - For pricing card
4. **Animated Beam** - For CTA sections

### Medium Priority - Add from Aceternity UI
1. **Background Gradient Animation** - For hero
2. **3D Card Effect** - For feature cards
3. **Spotlight** - For hero background

### Low Priority
1. **Bento Grid** - For collections showcase
2. **Number Ticker** - For stats section (if we add one)

---

## Progress Tracker

| Resource | Status | Components Added |
|----------|--------|------------------|
| Launch UI | Reviewed | Section wrapper, Hero pattern reference |
| Magic UI | In Progress | Marquee, SparklesText, ShineBorder, AnimatedBeam, NumberTicker |
| Aceternity UI | Not started | |
| Cult UI | Not started | |
| Shadcnblocks | Not started | |
| Shadcn Studio | Not started | |
| Origin UI | Not started | |

---

## Components Added (Papercraft Styled)

### From Magic UI
| Component | File | Used In | Notes |
|-----------|------|---------|-------|
| Marquee | `src/components/ui/marquee.jsx` | TrustBar | Infinite scroll with paper card items |
| SparklesText | `src/components/ui/sparkles-text.jsx` | Available | Warm amber/orange sparkles |
| ShineBorder | `src/components/ui/shine-border.jsx` | Pricing | Animated gradient border |
| AnimatedBeam | `src/components/ui/animated-beam.jsx` | Available | SVG connection lines |
| NumberTicker | `src/components/ui/number-ticker.jsx` | Available | Animated counter for stats |
| BentoGrid | `src/components/ui/bento-grid.jsx` | Available | Responsive card grid layout |
| BlurFade | `src/components/ui/blur-fade.jsx` | Available | Scroll-triggered reveal animation |
| DotPattern | `src/components/ui/dot-pattern.jsx` | Available | Perforated paper background |
| GridPattern | `src/components/ui/dot-pattern.jsx` | Available | Graph paper background |
