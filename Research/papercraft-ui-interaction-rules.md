# Papercraft UI Interaction Rules

> Actionable interaction system for AI agents. CSS + JS patterns for paper behaviors.

---

## Interaction States

| State | Elevation | Transform | Shadow | Use Case |
|-------|-----------|-----------|--------|----------|
| **Default** | 1 | `translateY(0)` | Soft, close | At rest |
| **Hover** | 2-3 | `translateY(-4px) rotateX(2deg)` | Medium, diffuse | Mouse proximity |
| **Active** | 0 | `translateY(1px) scale(0.98)` | Minimal | Click feedback |
| **Focus** | unchanged | unchanged + outline | unchanged | Keyboard nav |
| **Dragging** | 3-4 | `translateY(-8px) rotate(-2deg)` | Large, soft | Active drag |
| **Disabled** | 0 | none | Faint | Non-interactive |

---

## State Tokens (Copy-Paste Ready)

```css
:root {
  /* State transforms */
  --paper-state-default-transform: translateY(0);
  --paper-state-hover-transform: translateY(-4px) rotateX(2deg);
  --paper-state-active-transform: translateY(1px) scale(0.98);
  --paper-state-dragging-transform: translateY(-8px) rotate(-2deg);

  /* Transitions */
  --paper-transition-lift: 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  --paper-transition-press: 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  --paper-transition-settle: 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  --paper-transition-fold: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  /* Focus */
  --paper-focus-ring-width: 3px;
  --paper-focus-ring-color: #0066cc;
  --paper-focus-ring-offset: 2px;

  /* Disabled */
  --paper-state-disabled-opacity: 0.5;
  --paper-state-disabled-filter: grayscale(30%);
}
```

---

## Base Interactive Class

```css
.paper-interactive {
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: var(--paper-state-default-transform);
  box-shadow: var(--paper-elevation-1);
  transition:
    transform var(--paper-transition-settle),
    box-shadow var(--paper-transition-settle);
  cursor: pointer;
  user-select: none;
}

.paper-interactive:hover {
  transform: var(--paper-state-hover-transform);
  box-shadow: var(--paper-elevation-2);
}

.paper-interactive:active {
  transform: var(--paper-state-active-transform);
  box-shadow: var(--paper-elevation-0);
  transition:
    transform var(--paper-transition-press),
    box-shadow var(--paper-transition-press);
}

.paper-interactive:focus-visible {
  outline: var(--paper-focus-ring-width) solid var(--paper-focus-ring-color);
  outline-offset: var(--paper-focus-ring-offset);
}

.paper-interactive:disabled {
  opacity: var(--paper-state-disabled-opacity);
  filter: var(--paper-state-disabled-filter);
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## Drag & Drop States

```css
.paper-draggable {
  cursor: grab;
  touch-action: none;
}

.paper-draggable.is-dragging {
  transform: scale(1.05) rotate(-3deg);
  box-shadow: 0 16px 24px rgba(0,0,0,0.2);
  opacity: 0.9;
  cursor: grabbing;
  z-index: 9999;
}

/* Ghost placeholder */
.paper-drag-ghost {
  border: 2px dashed var(--paper-border-color, #ccc);
  opacity: 0.4;
  background: transparent;
}

/* Drop zone */
.paper-dropzone.is-drag-over {
  background-color: rgba(0, 102, 204, 0.1);
  border: 2px dashed var(--paper-primary, #0066cc);
}
```

---

## Card Flip Component

```css
.paper-flip-card {
  perspective: 1000px;
}

.paper-flip-card__inner {
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.paper-flip-card:hover .paper-flip-card__inner,
.paper-flip-card.is-flipped .paper-flip-card__inner {
  transform: rotateY(180deg);
}

.paper-flip-card__face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.paper-flip-card__back {
  transform: rotateY(180deg);
}
```

---

## Accordion Fold

```css
.paper-accordion__content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.paper-accordion__panel[open] .paper-accordion__content {
  grid-template-rows: 1fr;
}

.paper-accordion__content-inner {
  overflow: hidden;
}

/* Fold shadow */
.paper-accordion__content::before {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.05), transparent);
}
```

---

## Corner Peel Effect

```css
.paper-peelable {
  position: relative;
  overflow: hidden;
}

.paper-peelable::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    315deg,
    transparent 40%,
    var(--fold-color, #e8e8e8) 41%,
    var(--fold-color, #e8e8e8) 48%,
    var(--paper-color, #fff) 49%
  );
  border-radius: 0 0 0 80%;
  box-shadow: -2px -2px 5px rgba(0,0,0,0.1);
  transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.paper-peelable:hover::after {
  width: 80px;
  height: 80px;
}
```

---

## Stack Effects

```css
:root {
  --paper-stack-offset-x: 4px;
  --paper-stack-offset-y: 4px;
  --paper-fan-angle: 8deg;
}

/* Neat stack using pseudo-elements */
.paper-stack::before,
.paper-stack::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--paper-surface-color, #fff);
  border-radius: inherit;
  z-index: -1;
}

.paper-stack::before {
  transform: translate(var(--paper-stack-offset-x), var(--paper-stack-offset-y));
}

.paper-stack::after {
  transform: translate(
    calc(var(--paper-stack-offset-x) * 2),
    calc(var(--paper-stack-offset-y) * 2)
  );
  z-index: -2;
}

/* Messy stack variant */
.paper-stack--messy::before {
  transform: translate(3px, 5px) rotate(-2deg);
}

.paper-stack--messy::after {
  transform: translate(6px, 9px) rotate(3deg);
}
```

---

## Timing Reference

| Action | Duration | Easing |
|--------|----------|--------|
| Hover lift | 150-200ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot) |
| Press down | 100ms | `cubic-bezier(0.4, 0, 0.2, 1)` (quick) |
| Return/settle | 300ms | `cubic-bezier(0.22, 1, 0.36, 1)` (smooth) |
| Card flip | 500ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Accordion fold | 400-500ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Drag pickup | 200ms | overshoot |
| Drop settle | 400ms | spring bounce |

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .paper-interactive,
  .paper-flip-card__inner,
  .paper-accordion__content {
    transition: none;
  }

  .paper-interactive:hover {
    transform: none;
    /* Keep shadow change for feedback */
  }

  /* Flip card: use opacity instead */
  .paper-flip-card:hover .paper-flip-card__front {
    opacity: 0;
  }

  .paper-flip-card__back {
    transform: none;
    opacity: 0;
  }

  .paper-flip-card:hover .paper-flip-card__back {
    opacity: 1;
  }
}
```

---

## Focus Accessibility

```css
/* High contrast mode */
@media (prefers-contrast: more) {
  .paper-interactive:focus-visible {
    outline: 4px double #000;
    outline-offset: 4px;
  }
}

/* Forced colors (Windows) */
@media (forced-colors: active) {
  .paper-interactive:focus-visible {
    outline: 3px solid CanvasText;
  }
}
```

---

## Component Decision Matrix

| Component | CSS-Only | Needs JS |
|-----------|----------|----------|
| Hover lift | ✅ | |
| Active press | ✅ | |
| Focus ring | ✅ | |
| Card flip (hover) | ✅ | |
| Card flip (click) | | ✅ |
| Accordion | ✅ (details/summary) | |
| Corner peel | ✅ | |
| Stack appearance | ✅ | |
| Fan spread (hover) | ✅ | |
| Drag and drop | | ✅ |
| Physics-based drop | | ✅ |

---

## Common Mistakes

| Don't | Do |
|-------|-----|
| Forget `backface-visibility: hidden` | Always add to flip card faces |
| Skip `perspective` on parent | Add to container for 3D transforms |
| Remove focus outlines | Use `:focus-visible` instead |
| Fixed heights in accordion | Use `grid-template-rows` trick |
| Drag without `touch-action: none` | Add for mobile compatibility |
| No reduced motion fallback | Always provide static alternative |

---

*Interaction rules for papercraft UI. Reference shadow-rules.md for elevation and foundation-rules.md for materials.*
