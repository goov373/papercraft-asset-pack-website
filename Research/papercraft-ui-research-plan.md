# Papercraft UI Kit: Comprehensive Research Plan

> **Purpose**: Gather all knowledge needed to build a UX/digital-optimized papercraft UI component library on shadcn/ui
> **Timeline**: 4 weeks of research before implementation
> **Output**: Design specifications, technical architecture, and validated prototypes

---

## Executive Summary

This research plan outlines the knowledge-gathering phase for building a **UX/digital-optimized papercraft UI component library** built on shadcn/ui. The plan is informed by practitioner insights from teams who shipped successful papercraft digital products (Tearaway, Paper Mario) and lessons learned from the skeuomorphism era.

### Core Philosophy (from Practitioner Research)

| Principle | Source | Implication |
|-----------|--------|-------------|
| **Behavior over appearance** | Tearaway team: "The first fold was a revelation" | Prioritize fold/lift mechanics over texture quality |
| **Constraints over features** | Tearaway: "Structures that can be duplicated in real life" | Define what paper CAN'T do before what it can |
| **Cohesion over variety** | Tearaway: "Tying it all together and making it cohesive" | Strict rules create unified feel |
| **Simplification wins** | Tearaway: "Using bold colors of construction paper and removing all other texture" | Flat colors may beat realistic textures |

### Critical Questions to Answer

1. **What's our "first fold"?** The single interaction that makes users say "this feels like paper"
2. **Can we ship v1 with zero texture images?** If not, we're over-relying on cosmetics
3. **What's our hamburger menu problem?** Digital-native patterns with no paper equivalent
4. **Who's our user?** Nostalgic adult vs. digital native—metaphor power varies dramatically
5. **What happens after novelty wears off?** Does paper metaphor help or hinder actual tasks?

---

## Research Phases Overview

| Phase | Focus | Duration | Priority |
|-------|-------|----------|----------|
| 1 | Paper Physics & Behavior | Week 1 | Critical |
| 2 | Constraint System Definition | Week 1 | Critical |
| 3 | Shadow/Elevation System | Week 2 | High |
| 4 | Edge Treatments | Week 2 | High |
| 5 | Color & Surface System | Week 2 | High |
| 6 | Animation & Motion | Week 3 | High |
| 7 | Component Mapping | Week 3 | Medium |
| 8 | Accessibility & Fallbacks | Week 3 | Critical |
| 9 | Technical Architecture | Week 4 | High |
| 10 | Documentation & Guidelines | Week 4 | Medium |

---

## Phase 1: Paper Physics & Behavior Research

### Why This Matters Most

The Tearaway team's key insight: "Moving away from it just being an art style, and it's a totally realistic treatment of paper." The breakthrough came when they could actually fold—not when they perfected textures.

### Research Tasks

#### 1.1 Physical Paper Behavior Study
**Objective**: Document how real paper behaves under manipulation

**Activities**:
- [ ] Film/photograph real paper being folded, curled, lifted, stacked
- [ ] Document shadow behavior at different elevations (1mm, 5mm, 10mm, 20mm)
- [ ] Test different paper weights: tissue, copy paper, cardstock, cardboard
- [ ] Record fold crease behavior (sharp vs. soft folds)
- [ ] Study how paper catches light at edges

**Deliverables**:
- Video reference library (10-15 clips)
- Shadow measurement documentation
- Paper behavior taxonomy

#### 1.2 Digital Paper Behavior Analysis
**Objective**: Study how successful products translate paper physics to digital

**Technical Resources to Implement**:

**CSS 3D Fold Basics** (from Josh Comeau):
```css
/* Parent container sets perspective */
.fold-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Fold element rotates from edge */
.fold-panel {
  transform-origin: top center;
  transform: rotateX(-90deg);
  transition: transform 0.5s ease-out;
  backface-visibility: hidden;
}

/* Reveal on interaction */
.fold-container:hover .fold-panel {
  transform: rotateX(0deg);
}
```

**Key 3D Transform Properties to Master**:
| Property | Purpose | Paper Application |
|----------|---------|-------------------|
| `perspective` | Viewing distance (200-2000px typical) | Lower = more dramatic folds |
| `transform-style: preserve-3d` | Enable true 3D space | Required for nested folds |
| `transform-origin` | Hinge point for rotation | Set to edge for paper folds |
| `backface-visibility` | Show/hide back of element | Paper backs visible |

**Products to Analyze**:
- **Tearaway/Tearaway Unfolded** - Focus on fold mechanics
- **Florence** (Mountains Studio) - Paper-craft storytelling
- **Paper Mario: Origami King** - Modern paper treatments

**Deliverables**:
- Annotated screenshots/recordings from each product
- Technical breakdown of observable behaviors
- "Paper physics principles" document

#### 1.3 The "First Fold" Prototype
**Objective**: Identify our signature interaction that makes users say "this feels like paper"

**Build These 3 Prototypes**:

1. **Card Lift** - Card that lifts on hover with realistic shadow change
   ```css
   .paper-card {
     transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
   }
   .paper-card:hover {
     transform: translateY(-4px) rotateX(2deg);
     box-shadow: 0 8px 16px rgba(0,0,0,0.15);
   }
   ```

2. **Corner Unfold** - Modal that unfolds from a corner
   - Use `transform-origin: bottom left`
   - Animate `rotateY()` from 90deg to 0deg
   
3. **Stack Cascade** - Dropdown that cascades like stacked papers
   - Each item slightly offset
   - Staggered animation timing

**Evaluation Criteria**:
- Does it feel like paper or just "styled div"?
- Could this theoretically be built with real paper?
- Is the interaction delightful or distracting?

---

## Phase 2: Constraint System Definition

### Why Constraints Matter

Tearaway's team: "The world, the material of paper, was chosen because that would be the most tactile material to build a world out of." They removed texture, used flat construction paper colors, and created rules about what paper CAN'T do.

### Research Tasks

#### 2.1 Define Paper Limitations
**Objective**: Document what paper cannot do (our design guardrails)

**Questions to Answer**:
- [ ] Can paper be transparent? (No → affects overlay design)
- [ ] Can paper glow or emit light? (No → affects active states)
- [ ] Can paper stretch infinitely? (No → affects resize behavior)
- [ ] Can paper exist without edges? (No → affects border treatment)
- [ ] Can paper change color smoothly? (Limited → affects transitions)
- [ ] Can paper move through other paper? (No → affects layering)

**Deliverable**: "Paper Rules" document with rationale for each constraint

#### 2.2 Paper Type Taxonomy
**Objective**: Define 3-5 paper "materials" for the system

**Proposed Categories**:
| Type | Real-World Analog | Use Case | Characteristics |
|------|-------------------|----------|-----------------|
| Card Stock | Business cards | Cards, Buttons | Rigid, clean edges, holds shape |
| Notebook | Lined paper | Forms, Inputs | Softer, can curl slightly |
| Post-it | Sticky notes | Toasts, Tags | Adhesive feel, slight curl |
| Tissue | Gift wrap | Overlays | Translucent, delicate |
| Corrugated | Cardboard | Headers, Nav | Thick, structural |

**Research Activities**:
- [ ] Study real examples of each paper type
- [ ] Define visual/behavioral characteristics for each
- [ ] Map to UI component categories
- [ ] Test combinations that work vs. feel wrong

**Deliverable**: Paper Material Specification

#### 2.3 "Buildable in Real Life" Test
**Objective**: Create validation criteria for all components

**The Test**: For every component, ask: "Could someone cut this from paper and assemble it?"

**Research Task**: 
- [ ] Create a paper craft template for one component (card)
- [ ] Actually build it physically
- [ ] Document what translates and what doesn't
- [ ] Use findings to refine digital approach

---

## Phase 3: Shadow & Elevation System

### Why This Matters

Josh W. Comeau: "Shadows imply elevation, and bigger shadows imply more elevation. If we use shadows strategically, we can create the illusion of depth."

Material Design uses a dp-based scale (1dp to 24dp). We need a paper-specific version that feels like paper resting on surfaces, not generic digital cards.

### Research Tasks

#### 3.1 Paper-Specific Shadow Study
**Objective**: Define shadow tokens that feel like paper, not generic material

**Reference Implementations to Study**:

**Material Design Shadow Scale** (from CodePen reference):
```scss
$shadow-key-umbra-opacity: 0.20;
$shadow-key-penumbra-opacity: 0.14;
$shadow-ambient-shadow-opacity: 0.12;

.shadow-2dp {
  box-shadow: 
    0 2px 2px 0 rgba(0, 0, 0, $shadow-key-penumbra-opacity),
    0 3px 1px -2px rgba(0, 0, 0, $shadow-key-umbra-opacity),
    0 1px 5px 0 rgba(0, 0, 0, $shadow-ambient-shadow-opacity);
}
```

**Josh Comeau Layered Shadow Technique**:
```css
.realistic-shadow {
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
}
```

**Key Questions to Answer**:
- [ ] How does paper shadow differ from glass/plastic shadow? (Softer, less defined edges)
- [ ] What's the minimum shadow for "resting on surface"? (Test 1-2px offset)
- [ ] What's the maximum before it looks floaty/digital? (Likely 16-24px)
- [ ] How should shadow change during interaction? (Gradual, not instant)

**Deliverable**: Paper Elevation Token Specification
```css
:root {
  /* Paper-specific shadows - softer than Material */
  --paper-shadow-rest: 
    0 1px 2px rgba(0,0,0,0.04),
    0 1px 3px rgba(0,0,0,0.08);
  
  --paper-shadow-raised: 
    0 2px 4px rgba(0,0,0,0.04),
    0 4px 8px rgba(0,0,0,0.08);
  
  --paper-shadow-floating: 
    0 4px 8px rgba(0,0,0,0.04),
    0 8px 16px rgba(0,0,0,0.08),
    0 16px 32px rgba(0,0,0,0.04);
  
  --paper-shadow-overlay: 
    0 8px 16px rgba(0,0,0,0.08),
    0 16px 32px rgba(0,0,0,0.12),
    0 24px 48px rgba(0,0,0,0.08);
}
```

#### 3.2 Shadow Animation Strategy
**Objective**: Define how shadows transition during interactions

**Performance Consideration**: Animating `box-shadow` directly is expensive. Options:
1. **Opacity transition on pseudo-element** (recommended)
2. **CSS filter: drop-shadow()** (less control)
3. **Precomputed shadow states** (simplest)

**Implementation Pattern**:
```css
.paper-card {
  position: relative;
  box-shadow: var(--paper-shadow-rest);
}

.paper-card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: var(--paper-shadow-floating);
  opacity: 0;
  transition: opacity 0.3s ease-out;
  pointer-events: none;
}

.paper-card:hover::after {
  opacity: 1;
}
```

#### 3.3 Shadow Color Investigation
**Objective**: Determine if paper shadows should be tinted

**Questions**:
- [ ] Do paper shadows pick up surface color? (Test with colored paper)
- [ ] Should shadows warm/cool based on paper color?
- [ ] How does this interact with dark mode?

**Draft Approach**:
```css
/* Warm shadows for warm paper */
--paper-shadow-warm: 0 4px 8px hsla(30, 20%, 20%, 0.12);

/* Cool shadows for cool paper */  
--paper-shadow-cool: 0 4px 8px hsla(220, 20%, 20%, 0.12);

/* Neutral default */
--paper-shadow-neutral: 0 4px 8px hsla(0, 0%, 0%, 0.12);
```

---

## Phase 4: Edge Treatment System

### Why Edges Matter

Paper IS its edges. Every paper object has a visible, defined boundary. This is what separates paper design from generic card-based UI.

### Research Tasks

#### 4.1 Edge Type Catalog
**Objective**: Define implementable edge treatments

**Implementation Approaches**:

| Edge Type | Real Example | CSS Approach | Complexity |
|-----------|--------------|--------------|------------|
| Clean Cut | Laser cut | `border-radius: 0` | Simple |
| Rounded Corner | Die cut | `border-radius: 2-4px` | Simple |
| Torn | Ripped paper | SVG filter + mask | Complex |
| Deckled | Handmade paper | SVG filter | Complex |
| Curled Corner | Post-it | Pseudo-element + gradient | Medium |
| Folded Edge | Origami | 3D transform + pseudo | Medium |

#### 4.2 SVG Filter Implementation
**Objective**: Master feTurbulence for procedural edges

**Basic Rough Edge Filter**:
```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <filter id="paper-rough-edge">
    <feTurbulence 
      type="fractalNoise" 
      baseFrequency="0.04" 
      numOctaves="5" 
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
</svg>
```

**Usage**:
```css
.paper-torn-edge {
  filter: url(#paper-rough-edge);
}
```

**TornPaper.js Integration** (https://github.com/happy358/TornPaper):
```javascript
new Tornpaper({
  filterName: "filter_tornpaper",
  seed: 1,                    // Consistent randomness
  tornFrequency: 0.05,        // Edge roughness (0 = none)
  tornScale: 10,              // Tear size
  grungeFrequency: 0.03,      // Surface texture (0 = none)
  grungeScale: 3              // Texture intensity
});
```

#### 4.3 Paper Texture Filter (Pure CSS/SVG)
**Objective**: Create paper surface texture without images

**Rough Paper Texture** (from Codrops):
```svg
<filter id="paper-texture">
  <feTurbulence 
    type="fractalNoise" 
    baseFrequency="0.04" 
    numOctaves="5" 
    result="noise"
  />
  <feDiffuseLighting 
    in="noise" 
    lighting-color="#ffffff" 
    surfaceScale="2"
  >
    <feDistantLight azimuth="45" elevation="60"/>
  </feDiffuseLighting>
</filter>
```

**Performance Consideration**: SVG filters are expensive. Use sparingly:
- ✅ Hero cards, featured elements
- ✅ Static decorative elements
- ❌ Lists with many items
- ❌ Animated elements

#### 4.4 Curled Corner Effect (CSS Only)
**Objective**: Post-it note corner curl

**Implementation**:
```css
.paper-curl {
  position: relative;
}

.paper-curl::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    transparent 50%,
    rgba(0,0,0,0.03) 50%,
    rgba(0,0,0,0.08) 100%
  );
  box-shadow: -2px -2px 5px rgba(0,0,0,0.1);
  border-radius: 0 0 0 10px;
}

/* Hover lifts the curl */
.paper-curl:hover::before {
  transform: translate(2px, 2px);
  box-shadow: -4px -4px 8px rgba(0,0,0,0.15);
}
```

#### 4.5 Edge Selection Guidelines
**Objective**: Define when each edge type is appropriate

| Edge Type | Use Case | Components |
|-----------|----------|------------|
| Clean cut | Formal, precise | Forms, Data tables, Buttons |
| Rounded | Friendly, approachable | Cards, Dialogs |
| Torn | Informal, playful | Notes, Alerts, Callouts |
| Curled | Interactive hint | Post-its, Sticky notes, Draggables |
| Folded | Section divisions | Accordions, Collapsibles |

**Research Tasks**:
- [ ] Implement each edge type as isolated demo
- [ ] Test browser compatibility (Safari filter issues?)
- [ ] Measure performance impact
- [ ] Determine which are worth including in v1

---

## Phase 5: Color & Surface System

### Why Flat Color May Beat Texture

Tearaway removed texture entirely: "Using the bold colors of construction paper and removing all other texture. So that the world was much closer to how it might look if you tried to make it in real-life."

### Research Tasks

#### 5.1 Construction Paper Palette
**Objective**: Define a color system that reads as "paper"

**Research Activities**:
- [ ] Sample colors from real construction paper pack
- [ ] Compare to shadcn base color tokens
- [ ] Test colors on screen vs. physical paper
- [ ] Define paper-specific color tokens

**Proposed Token Structure**:
```css
/* Paper Surface Colors */
--paper-white: /* not pure white - slightly warm */
--paper-cream: /* aged/recycled paper feel */
--paper-kraft: /* brown kraft paper */
--paper-red: /* construction paper red */
--paper-blue: /* construction paper blue */
/* ... etc */
```

#### 5.2 Texture: Yes, No, or Optional?
**Objective**: Decide library's texture strategy

**Options to Test**:
1. **No texture** (Tearaway approach)
   - Pure flat colors
   - Paper-ness from edges/shadows only
   
2. **Subtle noise** (lightweight)
   - CSS filter grain
   - Very low opacity
   
3. **Optional texture layer**
   - User can enable/disable
   - Background image overlay

**Research Activities**:
- [ ] Build same component with each approach
- [ ] Test with users (A/B)
- [ ] Measure performance difference
- [ ] Make recommendation

#### 5.3 shadcn Color Integration
**Objective**: Map paper colors to shadcn's token system

**shadcn's Token Structure**:
```css
--background
--foreground
--primary / --primary-foreground
--secondary / --secondary-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--destructive / --destructive-foreground
--border
--ring
```

**Research Task**:
- [ ] Define paper-appropriate values for each token
- [ ] Test theme switching (light/dark)
- [ ] Document any additions needed

---

## Phase 6: Animation & Motion System

### Why Paper Animation is Different

Paper has weight but is light. It resists sharp direction changes. It folds along axes, not arbitrarily. It can flutter, drift, settle. Spring physics are essential—linear animations feel robotic for paper.

### Research Tasks

#### 6.1 Paper Motion Principles
**Objective**: Define physics-informed animation rules

**Key Behaviors to Codify**:
| Action | Paper Behavior | Spring Config (Framer Motion) |
|--------|----------------|-------------------------------|
| Lift | Gradual rise, shadow grows | `stiffness: 300, damping: 25` |
| Drop/Settle | Lands with slight bounce | `stiffness: 400, damping: 30, mass: 0.8` |
| Fold | Hinges along axis | Use `rotateX/Y` with linear at hinge |
| Flutter | Oscillates, dampens | `stiffness: 100, damping: 8` |
| Slide | Friction, decelerates | `ease-out` or inertia |
| Stack | Offsets accumulate | Stagger with slight random offset |

#### 6.2 Framer Motion Spring Configuration
**Objective**: Define paper-specific spring values

**Physics Parameters** (from Framer Motion docs):
```javascript
// Spring types in Framer Motion
const paperSprings = {
  // Quick, snappy response (buttons, small elements)
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.5
  },
  
  // Gentle, paper-like (cards lifting)
  gentle: {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 0.8
  },
  
  // Bouncy, playful (notifications, toasts)
  bouncy: {
    type: "spring",
    stiffness: 300,
    damping: 15,
    mass: 0.6
  },
  
  // Slow, deliberate (modals, overlays)
  deliberate: {
    type: "spring",
    stiffness: 150,
    damping: 25,
    mass: 1
  }
};
```

**Duration-Based Alternative** (simpler):
```javascript
// When you need predictable timing
const paperTiming = {
  type: "spring",
  duration: 0.4,    // Total time
  bounce: 0.2       // 0 = no bounce, 1 = very bouncy
};
```

**Understanding Parameters**:
| Parameter | Effect | Paper Sweet Spot |
|-----------|--------|------------------|
| `stiffness` | Higher = snappier | 150-400 |
| `damping` | Higher = less oscillation | 15-30 |
| `mass` | Higher = slower, heavier | 0.5-1.0 |
| `bounce` | 0-1, how much overshoot | 0.1-0.3 |

#### 6.3 CSS-Only Animation Fallback
**Objective**: Define non-spring easings for projects without Framer Motion

**Paper-Appropriate Easings**:
```css
:root {
  /* Quick start, gentle settle (lift) */
  --paper-ease-lift: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Gravity feel (drop) */
  --paper-ease-drop: cubic-bezier(0.0, 0, 0.2, 1);
  
  /* Friction (slide) */
  --paper-ease-slide: cubic-bezier(0.25, 0.1, 0.25, 1);
  
  /* Slight overshoot (bounce) */
  --paper-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### 6.4 Duration Scale
**Objective**: Define appropriate animation lengths

**Token Scale**:
```css
:root {
  --paper-duration-instant: 100ms;  /* Micro-interactions, color changes */
  --paper-duration-fast: 150ms;     /* Hover states, small movements */
  --paper-duration-normal: 250ms;   /* Card lifts, standard transitions */
  --paper-duration-slow: 400ms;     /* Modal open, page transitions */
  --paper-duration-deliberate: 600ms; /* Complex reveals, storytelling */
}
```

**WCAG Guidance**: Keep UI animations under 5 seconds. Provide reduced-motion alternatives.

#### 6.5 Reduced Motion Strategy
**Objective**: Define fallbacks for `prefers-reduced-motion`

**Implementation Pattern**:
```css
/* Default: full animation */
.paper-card {
  transition: 
    transform var(--paper-duration-normal) var(--paper-ease-lift),
    box-shadow var(--paper-duration-normal) var(--paper-ease-lift);
}

.paper-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--paper-shadow-raised);
}

/* Reduced motion: instant state changes */
@media (prefers-reduced-motion: reduce) {
  .paper-card {
    transition: none;
  }
  
  .paper-card:hover {
    transform: none; /* Skip movement entirely */
    /* Shadow change is fine—not motion */
  }
}
```

**Framer Motion Reduced Motion**:
```javascript
import { useReducedMotion } from "framer-motion";

function PaperCard() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={shouldReduceMotion ? { duration: 0 } : paperSprings.gentle}
    />
  );
}
```

---

## Phase 7: Component Mapping

### Strategy: Transform, Don't Invent

We're building ON shadcn, not replacing it. Map each shadcn component to paper treatment.

### Research Tasks

#### 7.1 Component Affinity Analysis
**Objective**: Rate how naturally each shadcn component maps to paper

**Analysis Matrix**:

| Component | Affinity | Paper Metaphor | Notes |
|-----------|----------|----------------|-------|
| Card | ★★★★★ | Index card, postcard | Natural fit |
| Button | ★★★★☆ | Paper button, cut-out | Needs pressed state thinking |
| Dialog | ★★★★★ | Letter, note | Fold-open opportunity |
| Toast | ★★★★★ | Post-it, sticky note | Curl effect |
| Tabs | ★★★★☆ | Folder tabs, dividers | Classic metaphor |
| Accordion | ★★★★★ | Folded paper | Core paper interaction |
| Input | ★★★☆☆ | Form field on paper | Needs careful treatment |
| Select | ★★★☆☆ | Dropdown list | Less natural |
| Slider | ★★☆☆☆ | No direct analog | May skip paper treatment |
| Toggle | ★★☆☆☆ | No direct analog | May skip paper treatment |
| Table | ★★★☆☆ | Spreadsheet paper | Grid lines help |
| Tooltip | ★★★★☆ | Speech bubble, callout | Pop-up note |
| Alert | ★★★★★ | Warning notice | High contrast paper |
| Badge | ★★★★☆ | Sticker, label | Adhesive feel |
| Avatar | ★★★☆☆ | Photo cutout | Interesting challenge |
| Skeleton | ★★☆☆☆ | Blank paper? | May keep minimal |
| Progress | ★★★☆☆ | Paper strip? | Creative interpretation |

#### 7.2 Deep Dives: High-Affinity Components
**Objective**: Research paper-specific treatments for natural-fit components

**For each high-affinity component**:
- [ ] Find 3-5 real-world paper examples
- [ ] Document visual characteristics
- [ ] Sketch paper-specific states (default, hover, active, disabled)
- [ ] Note any unique behaviors

**Priority Components**:
1. Card
2. Button
3. Dialog/Sheet
4. Tabs
5. Accordion

#### 7.3 Challenge Components
**Objective**: Decide approach for low-affinity components

**Options**:
1. **Paper-neutral**: Minimal treatment, just color/shadow consistency
2. **Creative interpretation**: Find unexpected paper metaphor
3. **Exclude from paper scope**: Standard shadcn styling

---

## Phase 8: Accessibility & Fallbacks

### Critical Requirements

WCAG compliance is non-negotiable. Paper styling must enhance, never hinder, accessibility.

### Research Tasks

#### 8.1 Reduced Motion Strategy
**Objective**: Define fallbacks for prefers-reduced-motion

**Resources**:
- W3C WCAG 2.3.3 guidance: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- CSS-Tricks prefers-reduced-motion: https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/

**Implementation Pattern**:
```css
/* Full motion by default */
.paper-card {
  transition: transform 300ms var(--paper-ease-lift),
              box-shadow 300ms var(--paper-ease-lift);
}

/* Reduced motion: instant changes, no transform */
@media (prefers-reduced-motion: reduce) {
  .paper-card {
    transition: none;
  }
}
```

**Research Tasks**:
- [ ] Audit all planned animations
- [ ] Define reduced-motion alternatives for each
- [ ] Test with OS reduced motion enabled
- [ ] Document reduced motion design guidelines

#### 8.2 Contrast & Readability
**Objective**: Ensure paper colors meet WCAG contrast requirements

**Requirements**:
- 4.5:1 contrast for normal text
- 3:1 contrast for large text and UI components
- Focus indicators visible against all surfaces

**Research Tasks**:
- [ ] Test all paper colors for contrast compliance
- [ ] Define accessible text colors for each paper surface
- [ ] Ensure shadows don't reduce text contrast
- [ ] Test focus states on all paper surfaces

#### 8.3 Screen Reader Considerations
**Objective**: Ensure paper metaphors don't confuse AT users

**Guidelines to Develop**:
- Paper-specific language in aria-labels? (Probably no)
- Do fold animations need announcement?
- Stack order vs. reading order

#### 8.4 High Contrast Mode
**Objective**: Define appearance in forced-colors/high-contrast modes

**Research Tasks**:
- [ ] Test components in Windows High Contrast
- [ ] Define forced-colors overrides
- [ ] Ensure functionality without shadows/texture

---

## Phase 9: Technical Architecture

### Building on shadcn

shadcn provides headless primitives from Radix + Tailwind styling. We add a paper visual layer. Key advantage: we get accessibility, keyboard navigation, and focus management for free.

### Research Tasks

#### 9.1 shadcn Token System Integration
**Objective**: Design CSS variable structure that extends shadcn's existing system

**shadcn's Existing Token Structure**:
```css
/* shadcn base tokens (DO NOT MODIFY) */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

**Paper Extension Layer**:
```css
:root {
  /* Paper-specific primitives */
  --paper-shadow-color: 220 10% 20%;
  --paper-edge-roughness: 0.04;
  
  /* Paper elevation shadows */
  --paper-shadow-rest: 
    0 1px 2px hsl(var(--paper-shadow-color) / 0.04),
    0 2px 4px hsl(var(--paper-shadow-color) / 0.08);
  --paper-shadow-raised: 
    0 2px 4px hsl(var(--paper-shadow-color) / 0.06),
    0 4px 8px hsl(var(--paper-shadow-color) / 0.1);
  --paper-shadow-floating: 
    0 4px 8px hsl(var(--paper-shadow-color) / 0.06),
    0 8px 16px hsl(var(--paper-shadow-color) / 0.1),
    0 16px 32px hsl(var(--paper-shadow-color) / 0.06);
  
  /* Paper surface colors (extend shadcn palette) */
  --paper-white: 40 30% 98%;      /* Slightly warm white */
  --paper-cream: 40 40% 95%;      /* Aged paper */
  --paper-kraft: 30 40% 75%;      /* Brown paper */
  
  /* Paper animation tokens */
  --paper-duration-fast: 150ms;
  --paper-duration-normal: 250ms;
  --paper-duration-slow: 400ms;
  --paper-ease-lift: cubic-bezier(0.4, 0, 0.2, 1);
  --paper-ease-drop: cubic-bezier(0.0, 0, 0.2, 1);
}
```

#### 9.2 Component Extension Pattern
**Objective**: Define how to extend shadcn components without breaking updates

**Recommended Approach: Wrapper Components with CVA Variants**

**Example: PaperCard extending shadcn Card**:
```tsx
// components/paper/paper-card.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const paperCardVariants = cva(
  // Base paper styles
  "relative transition-all duration-[var(--paper-duration-normal)]",
  {
    variants: {
      elevation: {
        rest: "shadow-[var(--paper-shadow-rest)]",
        raised: "shadow-[var(--paper-shadow-raised)]",
        floating: "shadow-[var(--paper-shadow-floating)]",
      },
      edge: {
        clean: "rounded-sm",
        soft: "rounded-md",
        // torn: handled via SVG filter
      },
      lift: {
        true: "hover:-translate-y-1 hover:shadow-[var(--paper-shadow-raised)]",
        false: "",
      }
    },
    defaultVariants: {
      elevation: "rest",
      edge: "soft",
      lift: true,
    },
  }
)

export interface PaperCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paperCardVariants> {}

const PaperCard = React.forwardRef<HTMLDivElement, PaperCardProps>(
  ({ className, elevation, edge, lift, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-[hsl(var(--paper-white))]",
        paperCardVariants({ elevation, edge, lift }),
        className
      )}
      {...props}
    />
  )
)
PaperCard.displayName = "PaperCard"

export { PaperCard, paperCardVariants }
```

#### 9.3 Animation Library Decision
**Objective**: Choose animation approach

**Recommendation: Layered Approach**

| Layer | Technology | Use Case |
|-------|------------|----------|
| Base | CSS transitions | Simple hover/focus states |
| Enhanced | Framer Motion | Springs, gestures, complex sequences |
| Fallback | CSS only | Reduced motion, no-JS |

**Bundle Size Considerations**:
- CSS only: 0kb additional
- Framer Motion: ~25kb gzipped
- Motion One (alternative): ~3kb gzipped

**Decision Criteria**:
- [ ] Does library support `useReducedMotion`?
- [ ] Can we tree-shake unused features?
- [ ] Does it support gesture recognition (for drag)?

#### 9.4 File Structure
**Objective**: Define component organization

```
components/
├── ui/                    # Standard shadcn components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── paper/                 # Paper-styled components
│   ├── paper-card.tsx
│   ├── paper-button.tsx
│   ├── paper-dialog.tsx
│   └── index.ts
├── paper-primitives/      # Low-level paper utilities
│   ├── paper-surface.tsx
│   ├── paper-edge.tsx
│   └── paper-shadow.tsx
└── paper-filters/         # SVG filter definitions
    └── filters.tsx
```

#### 9.5 Performance Budget
**Objective**: Define acceptable performance overhead

**Constraints**:
| Metric | Budget | Measurement |
|--------|--------|-------------|
| Additional CSS | < 8kb gzipped | Build output |
| Additional JS | < 15kb gzipped | Bundle analyzer |
| First paint impact | < 50ms | Lighthouse |
| Animation frame | < 16ms | Chrome DevTools |
| SVG filter render | < 100ms | Performance profiler |

**Research Tasks**:
- [ ] Baseline shadcn performance (Lighthouse)
- [ ] Measure paper additions incrementally
- [ ] Identify optimization opportunities
- [ ] Test on low-end devices

---

## Phase 10: Documentation & Guidelines

### What Practitioners Told Us

"Mostly it's tying it all together and making it cohesive. It would be so much easier to make a bunch of mini-games and not have to worry about how you make them part of a cohesive fantasy world."

Documentation must enable cohesion.

### Research Tasks

#### 10.1 "When to Use Paper" Guidelines
**Objective**: Help users know when paper treatment is appropriate

**Draft Questions for Guidelines**:
- Is this element meant to feel tangible/physical? → Paper
- Is this element purely functional? → Maybe not
- Would paper metaphor add clarity or confusion?
- Is there a real-world paper analog?

#### 10.2 Anti-Patterns Document
**Objective**: Define what NOT to do

**Known Anti-Patterns from Skeuomorphism Era**:
- Over-decorating functional UI
- Inconsistent metaphors within one screen
- Animations that slow users down
- Textures that reduce readability
- Paper effects on elements with no paper analog

#### 10.3 Example Gallery
**Objective**: Show cohesive paper UI implementations

**Examples to Build**:
- [ ] Note-taking app screen
- [ ] Task board (Trello-style)
- [ ] Document viewer
- [ ] Settings panel
- [ ] Marketing landing page section

---

## Resource Library

### Primary Technical Resources

| Category | Resource | URL | Key Learning |
|----------|----------|-----|--------------|
| **3D Transforms** | Josh Comeau - Folding the DOM | https://joshwcomeau.com/react/folding-the-dom/ | Complete fold implementation in React |
| **3D Transforms** | Desandro - 3D Transform Perspective | https://3dtransforms.desandro.com/perspective | Perspective fundamentals |
| **3D Transforms** | Codrops - 3D Folding Layout | https://tympanus.net/codrops/2020/01/14/3d-folding-technique/ | Multi-fold page techniques |
| **3D Transforms** | Polypane - CSS 3D Examples | https://polypane.app/css-3d-transform-examples/ | Curated transform recipes |
| **Shadows** | Josh Comeau - Designing Shadows | https://www.joshwcomeau.com/css/designing-shadows/ | Layered shadow technique |
| **Shadows** | Material Design - Elevation | https://m3.material.io/styles/elevation | Systematic elevation tokens |
| **Shadows** | Atlassian - Elevation System | https://atlassian.design/foundations/elevation/ | Production token examples |
| **Edge Effects** | TornPaper.js | https://github.com/happy358/TornPaper | SVG torn edge library |
| **Edge Effects** | Codrops - feTurbulence | https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ | Procedural texture filters |
| **Animation** | Framer Motion - Transitions | https://www.framer.com/motion/transition/ | Spring physics config |
| **Animation** | Physics of Springs | https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/ | Understanding stiffness/damping |
| **shadcn** | Theming Guide | https://ui.shadcn.com/docs/theming | CSS variable system |
| **shadcn** | Changelog/Styles | https://ui.shadcn.com/docs/changelog | New style system (Vega, Nova, etc.) |
| **Accessibility** | WCAG Animation | https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html | Motion requirements |
| **Accessibility** | prefers-reduced-motion | https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/ | Implementation patterns |
| **Colors** | Coolors | https://coolors.co/ | Palette generation/testing |
| **Colors** | Matt Ström - Generating Palettes | https://matthewstrom.com/writing/generating-color-palettes/ | Algorithmic color systems |

### Case Study References

| Source | Focus | Key Insight |
|--------|-------|-------------|
| Tearaway GDC Talks | Paper behavior philosophy | "Moving away from it just being an art style" |
| Media Molecule Interviews | Constraint-driven design | "Structures that can be duplicated in real life" |
| Paper Mario Evolution | Long-term paper style | 25+ years of consistent visual language |
| Skeuomorphism Post-Mortems | What went wrong | "Sacrificed interface scalability, navigability" |

### CodePen Examples to Study

| Effect | URL | Relevance |
|--------|-----|-----------|
| Rough Paper Texture | https://codepen.io/Chokcoco/pen/OJWLXPY | SVG filter paper texture |
| Ripped Paper Edge | https://codepen.io/kkl/pen/bVKeNw | SVG ripped edge technique |
| CSS 3D Folding | https://davidwalsh.name/folding-animation | Basic fold mechanics |
| Material Elevation | https://codepen.io/owens/pen/ZKeevY | Shadow scale reference |

---

## Success Criteria

At the end of this research phase, we should have:

### Documents (Required)
| Document | Purpose | Format |
|----------|---------|--------|
| Paper Physics Principles | Behavior rules for all components | Markdown spec |
| Paper Constraints | What paper CAN'T do (guardrails) | Decision tree |
| Elevation Token Spec | Shadow values for all levels | CSS variables |
| Animation Token Spec | Spring configs + easings | JS + CSS |
| Component Affinity Matrix | Which components get paper treatment | Spreadsheet |
| Accessibility Guidelines | Reduced motion, contrast, focus | Checklist |
| Technical ADR | Architecture decisions with rationale | ADR format |

### Prototypes (Required)
| Prototype | Purpose | Success Metric |
|-----------|---------|----------------|
| "First Fold" interaction | Signature paper behavior | User says "feels like paper" |
| Shadow elevation demo | Visual shadow scale | Matches physical reference |
| Edge treatment sampler | All edge types | Browser compat verified |
| Animation timing demos | Spring presets | Matches video reference |
| PaperCard component | Full implementation | Works with shadcn |

### Validation Checkpoints
- [ ] **Physical test**: Built one component as actual paper craft
- [ ] **Reduced motion**: All animations have static fallbacks
- [ ] **Contrast**: All text/surface combos meet WCAG AA (4.5:1)
- [ ] **Performance**: Lighthouse score within 5 points of baseline shadcn
- [ ] **Bundle size**: Additional code < 20kb gzipped total

---

## Research Schedule

### Week 1: Foundations
| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1-2 | Physical paper study | Video references, behavior notes |
| 3-4 | Digital case studies | Tearaway/Paper Mario analysis |
| 5 | "First Fold" prototyping | 3 interaction prototypes |

### Week 2: Visual Systems
| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1-2 | Shadow/elevation system | Token specification |
| 3-4 | Edge treatments | Implementation demos |
| 5 | Color system | Palette + shadcn mapping |

### Week 3: Motion & Components
| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1-2 | Animation system | Spring presets + CSS fallbacks |
| 3-4 | Component mapping | Affinity matrix |
| 5 | Accessibility audit | Reduced motion + contrast |

### Week 4: Architecture & Documentation
| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1-2 | Technical architecture | ADR + file structure |
| 3-4 | First component (Card) | Working PaperCard |
| 5 | Documentation | Usage guidelines |

---

## Next Steps After Research

### Phase 1: Token Implementation (Week 5)
- Build CSS variable system
- Create Tailwind plugin for paper utilities
- Test dark mode compatibility

### Phase 2: Base Utilities (Week 6)
- Paper surface classes
- Shadow utilities
- Edge treatment utilities

### Phase 3: Core Components (Weeks 7-8)
- PaperCard
- PaperButton
- PaperDialog
- PaperToast

### Phase 4: Extended Components (Weeks 9-10)
- PaperTabs
- PaperAccordion
- PaperDropdown

### Phase 5: Documentation & Launch (Weeks 11-12)
- Interactive documentation site
- Figma component library
- npm package release

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Over-decoration** | Strict constraints document; "buildable IRL" test |
| **Performance issues** | Budget defined; test on low-end devices |
| **Accessibility gaps** | Reduced motion audit; contrast checking |
| **Scope creep** | Component affinity matrix; clear v1 boundary |
| **Skeuomorphism trap** | Regular "novelty test": does this help after 5 minutes? |

---

*This research plan prioritizes behavior over appearance, constraints over features, and digital optimization over visual fidelity. The goal is a UI library that feels like paper, not just looks like paper.*
