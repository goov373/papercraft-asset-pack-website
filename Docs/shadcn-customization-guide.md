# shadcn/ui Customization Guide

A comprehensive guide to customizing shadcn/ui's design token system for unique visual styles.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [The Three-Layer Token System](#the-three-layer-token-system)
3. [Color Tokens Reference](#color-tokens-reference)
4. [Customization Levels](#customization-levels)
5. [Best Practices](#best-practices)
6. [Common Customization Patterns](#common-customization-patterns)
7. [Adding Custom Tokens](#adding-custom-tokens)
8. [Component Variant System (CVA)](#component-variant-system-cva)
9. [Dark Mode](#dark-mode)
10. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

shadcn/ui uses a **semantic design token system** that separates *intent* from *value*. Instead of using colors directly (`bg-blue-500`), components use semantic tokens (`bg-primary`) that you define once and apply everywhere.

```
┌─────────────────────────────────────────────────────────────────┐
│  Component Usage                                                │
│  <Button> uses `bg-primary text-primary-foreground`             │
│                         ↓                                       │
├─────────────────────────────────────────────────────────────────┤
│  Tailwind Classes                                               │
│  `bg-primary` → looks up `--color-primary`                      │
│                         ↓                                       │
├─────────────────────────────────────────────────────────────────┤
│  @theme inline (Tailwind v4)                                    │
│  `--color-primary: var(--primary)`                              │
│                         ↓                                       │
├─────────────────────────────────────────────────────────────────┤
│  CSS Variables (:root)                                          │
│  `--primary: oklch(0.666 0.179 58.318)` ← YOUR ACTUAL COLOR     │
└─────────────────────────────────────────────────────────────────┘
```

**Key Insight**: You only need to change values in `:root` to retheme your entire application.

---

## The Three-Layer Token System

### Layer 1: CSS Variables (`:root`)

This is where you define your actual color values. Located in `src/index.css`:

```css
:root {
  --primary: oklch(0.666 0.179 58.318);        /* The actual color */
  --primary-foreground: oklch(1 0 0);          /* Text on primary */
  --radius: 0.625rem;                          /* Border radius base */
}
```

**This is the only layer you typically need to modify for theming.**

### Layer 2: @theme inline (Tailwind v4 Bridge)

This block maps CSS variables to Tailwind's theme system:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --radius-lg: var(--radius);
}
```

**You rarely need to modify this layer** unless adding entirely new tokens.

### Layer 3: Component Classes

Components use Tailwind utility classes that reference the theme:

```jsx
// In button.jsx
"bg-primary text-primary-foreground hover:bg-primary/90"
```

**Modify this layer only when changing component behavior**, not colors.

---

## Color Tokens Reference

### Semantic Color Pairs

Every color token has a `-foreground` pair for text/icon contrast:

| Token | Purpose | Foreground Token |
|-------|---------|------------------|
| `--background` | Page background | `--foreground` |
| `--card` | Card/panel surfaces | `--card-foreground` |
| `--popover` | Dropdowns, tooltips | `--popover-foreground` |
| `--primary` | Primary actions (buttons, links) | `--primary-foreground` |
| `--secondary` | Secondary actions | `--secondary-foreground` |
| `--muted` | Subtle backgrounds | `--muted-foreground` |
| `--accent` | Highlights, hover states | `--accent-foreground` |
| `--destructive` | Errors, delete actions | (uses white) |

### Utility Tokens

| Token | Purpose |
|-------|---------|
| `--border` | Default border color |
| `--input` | Form input borders |
| `--ring` | Focus ring color |
| `--radius` | Base border radius (others calculated from this) |

### Chart Tokens

For data visualization:

| Token | Default Usage |
|-------|---------------|
| `--chart-1` | Primary data series |
| `--chart-2` | Secondary data series |
| `--chart-3` through `--chart-5` | Additional series |

### Sidebar Tokens (Optional)

For applications with sidebars:

| Token | Purpose |
|-------|---------|
| `--sidebar` | Sidebar background |
| `--sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | Sidebar primary actions |
| `--sidebar-accent` | Sidebar hover states |
| `--sidebar-border` | Sidebar borders |

---

## Customization Levels

### Level 1: Global Theme (Recommended Starting Point)

Modify CSS variables in `:root` to change all components at once:

```css
/* src/index.css */
:root {
  /* Change primary from amber to blue */
  --primary: oklch(0.55 0.2 250);           /* Blue */
  --primary-foreground: oklch(1 0 0);       /* White text */

  /* Change border radius from rounded to sharp */
  --radius: 0.25rem;                        /* Nearly square */
}
```

**Impact**: Every `<Button>`, `<Card>`, `<Badge>`, etc. updates automatically.

### Level 2: Component Variants (For New Styles)

Add new variants in the component's CVA definition:

```jsx
// src/components/ui/button.jsx
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      // Add a new variant:
      gradient: "bg-gradient-to-r from-primary to-accent text-white",
      paper: "bg-card border-2 border-border shadow-md hover:shadow-lg",
    },
  },
});
```

**Usage**: `<Button variant="gradient">` or `<Button variant="paper">`

### Level 3: Instance Override (One-Off Styling)

Pass additional classes via `className`:

```jsx
<Button className="rounded-full shadow-xl">
  Custom Button
</Button>
```

**Use sparingly** — if you repeat the same overrides, create a variant instead.

---

## Best Practices

### DO: Use Semantic Tokens

```jsx
// ✅ Good - responds to theme changes
<div className="bg-card text-card-foreground border-border">

// ❌ Bad - hardcoded colors won't update with theme
<div className="bg-white text-gray-900 border-gray-200">
```

### DO: Maintain Foreground Pairing

When changing a background token, always check its foreground contrast:

```css
:root {
  --primary: oklch(0.45 0.2 250);           /* Dark blue */
  --primary-foreground: oklch(0.98 0 0);    /* Near-white for contrast */
}
```

### DO: Use OKLCH for Colors

OKLCH provides perceptually uniform colors and easier manipulation:

```css
/* OKLCH: lightness (0-1), chroma (0-0.4), hue (0-360) */
--primary: oklch(0.65 0.18 45);  /* L=65%, C=0.18, H=45° (orange) */

/* Easy adjustments */
--primary-hover: oklch(0.55 0.18 45);  /* Just darken lightness */
```

### DON'T: Modify @theme inline for Theming

The `@theme inline` block should only map variables, not contain values:

```css
/* ❌ Bad - hardcoding in @theme */
@theme inline {
  --color-primary: oklch(0.5 0.2 250);  /* Don't put values here */
}

/* ✅ Good - reference CSS variables */
@theme inline {
  --color-primary: var(--primary);
}
```

### DON'T: Override Base Component Classes

```jsx
// ❌ Bad - modifying the base cva string
const buttonVariants = cva(
  "inline-flex items-center bg-blue-500...",  /* Don't hardcode here */
```

Instead, change CSS variables or add variants.

---

## Common Customization Patterns

### Pattern 1: Brand Color Swap

Change from default gray to your brand color:

```css
:root {
  /* Before: neutral gray */
  /* --primary: oklch(0.205 0 0); */

  /* After: brand purple */
  --primary: oklch(0.55 0.25 290);
  --primary-foreground: oklch(1 0 0);

  /* Update accent to complement */
  --accent: oklch(0.65 0.2 320);
  --accent-foreground: oklch(1 0 0);
}
```

### Pattern 2: Warm vs Cool Theme

Shift the entire palette's hue:

```css
/* Cool theme (blues/greens) */
:root {
  --background: oklch(0.98 0.01 240);
  --card: oklch(1 0 0);
  --primary: oklch(0.55 0.2 250);
  --accent: oklch(0.6 0.15 180);
  --border: oklch(0.9 0.02 240);
}

/* Warm theme (ambers/oranges) - current project */
:root {
  --background: oklch(0.987 0.022 95);
  --card: oklch(0.996 0.007 106);
  --primary: oklch(0.666 0.179 58);
  --accent: oklch(0.705 0.191 47);
  --border: oklch(0.905 0.093 95);
}
```

### Pattern 3: Adjusting Roundness

The `--radius` token controls all border radii:

```css
/* Sharp/Angular (corporate, technical) */
:root {
  --radius: 0.25rem;  /* 4px */
}

/* Soft/Rounded (friendly, playful) */
:root {
  --radius: 0.75rem;  /* 12px */
}

/* Pill-shaped (modern, bold) */
:root {
  --radius: 9999px;
}
```

The radius scale is auto-calculated:
- `rounded-sm` = `--radius - 4px`
- `rounded-md` = `--radius - 2px`
- `rounded-lg` = `--radius` (base)
- `rounded-xl` = `--radius + 4px`

### Pattern 4: High Contrast Mode

Increase contrast for accessibility:

```css
:root {
  --background: oklch(1 0 0);              /* Pure white */
  --foreground: oklch(0 0 0);              /* Pure black */
  --primary: oklch(0.35 0.2 250);          /* Darker primary */
  --border: oklch(0.3 0 0);                /* Dark borders */
  --muted-foreground: oklch(0.35 0 0);     /* Darker muted text */
}
```

### Pattern 5: Monochromatic Theme

Use a single hue with varying lightness:

```css
:root {
  --background: oklch(0.98 0.01 250);      /* Very light blue */
  --card: oklch(0.96 0.02 250);
  --primary: oklch(0.5 0.2 250);           /* Medium blue */
  --secondary: oklch(0.85 0.08 250);       /* Light blue */
  --accent: oklch(0.6 0.15 250);           /* Slightly different blue */
  --muted: oklch(0.92 0.04 250);
  --border: oklch(0.88 0.06 250);
}
```

---

## Adding Custom Tokens

### Step 1: Define in :root

```css
:root {
  /* Custom token for your papercraft theme */
  --craft: oklch(0.72 0.14 65);
  --craft-foreground: oklch(0.25 0.05 55);

  /* Custom surface for paper texture */
  --paper: oklch(0.97 0.02 90);
  --paper-foreground: oklch(0.35 0.08 50);
}
```

### Step 2: Add to @theme inline

```css
@theme inline {
  /* ... existing mappings ... */

  --color-craft: var(--craft);
  --color-craft-foreground: var(--craft-foreground);
  --color-paper: var(--paper);
  --color-paper-foreground: var(--paper-foreground);
}
```

### Step 3: Use in Components

Now available as Tailwind classes:

```jsx
<div className="bg-craft text-craft-foreground">
  Craft-colored element
</div>

<Card className="bg-paper">
  Paper-textured card
</Card>
```

### Step 4: (Optional) Add Component Variant

```jsx
// button.jsx
variant: {
  craft: "bg-craft text-craft-foreground hover:bg-craft/90",
}
```

---

## Component Variant System (CVA)

shadcn uses `class-variance-authority` (CVA) for type-safe component variants.

### Anatomy of a CVA Definition

```jsx
const buttonVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center rounded-md font-medium transition-all",

  {
    variants: {
      // Named variant groups
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },

    // Styles for specific variant combinations
    compoundVariants: [
      {
        variant: "outline",
        size: "sm",
        className: "border-2",  // Thicker border on small outline buttons
      },
    ],

    // Defaults when props aren't specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Adding a New Variant

```jsx
variant: {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  // Add your custom variant
  papercraft: cn(
    "bg-gradient-to-br from-amber-100 to-orange-100",
    "text-amber-900",
    "border-2 border-amber-300",
    "shadow-[2px_2px_0_0_theme(colors.amber.400)]",
    "hover:shadow-[4px_4px_0_0_theme(colors.amber.400)]",
    "hover:translate-x-[-2px] hover:translate-y-[-2px]",
    "active:shadow-none active:translate-x-0 active:translate-y-0",
    "transition-all duration-150"
  ),
}
```

### Adding a New Size

```jsx
size: {
  default: "h-9 px-4 py-2",
  // Add extra large
  xl: "h-12 px-8 py-3 text-lg",
  // Add extra small
  xs: "h-6 px-2 text-xs",
}
```

---

## Dark Mode

### How It Works

Dark mode uses the `.dark` class on a parent element (usually `<html>`):

```css
.dark {
  --background: oklch(0.25 0.04 55);
  --foreground: oklch(0.962 0.059 95);
  /* ... override all tokens ... */
}
```

### Tailwind v4 Dark Variant

The custom variant enables `dark:` prefixes:

```css
@custom-variant dark (&:is(.dark *));
```

### Component Dark Mode Styles

Components can include dark-specific overrides:

```jsx
// In CVA definition
"dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
```

### Toggle Implementation

```jsx
function ThemeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  return <Button onClick={toggleDark}>Toggle Theme</Button>;
}
```

---

## Troubleshooting

### Colors Not Updating

**Symptom**: Changed `:root` variables but components look the same.

**Solutions**:
1. Check browser cache (hard refresh)
2. Ensure variable names match exactly (case-sensitive)
3. Verify `@theme inline` mapping exists for custom tokens

### Contrast Issues

**Symptom**: Text is hard to read on backgrounds.

**Solution**: Always pair background tokens with appropriate foreground:

```css
/* Check contrast with tools like https://oklch.com */
--primary: oklch(0.65 0.18 45);           /* Medium brightness */
--primary-foreground: oklch(0.98 0 0);    /* Near white = good contrast */
```

### Variants Not Working

**Symptom**: Custom variant doesn't apply.

**Checklist**:
1. Added to CVA `variants` object?
2. Exported `buttonVariants` (or equivalent)?
3. Using correct prop name? (`variant="myVariant"`)

### Dark Mode Not Working

**Symptom**: `.dark` class doesn't change appearance.

**Checklist**:
1. Is `@custom-variant dark` defined in CSS?
2. Is `.dark` on `<html>` or parent element?
3. Are `.dark` CSS variables defined?

---

## Quick Reference Card

### Files to Modify

| Goal | File | Section |
|------|------|---------|
| Change colors | `src/index.css` | `:root { }` |
| Add dark theme | `src/index.css` | `.dark { }` |
| Add new token | `src/index.css` | `:root` + `@theme inline` |
| Add component variant | `src/components/ui/[component].jsx` | `variants: { }` |
| Change radius | `src/index.css` | `--radius: value` |

### Token Naming Convention

```
--[purpose]: value;
--[purpose]-foreground: value;

Examples:
--primary / --primary-foreground
--card / --card-foreground
--sidebar / --sidebar-foreground
```

### OKLCH Quick Reference

```
oklch(L C H)
│     │ │ └─ Hue: 0-360 (color wheel position)
│     │ └─── Chroma: 0-0.4 (saturation)
│     └───── Lightness: 0-1 (brightness)

Common Hues:
0°   = Red
30°  = Orange
60°  = Yellow
120° = Green
180° = Cyan
240° = Blue
300° = Magenta
```

---

## Summary

1. **Change colors**: Modify `:root` CSS variables only
2. **Add new semantic colors**: Add to `:root` AND `@theme inline`
3. **Add component styles**: Create new CVA variants
4. **One-off tweaks**: Use `className` prop
5. **Always maintain contrast**: Pair backgrounds with foregrounds
6. **Use OKLCH**: Perceptually uniform, easy to adjust
