# Papercraft UI: Edge Treatment System

## Chunk 3 of 5 — Research Synthesis & Implementation Guide

> "The deckle edge is a natural artifact of handmade papermaking, where paper pulp seeps between the wooden frame (deckle) and the screen, creating a soft, feathered edge associated with premium, artisanal quality."
> — Wikipedia, Deckle Edge

---

## Part 1: Physical Paper Edge Anatomy

### 1.1 Understanding Real Paper Edges

Paper edges tell a story about how the paper was made and handled. In papercraft UI, edges communicate material quality, interactivity, and state. Understanding physical edge types is essential for authentic digital recreation.

**Five Primary Edge Types:**

```
CUT EDGE                    TORN EDGE                   DECKLED EDGE
┌────────────────┐          ┌─∿∿∿∿∿∿∿∿∿∿∿─┐             ┌～～～～～～～～～┐
│                │          │              │             │               │
│  Clean, sharp  │          │   Ragged,    │             │    Soft,      │
│  90° corners   │          │   exposed    │             │   feathered   │
│                │          │   fibers     │             │               │
└────────────────┘          └─∿∿∿∿∿∿∿∿∿∿∿─┘             └～～～～～～～～～┘

PERFORATED EDGE             FOLDED CORNER
┌─ ─ ─ ─ ─ ─ ─ ─┐          ┌────────────┬┐
│                │          │            ╲│
│   Regular      │          │             │
│   holes for    │          │    Reveals  │
│   tear-away    │          │    reverse  │
└─ ─ ─ ─ ─ ─ ─ ─┘          └─────────────┘
```

**Physical Characteristics by Edge Type:**

| Edge Type | Origin | Visual Character | Tactile Quality | UI Meaning |
|-----------|--------|------------------|-----------------|------------|
| Cut | Guillotine/scissors | Clean, uniform, sharp | Smooth, precise | Professional, formal |
| Torn | Hand separation | Irregular, ragged, fibrous | Rough, organic | Casual, handmade, urgent |
| Deckled | Papermaking process | Soft, feathered, gradual | Slightly fuzzy | Premium, artisanal |
| Perforated | Die-cut holes | Regular pattern, partial cuts | Textured line | Tear-away, actionable |
| Folded | Physical manipulation | Triangular reveal | Dimensional | Interactive, bookmarked |

### 1.2 Material Affects Edge Behavior

Different paper stocks produce different edge characteristics when torn or manipulated:

**Cotton-based paper (rag paper):** Long fibers create dramatic torn edges with visible fiber strands. Best for expressive torn effects.

**Wood pulp paper:** Shorter fibers produce cleaner tears with less visible texture. Good for subtle torn effects.

**Sized/coated paper:** Resist tearing, produces sharper edges even when torn. Paper must be dampened for authentic deckled effect.

**Handmade paper:** Natural deckle on all four sides. Edges gradually thin and become translucent.

**Card stock:** Heavier weight, cleaner tears, less fiber visibility. Folds create sharper creases.

### 1.3 Edge-Shadow Relationship

Edges interact with the shadow system (Chunk 2) in specific ways:

```
FLAT CUT EDGE               TORN EDGE                   CURLED EDGE
     │                           ∿∿∿                        ╭──╮
─────┴─────                 ─────∿∿∿─────               ────╯  │
░░░░░░░░░░░                 ░░∿░∿░∿░∿░░░               ░░░░░░░░│
                            Shadow follows              Shadow deepens
Uniform shadow              irregular contour           under curl
```

**Key insight:** Torn and deckled edges cast irregular shadows. The shadow should follow the edge contour, not remain rectangular. SVG filters handle this automatically; CSS-only approaches may need additional consideration.

---

## Part 2: SVG Filter Technique (Primary Method)

### 2.1 The feTurbulence + feDisplacementMap Approach

The most versatile technique for organic paper edges combines two SVG filter primitives:

**feTurbulence** generates procedural noise (like Perlin noise), creating a displacement map.

**feDisplacementMap** uses that noise to distort the element's pixels, creating irregular edges.

```svg
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <!-- Torn paper filter - dramatic effect -->
    <filter id="paper-torn" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.04" 
        numOctaves="5" 
        seed="15"
        result="noise"
      />
      <feDisplacementMap 
        in="SourceGraphic" 
        in2="noise" 
        scale="8" 
        xChannelSelector="R" 
        yChannelSelector="G"
      />
    </filter>
    
    <!-- Deckled edge filter - subtle effect -->
    <filter id="paper-deckled" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.02" 
        numOctaves="3" 
        seed="42"
        result="noise"
      />
      <feDisplacementMap 
        in="SourceGraphic" 
        in2="noise" 
        scale="3" 
        xChannelSelector="R" 
        yChannelSelector="G"
      />
    </filter>
    
    <!-- Rough craft paper - medium effect -->
    <filter id="paper-rough" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.06" 
        numOctaves="4" 
        seed="7"
        result="noise"
      />
      <feDisplacementMap 
        in="SourceGraphic" 
        in2="noise" 
        scale="5" 
        xChannelSelector="R" 
        yChannelSelector="G"
      />
    </filter>
  </defs>
</svg>
```

### 2.2 Parameter Deep Dive

**feTurbulence Parameters:**

| Parameter | Range | Effect | Papercraft Use |
|-----------|-------|--------|----------------|
| `type` | turbulence, fractalNoise | turbulence = ripples; fractalNoise = cloudy, organic | Always use `fractalNoise` for paper |
| `baseFrequency` | 0.01 - 0.2 | Lower = larger patterns; Higher = finer detail | 0.02-0.04 for deckled, 0.04-0.08 for torn |
| `numOctaves` | 1 - 8 | More octaves = more detail layers | 3-5 optimal; >5 diminishing returns |
| `seed` | any integer | Starting point for randomness | Change for different edge patterns |

**feDisplacementMap Parameters:**

| Parameter | Range | Effect | Papercraft Use |
|-----------|-------|--------|----------------|
| `scale` | 0 - 50+ | Displacement intensity in pixels | 2-4 deckled, 6-12 torn, 15+ dramatic |
| `xChannelSelector` | R, G, B, A | Which color channel drives X displacement | R or G recommended |
| `yChannelSelector` | R, G, B, A | Which color channel drives Y displacement | G or B recommended |

**Tuning Guide:**

```
DECKLED (subtle, premium)     TORN (dramatic, casual)      CRAFT (medium, handmade)
baseFrequency: 0.02           baseFrequency: 0.04          baseFrequency: 0.06
numOctaves: 3                 numOctaves: 5                numOctaves: 4
scale: 3                      scale: 8-12                  scale: 5
```

### 2.3 Applying Filters in CSS

```css
/* Apply torn edge to any element */
.paper-torn {
  filter: url(#paper-torn);
}

/* Apply deckled edge */
.paper-deckled {
  filter: url(#paper-deckled);
}

/* Combine with other filters */
.paper-vintage {
  filter: url(#paper-deckled) sepia(0.1) brightness(0.98);
}
```

### 2.4 Filter Placement Best Practice

Place SVG filters once in the document, typically right after `<body>` opens:

```html
<body>
  <!-- SVG Filter Definitions (invisible) -->
  <svg class="paper-filters" aria-hidden="true">
    <defs>
      <!-- All filter definitions here -->
    </defs>
  </svg>
  
  <!-- Rest of application -->
  <main>...</main>
</body>
```

```css
.paper-filters {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}
```

---

## Part 3: CSS Mask Technique

### 3.1 When to Use Masks vs Filters

**Use SVG Filters when:**
- You need dynamic, procedural edges
- Edge pattern should vary per element (via seed)
- You want true displacement (pixels move)
- Performance is acceptable (filters are expensive)

**Use CSS Masks when:**
- You have a specific edge pattern to repeat
- Background should show through (true transparency)
- You need maximum browser performance
- Edge pattern is consistent across elements

### 3.2 Creating Torn Edge Masks

Masks use images (PNG, SVG, or gradients) to define transparency. Black = visible, white/transparent = hidden.

**Step 1: Create the mask image**

```svg
<!-- torn-edge-mask.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" preserveAspectRatio="none">
  <path d="M0,0 L100,0 L100,12 
    Q95,15 90,13 Q85,10 80,14 Q75,18 70,15 
    Q65,12 60,16 Q55,20 50,17 Q45,14 40,18 
    Q35,15 30,12 Q25,16 20,13 Q15,10 10,15 
    Q5,18 0,14 Z" 
    fill="black"/>
</svg>
```

**Step 2: Apply as CSS mask**

```css
.paper-torn-bottom {
  /* Mask image for bottom edge */
  -webkit-mask-image: 
    linear-gradient(black, black),
    url('torn-edge-mask.svg');
  mask-image: 
    linear-gradient(black, black),
    url('torn-edge-mask.svg');
  
  /* First mask: full coverage, second: bottom edge */
  -webkit-mask-position: 0 0, 0 100%;
  mask-position: 0 0, 0 100%;
  
  -webkit-mask-size: 100% calc(100% - 15px), 100% 20px;
  mask-size: 100% calc(100% - 15px), 100% 20px;
  
  -webkit-mask-repeat: no-repeat, repeat-x;
  mask-repeat: no-repeat, repeat-x;
  
  /* Combine masks */
  -webkit-mask-composite: source-over;
  mask-composite: add;
}
```

### 3.3 Gradient-Based Jagged Edges

For simple zigzag or scalloped edges without external images:

```css
/* Zigzag bottom edge using gradients */
.paper-zigzag-bottom {
  --zigzag-size: 10px;
  
  -webkit-mask-image: 
    linear-gradient(135deg, black 50%, transparent 50%),
    linear-gradient(-135deg, black 50%, transparent 50%);
  mask-image: 
    linear-gradient(135deg, black 50%, transparent 50%),
    linear-gradient(-135deg, black 50%, transparent 50%);
    
  -webkit-mask-size: var(--zigzag-size) var(--zigzag-size);
  mask-size: var(--zigzag-size) var(--zigzag-size);
  
  -webkit-mask-position: 
    0 calc(100% - var(--zigzag-size) / 2),
    calc(var(--zigzag-size) / 2) calc(100% - var(--zigzag-size) / 2);
  mask-position: 
    0 calc(100% - var(--zigzag-size) / 2),
    calc(var(--zigzag-size) / 2) calc(100% - var(--zigzag-size) / 2);
    
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
}

/* Scalloped bottom edge */
.paper-scalloped-bottom {
  --scallop-size: 20px;
  
  -webkit-mask-image: 
    linear-gradient(black, black),
    radial-gradient(circle at 50% 0%, transparent 70%, black 71%);
  mask-image: 
    linear-gradient(black, black),
    radial-gradient(circle at 50% 0%, transparent 70%, black 71%);
    
  -webkit-mask-size: 100% calc(100% - var(--scallop-size) / 2), var(--scallop-size) var(--scallop-size);
  mask-size: 100% calc(100% - var(--scallop-size) / 2), var(--scallop-size) var(--scallop-size);
  
  -webkit-mask-position: 0 0, 0 100%;
  mask-position: 0 0, 0 100%;
  
  -webkit-mask-repeat: no-repeat, repeat-x;
  mask-repeat: no-repeat, repeat-x;
}
```

### 3.4 Multi-Edge Masks

Applying different treatments to different edges:

```css
.paper-craft-edges {
  /* Four separate edge masks */
  --edge-rough: url('rough-edge-horizontal.svg');
  --edge-torn: url('torn-edge-vertical.svg');
  
  -webkit-mask-image:
    linear-gradient(black, black),      /* Main body */
    var(--edge-rough),                   /* Top */
    var(--edge-rough),                   /* Bottom */
    var(--edge-torn),                    /* Left */
    var(--edge-torn);                    /* Right */
    
  -webkit-mask-position:
    4px 4px,
    0 0,
    0 100%,
    0 0,
    100% 0;
    
  -webkit-mask-size:
    calc(100% - 8px) calc(100% - 8px),
    100% 8px,
    100% 8px,
    8px 100%,
    8px 100%;
    
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  
  -webkit-mask-composite: source-over;
  mask-composite: add;
}
```

---

## Part 4: Folded Corner Effects

### 4.1 The CSS Triangle Technique

Folded corners use the CSS border trick to create triangles, simulating a page fold:

```
ANATOMY OF A FOLDED CORNER
                    
    ┌───────────────┬─┐
    │               │╲│ ← Fold triangle (reveals "back" of paper)
    │               ├─┤
    │   Content     │   ← Shadow under fold
    │               │
    └───────────────┴──┘
```

**Basic Implementation:**

```css
.paper-folded-corner {
  position: relative;
  background: var(--paper-color, #fff);
}

/* The fold triangle */
.paper-folded-corner::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  
  /* Triangle via borders */
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-color: transparent var(--paper-fold-color, #e8e8e8) transparent transparent;
  
  /* Subtle shadow on the fold */
  filter: drop-shadow(-1px 1px 1px rgba(0,0,0,0.1));
}

/* Cut off the corner of the main element */
.paper-folded-corner::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-color: transparent var(--page-background, #f5f5f5) transparent transparent;
}
```

### 4.2 Realistic Fold with Gradient Shadow

For a more realistic fold that shows depth:

```css
.paper-realistic-fold {
  position: relative;
  background: linear-gradient(
    135deg,
    var(--paper-color) 0%,
    var(--paper-color) calc(100% - 35px),
    transparent calc(100% - 35px)
  );
}

.paper-realistic-fold::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  
  background: linear-gradient(
    225deg,
    transparent 50%,
    rgba(0,0,0,0.03) 50%,
    rgba(0,0,0,0.1) 100%
  );
}

.paper-realistic-fold::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  
  background: linear-gradient(
    225deg,
    var(--paper-fold-color, #e0e0e0) 0%,
    var(--paper-fold-color-dark, #d0d0d0) 100%
  );
  
  transform-origin: top right;
  transform: rotate(0deg);
  box-shadow: 
    -2px 2px 3px rgba(0,0,0,0.1),
    -1px 1px 1px rgba(0,0,0,0.05);
}
```

### 4.3 Interactive Fold (Hover Peel)

```css
.paper-peel-corner {
  position: relative;
  overflow: hidden;
}

.paper-peel-corner::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  
  background: linear-gradient(
    315deg,
    var(--paper-fold-color, #e8e8e8) 45%,
    var(--paper-color, #fff) 50%
  );
  
  box-shadow: -2px -2px 5px rgba(0,0,0,0.15);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.paper-peel-corner:hover::after {
  width: 50px;
  height: 50px;
}
```

### 4.4 Fold Size Variants

```css
:root {
  /* Fold size tokens */
  --fold-sm: 15px;
  --fold-md: 25px;
  --fold-lg: 40px;
  --fold-xl: 60px;
}

.paper-fold-sm { --fold-size: var(--fold-sm); }
.paper-fold-md { --fold-size: var(--fold-md); }
.paper-fold-lg { --fold-size: var(--fold-lg); }
.paper-fold-xl { --fold-size: var(--fold-xl); }

/* Apply to the base fold class */
.paper-folded-corner::before,
.paper-folded-corner::after {
  border-width: 0 var(--fold-size, 25px) var(--fold-size, 25px) 0;
}
```

---

## Part 5: Perforated Edge Effects

### 5.1 Understanding Perforations

Perforations indicate tear-away sections, like notebook paper edges or receipt stubs.

```
PERFORATION PATTERNS

Notebook holes:         Ticket stub:           Coupon edge:
○                       ┄┄┄┄┄┄┄┄┄             ╭─╮ ╭─╮ ╭─╮
○      Content          │ Content │            │ │ │ │ │ │
○                       ┄┄┄┄┄┄┄┄┄             ╰─╯ ╰─╯ ╰─╯
○
```

### 5.2 Notebook Paper Holes

```css
.paper-notebook {
  position: relative;
  padding-left: 40px;
  
  /* Red margin line */
  background: 
    linear-gradient(
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
    0 40px 0 var(--page-background, #f5f5f5),
    0 80px 0 var(--page-background, #f5f5f5),
    0 120px 0 var(--page-background, #f5f5f5),
    0 160px 0 var(--page-background, #f5f5f5),
    0 200px 0 var(--page-background, #f5f5f5);
}

/* Lined paper effect */
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

### 5.3 Perforation Line (Tear Strip)

```css
.paper-perforated-bottom {
  position: relative;
}

.paper-perforated-bottom::after {
  content: '';
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 0;
  
  /* Dotted perforation line */
  border-bottom: 2px dashed rgba(0,0,0,0.2);
}

/* Conic gradient technique for holes */
.paper-perforated-holes {
  position: relative;
}

.paper-perforated-holes::after {
  content: '';
  position: absolute;
  bottom: 29px;
  left: 0;
  right: 0;
  height: 6px;
  
  background: radial-gradient(
    circle at center,
    var(--page-background, #f5f5f5) 3px,
    transparent 3px
  );
  background-size: 15px 6px;
  background-position: 7.5px 0;
}
```

### 5.4 Ticket Stub Style

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
  position: relative;
  
  /* Perforation between main and stub */
  border-left: 2px dashed rgba(0,0,0,0.15);
}

/* Semicircle cutouts at perforation */
.paper-ticket::before,
.paper-ticket::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--page-background, #f5f5f5);
  border-radius: 50%;
  right: 72px; /* Align with stub border */
}

.paper-ticket::before {
  top: -8px;
}

.paper-ticket::after {
  bottom: -8px;
}
```

---

## Part 6: Wavy & Organic Edges

### 6.1 CSS Gradient Waves

Based on Temani Afif's technique, waves are created with two overlapping radial gradients:

```css
.paper-wavy-bottom {
  --wave-size: 20px;
  --wave-color: var(--paper-color, #fff);
  
  position: relative;
}

.paper-wavy-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--wave-size);
  
  background:
    radial-gradient(
      circle at 50% 0%,
      var(--wave-color) 70%,
      transparent 71%
    ),
    radial-gradient(
      circle at 50% 100%,
      transparent 70%,
      var(--wave-color) 71%
    );
  
  background-size: calc(var(--wave-size) * 2) var(--wave-size);
  background-position: 
    0 100%,
    var(--wave-size) 0;
}
```

### 6.2 Organic Blob Shapes

Using the 8-value border-radius syntax for cell-like shapes:

```css
.paper-organic {
  /* 8-value syntax: 4 horizontal radii / 4 vertical radii */
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

/* Preset organic shapes */
.paper-blob-1 {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}

.paper-blob-2 {
  border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
}

.paper-blob-3 {
  border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
}

/* Animated morphing blob */
@keyframes blob-morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
}

.paper-blob-animated {
  animation: blob-morph 8s ease-in-out infinite;
}
```

### 6.3 Clip-Path Irregular Edges

For precise control over edge shape:

```css
/* Slightly irregular rectangle */
.paper-imperfect {
  clip-path: polygon(
    0% 2%,
    3% 0%,
    97% 1%,
    100% 3%,
    99% 97%,
    97% 100%,
    2% 99%,
    0% 96%
  );
}

/* Torn paper silhouette */
.paper-torn-shape {
  clip-path: polygon(
    0% 0%,
    100% 2%,
    98% 15%,
    100% 28%,
    97% 42%,
    100% 55%,
    98% 68%,
    100% 82%,
    97% 100%,
    0% 98%
  );
}

/* Hand-cut paper effect */
.paper-handcut {
  clip-path: polygon(
    2% 0%,
    15% 1%,
    30% 0%,
    45% 2%,
    60% 0%,
    75% 1%,
    90% 0%,
    100% 2%,
    99% 20%,
    100% 40%,
    98% 60%,
    100% 80%,
    98% 100%,
    80% 99%,
    60% 100%,
    40% 98%,
    20% 100%,
    0% 98%,
    1% 75%,
    0% 50%,
    2% 25%
  );
}
```

---

## Part 7: Page Curl Effects

### 7.1 Static Page Curl

```css
.paper-curled-corner {
  position: relative;
  overflow: hidden;
}

/* The curl */
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
    var(--paper-fold-color, #e8e8e8) 38%,
    var(--paper-fold-color, #e8e8e8) 46%,
    var(--paper-color, #fff) 47%,
    var(--paper-color, #fff) 100%
  );
  
  /* Shadow under the curl */
  box-shadow: -3px -3px 8px rgba(0,0,0,0.15);
  
  /* Round the curl edge */
  border-radius: 0 0 0 100%;
}

/* Shadow on surface beneath curl */
.paper-curled-corner::before {
  content: '';
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 50px;
  height: 50px;
  
  background: radial-gradient(
    ellipse at 100% 100%,
    rgba(0,0,0,0.15) 0%,
    transparent 70%
  );
  
  z-index: -1;
}
```

### 7.2 Interactive Peel Effect

```css
.paper-peelable {
  position: relative;
  overflow: hidden;
  transition: all 300ms ease-out;
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
    var(--paper-fold-color, #e8e8e8) 41%,
    var(--paper-fold-color, #e8e8e8) 48%,
    var(--paper-color, #fff) 49%
  );
  
  border-radius: 0 0 0 80%;
  box-shadow: -2px -2px 5px rgba(0,0,0,0.1);
  
  transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom right;
}

.paper-peelable:hover::after {
  width: 80px;
  height: 80px;
}

/* Reveal content under the peel */
.paper-peelable[data-peel-content]::before {
  content: attr(data-peel-content);
  position: absolute;
  bottom: 10px;
  right: 10px;
  
  font-size: 12px;
  color: #888;
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.paper-peelable:hover::before {
  opacity: 1;
}
```

---

## Part 8: Edge Treatment Tokens

### 8.1 CSS Custom Properties

```css
:root {
  /* ═══════════════════════════════════════════════════════
     EDGE FILTER DEFINITIONS
     Reference these via filter: url(#token-name)
     ═══════════════════════════════════════════════════════ */
  
  /* Base frequencies for turbulence */
  --edge-frequency-subtle: 0.02;
  --edge-frequency-medium: 0.04;
  --edge-frequency-rough: 0.06;
  --edge-frequency-dramatic: 0.08;
  
  /* Displacement scales */
  --edge-scale-deckled: 3;
  --edge-scale-handmade: 5;
  --edge-scale-torn: 8;
  --edge-scale-dramatic: 12;
  
  /* ═══════════════════════════════════════════════════════
     FOLD PROPERTIES
     ═══════════════════════════════════════════════════════ */
  --fold-size-sm: 15px;
  --fold-size-md: 25px;
  --fold-size-lg: 40px;
  --fold-size-xl: 60px;
  
  --fold-color: hsl(0 0% 88%);
  --fold-color-dark: hsl(0 0% 82%);
  --fold-shadow: rgba(0, 0, 0, 0.1);
  
  /* ═══════════════════════════════════════════════════════
     PERFORATION PROPERTIES
     ═══════════════════════════════════════════════════════ */
  --perf-hole-size: 6px;
  --perf-hole-spacing: 15px;
  --perf-line-color: rgba(0, 0, 0, 0.2);
  
  /* ═══════════════════════════════════════════════════════
     WAVE PROPERTIES
     ═══════════════════════════════════════════════════════ */
  --wave-size-sm: 10px;
  --wave-size-md: 20px;
  --wave-size-lg: 30px;
  
  /* ═══════════════════════════════════════════════════════
     CURL PROPERTIES
     ═══════════════════════════════════════════════════════ */
  --curl-size-sm: 30px;
  --curl-size-md: 60px;
  --curl-size-lg: 100px;
}

/* Dark mode adjustments */
.dark {
  --fold-color: hsl(0 0% 25%);
  --fold-color-dark: hsl(0 0% 20%);
  --perf-line-color: rgba(255, 255, 255, 0.15);
}
```

### 8.2 Complete SVG Filter Library

```html
<svg class="paper-edge-filters" aria-hidden="true" 
     style="position:absolute;width:0;height:0;overflow:hidden;">
  <defs>
    <!-- ═══════════════════════════════════════════════════════
         DECKLED EDGE - Subtle, premium feel
         Use: Fine stationery, invitations, certificates
         ═══════════════════════════════════════════════════════ -->
    <filter id="edge-deckled" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" 
                    numOctaves="3" seed="1" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" 
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- ═══════════════════════════════════════════════════════
         HANDMADE EDGE - Medium organic variation
         Use: Craft paper, artisanal look, cards
         ═══════════════════════════════════════════════════════ -->
    <filter id="edge-handmade" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" 
                    numOctaves="4" seed="42" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" 
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- ═══════════════════════════════════════════════════════
         TORN EDGE - Dramatic, visible displacement
         Use: Notes, casual content, urgency
         ═══════════════════════════════════════════════════════ -->
    <filter id="edge-torn" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" 
                    numOctaves="5" seed="15" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" 
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- ═══════════════════════════════════════════════════════
         DRAMATIC TORN - Maximum displacement
         Use: Hero elements, emphasis, destruction
         ═══════════════════════════════════════════════════════ -->
    <filter id="edge-torn-dramatic" x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" 
                    numOctaves="6" seed="7" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" 
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- ═══════════════════════════════════════════════════════
         ROUGH TEXTURE - Adds paper grain to edges
         Use: Combine with other effects for texture
         ═══════════════════════════════════════════════════════ -->
    <filter id="edge-textured" x="-3%" y="-3%" width="106%" height="106%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" 
                    numOctaves="4" seed="99" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" 
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- ═══════════════════════════════════════════════════════
         VARIANT SEEDS - Same as torn but different patterns
         Use: Multiple elements that shouldn't look identical
         ═══════════════════════════════════════════════════════ -->
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

### 8.3 Utility Classes

```css
/* ═══════════════════════════════════════════════════════
   EDGE FILTER UTILITIES
   ═══════════════════════════════════════════════════════ */
.edge-deckled { filter: url(#edge-deckled); }
.edge-handmade { filter: url(#edge-handmade); }
.edge-torn { filter: url(#edge-torn); }
.edge-torn-dramatic { filter: url(#edge-torn-dramatic); }
.edge-textured { filter: url(#edge-textured); }
.edge-torn-v2 { filter: url(#edge-torn-v2); }
.edge-torn-v3 { filter: url(#edge-torn-v3); }

/* ═══════════════════════════════════════════════════════
   FOLD UTILITIES
   ═══════════════════════════════════════════════════════ */
.fold-tr-sm { --fold-size: var(--fold-size-sm); }
.fold-tr-md { --fold-size: var(--fold-size-md); }
.fold-tr-lg { --fold-size: var(--fold-size-lg); }
.fold-tr-xl { --fold-size: var(--fold-size-xl); }

/* Position variants */
.fold-tl { /* top-left fold styles */ }
.fold-tr { /* top-right fold styles */ }
.fold-bl { /* bottom-left fold styles */ }
.fold-br { /* bottom-right fold styles */ }

/* ═══════════════════════════════════════════════════════
   PERFORATION UTILITIES
   ═══════════════════════════════════════════════════════ */
.perf-top { /* perforation on top edge */ }
.perf-bottom { /* perforation on bottom edge */ }
.perf-left { /* perforation on left edge (notebook style) */ }

/* ═══════════════════════════════════════════════════════
   WAVE UTILITIES
   ═══════════════════════════════════════════════════════ */
.wave-bottom-sm { --wave-size: var(--wave-size-sm); }
.wave-bottom-md { --wave-size: var(--wave-size-md); }
.wave-bottom-lg { --wave-size: var(--wave-size-lg); }

/* ═══════════════════════════════════════════════════════
   CURL UTILITIES
   ═══════════════════════════════════════════════════════ */
.curl-br-sm { --curl-size: var(--curl-size-sm); }
.curl-br-md { --curl-size: var(--curl-size-md); }
.curl-br-lg { --curl-size: var(--curl-size-lg); }
```

---

## Part 9: Performance & Browser Support

### 9.1 Performance Characteristics

| Technique | CPU Impact | GPU Impact | Recommended Limit |
|-----------|------------|------------|-------------------|
| SVG filter (static) | Low | Medium | 20-30 elements |
| SVG filter (animated) | High | High | 3-5 elements |
| CSS mask (gradient) | Low | Low | Unlimited |
| CSS mask (image) | Low | Low | Unlimited |
| Clip-path | Low | Medium | 50+ elements |
| Pseudo-element fold | Low | Low | Unlimited |
| Border-radius blob | Low | Low | Unlimited |

**Performance Guidelines:**

1. **Avoid animating SVG filters** — feTurbulence recalculates every frame. Instead, pre-render multiple states or animate opacity between pre-filtered elements.

2. **Use CSS masks for repeating patterns** — Masks are more performant than filters for predictable edge patterns.

3. **Limit complex filters to hero elements** — Save dramatic torn edges for key UI moments, not every card.

4. **Test on low-end devices** — SVG filters hit mobile GPUs hard.

### 9.2 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| SVG filters | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| CSS mask-image | ✅ -webkit- | ✅ | ✅ -webkit- | ✅ -webkit- |
| clip-path polygon | ✅ | ✅ | ✅ | ✅ |
| 8-value border-radius | ✅ | ✅ | ✅ | ✅ |
| backdrop-filter | ✅ | ✅ | ✅ -webkit- | ✅ |

**Always include webkit prefix for masks:**

```css
.masked-element {
  -webkit-mask-image: url(mask.svg);
  mask-image: url(mask.svg);
}
```

### 9.3 Progressive Enhancement Strategy

```css
/* Base: clean edges for all browsers */
.paper-card {
  border-radius: 2px;
}

/* Enhancement: SVG filter for capable browsers */
@supports (filter: url(#test)) {
  .paper-card.paper-torn {
    filter: url(#edge-torn);
    border-radius: 0;
  }
}

/* Alternative: CSS mask if filters not desired */
@supports (mask-image: url(test.svg)) or (-webkit-mask-image: url(test.svg)) {
  .paper-card.paper-torn-alt {
    -webkit-mask-image: url(torn-edge-mask.svg);
    mask-image: url(torn-edge-mask.svg);
  }
}
```

---

## Part 10: Implementation Patterns

### 10.1 Component Composition

```html
<!-- Basic torn paper card -->
<div class="paper-card edge-torn">
  <h3>Note Title</h3>
  <p>Content here...</p>
</div>

<!-- Sticky note with curl -->
<div class="paper-sticky curl-br-md">
  <p>Remember to...</p>
</div>

<!-- Notebook page -->
<div class="paper-notebook paper-notebook-lined perf-left">
  <p>Dear diary...</p>
</div>

<!-- Premium invitation -->
<div class="paper-card edge-deckled fold-tr-sm">
  <h2>You're Invited</h2>
</div>

<!-- Ticket stub -->
<div class="paper-ticket">
  <div class="paper-ticket-main">Event Details</div>
  <div class="paper-ticket-stub">Admit One</div>
</div>
```

### 10.2 Combining Edge Treatments with Shadows

From Chunk 2, shadow tokens integrate with edge treatments:

```css
/* Torn paper with appropriate shadow */
.paper-note {
  filter: url(#edge-torn);
  box-shadow: var(--paper-elevation-1);
}

.paper-note:hover {
  box-shadow: var(--paper-elevation-2);
  transform: translateY(-2px) rotate(-0.5deg);
}

/* Sticky with curl and asymmetric shadow */
.paper-sticky {
  box-shadow: var(--paper-shadow-sticky);
}

.paper-sticky.curl-br-md {
  /* Shadow hint under curl */
  box-shadow: 
    var(--paper-shadow-sticky),
    inset -5px -5px 10px rgba(0,0,0,0.02);
}
```

### 10.3 Edge Treatment Decision Matrix

```
What feeling should this element convey?
│
├─ Premium/Formal
│   └─ edge-deckled + fold-tr-sm + elevation-1
│
├─ Handmade/Craft
│   └─ edge-handmade + elevation-1 + slight rotation
│
├─ Casual/Quick
│   └─ edge-torn + shadow-sticky
│
├─ Actionable/Tear-away
│   └─ perf-bottom + edge-clean
│
├─ Interactive/Fun
│   └─ curl-br-md + hover animation
│
└─ Clean/Professional
    └─ No edge treatment, standard border-radius
```

---

## Part 11: Implementation Checklist

### Before Starting:

- [ ] Include SVG filter definitions in document
- [ ] Set up CSS custom properties for edge tokens
- [ ] Test SVG filter browser support
- [ ] Plan which elements need edge treatments

### For Each Edge-Treated Component:

- [ ] Select appropriate edge type based on meaning
- [ ] Apply matching shadow from Chunk 2
- [ ] Test filter overflow (increase filter x/y/width/height if clipping)
- [ ] Verify performance on target devices
- [ ] Implement fallback for unsupported browsers
- [ ] Check dark mode appearance

### Edge-Specific Checks:

**SVG Filters:**
- [ ] Filter definitions present in DOM before use
- [ ] Filter IDs are unique
- [ ] Filter bounds accommodate displacement (120%+)
- [ ] Seed values vary for multiple similar elements

**Folds:**
- [ ] Fold color matches paper material
- [ ] Shadow direction consistent with light source
- [ ] Interactive folds have appropriate transitions

**Perforations:**
- [ ] Hole size appropriate for element scale
- [ ] Background color shows through holes correctly
- [ ] Tear line clearly indicates interaction point

---

## Appendices

### A. Reference Materials

| Resource | Link |
|----------|------|
| Daniel Jones: Rough Edges with CSS/SVG | https://danieldarrenjones.com/articles/how-to-make-rough-edges-with-css-and-svgs |
| Codrops: feTurbulence Deep Dive | https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ |
| CSS-Tricks: Jagged Edges with Masks | https://css-tricks.com/using-css-masks-to-create-jagged-edges/ |
| Nicolas Gallagher: Folded Corner | https://nicolasgallagher.com/pure-css-folded-corner-effect/ |
| Temani Afif: Wavy Shapes | https://css-tricks.com/how-to-create-wavy-shapes-patterns-in-css/ |
| Fancy Border Radius Generator | https://9elements.github.io/fancy-border-radius/ |
| Clippy: Clip-Path Generator | https://bennettfeely.com/clippy/ |
| Free Frontend: Paper Effects | https://freefrontend.com/css-paper-effects/ |
| TornPaper.js Library | https://github.com/happy358/TornPaper |
| Wikipedia: Deckle Edge | https://en.wikipedia.org/wiki/Deckle_edge |
| MDN: clip-path | https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path |
| MDN: mask-image | https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image |

### B. Quick Decision Tree

```
What edge effect do I need?
│
├─ Dynamic, procedural, unique per element?
│   └─ SVG Filter (feTurbulence + feDisplacementMap)
│       ├─ Subtle → baseFrequency: 0.02, scale: 3
│       ├─ Medium → baseFrequency: 0.04, scale: 5-8
│       └─ Dramatic → baseFrequency: 0.05, scale: 10-15
│
├─ Repeating pattern, performance critical?
│   └─ CSS Mask
│       ├─ Gradient-based → zigzag, waves, scallops
│       └─ Image-based → custom torn edge PNG/SVG
│
├─ Geometric/precise shape?
│   └─ clip-path: polygon()
│
├─ Organic blob shape?
│   └─ 8-value border-radius
│
├─ Folded corner?
│   └─ Pseudo-element triangles with gradients
│
├─ Page curl/peel?
│   └─ Pseudo-element with radial gradient + shadow
│
├─ Perforated/tear-away?
│   └─ Dashed border + radial-gradient holes
│
└─ Notebook paper?
    └─ Box-shadow holes + linear-gradient lines
```

### C. Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| Same seed for all filtered elements | Unique seeds for variety |
| Animate feTurbulence directly | Pre-render states, animate opacity |
| Skip webkit prefix on masks | Always include -webkit-mask-image |
| Forget filter bounds | Set x/y to -10%, width/height to 120%+ |
| Mix edge styles randomly | Match edge to content meaning |
| Use torn edges on everything | Reserve for emphasis |
| Ignore filter overflow clipping | Test with dramatic scale values |
| Apply heavy filters to many elements | Limit to 10-20 filtered items |

### D. Integration with Chunk 2 (Shadows)

Edge treatments affect shadow behavior:

| Edge Type | Shadow Consideration |
|-----------|---------------------|
| Deckled | Standard shadow works, soft edge softens perception |
| Torn | Shadow should follow contour (automatic with filter) |
| Folded | Add shadow under fold, reduce corner shadow |
| Curled | Shadow under curl, use radial gradient |
| Perforated | No special shadow needed |
| Wavy | Shadow follows wave (automatic with element) |

```css
/* Example: Torn paper with coordinated shadow */
.paper-torn-elevated {
  filter: url(#edge-torn);
  box-shadow: var(--paper-elevation-2);
  
  /* Filter creates organic shadow edge automatically */
}

/* Example: Folded corner with shadow adjustment */
.paper-folded {
  box-shadow: 
    /* Main card shadow */
    var(--paper-elevation-1),
    /* Reduced shadow in corner where fold hides it */
    inset 20px -20px 20px -20px transparent;
}
```

---

*Document complete. Proceed to Chunk 4: Paper Texture System.*
