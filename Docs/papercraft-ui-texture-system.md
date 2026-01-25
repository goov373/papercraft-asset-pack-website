# Papercraft UI: Paper Texture System

## Chunk 4 of 5

> "Paper is patient. Every fiber holds memory, every grain tells a story of wood pulp beaten into submission, of water evaporating slowly under felt, of hands pressing sheets into existence. The digital screen knows nothing of this patience—but with the right techniques, we can teach it to remember."
> — Anonymous Papermaker

---

## Part 1: Understanding Paper Texture Physics

Before translating texture to pixels, we must understand what makes paper feel like paper. The tactile quality of paper emerges from microscopic structures invisible to the naked eye but perceivable to both touch and, remarkably, to vision.

### 1.1 The Anatomy of Paper Texture

Paper texture comprises several distinct physical phenomena:

```
CROSS-SECTION OF PAPER FIBER STRUCTURE
======================================

      Light Direction
            ↓
    ~~~~~~~~~~~~~~~~~~~~~~~~  ← Surface irregularities (felt side)
    ░░▓░░▓▓░░░▓░▓▓░░▓░░░▓░  ← Fiber layer 1 (visible texture)
    ▓░░░▓░░▓░░▓░░░▓░░▓░▓░░  ← Fiber layer 2
    ░▓░▓░░░▓▓░░░▓░░▓▓░░░▓░  ← Fiber layer 3 (internal structure)
    ▓░░▓░▓░░░▓░░▓░░░▓░▓░░▓  ← Fiber layer 4
    ________________________  ← Wire side (smoother)

    ░ = Cellulose fiber (light-reflecting)
    ▓ = Fiber overlap/density variation (shadow-catching)
```

**Grain Direction**: Fibers align predominantly in one direction during manufacturing, creating directional texture visible when light rakes across the surface at low angles.

**Surface Tooth**: The micro-roughness that catches light, pencil, and ink. Measured in "tooth" for artists—more tooth means more texture.

**Fiber Visibility**: In handmade and uncoated papers, individual fibers create visible texture. Machine-made papers have more uniform, less visible fiber structure.

**Calendering Effects**: The degree of pressing/smoothing affects how much original fiber texture remains visible.

### 1.2 Paper Types and Their Characteristic Textures

| Paper Type | Texture Character | Grain Visibility | Surface Feel | Digital Approach |
|------------|-------------------|------------------|--------------|------------------|
| **Bond/Copy** | Very smooth, minimal texture | Almost none | Crisp, flat | Subtle noise only |
| **Laid** | Linear ribbed pattern | High (deliberate) | Ridged | Repeating linear pattern |
| **Wove** | Fine, uniform mesh | Low-medium | Soft, even | Fine uniform noise |
| **Linen** | Cross-hatch weave pattern | Medium | Textured fabric | Grid pattern overlay |
| **Cotton/Rag** | Soft, fibrous, organic | Medium-high | Luxurious | Organic noise + fiber hints |
| **Kraft** | Rough, visible fibers, warm | High | Industrial | Coarse noise + warm tint |
| **Newsprint** | Porous, absorbent, gray | Medium | Cheap, soft | Gray base + high noise |
| **Watercolor** | Heavy tooth, cold-pressed | Very high | Bumpy, absorbent | Strong texture + lighting |
| **Vellum** | Translucent, smooth | Very low | Waxy, thin | Minimal texture, translucency |
| **Cardstock** | Smooth but substantial | Low | Thick, sturdy | Subtle texture + shadow weight |

### 1.3 How Light Reveals Texture

Paper texture becomes visible through light interaction:

```
LIGHT INTERACTION WITH PAPER SURFACE
====================================

    Incident Light (45°)
           ╲
            ╲
             ╲    Specular reflection (glossy papers)
              ╲  ↗
               ╲↗
    ═══════════╳═══════════  ← Paper surface
              ╱│╲
             ╱ │ ╲
            ╱  │  ╲         Diffuse scattering
           ↙   ↓   ↘        (matte papers)
          
    • Peaks catch more light → appear brighter
    • Valleys receive less light → appear darker
    • Fiber orientation affects reflection angle
    • Surface coating affects specular vs diffuse ratio
```

This light behavior is precisely what SVG lighting filters simulate—using the alpha channel as a height map where opacity variations create virtual "bumps" that catch simulated light.

---

## Part 2: SVG Noise Generation with feTurbulence

The `feTurbulence` filter primitive is our primary tool for generating procedural paper texture. It produces Perlin noise—the same algorithm used in CGI for clouds, marble, and organic textures.

### 2.1 feTurbulence Fundamentals

```xml
<svg width="0" height="0">
  <filter id="paper-noise-basic">
    <feTurbulence 
      type="fractalNoise"
      baseFrequency="0.04"
      numOctaves="5"
      stitchTiles="stitch"
      result="noise"
    />
  </filter>
</svg>
```

**Attribute Reference:**

| Attribute | Values | Effect | Paper Texture Use |
|-----------|--------|--------|-------------------|
| `type` | `turbulence` \| `fractalNoise` | Turbulence = ripples, fractalNoise = clouds | Use `fractalNoise` for paper |
| `baseFrequency` | 0.001 - 1.0 | Scale of noise pattern | 0.02-0.1 for visible grain |
| `numOctaves` | 1 - 10 | Detail layers (more = finer detail) | 3-5 for paper (balance quality/perf) |
| `seed` | any integer | Randomization seed | Change for variation |
| `stitchTiles` | `stitch` \| `noStitch` | Seamless tiling | Always use `stitch` |

### 2.2 Frequency and Scale Relationships

```
baseFrequency VISUAL REFERENCE
==============================

0.01 - Very coarse, large-scale variation
┌─────────────────────────────────┐
│░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░│
│░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░│
│░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░│
└─────────────────────────────────┘

0.04 - Medium grain (good for cotton/rag paper)
┌─────────────────────────────────┐
│░▓░░▓▓░▓░░░▓░▓▓░░▓░▓░░▓▓░▓░░░▓░│
│▓░░▓░░▓▓░▓░▓░░▓░░▓▓░▓░░▓░░▓▓░▓░│
│░▓▓░▓░░▓░░▓▓░▓░░▓░░▓▓░▓░▓░░▓░░▓│
└─────────────────────────────────┘

0.1 - Fine grain (good for smooth bond paper)
┌─────────────────────────────────┐
│▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒│
│▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓│
│▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒│
└─────────────────────────────────┘

0.5+ - Very fine, almost imperceptible
┌─────────────────────────────────┐
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
└─────────────────────────────────┘
```

### 2.3 Directional Texture with Dual Frequencies

Real paper often has directional grain. Achieve this with separate X and Y frequencies:

```xml
<!-- Horizontal grain direction (like laid paper) -->
<feTurbulence 
  type="fractalNoise"
  baseFrequency="0.02 0.1"
  numOctaves="4"
  stitchTiles="stitch"
/>

<!-- Vertical grain direction -->
<feTurbulence 
  type="fractalNoise"
  baseFrequency="0.1 0.02"
  numOctaves="4"
  stitchTiles="stitch"
/>
```

```
DIRECTIONAL FREQUENCY COMPARISON
================================

baseFrequency="0.02 0.1" (Horizontal stretch)
┌─────────────────────────────────┐
│═════════════════════════════════│
│─────────────────────────────────│
│═════════════════════════════════│
│─────────────────────────────────│
└─────────────────────────────────┘

baseFrequency="0.1 0.02" (Vertical stretch)  
┌─────────────────────────────────┐
│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│
│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│
│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│
│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│║│
└─────────────────────────────────┘
```

---

## Part 3: Creating Realistic Paper Texture with SVG Lighting

Raw feTurbulence output looks like colored static. To create convincing paper texture, we illuminate it using SVG's lighting primitives, treating the noise as a height map.

### 3.1 The Rough Paper Texture Filter

This technique, pioneered by Michael Mullany and documented by Sara Soueidan, creates the illusion of surface relief:

```xml
<svg width="0" height="0" aria-hidden="true">
  <filter id="paper-texture-rough" x="0%" y="0%" width="100%" height="100%">
    <!-- Step 1: Generate noise pattern -->
    <feTurbulence 
      type="fractalNoise" 
      baseFrequency="0.04" 
      numOctaves="5"
      stitchTiles="stitch"
      result="noise"
    />
    
    <!-- Step 2: Apply diffuse lighting using noise as bump map -->
    <feDiffuseLighting 
      in="noise" 
      lighting-color="#ffffff" 
      surfaceScale="2"
      result="lit"
    >
      <!-- Distant light simulates ambient room lighting -->
      <feDistantLight azimuth="45" elevation="60" />
    </feDiffuseLighting>
  </filter>
</svg>
```

**How It Works:**

```
LIGHTING FILTER PIPELINE
========================

┌──────────────────┐
│   feTurbulence   │  Generates RGBA noise
│  (fractalNoise)  │  Alpha channel = height data
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ feDiffuseLighting│  Uses alpha as bump map
│                  │  Calculates light/shadow
│  ┌────────────┐  │
│  │feDistantLight│ │  Light source position
│  └────────────┘  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Illuminated     │  Grayscale texture showing
│  Texture Output  │  simulated surface relief
└──────────────────┘
```

### 3.2 Lighting Parameters Explained

**`surfaceScale`**: Controls the perceived height/depth of texture bumps.
- `1`: Subtle, smooth texture
- `2-3`: Visible paper grain
- `5+`: Dramatic, almost 3D relief

**`azimuth`**: Horizontal angle of light source (0-360°)
- `0°`: Light from right
- `90°`: Light from top
- `180°`: Light from left
- `270°`: Light from bottom

**`elevation`**: Vertical angle of light source (0-90°)
- `0°`: Light parallel to surface (dramatic shadows)
- `45°`: Typical reading light angle
- `90°`: Light directly above (flat, minimal shadows)

```
AZIMUTH AND ELEVATION VISUALIZATION
===================================

        elevation = 90° (noon sun)
              │
              │    elevation = 45°
              │   ╱
              │  ╱
              │ ╱
    ──────────┼──────────  azimuth = 0° (east)
             ╱│
            ╱ │
azimuth    ╱  │
= 180°    ╱   │
(west)        │
              │
        elevation = 0° (horizon)

For paper texture:
- azimuth: 45° (upper-right light, natural for reading)
- elevation: 55-65° (gentle shadows, not dramatic)
```

### 3.3 Material-Specific Texture Filters

```xml
<!-- SMOOTH BOND PAPER -->
<filter id="texture-bond">
  <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise"/>
  <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="0.5">
    <feDistantLight azimuth="45" elevation="70"/>
  </feDiffuseLighting>
</filter>

<!-- COTTON RAG PAPER -->
<filter id="texture-cotton">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
  <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2">
    <feDistantLight azimuth="45" elevation="60"/>
  </feDiffuseLighting>
</filter>

<!-- KRAFT PAPER -->
<filter id="texture-kraft">
  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise"/>
  <feDiffuseLighting in="noise" lighting-color="#f5e6d3" surfaceScale="3">
    <feDistantLight azimuth="30" elevation="50"/>
  </feDiffuseLighting>
</filter>

<!-- WATERCOLOR PAPER (heavy tooth) -->
<filter id="texture-watercolor">
  <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="6" result="noise"/>
  <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="4">
    <feDistantLight azimuth="45" elevation="45"/>
  </feDiffuseLighting>
</filter>

<!-- NEWSPRINT -->
<filter id="texture-newsprint">
  <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise"/>
  <feDiffuseLighting in="noise" lighting-color="#e8e8e8" surfaceScale="1.5">
    <feDistantLight azimuth="60" elevation="65"/>
  </feDiffuseLighting>
</filter>
```

### 3.4 Adding Specular Highlights

For glossy or coated papers, combine diffuse and specular lighting:

```xml
<filter id="texture-coated-paper">
  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise"/>
  
  <!-- Diffuse base lighting -->
  <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="1" result="diffuse">
    <feDistantLight azimuth="45" elevation="60"/>
  </feDiffuseLighting>
  
  <!-- Specular highlights for glossy effect -->
  <feSpecularLighting 
    in="noise" 
    lighting-color="#fff" 
    surfaceScale="1"
    specularConstant="0.75"
    specularExponent="20"
    result="specular"
  >
    <feDistantLight azimuth="45" elevation="60"/>
  </feSpecularLighting>
  
  <!-- Combine diffuse and specular -->
  <feComposite in="diffuse" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
</filter>
```

---

## Part 4: CSS-Based Texture Techniques

While SVG filters offer the most control, CSS provides lighter-weight alternatives and essential blending capabilities.

### 4.1 Inline SVG Noise as Background

The most common technique: embed SVG noise directly in CSS as a data URI.

```css
/* Base noise texture - reusable across components */
.paper-texture {
  position: relative;
}

.paper-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.08;
  mix-blend-mode: multiply;
}
```

### 4.2 CSS Custom Properties for Texture Control

```css
:root {
  /* ============================
     TEXTURE SYSTEM TOKENS
     ============================ */
  
  /* Noise Frequencies (baseFrequency values) */
  --texture-freq-fine: 0.8;        /* Smooth papers */
  --texture-freq-medium: 0.5;      /* Standard papers */
  --texture-freq-coarse: 0.3;      /* Rough papers */
  --texture-freq-heavy: 0.15;      /* Heavy tooth papers */
  
  /* Texture Opacity by Intensity */
  --texture-opacity-subtle: 0.04;
  --texture-opacity-light: 0.08;
  --texture-opacity-medium: 0.12;
  --texture-opacity-heavy: 0.18;
  --texture-opacity-dramatic: 0.25;
  
  /* Texture Background Sizes */
  --texture-size-sm: 100px;
  --texture-size-md: 200px;
  --texture-size-lg: 400px;
  
  /* Blend Mode Preferences */
  --texture-blend-light: multiply;      /* For light backgrounds */
  --texture-blend-dark: soft-light;     /* For dark backgrounds */
  --texture-blend-neutral: overlay;     /* For mid-tone backgrounds */
  
  /* Pre-built SVG Noise URLs */
  --texture-noise-fine: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  --texture-noise-medium: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  --texture-noise-coarse: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### 4.3 Texture Utility Classes

```css
/* ===========================================
   TEXTURE OVERLAY UTILITIES
   =========================================== */

/* Base texture layer */
[data-texture]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-repeat: repeat;
}

/* Texture Types */
[data-texture="fine"]::before {
  background-image: var(--texture-noise-fine);
  background-size: var(--texture-size-sm);
  opacity: var(--texture-opacity-light);
}

[data-texture="medium"]::before {
  background-image: var(--texture-noise-medium);
  background-size: var(--texture-size-md);
  opacity: var(--texture-opacity-medium);
}

[data-texture="coarse"]::before {
  background-image: var(--texture-noise-coarse);
  background-size: var(--texture-size-lg);
  opacity: var(--texture-opacity-heavy);
}

/* Blend Mode Modifiers */
[data-texture-blend="multiply"]::before {
  mix-blend-mode: multiply;
}

[data-texture-blend="soft-light"]::before {
  mix-blend-mode: soft-light;
}

[data-texture-blend="overlay"]::before {
  mix-blend-mode: overlay;
}

/* Intensity Modifiers */
[data-texture-intensity="subtle"]::before {
  opacity: var(--texture-opacity-subtle);
}

[data-texture-intensity="dramatic"]::before {
  opacity: var(--texture-opacity-dramatic);
}
```

### 4.4 Pure CSS Texture Patterns (No SVG)

For maximum compatibility, create texture-like effects with CSS gradients:

```css
/* Linen texture using gradient crosshatch */
.texture-linen {
  background-color: #f8f5f0;
  background-image: 
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 4px 4px;
}

/* Fine dot pattern (stipple effect) */
.texture-stipple {
  background-color: #faf8f5;
  background-image: radial-gradient(
    circle at center,
    rgba(0,0,0,0.1) 0.5px,
    transparent 0.5px
  );
  background-size: 3px 3px;
}

/* Laid paper lines */
.texture-laid {
  background-color: #fdfbf7;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.02) 2px,
    rgba(0,0,0,0.02) 3px
  );
}

/* Graph/grid paper */
.texture-graph {
  background-color: #fff;
  background-image: 
    linear-gradient(rgba(200,200,255,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,200,255,0.5) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Subtle noise approximation with multiple gradients */
.texture-pseudo-noise {
  background-color: #f9f7f4;
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 2px,
      rgba(0,0,0,0.01) 2px,
      rgba(0,0,0,0.01) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent 0px,
      transparent 2px,
      rgba(0,0,0,0.01) 2px,
      rgba(0,0,0,0.01) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 3px,
      rgba(0,0,0,0.008) 3px,
      rgba(0,0,0,0.008) 6px
    );
}
```

---

## Part 5: Blend Modes for Texture Integration

Blend modes determine how texture layers combine with base colors. Choosing correctly is essential for realistic results.

### 5.1 Blend Mode Selection Guide

```
BLEND MODE DECISION TREE FOR PAPER TEXTURE
==========================================

                    What's your background?
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
       LIGHT           MID-TONE          DARK
    (white/cream)    (tan/gray)      (brown/black)
          │                │                │
          ▼                ▼                ▼
      multiply         overlay        soft-light
          │                │                │
          ▼                ▼                ▼
    Texture shows    Texture adds     Texture adds
    as darkening     contrast both    subtle grain
    grain marks      ways             without washing
                                      out color
```

### 5.2 Blend Mode Visual Comparison

| Blend Mode | Light BG Result | Dark BG Result | Best For |
|------------|-----------------|----------------|----------|
| `multiply` | Darkens texture visible | Muddy, too dark | Light paper only |
| `screen` | Washed out | Lightens texture | Dark paper highlights |
| `overlay` | Contrast boost | Contrast boost | Medium tones, dramatic |
| `soft-light` | Subtle darkening | Subtle lightening | Universal, gentle |
| `hard-light` | Strong contrast | Strong contrast | Dramatic effects |
| `color-burn` | Deep shadows | Very dark | Aged/stained edges |
| `luminosity` | Texture detail only | Texture detail only | Preserve color exactly |

### 5.3 Background-Blend-Mode for Multiple Layers

```css
/* Complex texture: noise + gradient + color */
.paper-card {
  background-color: #f5f0e6;
  background-image: 
    /* Layer 1: Noise texture */
    url("data:image/svg+xml,..."),
    /* Layer 2: Subtle vignette */
    radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 60%,
      rgba(0,0,0,0.03) 100%
    ),
    /* Layer 3: Vertical gradient for depth */
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.1) 0%,
      transparent 20%,
      transparent 80%,
      rgba(0,0,0,0.02) 100%
    );
  background-size: 
    200px 200px,
    100% 100%,
    100% 100%;
  background-blend-mode: 
    multiply,    /* noise */
    normal,      /* vignette */
    normal;      /* gradient */
}
```

### 5.4 Mix-Blend-Mode for Overlay Elements

```css
/* Texture overlay element (separate from base) */
.paper-base {
  position: relative;
  background-color: var(--paper-cream);
  isolation: isolate; /* Create stacking context */
}

.paper-base::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--texture-noise-medium);
  background-size: 200px;
  mix-blend-mode: multiply;
  opacity: 0.1;
  pointer-events: none;
}

/* For dark mode */
@media (prefers-color-scheme: dark) {
  .paper-base::before {
    mix-blend-mode: soft-light;
    opacity: 0.15;
  }
}
```

---

## Part 6: Aging and Weathering Effects

Paper ages beautifully. Recreating these effects adds character and historical weight to digital paper elements.

### 6.1 The Physics of Paper Aging

```
PAPER AGING PHENOMENA
=====================

Fresh Paper          Aged Paper
    │                    │
    ▼                    ▼
┌─────────┐        ┌─────────┐
│ Bright  │───────▶│ Yellowed│  Lignin oxidation
│ White   │        │ Ivory   │  (acid degradation)
└─────────┘        └─────────┘
    │                    │
    ▼                    ▼
┌─────────┐        ┌─────────┐
│ Crisp   │───────▶│ Soft    │  Fiber breakdown
│ Edges   │        │ Edges   │  (handling wear)
└─────────┘        └─────────┘
    │                    │
    ▼                    ▼
┌─────────┐        ┌─────────┐
│ Uniform │───────▶│ Spotty  │  Foxing (fungal)
│ Color   │        │ Stained │  Water damage
└─────────┘        └─────────┘
    │                    │
    ▼                    ▼
┌─────────┐        ┌─────────┐
│ Strong  │───────▶│ Brittle │  Cellulose decay
│ Fibers  │        │ Crumbly │  (acid + light)
└─────────┘        └─────────┘
```

### 6.2 CSS Filter Chains for Aging

```css
:root {
  /* Aging filter presets */
  --age-none: none;
  
  --age-slight: 
    sepia(5%) 
    brightness(99%);
  
  --age-moderate: 
    sepia(15%) 
    brightness(97%) 
    contrast(98%);
  
  --age-vintage: 
    sepia(30%) 
    brightness(95%) 
    contrast(95%) 
    saturate(90%);
  
  --age-antique: 
    sepia(50%) 
    brightness(92%) 
    contrast(92%) 
    saturate(80%);
  
  --age-ancient: 
    sepia(70%) 
    brightness(88%) 
    contrast(88%) 
    saturate(70%)
    hue-rotate(-5deg);
}

/* Usage */
.paper-fresh {
  filter: var(--age-none);
}

.paper-vintage {
  filter: var(--age-vintage);
}

.paper-antique {
  filter: var(--age-antique);
}
```

### 6.3 Yellowing Color Shifts

Instead of (or in addition to) CSS filters, adjust base colors:

```css
:root {
  /* Paper color aging progression */
  
  /* Fresh papers */
  --paper-white: #ffffff;
  --paper-cream: #fdfbf7;
  --paper-ivory: #f9f6f0;
  
  /* Slightly aged (5-20 years) */
  --paper-aged-light: #f7f2e8;
  --paper-aged-cream: #f4ede0;
  
  /* Moderately aged (20-50 years) */
  --paper-aged-medium: #efe6d5;
  --paper-aged-tan: #e8dcc8;
  
  /* Heavily aged (50-100 years) */
  --paper-aged-heavy: #e0d4bc;
  --paper-aged-parchment: #d8c8a8;
  
  /* Antique (100+ years) */
  --paper-antique: #cebf9a;
  --paper-ancient: #c4b088;
}
```

### 6.4 Coffee Stain and Water Damage Effects

```css
/* Coffee stain using radial gradients */
.coffee-stain {
  position: absolute;
  width: 80px;
  height: 70px;
  background: 
    radial-gradient(
      ellipse 60% 50% at 50% 50%,
      transparent 0%,
      transparent 70%,
      rgba(139, 90, 43, 0.15) 70%,
      rgba(139, 90, 43, 0.25) 85%,
      rgba(139, 90, 43, 0.1) 100%
    ),
    radial-gradient(
      ellipse 80% 70% at 45% 55%,
      rgba(160, 110, 60, 0.08) 0%,
      transparent 60%
    );
  filter: blur(1px);
  mix-blend-mode: multiply;
}

/* Water damage (lighter, irregular) */
.water-damage {
  position: absolute;
  width: 120px;
  height: 150px;
  background: 
    radial-gradient(
      ellipse 100% 80% at 40% 30%,
      rgba(180, 170, 150, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 60% 100% at 60% 70%,
      rgba(190, 180, 160, 0.08) 0%,
      transparent 40%
    );
  filter: blur(3px);
  mix-blend-mode: multiply;
}

/* Edge darkening (handling wear) */
.edge-darkening {
  box-shadow: 
    inset 0 0 30px rgba(0, 0, 0, 0.05),
    inset 0 0 60px rgba(0, 0, 0, 0.03);
}
```

### 6.5 Foxing (Age Spots) Pattern

```css
/* Foxing spots using multiple radial gradients */
.foxing-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 15% 25%, rgba(139, 90, 43, 0.1) 0%, transparent 3px),
    radial-gradient(circle at 85% 15%, rgba(139, 90, 43, 0.08) 0%, transparent 2px),
    radial-gradient(circle at 45% 80%, rgba(139, 90, 43, 0.12) 0%, transparent 4px),
    radial-gradient(circle at 70% 60%, rgba(139, 90, 43, 0.06) 0%, transparent 2px),
    radial-gradient(circle at 25% 55%, rgba(139, 90, 43, 0.09) 0%, transparent 3px),
    radial-gradient(circle at 90% 85%, rgba(139, 90, 43, 0.07) 0%, transparent 2px),
    radial-gradient(circle at 10% 90%, rgba(139, 90, 43, 0.11) 0%, transparent 3px),
    radial-gradient(circle at 55% 35%, rgba(139, 90, 43, 0.05) 0%, transparent 2px);
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

### 6.6 Complete Aging Composition

```css
/* Combine all aging effects */
.paper-antique-complete {
  /* Base aged color */
  background-color: var(--paper-aged-heavy);
  
  /* Aging filter */
  filter: var(--age-vintage);
  
  /* Edge wear shadow */
  box-shadow: 
    inset 0 0 40px rgba(0, 0, 0, 0.06),
    inset 0 0 80px rgba(0, 0, 0, 0.04);
  
  position: relative;
}

/* Texture layer */
.paper-antique-complete::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--texture-noise-coarse);
  background-size: 200px;
  opacity: 0.15;
  mix-blend-mode: multiply;
  pointer-events: none;
}

/* Staining layer */
.paper-antique-complete::after {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(139, 90, 43, 0.08) 0%, transparent 30%),
    radial-gradient(ellipse at 80% 70%, rgba(160, 120, 70, 0.06) 0%, transparent 25%),
    radial-gradient(ellipse at 50% 90%, rgba(150, 100, 50, 0.04) 0%, transparent 20%);
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

---

## Part 7: Dark Mode Considerations

Paper texture in dark mode requires careful handling—real paper doesn't exist in darkness, but we can suggest paper-like qualities.

### 7.1 Dark Mode Texture Philosophy

```
LIGHT MODE vs DARK MODE TEXTURE APPROACH
========================================

Light Mode:                Dark Mode:
┌─────────────────┐       ┌─────────────────┐
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │       │ ░░░░░░░░░░░░░░░ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │       │ ░░░░░░░░░░░░░░░ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │       │ ░░░░░░░░░░░░░░░ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │       │ ░░░░░░░░░░░░░░░ │
└─────────────────┘       └─────────────────┘
Texture darkens           Texture lightens
(multiply blend)          (soft-light blend)

Simulates:                Simulates:
Light on paper surface    Subtle surface relief
                          on dark material
```

### 7.2 Dark Mode Token Adjustments

```css
:root {
  /* Light mode defaults */
  --texture-opacity: 0.1;
  --texture-blend: multiply;
  --paper-bg: #fdfbf7;
  --paper-shadow: rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode adjustments */
    --texture-opacity: 0.08;           /* Slightly reduced */
    --texture-blend: soft-light;        /* Different blend mode */
    --paper-bg: #2a2520;               /* Dark warm brown */
    --paper-shadow: rgba(0, 0, 0, 0.4); /* Stronger shadow */
  }
}

/* Manual dark mode class override */
.dark-mode {
  --texture-opacity: 0.08;
  --texture-blend: soft-light;
  --paper-bg: #2a2520;
  --paper-shadow: rgba(0, 0, 0, 0.4);
}
```

### 7.3 Dark Paper Material Suggestions

| Material Concept | Light Mode Color | Dark Mode Color | Texture Approach |
|-----------------|------------------|-----------------|------------------|
| White bond | `#ffffff` | `#1a1a1a` | Reduce texture opacity |
| Cream | `#fdfbf7` | `#2a2520` | Warm undertone |
| Kraft | `#c9a66b` | `#3d3020` | Maintain warmth |
| Newsprint | `#e8e4dc` | `#252320` | Gray-brown tone |
| Black paper | `#1a1a1a` | `#0a0a0a` | Subtle light texture |
| Chalkboard | `#2d4a3e` | `#1a2e25` | Dusty texture overlay |

---

## Part 8: Performance Optimization

SVG filters can be expensive. Strategic optimization ensures textures enhance rather than hinder user experience.

### 8.1 Performance Impact Factors

```
PERFORMANCE COST HIERARCHY (Highest to Lowest)
==============================================

Most Expensive:
    ┌─────────────────────────────────────┐
    │ feTurbulence with high numOctaves   │
    │ (each octave doubles computation)    │
    └─────────────────────────────────────┘
    ┌─────────────────────────────────────┐
    │ Animated SVG filters                 │
    │ (recalculates every frame)           │
    └─────────────────────────────────────┘
    ┌─────────────────────────────────────┐
    │ Large filter regions                 │
    │ (full-page textures)                 │
    └─────────────────────────────────────┘
    ┌─────────────────────────────────────┐
    │ Multiple filter primitives chained   │
    │ (complex compound filters)           │
    └─────────────────────────────────────┘
    ┌─────────────────────────────────────┐
    │ Blur operations (feGaussianBlur)     │
    │                                      │
    └─────────────────────────────────────┘

Least Expensive:
    ┌─────────────────────────────────────┐
    │ CSS gradients (GPU accelerated)      │
    └─────────────────────────────────────┘
    ┌─────────────────────────────────────┐
    │ Static pre-rendered textures         │
    │ (PNG/WebP background images)         │
    └─────────────────────────────────────┘
    ┌─────────────────────────────────────┐
    │ mix-blend-mode on simple layers      │
    └─────────────────────────────────────┘
```

### 8.2 Optimization Strategies

```css
/* STRATEGY 1: Limit numOctaves */
/* Bad - 10 octaves is overkill */
<feTurbulence numOctaves="10" />

/* Good - 3-5 octaves is usually sufficient */
<feTurbulence numOctaves="4" />


/* STRATEGY 2: Use smaller texture tiles */
.texture-optimized::before {
  background-size: 100px 100px; /* Small tile, repeated */
  /* Not 800px 800px which increases computation */
}


/* STRATEGY 3: Reduce texture on mobile */
@media (max-width: 768px) {
  .paper-texture::before {
    opacity: 0.05; /* Lighter on mobile */
    background-size: 150px; /* Smaller tiles */
  }
}

/* Or disable entirely on low-power devices */
@media (prefers-reduced-motion: reduce) {
  .paper-texture::before {
    display: none; /* Remove texture entirely */
  }
}


/* STRATEGY 4: Use will-change sparingly */
.paper-card {
  /* Only if the element will animate */
  will-change: transform;
}


/* STRATEGY 5: Contain texture layers */
.paper-container {
  contain: paint; /* Isolate repaint regions */
  isolation: isolate; /* Create stacking context */
}
```

### 8.3 Progressive Enhancement Approach

```css
/* Level 1: Base experience (all browsers) */
.paper-card {
  background-color: var(--paper-cream);
  box-shadow: var(--shadow-elevation-1);
}

/* Level 2: Add texture if supported */
@supports (mix-blend-mode: multiply) {
  .paper-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--texture-noise-medium);
    mix-blend-mode: multiply;
    opacity: 0.08;
    pointer-events: none;
  }
}

/* Level 3: Enhanced texture with SVG filter */
@supports (filter: url(#id)) {
  .paper-card--enhanced {
    filter: url(#paper-texture-filter);
  }
}
```

### 8.4 Performance Budget Guidelines

| Element Type | Max Texture Layers | Recommended numOctaves | Max Opacity |
|--------------|-------------------|------------------------|-------------|
| Full-page background | 1 | 3 | 0.06 |
| Large cards (>500px) | 1 | 4 | 0.10 |
| Medium components | 1-2 | 4-5 | 0.12 |
| Small elements (<200px) | 1 | 3 | 0.15 |
| Interactive/animated | 0-1 | 2-3 | 0.08 |

---

## Part 9: Integration with Previous Chunks

The texture system builds upon and integrates with the previously established shadow and edge systems.

### 9.1 Texture + Shadow Integration

```css
/* Texture affects how shadows appear to fall */
.paper-card {
  /* From Chunk 2: Shadow System */
  --shadow-color: rgba(0, 0, 0, 0.12);
  box-shadow: 
    0 1px 2px var(--shadow-color),
    0 4px 8px var(--shadow-color);
  
  /* Texture layer */
  position: relative;
  background-color: var(--paper-cream);
}

.paper-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--texture-noise-medium);
  opacity: var(--texture-opacity-light);
  mix-blend-mode: multiply;
  pointer-events: none;
  
  /* Texture shouldn't extend beyond shadow bounds */
  border-radius: inherit;
}
```

### 9.2 Texture + Edge Treatment Integration

```css
/* Torn edges from Chunk 3 need matching texture */
.paper-torn {
  /* Edge treatment filter from Chunk 3 */
  filter: url(#torn-edge-filter);
  
  position: relative;
  background-color: var(--paper-cream);
}

/* Ensure texture respects edge mask */
.paper-torn::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--texture-noise-coarse);
  opacity: 0.12;
  mix-blend-mode: multiply;
  
  /* Apply same edge treatment to texture */
  filter: url(#torn-edge-filter);
  pointer-events: none;
}
```

### 9.3 Complete Paper Component Token Set

```css
:root {
  /* ===========================================
     COMPLETE PAPER COMPONENT TOKENS
     (Integrating Chunks 2, 3, and 4)
     =========================================== */
  
  /* Base Colors (Chunk 1 Foundation) */
  --paper-white: #ffffff;
  --paper-cream: #fdfbf7;
  --paper-ivory: #f9f6f0;
  --paper-kraft: #c9a66b;
  
  /* Shadow System (Chunk 2) */
  --paper-shadow-color: rgba(0, 0, 0, 0.1);
  --paper-shadow-1: 0 1px 2px var(--paper-shadow-color);
  --paper-shadow-2: 
    0 2px 4px var(--paper-shadow-color),
    0 4px 8px var(--paper-shadow-color);
  --paper-shadow-3:
    0 4px 8px var(--paper-shadow-color),
    0 8px 16px var(--paper-shadow-color),
    0 16px 32px var(--paper-shadow-color);
  
  /* Edge Treatments (Chunk 3) */
  --paper-edge-torn: url(#torn-edge-filter);
  --paper-edge-deckled: url(#deckled-edge-filter);
  --paper-edge-clean: none;
  
  /* Texture System (Chunk 4) */
  --paper-texture-none: none;
  --paper-texture-fine: var(--texture-noise-fine);
  --paper-texture-medium: var(--texture-noise-medium);
  --paper-texture-coarse: var(--texture-noise-coarse);
  
  --paper-texture-opacity: 0.1;
  --paper-texture-blend: multiply;
  --paper-texture-size: 200px;
  
  /* Aging Presets (Chunk 4) */
  --paper-age-none: none;
  --paper-age-vintage: sepia(30%) brightness(95%) contrast(95%);
  --paper-age-antique: sepia(50%) brightness(92%) contrast(92%);
}

/* Composed Paper Classes */
.paper {
  background-color: var(--paper-cream);
  box-shadow: var(--paper-shadow-1);
  position: relative;
}

.paper--textured::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--paper-texture-medium);
  background-size: var(--paper-texture-size);
  opacity: var(--paper-texture-opacity);
  mix-blend-mode: var(--paper-texture-blend);
  pointer-events: none;
  border-radius: inherit;
}

.paper--torn {
  filter: var(--paper-edge-torn);
}

.paper--aged {
  filter: var(--paper-age-vintage);
}

/* Combine all effects */
.paper--complete {
  background-color: var(--paper-cream);
  box-shadow: var(--paper-shadow-2);
  filter: var(--paper-edge-deckled) var(--paper-age-vintage);
  position: relative;
}

.paper--complete::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--paper-texture-coarse);
  background-size: var(--paper-texture-size);
  opacity: 0.12;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

---

## Part 10: Complete Token Reference

### 10.1 Texture System Token Library

```css
:root {
  /* ===========================================
     PAPERCRAFT UI: TEXTURE SYSTEM TOKENS
     Version: 1.0
     Chunk: 4 of 5
     =========================================== */
  
  /* -------------------------------------------
     NOISE FREQUENCY SCALE
     Controls grain size of generated textures
     ------------------------------------------- */
  --texture-freq-1: 1.0;      /* Imperceptible */
  --texture-freq-2: 0.8;      /* Very fine */
  --texture-freq-3: 0.6;      /* Fine */
  --texture-freq-4: 0.5;      /* Medium-fine */
  --texture-freq-5: 0.4;      /* Medium */
  --texture-freq-6: 0.3;      /* Medium-coarse */
  --texture-freq-7: 0.2;      /* Coarse */
  --texture-freq-8: 0.1;      /* Very coarse */
  --texture-freq-9: 0.05;     /* Heavy grain */
  --texture-freq-10: 0.02;    /* Dramatic */
  
  /* -------------------------------------------
     OCTAVE PRESETS
     Detail levels (higher = more detail, slower)
     ------------------------------------------- */
  --texture-octaves-minimal: 2;
  --texture-octaves-light: 3;
  --texture-octaves-standard: 4;
  --texture-octaves-detailed: 5;
  --texture-octaves-maximum: 6;  /* Use sparingly */
  
  /* -------------------------------------------
     OPACITY SCALE
     Texture visibility levels
     ------------------------------------------- */
  --texture-opacity-1: 0.02;   /* Barely visible */
  --texture-opacity-2: 0.04;   /* Subtle */
  --texture-opacity-3: 0.06;   /* Light */
  --texture-opacity-4: 0.08;   /* Light-medium */
  --texture-opacity-5: 0.10;   /* Medium */
  --texture-opacity-6: 0.12;   /* Medium-strong */
  --texture-opacity-7: 0.15;   /* Strong */
  --texture-opacity-8: 0.18;   /* Heavy */
  --texture-opacity-9: 0.22;   /* Very heavy */
  --texture-opacity-10: 0.30;  /* Dramatic */
  
  /* -------------------------------------------
     BACKGROUND SIZE SCALE
     Texture tile dimensions
     ------------------------------------------- */
  --texture-size-xs: 50px;
  --texture-size-sm: 100px;
  --texture-size-md: 200px;
  --texture-size-lg: 300px;
  --texture-size-xl: 400px;
  
  /* -------------------------------------------
     BLEND MODE TOKENS
     ------------------------------------------- */
  --texture-blend-multiply: multiply;
  --texture-blend-soft-light: soft-light;
  --texture-blend-overlay: overlay;
  --texture-blend-hard-light: hard-light;
  --texture-blend-color-burn: color-burn;
  --texture-blend-luminosity: luminosity;
  
  /* -------------------------------------------
     LIGHTING PARAMETERS
     For SVG feDiffuseLighting filters
     ------------------------------------------- */
  --texture-light-azimuth: 45;
  --texture-light-elevation-low: 30;
  --texture-light-elevation-mid: 55;
  --texture-light-elevation-high: 75;
  --texture-surface-scale-subtle: 0.5;
  --texture-surface-scale-light: 1;
  --texture-surface-scale-medium: 2;
  --texture-surface-scale-heavy: 3;
  --texture-surface-scale-dramatic: 5;
  
  /* -------------------------------------------
     AGING FILTER PRESETS
     ------------------------------------------- */
  --texture-age-none: none;
  --texture-age-1: sepia(5%) brightness(99%);
  --texture-age-2: sepia(10%) brightness(98%) contrast(99%);
  --texture-age-3: sepia(20%) brightness(96%) contrast(97%);
  --texture-age-4: sepia(30%) brightness(95%) contrast(95%) saturate(95%);
  --texture-age-5: sepia(40%) brightness(93%) contrast(93%) saturate(90%);
  --texture-age-6: sepia(50%) brightness(92%) contrast(92%) saturate(85%);
  --texture-age-7: sepia(60%) brightness(90%) contrast(90%) saturate(80%);
  --texture-age-8: sepia(70%) brightness(88%) contrast(88%) saturate(75%);
  --texture-age-9: sepia(80%) brightness(85%) contrast(85%) saturate(70%) hue-rotate(-5deg);
  --texture-age-10: sepia(90%) brightness(80%) contrast(80%) saturate(60%) hue-rotate(-8deg);
  
  /* -------------------------------------------
     MATERIAL-SPECIFIC TEXTURE URLs
     Pre-encoded SVG noise patterns
     ------------------------------------------- */
  
  /* Bond Paper - Very fine, minimal texture */
  --texture-svg-bond: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  /* Cotton Rag - Medium organic texture */
  --texture-svg-cotton: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  /* Kraft - Coarse, visible grain */
  --texture-svg-kraft: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  /* Watercolor - Heavy tooth */
  --texture-svg-watercolor: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  /* Newsprint - Medium, slightly gray */
  --texture-svg-newsprint: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  /* Laid Paper - Directional horizontal */
  --texture-svg-laid: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.15' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  
  /* -------------------------------------------
     SEMANTIC MATERIAL PRESETS
     Complete texture configurations
     ------------------------------------------- */
  
  /* Each preset combines: texture URL, size, opacity, blend mode */
  --material-bond: 
    var(--texture-svg-bond) 
    var(--texture-size-sm) 
    var(--texture-opacity-2) 
    var(--texture-blend-multiply);
  
  --material-cotton:
    var(--texture-svg-cotton)
    var(--texture-size-md)
    var(--texture-opacity-5)
    var(--texture-blend-multiply);
  
  --material-kraft:
    var(--texture-svg-kraft)
    var(--texture-size-lg)
    var(--texture-opacity-6)
    var(--texture-blend-multiply);
  
  --material-watercolor:
    var(--texture-svg-watercolor)
    var(--texture-size-lg)
    var(--texture-opacity-7)
    var(--texture-blend-multiply);
}
```

---

## Part 11: Implementation Checklist

### Texture System Implementation

- [ ] **SVG Filter Definitions**
  - [ ] Create `<svg>` container with `width="0" height="0"` and `aria-hidden="true"`
  - [ ] Define filters with unique IDs for each material type
  - [ ] Include filters in document `<head>` or at start of `<body>`

- [ ] **CSS Token Setup**
  - [ ] Add texture frequency tokens to `:root`
  - [ ] Add opacity scale tokens
  - [ ] Add blend mode tokens
  - [ ] Add pre-encoded SVG URLs as custom properties

- [ ] **Base Texture Class**
  - [ ] Create `.paper-texture` or equivalent base class
  - [ ] Use `::before` pseudo-element for texture layer
  - [ ] Set `pointer-events: none` to prevent interaction blocking
  - [ ] Apply `position: relative` to parent element
  - [ ] Use `inset: 0` for full coverage

- [ ] **Material Variants**
  - [ ] Create texture classes for each paper type
  - [ ] Match texture frequency to material characteristics
  - [ ] Set appropriate opacity for each material

- [ ] **Blend Mode Selection**
  - [ ] Test `multiply` for light backgrounds
  - [ ] Test `soft-light` for dark backgrounds
  - [ ] Test `overlay` for mid-tones
  - [ ] Document which blend mode works best for each use case

- [ ] **Dark Mode Support**
  - [ ] Add `@media (prefers-color-scheme: dark)` rules
  - [ ] Adjust blend modes for dark backgrounds
  - [ ] Reduce opacity if needed in dark mode
  - [ ] Test all materials in both light and dark modes

- [ ] **Performance Optimization**
  - [ ] Limit `numOctaves` to 5 or fewer
  - [ ] Use reasonable `background-size` (100-300px typical)
  - [ ] Add `contain: paint` to textured containers
  - [ ] Consider reducing/removing texture on mobile
  - [ ] Implement progressive enhancement
  - [ ] Add `@media (prefers-reduced-motion: reduce)` fallback

- [ ] **Aging Effects**
  - [ ] Define aging filter presets
  - [ ] Create utility classes for aging levels
  - [ ] Add staining/foxing patterns if needed
  - [ ] Test aging effects with textures combined

- [ ] **Integration Testing**
  - [ ] Verify texture works with shadow system (Chunk 2)
  - [ ] Verify texture respects edge treatments (Chunk 3)
  - [ ] Test z-index stacking order
  - [ ] Confirm border-radius inheritance

- [ ] **Browser Testing**
  - [ ] Test in Chrome/Edge (Blink)
  - [ ] Test in Firefox (Gecko)
  - [ ] Test in Safari (WebKit)
  - [ ] Test on iOS Safari
  - [ ] Test on Android Chrome

---

## Appendices

### A. Browser Support Reference

| Feature | Chrome | Firefox | Safari | Edge | iOS Safari |
|---------|--------|---------|--------|------|------------|
| SVG `feTurbulence` | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| `feDiffuseLighting` | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| `feSpecularLighting` | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| `mix-blend-mode` | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| `background-blend-mode` | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| CSS `filter` | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Data URI SVG backgrounds | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |

### B. Common Mistakes and Solutions

| Mistake | Problem | Solution |
|---------|---------|----------|
| `numOctaves` too high | Slow rendering, janky scroll | Keep at 5 or below |
| Texture blocks clicks | Can't interact with content | Add `pointer-events: none` |
| Texture extends beyond corners | Visible outside rounded borders | Add `border-radius: inherit` |
| Muddy dark mode | Multiply on dark = too dark | Switch to `soft-light` blend |
| Texture too prominent | Distracts from content | Reduce opacity (0.05-0.10) |
| Visible tiling seams | Pattern doesn't tile seamlessly | Use `stitchTiles="stitch"` |
| Filter not applying | CSS filter URL wrong | Check filter ID matches exactly |
| Performance issues | Page becomes sluggish | Reduce complexity, add `contain` |

### C. Quick Reference Formulas

**Texture Frequency by Paper Weight:**
```
Bond (20lb):     baseFrequency ≈ 0.8-1.0
Text (50-60lb):  baseFrequency ≈ 0.5-0.7
Cover (65-80lb): baseFrequency ≈ 0.3-0.5
Card (100lb+):   baseFrequency ≈ 0.2-0.4
```

**Opacity by Context:**
```
Background texture: 0.03-0.06
Card/container:     0.06-0.10
Interactive element: 0.08-0.12
Decorative/hero:    0.12-0.20
```

**Blend Mode by Background Lightness:**
```
L > 70%:  multiply
L 30-70%: overlay or soft-light
L < 30%:  soft-light or screen
```

### D. Further Resources

- Sara Soueidan's SVG Filter Effects Series
- MDN Web Docs: SVG Filter Primitives
- CSS-Tricks: Grainy Gradients
- Smashing Magazine: SVG Displacement Filtering
- Codrops: feTurbulence Tutorial
- Lea Verou's CSS Patterns Gallery
- fffuel.co Noise Texture Generator

---

*Document complete. Proceed to Chunk 5: Interactive Behaviors & Components.*
