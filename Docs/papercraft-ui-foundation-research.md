# Papercraft UI Kit: Foundation Research
## Chunk 1 Deliverables — Principles, Constraints & Taxonomy

---

## Executive Summary

This document establishes the conceptual foundation for a papercraft UI component library built on shadcn/ui. It synthesizes insights from successful digital papercraft products (Tearaway, Paper Mario), lessons from the skeuomorphism era, and real paper physics to define the behavioral and material principles that will guide all subsequent design decisions.

**Core Philosophy:** *Behavior over appearance. Constraints over features. Cohesion over variety.*

---

## Part 1: Paper Physics Principles

### 1.1 The Tearaway Breakthrough

Media Molecule's Rex Crowle articulated the critical insight that separates successful papercraft design from mere texture application:

> "Because 3D software's designed to allow anything, it doesn't have any constraints on how you construct something, and constraints are often what forms a distinctive style."

The Tearaway team's breakthrough came when they:
1. **Removed texture entirely** — using bold construction paper colors instead of realistic paper grain
2. **Established material rules** — everything had to behave as if it could be built with real paper
3. **Built physical prototypes** — actually cutting and folding paper to validate digital designs

The result was a world that felt like paper, not just looked like paper.

### 1.2 The Paper Mario Evolution

Nintendo's Paper Mario series demonstrates how paper-ness can evolve from visual metaphor to core identity:

| Era | Approach | Paper Treatment |
|-----|----------|-----------------|
| N64 / TTYD | Storybook metaphor | Paper-ness as occasional visual gag |
| Sticker Star+ | Literal paper world | Environment textures emphasize craft construction |
| Origami King | Full commitment | Characters as actual 3D papercraft; physical mockups created |

Key insight from the development team:
> "We put great emphasis on players being able to get a sense of texture from how things look, so of course we prepare actual materials for our reference."

### 1.3 Real Paper Behavior

Paper exhibits distinct physical properties that must inform digital translation:

#### Mechanical Properties

| Property | Behavior | UI Implication |
|----------|----------|----------------|
| **Tensile strength** | Paper resists pulling/stretching | Elements shouldn't "stretch" — they tear or fold instead |
| **Compressive weakness** | Paper buckles under compression | Pressed states should show creasing, not uniform depression |
| **Elastic limit** | Returns to shape within limit; permanently deforms beyond | Hover states spring back; clicked states can show "memory" |
| **Anisotropy** | Different properties in different directions (grain) | Folds work better along certain axes |
| **Friction** | Varies by surface finish (glossy slides; matte grips) | Stack behavior differs by paper type |

#### Fold Mechanics

Paper folding creates permanent structural changes:

1. **Creasing damages the material** — each fold weakens the paper at that point
2. **Fold rest angle depends on history** — paper "remembers" how it was folded
3. **Folds create hinges** — rotation happens along the fold line, not arbitrarily
4. **Sharp folds vs. soft folds** — determined by paper weight and fold speed

#### Curl Behavior

Paper curls due to:
- Moisture differential between sides
- Built-in manufacturing stresses
- Gravity + paper weight

**UI Application:** Curled corners suggest interactivity (can be lifted), aging, or informality.

#### Shadow Behavior

Real paper shadows change based on:
- **Distance from surface** — closer = sharper, smaller; further = softer, larger
- **Paper edge angle** — curled edges cast different shadows than flat edges
- **Light direction** — paper catches light at edges differently than flat surfaces

### 1.4 The "Buildable in Real Life" Test

**For every component, ask: "Could someone cut this from paper and assemble it?"**

This test serves as the primary validation criterion for paper authenticity.

#### Test Protocol

1. **Sketch the component** as if designing a paper template
2. **Identify construction method:**
   - Is it cut from a single sheet?
   - Does it require folding?
   - Does it need multiple pieces glued together?
   - Does it require impossible geometry?
3. **Build a physical prototype** (recommended for key components)
4. **Evaluate translation fidelity:**
   - What works digitally that can't exist physically?
   - What physical properties are we losing?
   - Is the loss acceptable or does it break the metaphor?

#### Examples

| Component | Buildable? | Notes |
|-----------|------------|-------|
| Flat card | ✅ Yes | Single sheet, maybe folded |
| Card with shadow | ✅ Yes | Elevated above surface |
| Card that stretches | ❌ No | Paper tears, doesn't stretch |
| Rounded corners | ✅ Yes | Die-cut effect |
| Gradient fill | ⚠️ Partial | Requires colored paper or paint, not inherent |
| Glowing border | ❌ No | Paper doesn't emit light |
| Modal that fades in | ⚠️ Partial | Paper can't change opacity; can slide/fold into view |

---

## Part 2: Paper Constraints Document

### 2.1 The Power of Constraints

The Tearaway team chose paper specifically *because* of its limitations:

> "The world, the material of paper, was chosen because that would be the most tactile material to build a world out of."

Constraints force creative solutions and create visual coherence. Our UI library derives its identity from what paper *cannot* do.

### 2.2 The Paper Rules

These are inviolable properties of paper that define our design guardrails:

#### ❌ Paper Cannot Be Transparent

**Physical reality:** Paper is opaque. Even tissue paper is translucent, not transparent.

**UI Implications:**
- No `opacity: 0.5` overlays that show content beneath clearly
- Overlays should use frosted/blurred effects (like light through tissue) or solid colors
- Modals can't "fade in" — they slide, fold, or drop into view
- Consider: translucent tissue paper effect for subtle overlays (very light, barely-there)

**Allowed exceptions:**
- Tissue paper translucency (heavy blur + low contrast)
- Vellum/tracing paper effect (see-through but milky)

#### ❌ Paper Cannot Glow or Emit Light

**Physical reality:** Paper reflects light; it doesn't produce it.

**UI Implications:**
- No `box-shadow: 0 0 20px blue` glow effects
- No neon or backlit appearances
- Active/focus states must use other signals: elevation change, color change, border highlight
- Buttons don't "light up" — they lift, press, or change color

**Allowed alternatives:**
- Colored paper appears brighter (construction paper effect)
- Glossy paper reflects more light (sheen, not glow)
- Spotlight effect on paper surface (external light source)

#### ❌ Paper Cannot Stretch Infinitely

**Physical reality:** Paper tears before it stretches significantly.

**UI Implications:**
- Elements don't scale smoothly in all directions
- Resize behavior should suggest unfolding, adding sheets, or revealing hidden portions
- Infinite scroll should feel like a continuous roll or stack, not stretching
- Transitions should use fold/slide, not scale transforms

#### ❌ Paper Cannot Exist Without Edges

**Physical reality:** Every piece of paper has a defined boundary.

**UI Implications:**
- All elements must have visible or implied edges
- No elements that "bleed" into infinity
- Borders are inherent, not optional
- Edge treatment (clean, torn, folded) is a key design decision

#### ⚠️ Paper Cannot Change Color Smoothly

**Physical reality:** Paper is a fixed color. To change, you'd need to paint it (slow) or replace it (instant).

**UI Implications:**
- Color transitions should be instant or very fast
- No smooth gradient animations across an element
- State changes can swap paper colors, but shouldn't morph between them
- Consider: "flipping" to reveal different colored back

#### ❌ Paper Cannot Move Through Other Paper

**Physical reality:** Physical objects collide and stack; they don't pass through each other.

**UI Implications:**
- Layering must respect z-order absolutely
- Elements entering the viewport should slide over/under existing elements
- No elements that phase through each other
- Stack order must be visually clear via shadows and overlap

#### ❌ Paper Cannot Morph Shape Arbitrarily

**Physical reality:** To change shape, paper must be cut, folded, or torn.

**UI Implications:**
- Shape changes should suggest folding (corners), cutting (edges), or tearing
- No blob morphs or liquid transitions
- Icon animations should rotate/flip, not morph
- Loading indicators: spinning, folding, flipping — not morphing

### 2.3 Constraints Summary Table

| Constraint | Forbidden | Allowed Alternative |
|------------|-----------|---------------------|
| Transparency | `opacity < 1` showing clear content | Tissue blur, vellum effect, solid colors |
| Glowing | Box shadows with spread, neon effects | Elevation shadows, color highlights, sheen |
| Stretching | Scale transforms, rubber-band effects | Fold reveals, slide transitions, paper addition |
| Borderless | Edge-to-edge without boundary | Visible edges, implied shadows, torn edges |
| Color morphing | Smooth hue/saturation transitions | Instant color swap, flip to reveal, overlay |
| Phasing | Elements passing through each other | Slide over/under, proper z-index stacking |
| Arbitrary morphing | Blob shapes, liquid transitions | Fold, flip, rotate, cut |

---

## Part 3: Paper Material Taxonomy

### 3.1 Taxonomy Principles

Different paper types have distinct physical and behavioral properties that map to different UI use cases. By defining a constrained set of paper "materials," we ensure visual coherence while providing appropriate variety.

### 3.2 Paper Type Definitions

#### Type 1: Card Stock
**Real-world analog:** Business cards, index cards, playing cards

| Property | Value |
|----------|-------|
| Weight | 250-350 GSM |
| Rigidity | High — holds shape firmly |
| Fold behavior | Resists folding; creases sharply if forced |
| Edge character | Clean, precise (die-cut feel) |
| Surface | Smooth or lightly textured |
| Shadow | Defined, substantial |

**UI Use Cases:**
- Card components
- Buttons
- Badges (when substantial)
- Modal dialogs
- Navigation items

**Behavioral characteristics:**
- Lifts cleanly on hover (defined shadow growth)
- Returns crisply to resting position
- Pressed state shows slight depression, not curl

---

#### Type 2: Notebook Paper
**Real-world analog:** Lined paper, sketchbook pages, loose-leaf

| Property | Value |
|----------|-------|
| Weight | 70-100 GSM |
| Rigidity | Low — bends and curls easily |
| Fold behavior | Folds softly; can curl at corners |
| Edge character | Slightly rough or perforated feel |
| Surface | Matte, accepts writing |
| Shadow | Soft, shows curl |

**UI Use Cases:**
- Form inputs (text fields, textareas)
- Note components
- Editable content areas
- Lists and to-do items
- Written content areas

**Behavioral characteristics:**
- Can curl at corners on hover
- Slightly "soft" lift (less rigid than card stock)
- Suggests editability and impermanence

---

#### Type 3: Post-it / Sticky Note
**Real-world analog:** Sticky notes, adhesive tags

| Property | Value |
|----------|-------|
| Weight | 70-90 GSM |
| Rigidity | Low — very flexible |
| Fold behavior | Curls naturally; adhesive bottom edge |
| Edge character | Clean cut but curled corners |
| Surface | Matte, often brightly colored |
| Shadow | Asymmetric (adhered at top, lifted at bottom) |

**UI Use Cases:**
- Toast notifications
- Tooltips
- Tags and labels
- Temporary messages
- Quick notes

**Behavioral characteristics:**
- Appears "stuck" to surface at one edge
- Bottom/corner curls away from surface
- Suggests temporary, dismissible, attached-but-removable

---

#### Type 4: Tissue Paper
**Real-world analog:** Gift tissue, tracing paper, vellum

| Property | Value |
|----------|-------|
| Weight | 17-35 GSM |
| Rigidity | Very low — floaty and delicate |
| Fold behavior | Crumples easily; soft folds |
| Edge character | Soft, sometimes torn or ragged |
| Surface | Semi-translucent |
| Shadow | Minimal; diffuses light |

**UI Use Cases:**
- Overlays (with heavy blur)
- Background layers
- Decorative elements
- Dividers
- Skeleton loading states

**Behavioral characteristics:**
- Light, airy feel
- Suggests separation without hard boundary
- Semi-transparent but not clear
- Adds depth without weight

---

#### Type 5: Kraft / Corrugated
**Real-world analog:** Cardboard boxes, kraft paper bags, shipping materials

| Property | Value |
|----------|-------|
| Weight | 300+ GSM (kraft); much thicker (corrugated) |
| Rigidity | High — structural |
| Fold behavior | Resists folding; scores required for clean folds |
| Edge character | Raw, industrial, visible layers |
| Surface | Rough, brown, recycled aesthetic |
| Shadow | Heavy; material has real depth |

**UI Use Cases:**
- Headers and navigation bars
- Section dividers
- Structural containers
- Footer areas
- Grouped content wrappers

**Behavioral characteristics:**
- Feels substantial and grounding
- Doesn't lift easily (structural, not interactive)
- Provides visual "weight" to anchor layouts
- Eco-friendly, utilitarian aesthetic

---

#### Type 6: Construction Paper
**Real-world analog:** Craft paper, colored sugar paper

| Property | Value |
|----------|-------|
| Weight | 120-180 GSM |
| Rigidity | Medium — flexible but not floppy |
| Fold behavior | Folds well; holds soft creases |
| Edge character | Cut edges (clean) or torn (textured) |
| Surface | Matte, slightly textured, saturated colors |
| Shadow | Moderate |

**UI Use Cases:**
- Alert/warning banners
- Call-to-action sections
- Highlighted content
- Interactive panels
- Playful UI elements

**Behavioral characteristics:**
- Bold, saturated colors (the "Tearaway palette")
- Versatile — can be formal or playful
- Middle ground between card stock and notebook

---

### 3.3 Material Selection Matrix

| Component | Primary Material | Rationale |
|-----------|------------------|-----------|
| Card | Card Stock | Rigidity, clean edges, substantial feel |
| Button | Card Stock | Defined press behavior, durability |
| Dialog/Modal | Card Stock | Formal, important, attention-commanding |
| Toast | Post-it | Temporary, dismissible, attached |
| Tooltip | Post-it | Ephemeral, informational |
| Input/Textarea | Notebook | Editable, accepting, soft |
| Tabs | Card Stock | Folder tab metaphor |
| Accordion | Notebook | Foldable, reveals content |
| Header/Nav | Kraft | Structural, grounding |
| Overlay | Tissue | Separation without hard boundary |
| Badge/Tag | Post-it or Construction | Attached, labeled |
| Alert | Construction | Attention-grabbing color |
| Skeleton | Tissue | Placeholder, ephemeral |

### 3.4 Material Combinations

Some components benefit from combining materials:

- **Card with input:** Card Stock container + Notebook Paper text field
- **Modal with form:** Card Stock dialog + Notebook Paper form elements
- **Navigation with tabs:** Kraft header + Card Stock tab items
- **Toast with action:** Post-it body + Card Stock button

**Rule:** The container material should feel more substantial than its contents.

---

## Part 4: Lessons from Skeuomorphism

### 4.1 What Skeuomorphism Got Right

The skeuomorphic era (2007-2013) demonstrated the value of physical metaphor:

1. **Familiarity breeds usability** — Users understood interfaces faster when elements resembled real objects
2. **Affordance through appearance** — Raised buttons looked clickable; paper textures felt writable
3. **Emotional resonance** — Tactile richness created delight and engagement
4. **Visual hierarchy** — Shadows and depth clearly communicated layer relationships

### 4.2 What Skeuomorphism Got Wrong

The backlash against skeuomorphism revealed its pitfalls:

| Problem | Example | Lesson for Papercraft UI |
|---------|---------|--------------------------|
| **Decoration over function** | Leather stitching on calendar app | Ornament must serve purpose |
| **Inconsistent metaphors** | Mixing leather, wood, and metal in one app | Pick one material language |
| **Animation that slows** | Page flip transitions that took 2 seconds | Delight shouldn't impede |
| **Texture that obscures** | Heavy paper grain reducing text readability | Legibility > authenticity |
| **Space inefficiency** | Ornate borders wasting screen real estate | Content is primary |
| **Rapid dating** | Ornate designs looked "old" within 2 years | Timeless > trendy |

### 4.3 The Key Insight: Behavior vs. Appearance

The most important distinction:

> **Skeuomorphism of appearance:** Making things *look like* real objects (textures, gradients, photorealism)

> **Skeuomorphism of behavior:** Making things *act like* real objects (physics, constraints, interactions)

**Our approach:** Prioritize behavioral authenticity over visual authenticity.

A card doesn't need visible paper texture to feel like paper — it needs to:
- Cast a shadow that changes with elevation
- Lift on hover as if picked up
- Have edges that define its boundary
- Resist impossible behaviors (stretching, glowing, phasing)

### 4.4 The Flat Design Correction (and Over-Correction)

iOS 7's flat design addressed skeuomorphism's problems but created new ones:

**What flat design fixed:**
- Removed unnecessary ornament
- Improved performance (lighter assets)
- Created more flexible, scalable design
- Felt modern and clean

**What flat design broke:**
- Lost affordances (what's clickable?)
- Reduced visual hierarchy clarity
- Eliminated emotional warmth
- Made interfaces feel "cold" or "sterile"

### 4.5 Our Position: Behavioral Skeuomorphism

The Papercraft UI Kit occupies a specific position:

```
Pure Skeuomorphism ←——————————→ Pure Flat Design
        ↑
   [Papercraft UI]
   Behavioral authenticity
   Minimal visual ornamentation
   Constraint-driven coherence
```

**We will:**
- Use shadows, elevation, and edge treatments (depth cues)
- Enforce physical behavior constraints (no glowing, stretching, phasing)
- Maintain consistent material language (paper types)
- Prioritize content over decoration
- Keep animations purposeful and quick

**We won't:**
- Add paper texture for texture's sake
- Use photorealistic paper grain
- Add ornate borders or decorative elements
- Slow users down with elaborate transitions
- Sacrifice readability for authenticity

---

## Part 5: Design Principles Summary

### The Five Principles of Papercraft UI

#### 1. Behavior Over Appearance
What an element *does* matters more than how it *looks*. A card that lifts with realistic shadow change feels more like paper than a textured rectangle that doesn't respond to interaction.

#### 2. Constraints Over Features
The power of paper comes from what it *can't* do. Embrace limitations — they create coherence and force creative solutions.

#### 3. Cohesion Over Variety
Use a consistent material vocabulary. Everything in the system should feel like it belongs in the same paper world.

#### 4. Content Over Decoration
Paper is a surface for content, not an end in itself. Every paper effect should enhance readability and usability, never diminish it.

#### 5. Quick Over Elaborate
Paper is light and responsive. Animations should feel effortless — a quick lift, a soft settle — never laborious.

---

## Appendices

### Appendix A: Reference Material

#### Game Design Sources
- **Tearaway (Media Molecule)** — GDC 2013: "Building the Touchy-Feely World of Tearaway"
- **Paper Mario series (Nintendo/Intelligent Systems)** — VGC interview with development team
- **Florence (Mountains Studio)** — Paper-craft storytelling sequences

#### Design System Sources
- Material Design Elevation Guidelines
- Josh W. Comeau's shadow and fold tutorials
- Shopify Polaris depth tokens
- Atlassian elevation system

#### Physics References
- "The Physics of Paper" — Reports on Progress in Physics (2006)
- Paper curl mechanics research — Journal of Mechanical Science and Technology

### Appendix B: Terminology

| Term | Definition |
|------|------------|
| **GSM** | Grams per square meter — universal paper weight measurement |
| **Elevation** | The visual distance of an element above the surface, indicated by shadow |
| **Affordance** | Visual cue that suggests how an element can be used |
| **Material** | The paper type assigned to a component category |
| **Edge treatment** | How the boundary of a paper element is rendered (clean, torn, folded) |

### Appendix C: Quick Reference Card

**Can paper do this?**

| Action | Paper? | Alternative |
|--------|--------|-------------|
| Fade in/out | ❌ | Slide, fold, lift |
| Glow | ❌ | Color change, elevation |
| Stretch | ❌ | Unfold, reveal, add sheets |
| Pass through other paper | ❌ | Slide over/under |
| Change color smoothly | ❌ | Instant swap, flip |
| Exist without edges | ❌ | Always define boundaries |
| Be transparent | ⚠️ | Tissue blur, vellum effect |
| Curl at corners | ✅ | — |
| Cast shadows | ✅ | — |
| Fold along lines | ✅ | — |
| Stack with offset | ✅ | — |
| Tear | ✅ | — |

---

## Next Steps

With these foundational principles established, the next chunks of work can proceed:

1. **Chunk 2: Shadow & Elevation System** — Define the `--paper-elevation-{n}` tokens based on these behavioral principles
2. **Chunk 3: Edge Treatment System** — Catalog edge types (clean, torn, curled, folded) for each material
3. **Chunk 4: Color & Surface System** — Define the construction paper palette and texture strategy
4. **Chunk 5: Animation & Motion** — Establish physics-based animation tokens that respect paper constraints

---

*Document version: 1.0*  
*Research completed: January 2025*  
*Next review: After Chunk 2 completion*
