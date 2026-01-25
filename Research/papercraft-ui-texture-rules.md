# Papercraft UI Texture Rules

> Actionable texture system for AI agents. SVG filters and CSS patterns for paper surfaces.

---

## Texture Strategy

| Priority | Approach | When to Use |
|----------|----------|-------------|
| 1 | **No texture** | Most UI (paper-ness from shadows + edges) |
| 2 | **Subtle noise** | Hero elements, decorative accents |
| 3 | **Visible grain** | Specialty paper types (kraft, watercolor) |

**Default rule:** Paper texture comes from shadows and edges. Only add visual texture when the design specifically calls for it.

---

## SVG Noise Filter (Primary Method)

```xml
<svg width="0" height="0" aria-hidden="true">
  <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.04"
      numOctaves="4"
      stitchTiles="stitch"
      result="noise"
    />
    <feDiffuseLighting
      in="noise"
      lighting-color="#ffffff"
      surfaceScale="2"
      result="lit"
    >
      <feDistantLight azimuth="45" elevation="60" />
    </feDiffuseLighting>
  </filter>
</svg>
```

---

## Frequency Guide

| baseFrequency | Result | Use For |
|---------------|--------|---------|
| 0.8-1.0 | Very fine, nearly invisible | Bond paper, smooth |
| 0.5-0.6 | Fine grain | Standard paper |
| 0.3-0.4 | Medium grain | Cotton/rag paper |
| 0.15-0.25 | Coarse grain | Kraft, cardstock |
| 0.02-0.1 | Heavy tooth | Watercolor paper |

**numOctaves:** 3-5 is optimal. Higher = more detail but slower. Never exceed 6.

---

## Material-Specific Filters

```xml
<!-- Bond Paper (smooth) -->
<filter id="texture-bond">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
</filter>

<!-- Cotton Rag (medium organic) -->
<filter id="texture-cotton">
  <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="5" stitchTiles="stitch"/>
</filter>

<!-- Kraft Paper (coarse) -->
<filter id="texture-kraft">
  <feTurbulence type="fractalNoise" baseFrequency="0.25" numOctaves="4" stitchTiles="stitch"/>
</filter>

<!-- Watercolor (heavy tooth) -->
<filter id="texture-watercolor">
  <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="6" stitchTiles="stitch"/>
</filter>

<!-- Laid Paper (directional) -->
<filter id="texture-laid">
  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.15" numOctaves="3" stitchTiles="stitch"/>
</filter>
```

---

## CSS Inline Noise (Data URI)

```css
:root {
  /* Pre-encoded SVG noise URLs */
  --texture-noise-fine: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

  --texture-noise-medium: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

  --texture-noise-coarse: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

---

## Applying Texture with Pseudo-Elements

```css
.paper-textured {
  position: relative;
  background-color: var(--paper-cream, #fdfbf7);
}

.paper-textured::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--texture-noise-medium);
  background-size: 200px 200px;
  background-repeat: repeat;
  opacity: 0.08;
  mix-blend-mode: multiply;
  pointer-events: none;
  border-radius: inherit;
}
```

---

## Opacity Scale

| Token | Value | Use |
|-------|-------|-----|
| `--texture-opacity-subtle` | 0.04 | Background, large areas |
| `--texture-opacity-light` | 0.08 | Cards, containers |
| `--texture-opacity-medium` | 0.12 | Interactive elements |
| `--texture-opacity-heavy` | 0.18 | Decorative, hero |
| `--texture-opacity-dramatic` | 0.25 | Specialty effects |

---

## Blend Mode Selection

| Background | Blend Mode | Result |
|------------|------------|--------|
| Light (white/cream) | `multiply` | Darkening grain marks |
| Mid-tone (tan/gray) | `overlay` | Contrast boost |
| Dark (brown/black) | `soft-light` | Subtle grain without washing out |

```css
/* Light mode */
.paper-textured::before {
  mix-blend-mode: multiply;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .paper-textured::before {
    mix-blend-mode: soft-light;
    opacity: 0.08;
  }
}
```

---

## Aging Effects

```css
:root {
  --age-none: none;
  --age-slight: sepia(5%) brightness(99%);
  --age-moderate: sepia(15%) brightness(97%) contrast(98%);
  --age-vintage: sepia(30%) brightness(95%) contrast(95%) saturate(90%);
  --age-antique: sepia(50%) brightness(92%) contrast(92%) saturate(80%);
  --age-ancient: sepia(70%) brightness(88%) contrast(88%) saturate(70%) hue-rotate(-5deg);
}

.paper-vintage {
  filter: var(--age-vintage);
}
```

---

## Paper Color Progression

| Age | Color | HSL |
|-----|-------|-----|
| Fresh white | `#ffffff` | - |
| Fresh cream | `#fdfbf7` | warm white |
| Slightly aged | `#f7f2e8` | light ivory |
| Moderately aged | `#efe6d5` | tan |
| Heavily aged | `#e0d4bc` | parchment |
| Antique | `#cebf9a` | aged parchment |

---

## Stain Effects (Optional)

```css
/* Coffee stain */
.coffee-stain {
  position: absolute;
  width: 80px;
  height: 70px;
  background: radial-gradient(
    ellipse 60% 50% at 50% 50%,
    transparent 70%,
    rgba(139, 90, 43, 0.15) 70%,
    rgba(139, 90, 43, 0.25) 85%,
    rgba(139, 90, 43, 0.1) 100%
  );
  filter: blur(1px);
  mix-blend-mode: multiply;
  pointer-events: none;
}

/* Edge darkening (handling wear) */
.edge-wear {
  box-shadow:
    inset 0 0 30px rgba(0, 0, 0, 0.05),
    inset 0 0 60px rgba(0, 0, 0, 0.03);
}
```

---

## CSS-Only Patterns (No SVG)

```css
/* Linen crosshatch */
.texture-linen {
  background-image:
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 4px 4px;
}

/* Laid paper lines */
.texture-laid {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.02) 2px,
    rgba(0,0,0,0.02) 3px
  );
}

/* Graph paper */
.texture-graph {
  background-image:
    linear-gradient(rgba(200,200,255,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,200,255,0.5) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## Performance Guidelines

| Technique | Performance | Limit |
|-----------|-------------|-------|
| feTurbulence (high octaves) | Heavy | Use sparingly |
| feTurbulence (3-4 octaves) | Medium | 10-20 elements |
| CSS data URI noise | Light | Unlimited |
| CSS gradients | Very light | Unlimited |
| Pre-rendered PNG | Very light | Unlimited |

**Rules:**
- Limit `numOctaves` to 5 or fewer
- Use `background-size: 100-200px` for efficient tiling
- Add `contain: paint` to textured containers
- Consider removing texture on mobile
- Provide `prefers-reduced-motion` fallback

```css
@media (prefers-reduced-motion: reduce) {
  .paper-textured::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .paper-textured::before {
    opacity: 0.05;
    background-size: 150px;
  }
}
```

---

## Dark Mode Adjustments

```css
.dark {
  --texture-opacity: 0.08;
  --texture-blend: soft-light;
  --paper-bg: #2a2520; /* Dark warm brown */
}

.dark .paper-textured::before {
  mix-blend-mode: var(--texture-blend);
  opacity: var(--texture-opacity);
}
```

---

## Quick Decision Tree

```
Should I add texture?
│
├─ Is it a background/large area?
│   └─ Subtle (opacity 0.04) or none
│
├─ Is it a standard card/component?
│   └─ Usually none. Paper-ness from shadows.
│
├─ Is it a specialty paper type?
│   ├─ Kraft → coarse noise, 0.12 opacity
│   ├─ Watercolor → heavy tooth, 0.15 opacity
│   └─ Newsprint → medium noise, gray tint
│
└─ Is it decorative/hero?
    └─ Medium-heavy texture appropriate
```

---

## Common Mistakes

| Don't | Do |
|-------|-----|
| Texture on everything | Use sparingly, default to none |
| `numOctaves` > 6 | Keep at 3-5 |
| Forget `pointer-events: none` | Always add to texture layer |
| Same blend mode light/dark | Switch to `soft-light` in dark mode |
| Texture extends past corners | Add `border-radius: inherit` |
| Missing `stitchTiles="stitch"` | Always include for seamless tiling |

---

## Integration with Other Systems

```css
/* Combine texture + shadow + edge */
.paper-complete {
  background-color: var(--paper-cream);
  box-shadow: var(--paper-elevation-2);
  filter: url(#edge-deckled);
  position: relative;
}

.paper-complete::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--texture-noise-coarse);
  background-size: 200px;
  opacity: 0.12;
  mix-blend-mode: multiply;
  pointer-events: none;
  border-radius: inherit;
}
```

---

*Texture rules for papercraft UI. Reference shadow-rules.md for elevation and edge-rules.md for edge treatments.*
