# Papercraft UI Shadow & Elevation Rules

> Actionable shadow system for AI agents. CSS tokens ready for implementation.

---

## Two-Shadow Model

Every paper element needs TWO shadow components:

| Shadow | Purpose | Offset | Blur | Opacity |
|--------|---------|--------|------|---------|
| **Contact** | Anchors to surface | 0-2px | 0-3px | 0.07-0.1 |
| **Ambient** | Creates lift/float | Grows with elevation | Grows with elevation | 0.03-0.06 |

```css
/* Example: Two-shadow model */
box-shadow:
  0 1px 1px hsl(var(--shadow-color) / 0.1),   /* Contact */
  0 4px 8px hsl(var(--shadow-color) / 0.08);  /* Ambient */
```

---

## Shadow Color

**Never use pure black.** Tint shadows with background hue.

```css
:root {
  /* Light mode - warm gray */
  --shadow-color: 220deg 10% 20%;
}

.dark {
  /* Dark mode */
  --shadow-color: 220deg 5% 0%;
}
```

---

## Elevation Levels

Only 4 levels. Maps to physical paper states.

| Level | Token | Physical State | Use For |
|-------|-------|----------------|---------|
| 0 | `--paper-elevation-0` | Paper on desk | Backgrounds, disabled |
| 1 | `--paper-elevation-1` | Slight corner curl | Cards, inputs, default |
| 2 | `--paper-elevation-2` | Held at edges | Hover, dropdowns |
| 3 | `--paper-elevation-3` | Paper in hand | Modals, drag states |

---

## CSS Tokens (Copy-Paste Ready)

```css
:root {
  --shadow-color: 220deg 10% 20%;

  /* Level 0: Flat */
  --paper-elevation-0:
    0 1px 1px hsl(var(--shadow-color) / 0.04);

  /* Level 1: Raised */
  --paper-elevation-1:
    0 1px 1px hsl(var(--shadow-color) / 0.07),
    0 2px 2px hsl(var(--shadow-color) / 0.06),
    0 4px 4px hsl(var(--shadow-color) / 0.05);

  /* Level 2: Lifted */
  --paper-elevation-2:
    0 1px 1px hsl(var(--shadow-color) / 0.06),
    0 2px 2px hsl(var(--shadow-color) / 0.06),
    0 4px 4px hsl(var(--shadow-color) / 0.06),
    0 8px 8px hsl(var(--shadow-color) / 0.05),
    0 16px 16px hsl(var(--shadow-color) / 0.04);

  /* Level 3: Floating */
  --paper-elevation-3:
    0 1px 1px hsl(var(--shadow-color) / 0.05),
    0 2px 2px hsl(var(--shadow-color) / 0.05),
    0 4px 4px hsl(var(--shadow-color) / 0.05),
    0 8px 8px hsl(var(--shadow-color) / 0.05),
    0 16px 16px hsl(var(--shadow-color) / 0.04),
    0 32px 32px hsl(var(--shadow-color) / 0.03);

  /* Special: Sticky note (asymmetric) */
  --paper-shadow-sticky:
    0 3px 2px hsl(var(--shadow-color) / 0.06),
    0 6px 4px hsl(var(--shadow-color) / 0.05),
    0 12px 8px hsl(var(--shadow-color) / 0.04);

  /* Special: Tissue (minimal) */
  --paper-shadow-tissue:
    0 1px 2px hsl(var(--shadow-color) / 0.02),
    0 2px 4px hsl(var(--shadow-color) / 0.02);

  /* Special: Kraft (heavy) */
  --paper-shadow-kraft:
    0 1px 1px hsl(var(--shadow-color) / 0.1),
    0 2px 2px hsl(var(--shadow-color) / 0.08),
    0 4px 4px hsl(var(--shadow-color) / 0.06);

  /* Special: Inset (pressed) */
  --paper-shadow-inset:
    inset 0 1px 2px hsl(var(--shadow-color) / 0.1),
    inset 0 2px 4px hsl(var(--shadow-color) / 0.05);
}
```

---

## Component Elevation Mapping

| Component | Rest | Hover | Active | Drag |
|-----------|------|-------|--------|------|
| Card | 1 | 2 | 1 | 3 |
| Button | 1 | 2 | 0 | — |
| Input | 0 | 0 | 1 | — |
| Dropdown | — | — | 2 | — |
| Modal | — | — | 3 | — |
| Toast | 2 | 2 | 2 | — |
| Tooltip | 2 | — | — | — |
| Navigation | 1 | — | — | — |

---

## Material-Specific Shadows

| Material | Shadow Token | Behavior |
|----------|--------------|----------|
| Card Stock | Standard elevation | Clean, defined lift |
| Notebook | Softer elevation | Slight curl shadow |
| Sticky Note | `--paper-shadow-sticky` | Asymmetric (top adhered) |
| Tissue | `--paper-shadow-tissue` | Barely visible |
| Kraft | `--paper-shadow-kraft` | Heavy, no hover lift |
| Construction | Standard elevation | Slightly softer edges |

---

## Animation Rules

### Never animate `box-shadow` directly
Use pseudo-element opacity technique instead.

```css
.paper-card {
  position: relative;
  box-shadow: var(--paper-elevation-1);
  transition: transform 150ms ease-out;
}

/* Pre-render hover shadow */
.paper-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--paper-elevation-2);
  opacity: 0;
  transition: opacity 150ms ease-out;
  pointer-events: none;
  z-index: -1;
}

.paper-card:hover {
  transform: translateY(-2px);
}

.paper-card:hover::after {
  opacity: 1;
}
```

### Timing Guidelines

| Action | Duration | Easing |
|--------|----------|--------|
| Hover lift | 150ms | ease-out |
| Hover return | 100ms | ease-in |
| Focus elevation | 100ms | ease-out |
| Modal appear | 200ms | ease-out |
| Modal dismiss | 150ms | ease-in |
| Drag start | 100ms | ease-out |
| Drag end | 200ms | spring* |

*Spring: `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## Dark Mode Strategy

Combine reduced shadows + surface lightening.

```css
.dark {
  --shadow-color: 220deg 5% 0%;

  --paper-elevation-1:
    inset 0 0 0.5px 1px hsl(0deg 0% 100% / 0.03),
    0 1px 1px hsl(var(--shadow-color) / 0.3),
    0 2px 2px hsl(var(--shadow-color) / 0.2);

  --paper-elevation-2:
    inset 0 0 0.5px 1px hsl(0deg 0% 100% / 0.04),
    0 1px 2px hsl(var(--shadow-color) / 0.3),
    0 2px 4px hsl(var(--shadow-color) / 0.2),
    0 4px 8px hsl(var(--shadow-color) / 0.1);

  --paper-elevation-3:
    inset 0 0 0.5px 1px hsl(0deg 0% 100% / 0.05),
    0 2px 4px hsl(var(--shadow-color) / 0.4),
    0 4px 8px hsl(var(--shadow-color) / 0.3),
    0 8px 16px hsl(var(--shadow-color) / 0.2);

  /* Surface colors lighten with elevation */
  --paper-surface-0: hsl(40deg 10% 12%);
  --paper-surface-1: hsl(40deg 12% 16%);
  --paper-surface-2: hsl(40deg 14% 20%);
  --paper-surface-3: hsl(40deg 16% 24%);
}
```

---

## Tailwind Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'paper-0': 'var(--paper-elevation-0)',
        'paper-1': 'var(--paper-elevation-1)',
        'paper-2': 'var(--paper-elevation-2)',
        'paper-3': 'var(--paper-elevation-3)',
        'paper-sticky': 'var(--paper-shadow-sticky)',
        'paper-tissue': 'var(--paper-shadow-tissue)',
        'paper-kraft': 'var(--paper-shadow-kraft)',
        'paper-inset': 'var(--paper-shadow-inset)',
      },
    },
  },
}
```

Usage: `<div class="shadow-paper-1 hover:shadow-paper-2">`

---

## Quick Decision Tree

```
Is the element interactive?
├─ Yes → Start at elevation-1
│   ├─ On hover → elevation-2 + translateY(-2px)
│   ├─ On active/press → elevation-0 or inset shadow
│   └─ On drag → elevation-3
│
└─ No → Start at elevation-0 or elevation-1
    ├─ Structural (nav, sidebar)? → elevation-1, no hover
    ├─ Overlay (modal, dropdown)? → elevation-2 or elevation-3
    └─ Decorative (divider, bg)? → elevation-0
```

---

## Common Mistakes

| Don't | Do |
|-------|-----|
| `transition: box-shadow` | Animate pseudo-element opacity |
| Pure black shadows | Tinted `--shadow-color` |
| 10+ shadow layers | Max 6 layers |
| Inconsistent light directions | Single light source (top) |
| Same shadow for all materials | Material-specific shadows |
| Dark shadows in dark mode | Surface lightening + reduced shadows |
| Instant shadow changes | 150ms transitions |
| Shadow without transform | Pair with `translateY` |

---

*Shadow system rules. Reference foundation-rules.md for materials and edge-rules.md for edge treatments.*
