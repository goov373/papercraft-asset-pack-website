# Papercraft Asset Pack - Landing Page Design Specification

*Design document for conversion-optimized landing page*

---

## Page Overview

**Product:** Papercraft Vector Asset Pack
**Theme:** Classroom supplies, craft kits, design toolboxes
**Aesthetic:** Warm, earthy, handcrafted feel
**Primary Goal:** Drive downloads/purchases
**Secondary Goal:** Build email list

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cream | `#FFFBEB` | Page background |
| Warm White | `#FEF3C7` | Card backgrounds |
| Amber | `#F59E0B` | Primary buttons, accents |
| Amber Dark | `#D97706` | Button hover, headings |
| Orange | `#EA580C` | Secondary accents |
| Brown | `#78350F` | Body text |
| Charcoal | `#1C1917` | Headlines |

---

## Typography

- **Headlines:** Bold, large (48-72px desktop), warm and inviting
- **Subheadlines:** Medium weight (20-24px)
- **Body:** Regular weight (16-18px), high readability
- **Font suggestions:** Inter, Plus Jakarta Sans, or a friendly rounded sans-serif

---

## Section-by-Section Specification

---

### 1. Navigation Bar (Sticky)

**Purpose:** Easy access to key sections, persistent CTA

**Layout:**
```
[Logo]                    [Preview] [Pricing] [FAQ]    [Get the Pack - Button]
```

**Specifications:**
- Fixed position on scroll (becomes sticky after hero)
- Transparent on hero, solid cream background when scrolled
- Logo: "Papercraft Pack" or custom wordmark
- CTA button: Amber with white text, always visible
- Mobile: Hamburger menu with slide-out drawer

**Height:** 64px desktop, 56px mobile

---

### 2. Hero Section

**Purpose:** Capture attention, communicate value, drive primary action

**Layout (Desktop):**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    [Badge: "150+ Vector Assets"]                                │
│                                                                 │
│    Beautiful Papercraft                                         │
│    Vector Assets                            [HERO IMAGE:        │
│                                              Scattered assets   │
│    Hand-drawn classroom supplies,            showing scissors,  │
│    craft tools, and creative elements        paper, pencils,    │
│    for your next design project.             glue, rulers in    │
│                                              warm arrangement]  │
│    [Get the Pack - $39] [Preview Gallery]                       │
│                                                                 │
│    ★★★★★ "Loved by 2,000+ designers"                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Content:**
- **Badge:** Small pill above headline (e.g., "150+ Hand-Crafted Elements")
- **Headline:** "Beautiful Papercraft Vector Assets"
- **Subheadline:** "Hand-drawn classroom supplies, craft tools, and creative elements for your next design project."
- **Primary CTA:** "Get the Pack - $39" (amber button)
- **Secondary CTA:** "Preview Gallery" (outline button)
- **Social proof line:** Star rating + "Loved by X designers"

**Hero Image:**
- Artful arrangement of 15-20 key assets
- Scattered/floating composition
- Subtle shadow to lift off background
- Slight rotation on elements for organic feel

**Animations:**
- Fade-in on load (staggered)
- Subtle float animation on hero image elements
- Button hover: scale up slightly + darken

**Mobile Layout:**
- Stack vertically: Badge → Headline → Subhead → Image → CTAs → Social proof
- Full-width buttons
- Image scales proportionally

---

### 3. Trusted By / Social Proof Bar

**Purpose:** Build immediate credibility

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Trusted by designers at:                                       │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                     │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Light background (warm white)
- Grayscale logos for subtlety
- 4-6 recognizable brands/publications
- If no logos yet, use: "Join 2,000+ designers and creators"

**Height:** 80-100px

---

### 4. Asset Gallery Preview

**Purpose:** Show the product quality, let users explore

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              See What's Inside                                  │
│    Explore our collection of hand-crafted vector elements       │
│                                                                 │
│    [Filter: All] [Scissors] [Paper] [Writing] [Tools] [Decor]  │
│                                                                 │
│    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐            │
│    │     │ │     │ │     │ │     │ │     │ │     │            │
│    │ ✂️  │ │ 📄  │ │ ✏️  │ │ 📐  │ │ 🎨  │ │ 📎  │            │
│    │     │ │     │ │     │ │     │ │     │ │     │            │
│    └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘            │
│    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐            │
│    │     │ │     │ │     │ │     │ │     │ │     │            │
│    └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘            │
│                                                                 │
│                    [View All 150+ Assets]                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Section heading + subheading
- Filter tabs by category
- Masonry or uniform grid (3-4 columns desktop, 2 mobile)
- Show 12-18 assets initially
- Each asset card: hover to zoom slightly, show asset name
- "View All" button opens lightbox gallery or scrolls to full list
- Subtle watermark on previews

**Interactions:**
- Filter tabs animate content
- Hover: scale 1.05, subtle shadow lift
- Click: open in lightbox with zoom capability

**Categories:**
- Scissors & Cutting Tools
- Paper & Cardstock
- Writing Tools (pencils, pens, markers)
- Measuring Tools (rulers, protractors)
- Adhesives (glue, tape)
- Decorative Elements (stickers, washi tape)
- Containers (pencil cups, boxes)
- Miscellaneous (erasers, sharpeners, clips)

---

### 5. What's Included

**Purpose:** Clear inventory to justify value

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    Everything You Get                           │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ [Icon]       │ │ [Icon]       │ │ [Icon]       │            │
│  │ 150+         │ │ 8            │ │ 4            │            │
│  │ Vector       │ │ Categories   │ │ File         │            │
│  │ Assets       │ │              │ │ Formats      │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  ✓ Scissors & Cutting (18 assets)                      │   │
│  │  ✓ Paper & Cardstock (24 assets)                       │   │
│  │  ✓ Writing Tools (32 assets)                           │   │
│  │  ✓ Measuring Tools (14 assets)                         │   │
│  │  ✓ Adhesives & Tape (16 assets)                        │   │
│  │  ✓ Decorative Elements (28 assets)                     │   │
│  │  ✓ Storage & Containers (12 assets)                    │   │
│  │  ✓ Bonus: 10 Pre-made Compositions                     │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  File Formats: SVG • AI • EPS • PNG (transparent)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- 3 large stat cards at top (asset count, categories, formats)
- Detailed checklist with counts per category
- File format badges at bottom
- Bonus items highlighted differently (gold/amber accent)

**Animation:**
- Numbers count up when section enters viewport
- Checkmarks animate in sequentially

---

### 6. Use Cases Section

**Purpose:** Help buyers visualize using the assets

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                  Perfect For Your Projects                      │
│      See how designers are using these assets                   │
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │                 │ │                 │ │                 │   │
│  │   [Mockup:      │ │   [Mockup:      │ │   [Mockup:      │   │
│  │   Educational   │ │   Social Media  │ │   Packaging     │   │
│  │   Worksheet]    │ │   Post]         │ │   Design]       │   │
│  │                 │ │                 │ │                 │   │
│  │  Educational    │ │  Social Media   │ │  Packaging      │   │
│  │  Materials      │ │  Graphics       │ │  & Labels       │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   [Mockup:      │ │   [Mockup:      │ │   [Mockup:      │   │
│  │   Blog Header]  │ │   Etsy Shop]    │ │   Kids Book]    │   │
│  │                 │ │                 │ │                 │   │
│  │  Blog & Web     │ │  Etsy & Shop    │ │  Children's     │   │
│  │  Graphics       │ │  Graphics       │ │  Illustrations  │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Use Case Cards:**
1. Educational Materials (worksheets, classroom decor)
2. Social Media Graphics (Instagram, Pinterest)
3. Packaging & Labels (product packaging, stickers)
4. Blog & Web Graphics (headers, featured images)
5. Etsy & Shop Graphics (listing images, banners)
6. Children's Illustrations (books, activity sheets)

**Specifications:**
- 3x2 grid (desktop), 2x3 or 1x6 (mobile)
- Each card: mockup image + title + brief description
- Mockups show assets in realistic context
- Hover: subtle lift + "View Example" overlay

---

### 7. Testimonials Section

**Purpose:** Social proof to overcome objections

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                  What Designers Are Saying                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ★★★★★                                                   │   │
│  │                                                         │   │
│  │  "These assets saved me hours on my classroom           │   │
│  │   worksheet project. The hand-drawn style is            │   │
│  │   perfect and the SVG quality is excellent."            │   │
│  │                                                         │   │
│  │  [Photo] Sarah M. — Elementary Teacher                  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│       [●] [ ] [ ]  (carousel dots)                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Carousel of 3-5 testimonials
- Each: star rating, quote, photo, name, title/profession
- Auto-rotate every 5 seconds
- Manual navigation dots
- Mobile: swipeable

**Testimonial Types to Include:**
- Teacher/Educator
- Graphic Designer
- Etsy Shop Owner
- Content Creator
- Children's Book Illustrator

---

### 8. Pricing Section

**Purpose:** Clear pricing, reduce friction, drive conversion

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    Simple, Fair Pricing                         │
│           One purchase, lifetime access, free updates           │
│                                                                 │
│  ┌───────────────────┐        ┌───────────────────┐            │
│  │                   │        │  ★ BEST VALUE     │            │
│  │  Personal         │        │                   │            │
│  │                   │        │  Commercial       │            │
│  │  $29              │        │                   │            │
│  │                   │        │  $49              │            │
│  │  ✓ 150+ Assets    │        │                   │            │
│  │  ✓ All Formats    │        │  ✓ Everything in  │            │
│  │  ✓ Personal Use   │        │    Personal, plus:│            │
│  │  ✓ Free Updates   │        │  ✓ Commercial Use │            │
│  │                   │        │  ✓ Client Projects│            │
│  │  [Get Personal]   │        │  ✓ Unlimited      │            │
│  │                   │        │    Projects       │            │
│  └───────────────────┘        │                   │            │
│                               │  [Get Commercial] │            │
│                               │                   │            │
│                               └───────────────────┘            │
│                                                                 │
│         🔒 Secure checkout • 30-day money-back guarantee       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Pricing Tiers:**

| Tier | Price | Includes |
|------|-------|----------|
| Personal | $29 | All assets, all formats, personal projects only, free updates |
| Commercial | $49 | Everything in Personal + commercial use, client work, unlimited projects |

**Specifications:**
- 2 pricing cards side by side
- Commercial highlighted as "Best Value" with accent border
- Feature checklist on each card
- CTA button at bottom of each card
- Trust badges below: secure checkout, money-back guarantee
- Optional: "Team/Extended" tier at $99 for agencies

**Psychological Elements:**
- Anchor with crossed-out "value" price (e.g., "~~$150~~ $49")
- Highlight savings
- Emphasize "lifetime access" and "free updates"

---

### 9. FAQ Section

**Purpose:** Overcome objections, reduce support inquiries

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                   Frequently Asked Questions                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ▼ What file formats are included?                       │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │   You get SVG, AI, EPS, and PNG (transparent) files     │   │
│  │   for every asset. Compatible with Adobe Illustrator,   │   │
│  │   Figma, Canva, Sketch, and more.                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ▶ Can I use these for commercial projects?              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ▶ Do I get free updates?                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ▶ What's your refund policy?                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ▶ How do I download after purchase?                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│               Have more questions? [Contact Us]                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**FAQ Items:**

1. **What file formats are included?**
   SVG, AI, EPS, and PNG (transparent). Compatible with Adobe Illustrator, Figma, Canva, Sketch, Affinity Designer, and more.

2. **Can I use these for commercial projects?**
   With the Commercial license, yes! Use them in client projects, products for sale, and commercial designs. Personal license is for personal, non-commercial use only.

3. **Do I get free updates?**
   Yes! When we add new assets to the pack, you'll get them free. Lifetime updates included.

4. **What's your refund policy?**
   30-day money-back guarantee. If you're not satisfied, contact us for a full refund.

5. **How do I download after purchase?**
   You'll receive an instant download link via email. Access your files anytime from your purchase dashboard.

6. **Can I use these in templates I sell?**
   The Commercial license allows use in end products but not in templates/assets for resale. Contact us for an Extended license.

**Specifications:**
- Accordion style (click to expand)
- Smooth expand/collapse animation
- First item open by default
- Contact link at bottom

---

### 10. Final CTA Section

**Purpose:** Last chance to convert, recap value

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  ░░                                                         ░░ │
│  ░░        Ready to Elevate Your Designs?                   ░░ │
│  ░░                                                         ░░ │
│  ░░   Get 150+ hand-crafted papercraft vectors today.       ░░ │
│  ░░                                                         ░░ │
│  ░░   ✓ Instant download  ✓ All formats  ✓ Free updates    ░░ │
│  ░░                                                         ░░ │
│  ░░              [Get the Pack - $39]                       ░░ │
│  ░░                                                         ░░ │
│  ░░        🔒 30-day money-back guarantee                   ░░ │
│  ░░                                                         ░░ │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Contrasting background (amber gradient or warm pattern)
- Large headline: "Ready to Elevate Your Designs?"
- Quick value recap (3 bullet points)
- Large, prominent CTA button
- Money-back guarantee badge
- Optional: small preview of asset collage

---

### 11. Footer

**Purpose:** Navigation, legal, trust

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Logo]                                                         │
│                                                                 │
│  Product          Support           Legal                       │
│  --------         -------           -----                       │
│  Features         Contact           Terms of Use                │
│  Pricing          FAQ               Privacy Policy              │
│  Gallery          Help Center       License Agreement           │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  © 2026 Papercraft Pack. All rights reserved.                  │
│                                                                 │
│  [Twitter] [Instagram] [Dribbble]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- 3-4 column layout (stacks on mobile)
- Logo at top
- Link groups: Product, Support, Legal
- Social media icons
- Copyright line
- Payment method badges (Stripe, PayPal, etc.)

---

## Responsive Breakpoints

| Breakpoint | Width | Columns | Notes |
|------------|-------|---------|-------|
| Mobile | <640px | 1 | Stack everything, full-width buttons |
| Tablet | 640-1024px | 2 | Side-by-side where appropriate |
| Desktop | >1024px | 3-4 | Full layout as designed |

---

## Animation Guidelines

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero content | Fade in + slide up | Page load |
| Hero image assets | Subtle float | Continuous |
| Section headings | Fade in | Scroll into view |
| Gallery items | Scale + fade in | Scroll into view |
| Stat numbers | Count up | Scroll into view |
| Testimonials | Slide/fade | Auto-rotate + manual |
| FAQ items | Expand/collapse | Click |
| CTA buttons | Scale on hover | Hover |

**Performance Notes:**
- Use CSS animations where possible
- Lazy load images below the fold
- Keep animations subtle (150-300ms duration)
- Respect `prefers-reduced-motion`

---

## Technical Implementation Notes

### React Components to Create

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── TrustBar.jsx
│   ├── AssetGallery.jsx
│   ├── WhatsIncluded.jsx
│   ├── UseCases.jsx
│   ├── Testimonials.jsx
│   ├── Pricing.jsx
│   ├── FAQ.jsx
│   ├── FinalCTA.jsx
│   └── Footer.jsx
├── App.jsx
└── index.css
```

### Recommended Libraries

- **Framer Motion**: Scroll animations
- **React Intersection Observer**: Trigger animations on scroll
- **Swiper or Embla**: Testimonial carousel
- **React Lightbox**: Asset preview modal

---

## Content Needed Before Build

1. **Asset images** - High-quality previews of actual assets
2. **Mockup images** - Assets shown in context (6 use cases)
3. **Testimonials** - 3-5 real or realistic testimonials with photos
4. **Logo** - Wordmark or icon + text
5. **Copy** - Finalized headlines, descriptions, FAQ answers
6. **Pricing** - Confirmed prices and license terms
7. **Legal pages** - Terms, Privacy, License Agreement

---

## Success Metrics to Track

- Conversion rate (target: >6.6%)
- Scroll depth
- CTA click-through rate
- Time on page
- Gallery interaction rate
- FAQ engagement
- Cart abandonment rate

---

## Next Steps

1. [ ] Review and approve this design spec
2. [ ] Gather/create asset preview images
3. [ ] Create mockup images for use cases
4. [ ] Finalize copy and pricing
5. [ ] Build React components section by section
6. [ ] Implement responsive styles
7. [ ] Add animations
8. [ ] Integrate payment system
9. [ ] Test on multiple devices
10. [ ] Launch and monitor metrics
