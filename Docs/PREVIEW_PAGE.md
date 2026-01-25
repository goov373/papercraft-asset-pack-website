# Preview Page Technical Documentation

This document describes the architecture, components, and patterns used in the Preview page (`/preview`). Use this as a reference when making modifications.

---

## Overview

The Preview page allows users to browse all 150 assets, select individual items or full category packs, and add them to a shopping cart. It implements a custom checkout flow with per-item pricing and a minimum cart requirement.

**Route:** `/preview`
**Entry Point:** `src/components/pages/PreviewPage.jsx`

---

## File Structure

```
src/
├── data/
│   └── assets.js                    # Asset data + pricing constants
├── context/
│   └── CartContext.jsx              # Cart state management
├── components/
│   ├── pages/
│   │   └── PreviewPage.jsx          # Page wrapper with CartProvider
│   ├── sections/
│   │   ├── PreviewHero.jsx          # Page header
│   │   └── PreviewGrid.jsx          # Main grid with tabs
│   └── ui/
│       ├── asset-card.jsx           # Individual asset card
│       ├── category-pack-header.jsx # Category section header
│       └── sticky-cart.jsx          # Floating cart widget
```

---

## Data Model

### File: `src/data/assets.js`

#### Constants

```javascript
PRICE_PER_ITEM = 0.26    // Price per individual asset
TOTAL_PRICE = 39         // Price for complete pack (all 150)
MINIMUM_CART = 6.99      // Minimum cart total to checkout
```

#### Categories Array

```javascript
categories = [
  { id: "all", label: "All", count: 150, emoji: "📦" },
  { id: "scissors", label: "Scissors & Cutting", count: 18, emoji: "✂️" },
  { id: "paper", label: "Paper & Cardstock", count: 24, emoji: "📄" },
  // ... 8 total categories + "all"
]
```

**Category Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier, used for filtering |
| `label` | string | Display name |
| `count` | number | Number of assets in category |
| `emoji` | string | Visual icon for category |

#### Assets Array

```javascript
assets = [
  { id: "scissors-001", name: "Classic Scissors", category: "scissors", emoji: "✂️" },
  // ... 150 total items
]
```

**Asset Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier (format: `{category}-{number}`) |
| `name` | string | Display name |
| `category` | string | Category ID this asset belongs to |
| `emoji` | string | Visual representation |

#### Helper Functions

```javascript
getAssetsByCategory(categoryId)  // Returns assets filtered by category ("all" returns everything)
getCategoryById(categoryId)      // Returns category object by ID
formatPrice(amount)              // Formats number as "$X.XX"
```

---

## State Management

### File: `src/context/CartContext.jsx`

The cart uses React Context for global state. Wrap components needing cart access in `<CartProvider>`.

#### State Shape

```javascript
{
  selectedItems: Set<string>  // Set of selected asset IDs
}
```

#### Provided Values

| Value | Type | Description |
|-------|------|-------------|
| `selectedItems` | Set | Raw set of selected asset IDs |
| `toggleItem(assetId)` | function | Toggle single item selection |
| `togglePack(categoryId)` | function | Toggle all items in a category |
| `isItemSelected(assetId)` | function | Check if item is selected |
| `isPackSelected(categoryId)` | function | Check if ALL items in category selected |
| `isPackPartiallySelected(categoryId)` | function | Check if SOME items in category selected |
| `clearCart()` | function | Remove all selections |
| `selectAll()` | function | Select all 150 items |
| `cartTotals` | object | Computed totals (see below) |
| `selectedItemsList` | array | Selected items as array |

#### cartTotals Object

```javascript
{
  itemCount: number,       // Number of selected items
  price: number,           // Total price (itemCount × PRICE_PER_ITEM)
  meetsMinimum: boolean,   // Whether price >= MINIMUM_CART
  amountToMinimum: number, // How much more needed (0 if met)
  itemsToMinimum: number,  // How many more items needed
}
```

#### Usage Example

```jsx
import { useCart } from "@/context/CartContext"

function MyComponent() {
  const { toggleItem, isItemSelected, cartTotals } = useCart()

  return (
    <button onClick={() => toggleItem("scissors-001")}>
      {isItemSelected("scissors-001") ? "Remove" : "Add"}
    </button>
  )
}
```

---

## Component Reference

### PreviewPage

**File:** `src/components/pages/PreviewPage.jsx`

Top-level page component. Wraps everything in CartProvider.

```jsx
<CartProvider>
  <Nav />
  <PreviewHero />
  <PreviewGrid />
  <Footer />
  <StickyCart />
</CartProvider>
```

**Note:** StickyCart is placed outside main content flow (fixed position).

---

### PreviewHero

**File:** `src/components/sections/PreviewHero.jsx`

Simple header section with title, subtitle, and stats.

**No props** - reads from assets data directly.

**Displays:**
- Badge with asset count
- "Preview All Assets" title
- Descriptive subtitle
- Quick stats: X assets • Y categories • $39 for all

---

### PreviewGrid

**File:** `src/components/sections/PreviewGrid.jsx`

Main content section with category tabs, asset grid, and pagination.

#### Local State

```javascript
activeCategory: string    // Currently selected category tab (default: "all")
visibleCount: number      // Number of items shown (increments by 18)
```

#### Key Constants

```javascript
ITEMS_PER_PAGE = 18  // 6 columns × 3 rows
```

#### Behavior

1. **Tab Selection:** Changing category resets `visibleCount` to 18
2. **View More:** Increments `visibleCount` by 18
3. **Filtering:** Uses `getAssetsByCategory(activeCategory)` to filter
4. **Category Header:** Only shown when NOT on "all" tab

#### Grid Layout (Tailwind)

```
grid-cols-2      // Mobile: 2 columns
sm:grid-cols-3   // Small: 3 columns
md:grid-cols-4   // Medium: 4 columns
lg:grid-cols-6   // Large: 6 columns
```

---

### AssetCard

**File:** `src/components/ui/asset-card.jsx`

Individual asset display card with selection checkbox.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `asset` | object | Yes | Asset object from assets array |
| `isSelected` | boolean | Yes | Whether item is currently selected |
| `onToggle` | function | Yes | Callback when selection changes, receives `assetId` |

#### Features

- **Entire card is clickable** for selection
- **Checkbox in top-right** with 44px touch target (accessibility)
- **Keyboard accessible:** Enter/Space to toggle, Tab to navigate
- **ARIA attributes:** `role="option"`, `aria-selected`

#### Visual States

| State | Styling |
|-------|---------|
| Default | Paper cream background, elevation-1 shadow |
| Hover | Lifts up 4px, elevation-2 shadow |
| Active/Press | Pushes down 1px, elevation-0 shadow |
| Selected | Ring-2 primary border, amber-100 background |
| Focus | Ring-3 focus ring |

#### Styling Classes (for modifications)

```javascript
// Base card
"bg-[var(--paper-cream)]"
"[box-shadow:var(--paper-elevation-1)]"

// Selected state
"ring-2 ring-primary/60"
"bg-amber-100/40"

// Hover
"hover:[transform:translateY(-4px)]"
"hover:[box-shadow:var(--paper-elevation-2)]"
```

---

### CategoryPackHeader

**File:** `src/components/ui/category-pack-header.jsx`

Section header shown above category items with pack toggle.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `category` | object | Yes | Category object from categories array |
| `isSelected` | boolean | Yes | Whether ALL items in pack are selected |
| `isPartiallySelected` | boolean | Yes | Whether SOME items are selected |
| `onTogglePack` | function | Yes | Callback when pack toggled, receives `categoryId` |
| `sticky` | boolean | No | Whether header sticks when scrolling |

#### Button States

| State | Button Text | Variant |
|-------|-------------|---------|
| None selected | "Add All" | outline |
| Partially selected | "Add Rest" | outline |
| All selected | "Remove Pack" | default (filled) |

#### Sticky Behavior

When `sticky={true}`:
```javascript
"sticky top-16 z-10 bg-background/95 backdrop-blur-sm"
```

---

### StickyCart

**File:** `src/components/ui/sticky-cart.jsx`

Floating cart widget in bottom-right corner.

#### Local State

```javascript
expanded: boolean  // Whether cart is expanded or collapsed
```

#### Behavior

- **Hidden when empty** (itemCount === 0)
- **Collapsed:** Circular button with cart icon, count badge, price pill
- **Expanded:** Full card with item list, totals, checkout button
- **Close triggers:** ESC key, click outside, X button

#### Warning Display

Shows amber warning bar when `!meetsMinimum`:
```
"Add $X.XX more to checkout"
```

#### Item List Limit

Only shows first 20 items with "+X more items" indicator for performance.

#### Position

```javascript
"fixed bottom-6 right-6 z-50"
```

#### Animation (Framer Motion)

```javascript
// Collapsed → Expanded
initial: { opacity: 0, scale: 0.95, y: 10 }
animate: { opacity: 1, scale: 1, y: 0 }

// Expanded → Collapsed
exit: { opacity: 0, scale: 0.95, y: 10 }
```

---

## Common Modifications

### Adding a New Asset

1. Add to `src/data/assets.js` in the `assets` array:
```javascript
{ id: "category-XXX", name: "Asset Name", category: "category", emoji: "🎨" }
```

2. Update the category count in `categories` array if needed.

### Adding a New Category

1. Add to `categories` array in `src/data/assets.js`:
```javascript
{ id: "newcat", label: "New Category", count: X, emoji: "🆕" }
```

2. Add corresponding assets with `category: "newcat"`.

### Changing Price Per Item

Modify in `src/data/assets.js`:
```javascript
export const PRICE_PER_ITEM = 0.30  // New price
```

Cart totals recalculate automatically.

### Changing Minimum Cart

Modify in `src/data/assets.js`:
```javascript
export const MINIMUM_CART = 9.99  // New minimum
```

### Changing Grid Columns

Modify in `src/components/sections/PreviewGrid.jsx`:
```javascript
// Current: 2 → 3 → 4 → 6
"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"

// Example: 3 → 4 → 5 → 6
"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
```

Also update `ITEMS_PER_PAGE` to match (columns × desired rows).

### Changing Items Per Page

Modify in `src/components/sections/PreviewGrid.jsx`:
```javascript
const ITEMS_PER_PAGE = 24  // 6 columns × 4 rows
```

### Adding Checkout Functionality

The checkout button in `StickyCart` currently does nothing. To add:

```jsx
// In sticky-cart.jsx
<Button
  size="sm"
  disabled={!meetsMinimum}
  onClick={() => {
    // Navigate to checkout or open payment modal
    // selectedItemsList contains all selected assets
  }}
>
  Checkout
</Button>
```

### Persisting Cart State

To save cart across page refreshes, modify `CartContext.jsx`:

```javascript
// Initialize from localStorage
const [selectedItems, setSelectedItems] = useState(() => {
  const saved = localStorage.getItem("cart")
  return saved ? new Set(JSON.parse(saved)) : new Set()
})

// Save on change
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify([...selectedItems]))
}, [selectedItems])
```

---

## Styling Patterns

### Paper Elevation Variables

```css
--paper-elevation-0  /* Flat/pressed */
--paper-elevation-1  /* Default resting */
--paper-elevation-2  /* Hover/lifted */
--paper-elevation-3  /* Modal/floating */
```

### Paper Colors

```css
--paper-cream   /* #FFFBF5 - Card backgrounds */
--paper-kraft   /* Brown kraft - Cart widget */
```

### Transitions

```css
--paper-duration-instant  /* 100ms - Active press */
--paper-duration-fast     /* 150ms - Quick feedback */
--paper-duration-normal   /* 250ms - Standard hover */
```

### Touch Target Requirement

All interactive elements must have minimum 44×44px touch area:
```jsx
<label className="w-11 h-11 flex items-center justify-center">
  <Checkbox /> {/* Visual checkbox can be smaller */}
</label>
```

---

## Dependencies

| Package | Usage |
|---------|-------|
| `framer-motion` | Animations (grid items, cart expand/collapse) |
| `@radix-ui/react-checkbox` | Accessible checkbox primitive |
| `@radix-ui/react-tabs` | DirectionAwareTabs foundation |
| `lucide-react` | Icons (ShoppingCart, Package, etc.) |

---

## Testing Checklist

- [ ] Category tabs filter correctly
- [ ] Individual item selection works
- [ ] Pack "Add All" selects all items in category
- [ ] Pack "Add All" auto-checks individual item checkboxes
- [ ] Removing last item from pack unchecks pack
- [ ] Cart appears when items selected
- [ ] Cart shows correct count and total
- [ ] Minimum warning shows when under $6.99
- [ ] Checkout disabled when under minimum
- [ ] "Clear" removes all selections
- [ ] "View More" loads additional items
- [ ] Responsive: 2 cols mobile, 6 cols desktop
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] Cart closes on ESC or click outside
