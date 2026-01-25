# Papercraft Design System

> **Purpose**: This document defines the complete visual design system for the Papercraft Asset Pack website. It is structured for AI/LLM consumption to enable consistent UI generation.

---

## 1. COLOR SYSTEM

### 1.1 Semantic Colors (CSS Custom Properties)

```css
/* Primary Palette */
--primary: oklch(0.666 0.179 58.318)        /* amber-600 - buttons, links, accents */
--primary-foreground: oklch(1 0 0)          /* white - text on primary */

/* Background & Foreground */
--background: oklch(0.987 0.022 95.277)     /* amber-50 - page background */
--foreground: oklch(0.414 0.112 45.904)     /* amber-900 - primary text */

/* Secondary */
--secondary: oklch(0.962 0.059 95.617)      /* amber-100 - subtle backgrounds */
--secondary-foreground: oklch(0.476 0.114 52.304)  /* amber-800 */

/* Muted */
--muted: oklch(0.943 0.051 95.386)          /* light amber - disabled states */
--muted-foreground: oklch(0.666 0.088 57.249)  /* amber-500 - secondary text */

/* Accent */
--accent: oklch(0.705 0.191 47.604)         /* orange-500 - highlights, CTAs */
--accent-foreground: oklch(1 0 0)           /* white */

/* Borders */
--border: oklch(0.905 0.093 95.136)         /* amber-200 - dividers, card borders */
```

### 1.2 Paper Surface Colors

```css
--paper-white: oklch(0.98 0.01 90)          /* off-white paper */
--paper-cream: oklch(0.96 0.02 85)          /* cream/ivory paper */
--paper-kraft: oklch(0.75 0.08 70)          /* brown kraft paper */
```

### 1.3 Tailwind Color Usage Patterns

| Purpose | Class Pattern | Example |
|---------|---------------|---------|
| Headings | `text-amber-900` | Main headings |
| Body text | `text-amber-800/80` | Paragraph text |
| Secondary text | `text-muted-foreground` | Descriptions, captions |
| Micro-labels | `text-amber-700` | Section labels |
| Subtle text | `text-amber-600/60` | Dividers, hints |
| Backgrounds | `bg-background` | Page sections |
| Cards | `bg-[var(--paper-cream)]` | Pricing cards |
| Dark sections | `bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900` | CTA sections |
| Borders | `border-amber-200/60` | Subtle dividers |

---

## 2. TYPOGRAPHY

### 2.1 Font Stack

```css
font-family: system-ui, -apple-system, sans-serif  /* Default */
```

### 2.2 Heading Scale

| Level | Classes | Usage |
|-------|---------|-------|
| Display | `text-7xl sm:text-8xl lg:text-9xl font-bold` | Large price displays, hero numbers |
| H1 | `text-4xl sm:text-5xl lg:text-6xl font-bold` | Page titles, hero headlines |
| H2 | `text-3xl sm:text-4xl font-bold` | Section titles |
| H3 | `text-2xl sm:text-3xl font-bold` | Subsection titles |
| H4 | `text-xl font-semibold` | Card titles, list headers |
| H5 | `text-lg font-medium` | Minor headings |

### 2.3 Body Text Scale

| Type | Classes | Usage |
|------|---------|-------|
| Large body | `text-lg text-muted-foreground` | Hero descriptions |
| Body | `text-base text-amber-800/80` | Paragraph text |
| Small | `text-sm text-muted-foreground` | Captions, metadata |
| Micro | `text-xs text-muted-foreground` | Trust badges, fine print |

### 2.4 Special Typography Patterns

**Micro-labels (Section markers)**:
```jsx
<h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
  Section Label
</h3>
```

**Large decorative text (Visual anchors)**:
```jsx
<span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-amber-200/50 select-none leading-none">
  Create
</span>
```

**Price display**:
```jsx
<span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-amber-900 leading-none">
  $39
</span>
```

---

## 3. SPACING SYSTEM

### 3.1 Section Padding

| Type | Classes | Usage |
|------|---------|-------|
| Standard section | `py-16 md:py-24` | Most content sections |
| Large section | `py-20 md:py-32` | Hero, major CTAs |
| Compact section | `py-12 md:py-20` | Secondary sections |

### 3.2 Container

```jsx
<Container>  {/* Wraps all section content */}
  {/* className="container mx-auto px-4 sm:px-6 lg:px-8" */}
</Container>
```

### 3.3 Component Spacing

| Element | Classes | Usage |
|---------|---------|-------|
| Card padding | `p-6` or `p-8 md:p-12` | Card content |
| Section gap | `gap-12 lg:gap-16` or `gap-12 lg:gap-20` | Grid columns |
| List items | `space-y-3` | Feature lists |
| Button groups | `gap-4` | Button rows |
| Text block margin | `mb-4` to `mb-8` | Between text elements |

### 3.4 Margin Patterns

```
Heading to content: mb-4 to mb-6
Micro-label to heading: mb-4
Paragraph to CTA: mb-8 to mb-10
Section heading to grid: mb-8 to mb-12
```

---

## 4. GRID & LAYOUT SYSTEM

### 4.1 Asymmetric 12-Column Grid (Primary Pattern)

The editorial layout uses a **12-column grid** with **asymmetric splits**:

**5/7 Split** (narrow left, wide right):
```jsx
<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
  <div className="lg:col-span-5">  {/* ~42% - Text/anchor content */}
  <div className="lg:col-span-7">  {/* ~58% - Main content */}
</div>
```

**4/8 Split** (narrow left, wider right):
```jsx
<div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
  <div className="lg:col-span-4">  {/* ~33% - Labels/headings */}
  <div className="lg:col-span-8">  {/* ~67% - Content */}
</div>
```

**7/5 Split** (wide left, narrow right):
```jsx
<div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
  <div className="lg:col-span-7">  {/* ~58% - Main content */}
  <div className="lg:col-span-5">  {/* ~42% - Secondary */}
</div>
```

### 4.2 Equal Grid (Secondary Pattern)

**2-Column Equal**:
```jsx
<div className="grid md:grid-cols-2 gap-12 lg:gap-20">
```

**3-Column Equal**:
```jsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 4.3 Sticky Positioning

Left columns often use sticky positioning for scroll effect:
```jsx
<div className="lg:col-span-5 lg:sticky lg:top-24">
```

### 4.4 Centering Patterns

**Centered content block**:
```jsx
<div className="max-w-3xl mx-auto text-center">
```

**Centered with wider max**:
```jsx
<div className="max-w-4xl mx-auto">
```

---

## 5. COMPONENT PATTERNS

### 5.1 Button

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`

```jsx
/* Primary CTA */
<Button size="lg" className="text-lg px-10">
  Get the Pack
</Button>

/* With icon */
<Button size="lg">
  Continue <ArrowRight className="ml-2 size-5" />
</Button>

/* Outline */
<Button variant="outline">View Gallery</Button>

/* Link button */
<Button asChild>
  <Link to="/pricing">Get the Pack</Link>
</Button>

/* White on dark background */
<Button className="bg-white text-amber-900 hover:bg-amber-50">
```

### 5.2 Card

**Variants**: `default`, `interactive`, `notebook`, `sticky`, `kraft`

```jsx
/* Standard card */
<Card className="bg-[var(--paper-cream)]">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

/* Pricing card with shine effect */
<Card className="border-2 border-primary/80 bg-[var(--paper-cream)] shadow-xl">
  <ShineBorder duration={10} />
  {/* content */}
</Card>

/* Interactive lift effect */
<Card variant="interactive">
```

### 5.3 Badge

```jsx
/* Default */
<Badge>Best Value</Badge>

/* Secondary */
<Badge variant="secondary">150+ Assets</Badge>

/* Positioned */
<Badge className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
```

### 5.4 Feature List with Checkmarks

```jsx
<ul className="space-y-3">
  {features.map((feature) => (
    <li key={feature} className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Check className="size-3 text-primary" />
      </div>
      <span className="text-amber-800/80">{feature}</span>
    </li>
  ))}
</ul>
```

### 5.5 Trust Badges Row

```jsx
<div className="flex items-center justify-center gap-6">
  {badges.map((badge) => (
    <div className="flex items-center gap-1.5 text-amber-700/70 text-xs">
      <badge.icon className="size-3.5" />
      <span>{badge.label}</span>
    </div>
  ))}
</div>
```

### 5.6 Divider with "or"

```jsx
<div className="flex items-center gap-4 mb-10">
  <div className="flex-1 h-px bg-amber-200/60" />
  <span className="text-xs text-amber-600/60 uppercase tracking-wider">or</span>
  <div className="flex-1 h-px bg-amber-200/60" />
</div>
```

### 5.7 List with Border Separators

```jsx
<div className="space-y-0">
  {items.map((item, index) => (
    <div className="border-t border-amber-200/60 py-6 first:border-t-0 first:pt-0">
      <h4 className="text-xl font-semibold text-amber-900 mb-1">{item.title}</h4>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  ))}
</div>
```

---

## 6. SHADOWS & ELEVATION

### 6.1 Elevation Levels

```css
/* Level 0 - Flat/pressed */
--paper-elevation-0: 0 1px 1px hsl(40 10% 20% / 0.04);

/* Level 1 - Default resting (cards) */
--paper-elevation-1:
  0 1px 1px hsl(40 10% 20% / 0.07),
  0 2px 2px hsl(40 10% 20% / 0.06),
  0 4px 4px hsl(40 10% 20% / 0.05);

/* Level 2 - Hover/lifted */
--paper-elevation-2:
  0 1px 1px hsl(40 10% 20% / 0.06),
  0 2px 2px hsl(40 10% 20% / 0.06),
  0 4px 4px hsl(40 10% 20% / 0.06),
  0 8px 8px hsl(40 10% 20% / 0.05),
  0 16px 16px hsl(40 10% 20% / 0.04);

/* Level 3 - Modal/floating */
--paper-elevation-3: /* larger shadow stack */
```

### 6.2 Usage Patterns

```jsx
/* Card default */
<Card>  {/* uses --paper-elevation-1 automatically */}

/* Emphasized card */
<Card className="shadow-xl">

/* Interactive lift on hover */
<Card variant="interactive">  {/* transitions to elevation-2 on hover */}
```

---

## 7. ANIMATION & TRANSITIONS

### 7.1 Framer Motion Patterns

**Fade in from bottom**:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

**Fade in from side (left)**:
```jsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
>
```

**Fade in from side (right)**:
```jsx
<motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
>
```

**Scale in**:
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

**Staggered children**:
```jsx
{items.map((item, index) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
))}
```

### 7.2 CSS Transition Tokens

```css
--paper-transition-lift: 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy lift */
--paper-transition-press: 0.1s cubic-bezier(0.4, 0, 0.2, 1);      /* Quick press */
--paper-transition-settle: 0.3s cubic-bezier(0.22, 1, 0.36, 1);   /* Smooth settle */
```

### 7.3 Duration Scale

```css
--paper-duration-instant: 100ms   /* Immediate feedback */
--paper-duration-fast: 150ms      /* Quick interactions */
--paper-duration-normal: 250ms    /* Standard transitions */
--paper-duration-slow: 400ms      /* Emphasized motion */
--paper-duration-deliberate: 600ms /* Dramatic reveals */
```

---

## 8. PAPER TEXTURES & EFFECTS

### 8.1 Global Paper Texture

Applied via `.paper-texture-overlay` class on root element. Creates subtle noise texture across entire page at `--texture-opacity-subtle` (0.04).

### 8.2 Edge Filters

```jsx
/* Wavy deckled edge */
<Card className="edge-deckled">

/* Handmade paper edge */
<div className="edge-handmade">

/* Torn edge */
<div className="edge-torn">
```

### 8.3 Paper Stack Effect

```jsx
<div className="paper-stack">  {/* Creates layered paper appearance */}
```

### 8.4 Folded Corner

```jsx
<div className="paper-folded-corner">  {/* Adds folded corner visual */}
```

### 8.5 Notebook Paper

```jsx
<div className="notebook-paper notebook-paper-holes">
  {/* Creates lined paper with red margin and hole punches */}
</div>
```

---

## 9. SECTION PATTERNS

### 9.1 Standard Section Structure

```jsx
<section className="py-16 md:py-24">
  <Container>
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left column */}
      <motion.div className="lg:col-span-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
          Micro Label
        </h3>
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4">
          Section Title
        </h2>
        <p className="text-muted-foreground">
          Description text
        </p>
      </motion.div>

      {/* Right column */}
      <motion.div className="lg:col-span-7">
        {/* Main content */}
      </motion.div>
    </div>
  </Container>
</section>
```

### 9.2 Dark CTA Section

```jsx
<section className="py-24 md:py-32 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
  {/* Optional texture overlay */}
  <div
    className="absolute inset-0 opacity-20 pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,...")`,
    }}
  />

  {/* Large decorative element */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
    <span className="text-[20rem] font-bold text-white/[0.03]">✂</span>
  </div>

  <Container className="relative">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
        Headline
      </h2>
      <p className="text-lg text-amber-100/70 mb-10">
        Subheading
      </p>
      <Button className="bg-white text-amber-900 hover:bg-amber-50">
        CTA Text
      </Button>
      <p className="mt-8 text-sm text-amber-200/50">
        Trust line
      </p>
    </div>
  </Container>
</section>
```

### 9.3 Centered Content Section

```jsx
<section className="py-16 md:py-24">
  <Container>
    <div className="max-w-4xl mx-auto">
      {/* Centered content */}
    </div>
  </Container>
</section>
```

---

## 10. DESIGN PRINCIPLES

### 10.1 Editorial Layout Rules

1. **Asymmetric grids** - Avoid 50/50 splits. Use 5/7, 4/8, or 7/5 ratios
2. **Typography as design** - Use large decorative text at low opacity as visual anchors
3. **No generic cards** - Avoid grid-of-cards layouts. Use lists with border separators instead
4. **Micro-labels** - Every section has a small uppercase label above the heading
5. **Sticky positioning** - Left columns often stick on scroll
6. **Organic touches** - Subtle rotations, paper textures, deckled edges
7. **Reduce, don't add** - Minimal decoration, let content breathe
8. **Visual anchors** - Large numbers, prices, or words create focal points

### 10.2 Color Hierarchy

1. `text-amber-900` - Primary headings, important text
2. `text-amber-800/80` - Body text
3. `text-muted-foreground` - Secondary text, descriptions
4. `text-amber-700` - Micro-labels, tertiary text
5. `text-amber-200/50` or `text-amber-200/60` - Decorative large text

### 10.3 Spacing Rhythm

- Sections: `py-16 md:py-24` or `py-20 md:py-32`
- Grid gaps: `gap-12 lg:gap-16` or `gap-12 lg:gap-20`
- Element margins: `mb-4`, `mb-6`, `mb-8`
- List spacing: `space-y-3`

### 10.4 Animation Guidelines

- Use `whileInView` with `viewport={{ once: true }}` for scroll animations
- Stagger children with `delay: index * 0.1`
- Keep durations between 0.3s - 0.6s
- Prefer subtle transforms (20px translate, not 50px)

---

## 11. ICONS

Using **Lucide React** icon library.

```jsx
import { Check, ArrowRight, Shield, RefreshCw, Zap, Menu, X } from "lucide-react"

/* Standard icon size */
<ArrowRight className="size-4" />

/* Larger icon */
<ArrowRight className="size-5" />

/* In button */
<Button>
  Continue <ArrowRight className="ml-2 size-4" />
</Button>

/* Feature checkmark */
<Check className="size-3 text-primary" />
```

---

## 12. RESPONSIVE BREAKPOINTS

Using Tailwind CSS 4 default breakpoints:

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile | (none) | 0px |
| Small | `sm:` | 640px |
| Medium | `md:` | 768px |
| Large | `lg:` | 1024px |
| XL | `xl:` | 1280px |
| 2XL | `2xl:` | 1536px |

**Common patterns**:
- Grid columns: `grid lg:grid-cols-12` (stacks on mobile)
- Text scaling: `text-4xl sm:text-5xl lg:text-6xl`
- Padding scaling: `py-16 md:py-24`
- Gap scaling: `gap-12 lg:gap-16`

---

## 13. FILE STRUCTURE

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, etc.)
│   ├── sections/     # Page sections (Hero, Pricing, FAQ, etc.)
│   ├── pricing/      # Pricing-specific components
│   └── pages/        # Full page components
├── lib/
│   └── utils.js      # cn() utility for class merging
└── index.css         # Design tokens & global styles
```

---

## 14. QUICK REFERENCE

### Creating a New Section

```jsx
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

function NewSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
              Label
            </h3>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900">
              Title
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Content */}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default NewSection
```

### Color Cheat Sheet

| Need | Use |
|------|-----|
| Primary button | `bg-primary text-primary-foreground` |
| White button on dark | `bg-white text-amber-900 hover:bg-amber-50` |
| Section background | `bg-background` |
| Card background | `bg-[var(--paper-cream)]` |
| Dark section | `bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900` |
| Border | `border-amber-200/60` |
| Heading | `text-amber-900` |
| Body | `text-amber-800/80` |
| Muted | `text-muted-foreground` |
| Decorative text | `text-amber-200/50` |
