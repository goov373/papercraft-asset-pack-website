# Papercraft UI Design Rules

> Simplified design rules extracted from comprehensive research. Optimized for AI agent consumption.

---

## Core Philosophy

| Principle | Rule |
|-----------|------|
| **Behavior over appearance** | Prioritize how elements move/respond over how they look statically |
| **Constraints over features** | Define what paper CAN'T do before adding features |
| **Cohesion over variety** | Strict rules create unified feel; limit material types |
| **Simplification wins** | Flat colors beat realistic textures |

---

## Paper Constraints (Hard Rules)

These are inviolable. Paper CANNOT:

| Constraint | Forbidden | Use Instead |
|------------|-----------|-------------|
| **Transparency** | `opacity < 1` showing content clearly | Solid colors, tissue blur effect, vellum overlay |
| **Glow/emit light** | `box-shadow` with spread, neon effects | Elevation shadows, color highlights |
| **Stretch** | Scale transforms, rubber-band effects | Fold reveals, slide transitions |
| **Exist without edges** | Borderless/infinite bleed | Always define visible boundaries |
| **Smooth color morph** | Gradient color transitions | Instant color swap, flip to reveal |
| **Phase through** | Elements passing through each other | Slide over/under, proper z-stacking |
| **Arbitrary morph** | Blob shapes, liquid transitions | Fold, flip, rotate, cut |

---

## Paper Material Types

Use only these 6 materials. Each maps to specific components:

### 1. Card Stock
- **Feel**: Rigid, clean edges, holds shape
- **Use for**: Cards, Buttons, Modals, Navigation items
- **Shadow**: Defined, substantial
- **Behavior**: Lifts cleanly, returns crisply

### 2. Notebook Paper
- **Feel**: Soft, bends easily, can curl at corners
- **Use for**: Form inputs, Text areas, Editable content, Lists
- **Shadow**: Soft, shows curl
- **Behavior**: Suggests editability, impermanence

### 3. Sticky Note (Post-it)
- **Feel**: Flexible, adhered at one edge, curls at opposite
- **Use for**: Toasts, Tooltips, Tags, Temporary messages
- **Shadow**: Asymmetric (stuck at top, lifted at bottom)
- **Behavior**: Dismissible, attached-but-removable

### 4. Tissue Paper
- **Feel**: Delicate, semi-translucent, floaty
- **Use for**: Overlays, Background layers, Dividers, Skeleton states
- **Shadow**: Minimal, diffuses light
- **Behavior**: Light, airy, separation without hard boundary

### 5. Kraft/Corrugated
- **Feel**: Heavy, structural, industrial
- **Use for**: Headers, Navigation bars, Section dividers, Footers
- **Shadow**: Heavy, grounded
- **Behavior**: Doesn't lift (structural, not interactive)

### 6. Construction Paper
- **Feel**: Medium weight, bold colors, versatile
- **Use for**: Alerts, CTAs, Highlighted content, Interactive panels
- **Shadow**: Moderate
- **Behavior**: Can be formal or playful

---

## Elevation System

Only 4 levels. Maps to physical paper states:

| Level | Name | Physical State | Components |
|-------|------|----------------|------------|
| 0 | `flat` | Paper on desk | Backgrounds, disabled states |
| 1 | `raised` | Slight corner curl | Cards, inputs, default state |
| 2 | `lifted` | Held at edges | Hover states, dropdowns |
| 3 | `floating` | Paper in hand | Modals, drag states |

### Elevation Behavior by Component

| Component | Rest | Hover | Active | Drag |
|-----------|------|-------|--------|------|
| Card | 1 | 2 | 1 | 3 |
| Button | 1 | 2 | 0 | — |
| Input | 0 | 0 | 1 | — |
| Dropdown | — | — | 2 | — |
| Modal | — | — | 3 | — |
| Toast | 2 | 2 | 2 | — |

---

## Shadow Rules

### Two-Shadow Model
Every paper shadow needs:
1. **Contact shadow**: Sharp, close (0-2px offset, 0-3px blur)
2. **Ambient shadow**: Soft, diffuse (grows with elevation)

### Shadow Color
- Never pure black (`rgba(0,0,0,x)`)
- Use tinted shadows: `hsl(220deg 10% 20% / opacity)`
- Warm shadows for warm paper, cool for cool

### Shadow Animation
- **Never** animate `box-shadow` directly (expensive)
- Use pseudo-element with opacity transition
- Pair shadow growth with `translateY` movement

---

## Animation Rules

### Paper Motion Principles
- Paper is light but has weight
- Resists sharp direction changes
- Folds along axes, not arbitrarily
- Can flutter, drift, settle

### Timing Scale
| Token | Duration | Use For |
|-------|----------|---------|
| instant | 100ms | Color changes, micro-interactions |
| fast | 150ms | Hover states, small movements |
| normal | 250ms | Card lifts, standard transitions |
| slow | 400ms | Modal open, page transitions |

### Easing Functions
| Name | Curve | Use For |
|------|-------|---------|
| lift | `cubic-bezier(0.4, 0, 0.2, 1)` | Picking up |
| drop | `cubic-bezier(0.0, 0, 0.2, 1)` | Setting down |
| bounce | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful settle |

### Reduced Motion
Always provide `prefers-reduced-motion` fallback:
- Remove transform animations
- Keep color/shadow state changes (not motion)
- Instant transitions acceptable

---

## Edge Treatments

| Type | Use Case | Implementation |
|------|----------|----------------|
| Clean cut | Formal, precise | `border-radius: 0` |
| Rounded | Friendly | `border-radius: 2-4px` |
| Torn | Informal, playful | SVG filter + mask |
| Curled corner | Interactive hint | Pseudo-element + gradient |
| Folded | Section divisions | 3D transform |

### Edge Selection by Context
- **Forms, Data, Buttons**: Clean cut
- **Cards, Dialogs**: Rounded
- **Notes, Alerts**: Torn (sparingly)
- **Draggables, Stickies**: Curled
- **Accordions**: Folded

---

## Color Guidelines

### Paper Surface Principle
- Paper is NOT pure white
- Use slightly warm whites: `hsl(40 30% 98%)`
- Cream for aged feel: `hsl(40 40% 95%)`
- Kraft brown for structure: `hsl(30 40% 75%)`

### Texture Strategy
- **Default**: No texture (flat colors)
- Paper-ness comes from shadows + edges
- Optional subtle noise only for hero elements
- Never let texture reduce readability

---

## Component Affinity

### High Affinity (Full Paper Treatment)
Card, Button, Dialog, Toast, Tabs, Accordion, Alert, Badge

### Medium Affinity (Selective Treatment)
Input, Select, Table, Tooltip, Avatar, Progress

### Low Affinity (Minimal/Skip)
Slider, Toggle, Skeleton — no natural paper analog

---

## The Validation Test

For every component, ask:

1. **"Could someone build this from real paper?"**
   - If no → redesign or skip paper treatment

2. **"Does it feel like paper or just a styled div?"**
   - Must respond to interaction physically

3. **"Does the paper metaphor help or hinder the task?"**
   - After novelty fades, must still aid usability

---

## Anti-Patterns (Never Do)

| Don't | Why |
|-------|-----|
| Over-decorate functional UI | Slows users, dates quickly |
| Mix metaphors (paper + glass + metal) | Breaks cohesion |
| Slow animations for "delight" | Paper is light, should feel effortless |
| Heavy texture that hurts readability | Content > decoration |
| Paper effects on non-paper elements | Confuses the metaphor |
| Fade-in animations | Paper can't change opacity |
| Glow effects for active states | Paper doesn't emit light |

---

## Quick Reference Card

### Can Paper Do This?

| Action | Paper? | Alternative |
|--------|--------|-------------|
| Fade in/out | ❌ | Slide, fold, lift |
| Glow | ❌ | Color change, elevation |
| Stretch | ❌ | Unfold, reveal, add sheets |
| Pass through other paper | ❌ | Slide over/under |
| Change color smoothly | ❌ | Instant swap, flip |
| Exist without edges | ❌ | Always define boundaries |
| Be transparent | ⚠️ | Tissue blur, vellum only |
| Curl at corners | ✅ | — |
| Cast shadows | ✅ | — |
| Fold along lines | ✅ | — |
| Stack with offset | ✅ | — |
| Tear | ✅ | — |

---

*These rules ensure consistent papercraft UI that feels authentic without sacrificing usability or performance.*
