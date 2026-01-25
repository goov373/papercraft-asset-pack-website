# Papercraft UI: Shadow & Elevation System

## Chunk 2 of 5 — Research Synthesis & Token Definitions

> "Shadows provide important visual cues about objects' depth and directional movement. They are the only visual cue indicating the amount of separation between surfaces."
> — Material Design Guidelines

---

## Part 1: Shadow Physics for Paper

### 1.1 How Real Paper Casts Shadows

Paper shadows differ from generic UI shadows because paper has specific physical properties:

**Paper-Specific Shadow Characteristics:**

1. **Thin material = tight contact shadows** — Paper is typically 0.1-0.3mm thick. When lying flat, the shadow hugs extremely close to the edge. Only when lifted does significant shadow appear.

2. **Flexible edges create uneven shadows** — Unlike rigid materials, paper corners often curl or lift slightly, creating asymmetric shadows even when "flat."

3. **Weight affects lift behavior** — Heavier card stock lies flatter (smaller, crisper shadows). Lighter tissue paper curls more (larger, softer shadows at edges).

4. **Opacity affects shadow density** — Translucent papers (tissue, vellum) cast lighter shadows than opaque card stock.

**The Contact Shadow Principle:**
Real paper lying on a surface has almost no visible shadow at the contact point. Shadow only becomes visible where paper lifts away from the surface. This is the key insight for papercraft UI:

```
┌─────────────────────────────┐
│         PAPER               │  ← Paper surface
└─────────────────────────────┘
 ░                           ░   ← Minimal contact shadow
══════════════════════════════   ← Background surface

vs.

     ┌─────────────────────┐
    ╱                       ╲    ← Lifted paper
   ╱                         ╲
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ← Visible shadow grows with lift
══════════════════════════════   ← Background surface
```

### 1.2 The Two-Shadow Model

Based on Josh Comeau's research and real-world observation, effective paper shadows require two components:

**1. Contact Shadow (Sharp, Close)**
- Very short offset (0-2px)
- Minimal blur (0-3px)  
- Higher opacity (0.1-0.2)
- Anchors the element to the surface
- Simulates where paper touches or nearly touches

**2. Ambient Shadow (Soft, Diffuse)**
- Larger offset (based on elevation)
- Significant blur (grows with elevation)
- Lower opacity (0.05-0.15)
- Creates the floating/lifted feeling
- Simulates light being blocked at distance

```css
/* Two-shadow model example */
.paper-card {
  box-shadow:
    /* Contact shadow - anchors to surface */
    0 1px 1px hsl(var(--shadow-color) / 0.1),
    /* Ambient shadow - creates lift */
    0 4px 8px hsl(var(--shadow-color) / 0.08);
}
```

### 1.3 Light Source Consistency

**The Golden Rule:** All shadows in a papercraft UI must originate from the same light source.

For most UIs, the light source is positioned:
- **Above** the interface (creates downward shadows)
- **Slightly in front** (shadows fall behind/below)
- **Centered or slightly left** (subtle horizontal offset)

This translates to consistent shadow offsets:

```css
/* Standard papercraft light source */
--shadow-offset-x: 0;        /* Centered light */
--shadow-offset-y: 1;        /* Light from above */
--shadow-offset-ratio: 0.5;  /* X/Y relationship */
```

**Never mix shadow directions.** If one card has shadow falling down-right, all cards should match. Inconsistent light sources break the illusion of a physical space.

---

## Part 2: The Layered Shadow Technique

### 2.1 Why Layer Shadows?

Single `box-shadow` values look artificial — a uniform gray blob. Real shadows have:
- Sharp edges near the object (penumbra)
- Soft diffusion at distance
- Variable density (darker near object, lighter at edges)

Tobias Ahlin's technique: stack multiple shadows with progressively increasing offset and blur:

```css
/* Single shadow - looks artificial */
.bad-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Layered shadows - looks natural */
.good-shadow {
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.08),
    0 4px 4px rgba(0, 0, 0, 0.08),
    0 8px 8px rgba(0, 0, 0, 0.08);
}
```

**The Doubling Pattern:**
Each layer doubles the previous offset and blur. This creates smooth falloff:

| Layer | Y-Offset | Blur | Opacity |
|-------|----------|------|---------|
| 1     | 1px      | 1px  | 0.08    |
| 2     | 2px      | 2px  | 0.08    |
| 3     | 4px      | 4px  | 0.08    |
| 4     | 8px      | 8px  | 0.08    |
| 5     | 16px     | 16px | 0.08    |

### 2.2 Shadow Color: Not Pure Black

Josh Comeau's key insight: pure black shadows desaturate the underlying color, creating a "muddy" appearance.

**Better approach:** Tint shadows with the background hue:

```css
/* Pure black - desaturates */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

/* Tinted shadow - maintains vibrancy */
box-shadow: 0 4px 8px hsl(220deg 30% 15% / 0.2);
```

For papercraft UI, we'll use a warm-neutral shadow color that complements both warm paper tones and cool backgrounds:

```css
:root {
  /* Shadow color for light mode - warm gray */
  --shadow-color: 220deg 10% 20%;
  
  /* Shadow color for dark mode - slightly warmer */
  --shadow-color-dark: 220deg 5% 10%;
}
```

### 2.3 Performance Considerations

**Warning:** Layered shadows are expensive to render. Each layer multiplies GPU work.

**Guidelines:**
- Maximum 5-6 layers for critical UI elements
- 3-4 layers for typical components
- Single shadows fine for small/numerous elements
- Never animate `box-shadow` directly

**Performance-Safe Shadow Animation:**
Use Tobias Ahlin's pseudo-element technique:

```css
.paper-card {
  position: relative;
  box-shadow: /* resting shadow */;
}

/* Pre-render hover shadow, hidden */
.paper-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: /* elevated shadow */;
  opacity: 0;
  transition: opacity 150ms ease-out;
  pointer-events: none;
  z-index: -1;
}

/* Animate only opacity - GPU accelerated */
.paper-card:hover::after {
  opacity: 1;
}
```

---

## Part 3: Elevation Levels for Paper

### 3.1 Defining Elevation Semantically

Unlike Material Design's 24 dp levels, papercraft UI uses a simpler 4-level system that maps to physical paper states:

| Level | Name | Physical Analogy | Use Cases |
|-------|------|------------------|-----------|
| 0 | `flat` | Paper lying on desk | Backgrounds, disabled states |
| 1 | `raised` | Paper with slight corner curl | Cards, inputs, default components |
| 2 | `lifted` | Paper held at edges | Hover states, dropdowns, popovers |
| 3 | `floating` | Paper in hand | Modals, drag states, focused elements |

**Why only 4 levels?**
Paper can't sustain many discrete elevation states. In real life, you have:
- Paper on surface
- Paper slightly lifted
- Paper picked up

More levels would violate the physical constraint and add unnecessary complexity.

### 3.2 Elevation Token Definitions

```css
:root {
  /* Shadow color base */
  --shadow-color: 220deg 10% 20%;
  
  /* ═══════════════════════════════════════════════════════
     ELEVATION 0: Flat
     Paper lying flat on surface. Minimal shadow from 
     slight imperfections in flatness.
     ═══════════════════════════════════════════════════════ */
  --paper-elevation-0: 
    0 1px 1px hsl(var(--shadow-color) / 0.04);
  
  /* ═══════════════════════════════════════════════════════
     ELEVATION 1: Raised  
     Paper with natural corner curl or slight lift.
     Contact shadow + subtle ambient.
     ═══════════════════════════════════════════════════════ */
  --paper-elevation-1:
    0 1px 1px hsl(var(--shadow-color) / 0.07),
    0 2px 2px hsl(var(--shadow-color) / 0.06),
    0 4px 4px hsl(var(--shadow-color) / 0.05);
  
  /* ═══════════════════════════════════════════════════════
     ELEVATION 2: Lifted
     Paper being lifted at edges or hovering over surface.
     Clear separation from background.
     ═══════════════════════════════════════════════════════ */
  --paper-elevation-2:
    0 1px 1px hsl(var(--shadow-color) / 0.06),
    0 2px 2px hsl(var(--shadow-color) / 0.06),
    0 4px 4px hsl(var(--shadow-color) / 0.06),
    0 8px 8px hsl(var(--shadow-color) / 0.05),
    0 16px 16px hsl(var(--shadow-color) / 0.04);
    
  /* ═══════════════════════════════════════════════════════
     ELEVATION 3: Floating
     Paper held up, significant distance from surface.
     Maximum depth for modals and overlays.
     ═══════════════════════════════════════════════════════ */
  --paper-elevation-3:
    0 1px 1px hsl(var(--shadow-color) / 0.05),
    0 2px 2px hsl(var(--shadow-color) / 0.05),
    0 4px 4px hsl(var(--shadow-color) / 0.05),
    0 8px 8px hsl(var(--shadow-color) / 0.05),
    0 16px 16px hsl(var(--shadow-color) / 0.04),
    0 32px 32px hsl(var(--shadow-color) / 0.03);
}
```

### 3.3 Elevation-to-Component Mapping

| Component | Resting | Hover | Active/Focus | Dragging |
|-----------|---------|-------|--------------|----------|
| **Card** | 1 | 2 | 1 | 3 |
| **Button** | 1 | 2 | 0 | — |
| **Input** | 0 | 0 | 1 | — |
| **Dropdown** | — | — | 2 | — |
| **Modal** | — | — | 3 | — |
| **Toast** | 2 | 2 | 2 | — |
| **Tooltip** | 2 | — | — | — |
| **Navigation** | 1 | — | — | — |
| **Sidebar** | 1 | — | — | — |

---

## Part 4: Material-Specific Shadow Behaviors

### 4.1 Card Stock Shadows

Card stock is rigid and lifts cleanly. Shadows are crisp and well-defined.

```css
.paper-cardstock {
  /* Clean, defined shadows */
  --shadow-sharpness: 1;
  --shadow-opacity-multiplier: 1;
  
  box-shadow: var(--paper-elevation-1);
}

.paper-cardstock:hover {
  box-shadow: var(--paper-elevation-2);
  transform: translateY(-2px);
  transition: 
    box-shadow 150ms ease-out,
    transform 150ms ease-out;
}
```

### 4.2 Notebook Paper Shadows

Notebook paper is flexible and curls at corners. Shadows are softer and asymmetric.

```css
.paper-notebook {
  /* Softer, slightly diffuse shadows */
  box-shadow:
    0 1px 2px hsl(var(--shadow-color) / 0.05),
    0 2px 4px hsl(var(--shadow-color) / 0.04),
    0 4px 8px hsl(var(--shadow-color) / 0.03);
  
  /* Subtle corner curl effect */
  border-radius: 1px 1px 3px 1px;
}
```

### 4.3 Sticky Note Shadows (Asymmetric)

Sticky notes are adhered at top, lifted at bottom. This creates a distinctive asymmetric shadow.

```css
.paper-sticky {
  /* Top is adhered - no shadow */
  /* Bottom and corners lift - shadow grows downward */
  box-shadow:
    /* Contact at top */
    0 0 0 hsl(var(--shadow-color) / 0),
    /* Lift toward bottom */
    0 3px 2px hsl(var(--shadow-color) / 0.06),
    0 6px 4px hsl(var(--shadow-color) / 0.05),
    0 12px 8px hsl(var(--shadow-color) / 0.04);
  
  /* Physical curl at bottom corners */
  transform: perspective(1000px) rotateX(-1deg);
  transform-origin: top center;
}
```

**Advanced: Lifted Corner Effect**

```css
.paper-sticky::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 20px;
  background: transparent;
  box-shadow:
    0 8px 8px hsl(var(--shadow-color) / 0.15);
  transform: rotate(2deg) translateY(5px);
  transform-origin: bottom right;
  z-index: -1;
}
```

### 4.4 Tissue Paper Shadows

Tissue paper is nearly translucent and very light. Minimal shadow, almost ethereal.

```css
.paper-tissue {
  /* Barely visible shadow - tissue is gossamer-light */
  box-shadow:
    0 1px 2px hsl(var(--shadow-color) / 0.02),
    0 2px 4px hsl(var(--shadow-color) / 0.02);
  
  /* Tissue doesn't lift much - too light */
  /* Used for overlays, not interactive elements */
}
```

### 4.5 Kraft/Corrugated Shadows

Heavy, structural paper. Strong, grounded shadows. Doesn't lift easily.

```css
.paper-kraft {
  /* Heavier, more defined shadow */
  box-shadow:
    0 1px 1px hsl(var(--shadow-color) / 0.1),
    0 2px 2px hsl(var(--shadow-color) / 0.08),
    0 4px 4px hsl(var(--shadow-color) / 0.06);
  
  /* Kraft typically doesn't hover-lift */
  /* It's structural, not interactive */
}
```

### 4.6 Construction Paper Shadows

Bold, colorful, medium weight. Clean shadows similar to card stock but with more personality.

```css
.paper-construction {
  /* Similar to cardstock but slightly softer */
  box-shadow:
    0 1px 1px hsl(var(--shadow-color) / 0.08),
    0 2px 3px hsl(var(--shadow-color) / 0.06),
    0 4px 6px hsl(var(--shadow-color) / 0.04);
}
```

---

## Part 5: Dark Mode Shadow Strategy

### 5.1 The Dark Mode Shadow Problem

Traditional shadows don't work in dark mode:
- Black shadows disappear against dark backgrounds
- White/light shadows look like glows, not shadows
- The depth illusion is lost

**Steve Schoger's insight:** "In dark mode, don't naively invert. Close elements should still be lighter and distant elements should still be darker."

### 5.2 Material Design 3 Approach: Tonal Elevation

Instead of relying solely on shadows, MD3 uses **surface tint** — elevated surfaces become lighter in dark mode:

```css
/* Dark mode surfaces lighten with elevation */
.dark {
  --surface-0: hsl(220deg 10% 10%);  /* Base */
  --surface-1: hsl(220deg 10% 13%);  /* +3% */
  --surface-2: hsl(220deg 10% 16%);  /* +3% */
  --surface-3: hsl(220deg 10% 19%);  /* +3% */
}
```

### 5.3 Papercraft Dark Mode Strategy

For papercraft UI, we combine **reduced shadows** with **surface lightening**:

```css
.dark {
  /* Reduce shadow intensity significantly */
  --shadow-color: 220deg 5% 0%;
  
  /* Shadows are barely visible - rely more on surface color */
  --paper-elevation-1:
    0 1px 1px hsl(var(--shadow-color) / 0.3),
    0 2px 2px hsl(var(--shadow-color) / 0.2);
    
  --paper-elevation-2:
    0 1px 2px hsl(var(--shadow-color) / 0.3),
    0 2px 4px hsl(var(--shadow-color) / 0.2),
    0 4px 8px hsl(var(--shadow-color) / 0.1);
    
  --paper-elevation-3:
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

### 5.4 Inner Glow Technique for Dark Mode

CodyHouse technique: Add subtle inner glow to define edges in dark mode:

```css
.dark .paper-card {
  box-shadow:
    /* Inner glow - defines edges */
    inset 0 0 0.5px 1px hsl(0deg 0% 100% / 0.05),
    /* Shadow ring - subtle outline */
    0 0 0 1px hsl(0deg 0% 0% / 0.1),
    /* Standard elevation shadow */
    var(--paper-elevation-1);
}
```

---

## Part 6: Animation & Transition Guidelines

### 6.1 Shadow Animation Principles

**Rule 1: Never animate box-shadow directly**
Repaints every frame, kills performance.

**Rule 2: Use pseudo-element opacity technique**
Pre-render both shadow states, animate opacity.

**Rule 3: Pair shadow changes with transform**
If shadow grows, element should also move (translateY).

### 6.2 Standard Hover Transition

```css
.paper-card {
  position: relative;
  box-shadow: var(--paper-elevation-1);
  transition: transform 150ms ease-out;
}

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

### 6.3 Timing Guidelines

| Action | Duration | Easing |
|--------|----------|--------|
| Hover lift | 150ms | ease-out |
| Hover return | 100ms | ease-in |
| Focus elevation | 100ms | ease-out |
| Modal appear | 200ms | ease-out |
| Modal dismiss | 150ms | ease-in |
| Drag start | 100ms | ease-out |
| Drag end | 200ms | spring |

**Quick = paper is light.** Animations should feel effortless, not labored.

### 6.4 Spring Physics for Drop

When dropping a dragged element, use spring physics:

```css
@keyframes paper-drop {
  0% {
    transform: translateY(0) scale(1.02);
    box-shadow: var(--paper-elevation-3);
  }
  60% {
    transform: translateY(2px) scale(0.99);
  }
  100% {
    transform: translateY(0) scale(1);
    box-shadow: var(--paper-elevation-1);
  }
}

.paper-card.dropped {
  animation: paper-drop 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Part 7: Complete Token Reference

### 7.1 CSS Custom Properties

```css
:root {
  /* ═══════════════════════════════════════════════════════
     SHADOW FOUNDATION
     ═══════════════════════════════════════════════════════ */
  --shadow-color: 220deg 10% 20%;
  
  /* ═══════════════════════════════════════════════════════
     ELEVATION SHADOWS (Light Mode)
     ═══════════════════════════════════════════════════════ */
  --paper-elevation-0: 
    0 1px 1px hsl(var(--shadow-color) / 0.04);
    
  --paper-elevation-1:
    0 1px 1px hsl(var(--shadow-color) / 0.07),
    0 2px 2px hsl(var(--shadow-color) / 0.06),
    0 4px 4px hsl(var(--shadow-color) / 0.05);
    
  --paper-elevation-2:
    0 1px 1px hsl(var(--shadow-color) / 0.06),
    0 2px 2px hsl(var(--shadow-color) / 0.06),
    0 4px 4px hsl(var(--shadow-color) / 0.06),
    0 8px 8px hsl(var(--shadow-color) / 0.05),
    0 16px 16px hsl(var(--shadow-color) / 0.04);
    
  --paper-elevation-3:
    0 1px 1px hsl(var(--shadow-color) / 0.05),
    0 2px 2px hsl(var(--shadow-color) / 0.05),
    0 4px 4px hsl(var(--shadow-color) / 0.05),
    0 8px 8px hsl(var(--shadow-color) / 0.05),
    0 16px 16px hsl(var(--shadow-color) / 0.04),
    0 32px 32px hsl(var(--shadow-color) / 0.03);

  /* ═══════════════════════════════════════════════════════
     SPECIAL SHADOWS
     ═══════════════════════════════════════════════════════ */
     
  /* Sticky note - asymmetric, adhered at top */
  --paper-shadow-sticky:
    0 3px 2px hsl(var(--shadow-color) / 0.06),
    0 6px 4px hsl(var(--shadow-color) / 0.05),
    0 12px 8px hsl(var(--shadow-color) / 0.04);
    
  /* Tissue - minimal, ethereal */
  --paper-shadow-tissue:
    0 1px 2px hsl(var(--shadow-color) / 0.02),
    0 2px 4px hsl(var(--shadow-color) / 0.02);
    
  /* Kraft - heavy, grounded */
  --paper-shadow-kraft:
    0 1px 1px hsl(var(--shadow-color) / 0.1),
    0 2px 2px hsl(var(--shadow-color) / 0.08),
    0 4px 4px hsl(var(--shadow-color) / 0.06);
    
  /* Inset - pressed/active state */
  --paper-shadow-inset:
    inset 0 1px 2px hsl(var(--shadow-color) / 0.1),
    inset 0 2px 4px hsl(var(--shadow-color) / 0.05);

  /* ═══════════════════════════════════════════════════════
     TRANSITION TOKENS
     ═══════════════════════════════════════════════════════ */
  --shadow-transition-duration: 150ms;
  --shadow-transition-easing: ease-out;
  --shadow-transition: opacity var(--shadow-transition-duration) var(--shadow-transition-easing);
}

/* ═══════════════════════════════════════════════════════
   DARK MODE OVERRIDES
   ═══════════════════════════════════════════════════════ */
.dark {
  --shadow-color: 220deg 5% 0%;
  
  --paper-elevation-0: 
    0 1px 1px hsl(var(--shadow-color) / 0.2);
    
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
}
```

### 7.2 Tailwind Extension (Optional)

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

Usage:
```html
<div class="shadow-paper-1 hover:shadow-paper-2">Card content</div>
```

---

## Part 8: Implementation Checklist

### Before Implementing Shadows:

- [ ] Define `--shadow-color` for your brand
- [ ] Set up dark mode shadow color override
- [ ] Create hover shadow pseudo-element utility class
- [ ] Test layered shadows on low-end devices
- [ ] Verify consistent light source across all components

### For Each Component:

- [ ] Assign appropriate resting elevation (0-3)
- [ ] Define hover elevation if interactive
- [ ] Implement pseudo-element technique for animation
- [ ] Test in both light and dark modes
- [ ] Verify shadow doesn't clip on parent overflow

### Performance Audit:

- [ ] No `transition: box-shadow` in codebase
- [ ] All shadow animations use opacity technique
- [ ] Maximum 6 shadow layers per element
- [ ] Reduce layers for small/repeated elements

---

## Appendices

### A. Reference Materials

| Resource | Link |
|----------|------|
| Josh Comeau: Designing Beautiful Shadows | https://www.joshwcomeau.com/css/designing-shadows/ |
| Josh Comeau: Shadow Palette Generator | https://www.joshwcomeau.com/shadow-palette/ |
| Tobias Ahlin: Layered Shadows | https://tobiasahlin.com/blog/layered-smooth-box-shadows/ |
| Tobias Ahlin: Animating Shadows | https://tobiasahlin.com/blog/how-to-animate-box-shadow/ |
| Material Design 3: Elevation | https://m3.material.io/styles/elevation |
| CodyHouse: Beautiful Shadows | https://codyhouse.co/nuggets/beautiful-css-shadows |
| CSS-Tricks: Dark Mode Guide | https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/ |

### B. Quick Decision Tree

```
Is the element interactive?
├─ Yes → Start at elevation-1
│   ├─ On hover → elevation-2 + translateY(-2px)
│   ├─ On active/press → elevation-0 or inset shadow
│   └─ On drag → elevation-3
│
└─ No → Start at elevation-0 or elevation-1
    ├─ Is it structural (nav, sidebar)? → elevation-1, no hover
    ├─ Is it an overlay (modal, dropdown)? → elevation-2 or elevation-3
    └─ Is it decorative (divider, background)? → elevation-0

Which material type?
├─ Card stock → Standard elevation shadows
├─ Notebook → Softer shadows, potential curl
├─ Sticky note → Asymmetric shadow (--paper-shadow-sticky)
├─ Tissue → Minimal shadow (--paper-shadow-tissue)
├─ Kraft → Heavy shadow (--paper-shadow-kraft), no hover lift
└─ Construction → Standard, slightly softer edges
```

### C. Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| `transition: box-shadow` | Animate pseudo-element opacity |
| Pure black shadows | Tinted `--shadow-color` |
| 10+ shadow layers | Max 6 layers |
| Inconsistent light directions | Single light source |
| Same shadow for all materials | Material-specific shadows |
| Dark shadows in dark mode | Surface lightening + reduced shadows |
| Instant shadow changes | 150ms transitions |
| Shadow without transform | Pair with `translateY` |

---

*Document complete. Proceed to Chunk 3: Edge Treatment System.*
