# Papercraft UI Edge Treatment Rules

> Actionable edge system for AI agents. SVG filters and CSS ready for implementation.

---

## Edge Types Overview

| Type | Use Case | Feeling | Implementation |
|------|----------|---------|----------------|
| **Clean cut** | Forms, Data, Buttons | Professional, formal | `border-radius: 0-4px` |
| **Deckled** | Premium content, Invitations | Artisanal, premium | SVG filter (subtle) |
| **Torn** | Notes, Alerts, Casual | Handmade, urgent | SVG filter (dramatic) |
| **Folded** | Accordions, Bookmarks | Interactive hint | CSS pseudo-elements |
| **Curled** | Sticky notes, Draggables | Lift indication | CSS gradients + transform |
| **Perforated** | Tear-away, Tickets | Actionable | Dashed border + holes |

---

## SVG Filters (Copy-Paste Ready)

Place once in document, right after `<body>`:

```html
<svg class="paper-filters" aria-hidden="true"
     style="position:absolute;width:0;height:0;overflow:hidden;">
  <defs>
    <!-- Deckled: Subtle, premium -->
    <filter id="edge-deckled" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02"
                    numOctaves="3" seed="1" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <!-- Handmade: Medium organic -->
    <filter id="edge-handmade" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04"
                    numOctaves="4" seed="42" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <!-- Torn: Dramatic, visible -->
    <filter id="edge-torn" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04"
                    numOctaves="5" seed="15" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <!-- Torn Dramatic: Maximum displacement -->
    <filter id="edge-torn-dramatic" x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05"
                    numOctaves="6" seed="7" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="12"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <!-- Variants with different seeds -->
    <filter id="edge-torn-v2" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04"
                    numOctaves="5" seed="234" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <filter id="edge-torn-v3" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04"
                    numOctaves="5" seed="567" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>
```

---

## Filter Parameter Guide

| Effect | baseFrequency | numOctaves | scale |
|--------|---------------|------------|-------|
| Deckled (subtle) | 0.02 | 3 | 3 |
| Handmade (medium) | 0.04 | 4 | 5 |
| Torn (dramatic) | 0.04 | 5 | 8-12 |
| Very rough | 0.06 | 5 | 12-15 |

**Seed:** Change for different patterns. Use different seeds for multiple similar elements.

---

## CSS Utility Classes

```css
/* Edge Filters */
.edge-deckled { filter: url(#edge-deckled); }
.edge-handmade { filter: url(#edge-handmade); }
.edge-torn { filter: url(#edge-torn); }
.edge-torn-dramatic { filter: url(#edge-torn-dramatic); }
.edge-torn-v2 { filter: url(#edge-torn-v2); }
.edge-torn-v3 { filter: url(#edge-torn-v3); }
```

---

## Folded Corner Implementation

```css
:root {
  --fold-size-sm: 15px;
  --fold-size-md: 25px;
  --fold-size-lg: 40px;
  --fold-color: hsl(0 0% 88%);
  --fold-color-dark: hsl(0 0% 82%);
}

.paper-folded-corner {
  position: relative;
  background: var(--paper-color, #fff);
}

/* Cut off corner */
.paper-folded-corner::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 var(--fold-size, 25px) var(--fold-size, 25px) 0;
  border-color: transparent var(--page-background, #f5f5f5) transparent transparent;
}

/* Fold triangle */
.paper-folded-corner::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 var(--fold-size, 25px) var(--fold-size, 25px) 0;
  border-color: transparent var(--fold-color) transparent transparent;
  filter: drop-shadow(-1px 1px 1px rgba(0,0,0,0.1));
}
```

---

## Page Curl Implementation

```css
.paper-curled-corner {
  position: relative;
  overflow: hidden;
}

.paper-curled-corner::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;

  background: linear-gradient(
    315deg,
    transparent 37%,
    var(--fold-color, #e8e8e8) 38%,
    var(--fold-color, #e8e8e8) 46%,
    var(--paper-color, #fff) 47%
  );

  box-shadow: -3px -3px 8px rgba(0,0,0,0.15);
  border-radius: 0 0 0 100%;
}

/* Interactive peel on hover */
.paper-peelable::after {
  width: 20px;
  height: 20px;
  transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.paper-peelable:hover::after {
  width: 80px;
  height: 80px;
}
```

---

## Sticky Note (Asymmetric Shadow + Curl)

```css
.paper-sticky {
  box-shadow: var(--paper-shadow-sticky);
  transform: perspective(1000px) rotateX(-1deg);
  transform-origin: top center;
}

/* Bottom corner lift */
.paper-sticky::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 20px;
  background: transparent;
  box-shadow: 0 8px 8px hsl(var(--shadow-color) / 0.15);
  transform: rotate(2deg) translateY(5px);
  transform-origin: bottom right;
  z-index: -1;
}
```

---

## Notebook Paper (Holes + Lines)

```css
.paper-notebook {
  position: relative;
  padding-left: 40px;

  /* Red margin line */
  background: linear-gradient(
    to right,
    transparent 30px,
    #f88 30px,
    #f88 32px,
    transparent 32px
  );
}

/* Punch holes */
.paper-notebook::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 20px;
  width: 12px;
  height: 12px;
  background: var(--page-background, #f5f5f5);
  border-radius: 50%;
  box-shadow:
    0 40px 0 var(--page-background),
    0 80px 0 var(--page-background),
    0 120px 0 var(--page-background);
}

/* Lined paper */
.paper-notebook-lined {
  background-image:
    repeating-linear-gradient(
      transparent,
      transparent 27px,
      #e8e8e8 27px,
      #e8e8e8 28px
    );
  background-position: 0 20px;
}
```

---

## Perforation (Tear Strip)

```css
.paper-perforated {
  position: relative;
}

.paper-perforated::after {
  content: '';
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 0;
  border-bottom: 2px dashed rgba(0,0,0,0.2);
}

/* Perforation holes */
.paper-perforated-holes::before {
  content: '';
  position: absolute;
  bottom: 27px;
  left: 0;
  right: 0;
  height: 6px;
  background: radial-gradient(
    circle at center,
    var(--page-background, #f5f5f5) 3px,
    transparent 3px
  );
  background-size: 15px 6px;
}
```

---

## Ticket Stub Style

```css
.paper-ticket {
  position: relative;
  display: flex;
}

.paper-ticket-main {
  flex: 1;
  padding: 20px;
}

.paper-ticket-stub {
  width: 80px;
  padding: 20px 10px;
  border-left: 2px dashed rgba(0,0,0,0.15);
}

/* Semicircle cutouts */
.paper-ticket::before,
.paper-ticket::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--page-background, #f5f5f5);
  border-radius: 50%;
  right: 72px;
}

.paper-ticket::before { top: -8px; }
.paper-ticket::after { bottom: -8px; }
```

---

## Edge Selection Matrix

| Content Type | Edge Treatment | Why |
|--------------|----------------|-----|
| Premium/Formal | `edge-deckled` + fold | Artisanal feel |
| Handmade/Craft | `edge-handmade` + rotation | Organic variation |
| Casual/Quick | `edge-torn` + sticky shadow | Informal, temporary |
| Actionable | Perforation | Indicates tear-away |
| Interactive | Curl + hover animation | Shows interactivity |
| Professional | Clean edges, border-radius | Precision |

---

## Performance Guidelines

| Technique | Performance | Limit |
|-----------|-------------|-------|
| SVG filter (static) | Medium | 20-30 elements |
| SVG filter (animated) | Heavy | 3-5 elements |
| CSS mask | Light | Unlimited |
| Clip-path | Light | 50+ elements |
| Pseudo-element fold | Light | Unlimited |

**Rules:**
- Never animate feTurbulence
- Use CSS masks for repeating patterns
- Reserve dramatic torn edges for hero elements
- Test on mobile devices

---

## Browser Support

Always include webkit prefix for masks:

```css
.masked {
  -webkit-mask-image: url(mask.svg);
  mask-image: url(mask.svg);
}
```

---

## Quick Decision Tree

```
What edge effect do I need?
│
├─ Dynamic, unique per element?
│   └─ SVG Filter
│       ├─ Subtle → edge-deckled
│       ├─ Medium → edge-handmade
│       └─ Dramatic → edge-torn
│
├─ Folded corner?
│   └─ Pseudo-element triangles
│
├─ Page curl/peel?
│   └─ Gradient + border-radius
│
├─ Perforated/tear-away?
│   └─ Dashed border + radial gradient holes
│
└─ Notebook paper?
    └─ Box-shadow holes + linear gradient lines
```

---

## Common Mistakes

| Don't | Do |
|-------|-----|
| Same seed for all filtered elements | Unique seeds for variety |
| Animate feTurbulence | Pre-render states, animate opacity |
| Skip webkit prefix on masks | Always include -webkit-mask-image |
| Forget filter bounds | Set x/y to -10%, width/height to 120%+ |
| Use torn edges on everything | Reserve for emphasis |
| Ignore filter overflow clipping | Test with dramatic scale values |

---

## Integration with Shadows

Edge treatments affect shadow behavior:

```css
/* Torn paper - filter creates organic shadow edge */
.paper-note {
  filter: url(#edge-torn);
  box-shadow: var(--paper-elevation-2);
}

/* Folded corner - reduce shadow in corner */
.paper-folded {
  box-shadow: var(--paper-elevation-1);
}

/* Sticky with curl - asymmetric shadow */
.paper-sticky.curl-br {
  box-shadow:
    var(--paper-shadow-sticky),
    inset -5px -5px 10px rgba(0,0,0,0.02);
}
```

---

*Edge treatment rules. Reference foundation-rules.md for materials and shadow-rules.md for elevation system.*
