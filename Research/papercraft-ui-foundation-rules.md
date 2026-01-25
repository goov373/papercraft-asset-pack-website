# Papercraft UI Foundation Rules

> Actionable design rules for AI agents. Build papercraft components on shadcn/ui.

---

## Core Philosophy

| Priority | Principle | Meaning |
|----------|-----------|---------|
| 1 | **Behavior over appearance** | How it moves/responds > how it looks |
| 2 | **Constraints over features** | What paper CAN'T do defines the style |
| 3 | **Cohesion over variety** | One material language, not mixed metaphors |
| 4 | **Content over decoration** | Paper serves content, never obscures it |
| 5 | **Quick over elaborate** | Paper is light; animations feel effortless |

---

## The Buildability Test

**For every component, ask: "Could someone cut this from paper and assemble it?"**

| Component | Buildable? | Notes |
|-----------|------------|-------|
| Flat card | ✅ | Single sheet, maybe folded |
| Card with shadow | ✅ | Elevated above surface |
| Card that stretches | ❌ | Paper tears, doesn't stretch |
| Rounded corners | ✅ | Die-cut effect |
| Gradient fill | ⚠️ | Requires paint, not inherent |
| Glowing border | ❌ | Paper doesn't emit light |
| Modal that fades in | ⚠️ | Use slide/fold instead |

---

## Paper Constraints (Hard Rules)

Paper CANNOT do these things. Enforce strictly.

| Constraint | Forbidden CSS/Behavior | Use Instead |
|------------|------------------------|-------------|
| **Transparency** | `opacity < 1` showing content | Solid colors, tissue blur, vellum |
| **Glow/emit light** | `box-shadow` with spread, neon | Elevation shadows, color change |
| **Stretch** | `scale` transforms, rubber-band | Fold reveals, slide, add sheets |
| **No edges** | Borderless/infinite bleed | Always define visible boundaries |
| **Color morph** | Smooth color transitions | Instant swap, flip to reveal |
| **Phase through** | Elements passing through each other | Slide over/under, z-stacking |
| **Arbitrary morph** | Blob shapes, liquid transitions | Fold, flip, rotate, cut |

---

## Paper Material Types

Use these 6 materials. Each maps to specific components.

### 1. Card Stock
```
Weight: Heavy | Rigidity: High | Shadow: Defined
```
- **Use for**: Cards, Buttons, Modals, Navigation items, Badges
- **Behavior**: Lifts cleanly, returns crisply, pressed state = slight depression

### 2. Notebook Paper
```
Weight: Light | Rigidity: Low | Shadow: Soft, shows curl
```
- **Use for**: Form inputs, Text areas, Editable content, Lists
- **Behavior**: Can curl at corners, suggests editability/impermanence

### 3. Sticky Note (Post-it)
```
Weight: Light | Rigidity: Low | Shadow: Asymmetric
```
- **Use for**: Toasts, Tooltips, Tags, Temporary messages
- **Behavior**: Adhered at one edge, curls at opposite, dismissible

### 4. Tissue Paper
```
Weight: Very light | Rigidity: Very low | Shadow: Minimal
```
- **Use for**: Overlays, Background layers, Dividers, Skeleton states
- **Behavior**: Light, airy, semi-translucent (blur effect), separation without hard boundary

### 5. Kraft/Corrugated
```
Weight: Heavy | Rigidity: High | Shadow: Heavy, grounded
```
- **Use for**: Headers, Navigation bars, Section dividers, Footers
- **Behavior**: Doesn't lift (structural), provides visual weight/anchor

### 6. Construction Paper
```
Weight: Medium | Rigidity: Medium | Shadow: Moderate
```
- **Use for**: Alerts, CTAs, Highlighted content, Interactive panels
- **Behavior**: Bold saturated colors, versatile (formal or playful)

---

## Material-to-Component Matrix

| Component | Material | Rationale |
|-----------|----------|-----------|
| Card | Card Stock | Rigidity, clean edges |
| Button | Card Stock | Defined press behavior |
| Dialog/Modal | Card Stock | Formal, attention-commanding |
| Toast | Sticky Note | Temporary, dismissible |
| Tooltip | Sticky Note | Ephemeral, informational |
| Input/Textarea | Notebook | Editable, soft |
| Tabs | Card Stock | Folder tab metaphor |
| Accordion | Notebook | Foldable, reveals content |
| Header/Nav | Kraft | Structural, grounding |
| Overlay | Tissue | Separation without hard boundary |
| Badge/Tag | Sticky Note or Construction | Attached, labeled |
| Alert | Construction | Attention-grabbing color |
| Skeleton | Tissue | Placeholder, ephemeral |

---

## Material Combinations

**Rule:** Container material should feel more substantial than contents.

| Combination | Example |
|-------------|---------|
| Card Stock + Notebook | Card container with form inputs |
| Card Stock + Notebook | Modal dialog with text fields |
| Kraft + Card Stock | Navigation bar with tab items |
| Sticky Note + Card Stock | Toast with action button |

---

## Skeuomorphism Position

We use **behavioral skeuomorphism**, not visual skeuomorphism.

### We DO:
- Use shadows, elevation, edge treatments (depth cues)
- Enforce physical behavior constraints
- Maintain consistent material language
- Prioritize content over decoration
- Keep animations purposeful and quick

### We DON'T:
- Add paper texture for texture's sake
- Use photorealistic paper grain
- Add ornate borders or decorative elements
- Slow users with elaborate transitions
- Sacrifice readability for authenticity

---

## Paper Surface Colors

Paper is NOT pure white. Use warm tones.

| Surface | HSL Value | Use |
|---------|-----------|-----|
| White paper | `hsl(40 30% 98%)` | Default surfaces |
| Cream/aged | `hsl(40 40% 95%)` | Warm, aged feel |
| Kraft brown | `hsl(30 40% 75%)` | Structural elements |

---

## Quick Reference: Can Paper Do This?

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

## Anti-Patterns

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

*Foundation rules for papercraft UI. Reference shadow-rules.md and edge-rules.md for specific implementations.*
