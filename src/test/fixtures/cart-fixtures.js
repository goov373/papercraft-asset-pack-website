/**
 * Test fixtures for cart-related tests
 */

// Mock assets for testing (subset of real data)
export const mockAssets = [
  { id: "scissors-001", name: "Classic Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-002", name: "Craft Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-003", name: "Pinking Shears", category: "scissors", emoji: "✂️" },
  { id: "paper-001", name: "White Cardstock", category: "paper", emoji: "📄" },
  { id: "paper-002", name: "Kraft Paper", category: "paper", emoji: "📜" },
  { id: "paper-003", name: "Vellum Sheet", category: "paper", emoji: "📃" },
  { id: "writing-001", name: "Wooden Pencil", category: "writing", emoji: "✏️" },
  { id: "writing-002", name: "Mechanical Pencil", category: "writing", emoji: "✏️" },
  { id: "writing-003", name: "Ballpoint Pen", category: "writing", emoji: "🖊️" },
]

// Mock categories for testing
export const mockCategories = [
  { id: "all", label: "All", count: 9, emoji: "📦" },
  { id: "scissors", label: "Scissors & Cutting", count: 3, emoji: "✂️" },
  { id: "paper", label: "Paper & Cardstock", count: 3, emoji: "📄" },
  { id: "writing", label: "Writing Tools", count: 3, emoji: "✏️" },
]

// Cart state at exactly minimum ($6.99 = 27 items at $0.26 each)
export const cartAtMinimum = new Set(
  Array.from({ length: 27 }, (_, i) => `item-${String(i + 1).padStart(3, "0")}`)
)

// Cart state just under minimum (26 items = $6.76)
export const cartUnderMinimum = new Set(
  Array.from({ length: 26 }, (_, i) => `item-${String(i + 1).padStart(3, "0")}`)
)

// Cart state with single item
export const cartWithOneItem = new Set(["scissors-001"])

// Cart state with full scissors category
export const cartWithScissorsPack = new Set([
  "scissors-001",
  "scissors-002",
  "scissors-003",
])

// Cart state with partial scissors selection
export const cartWithPartialScissors = new Set([
  "scissors-001",
  "scissors-002",
])

// Empty cart
export const emptyCart = new Set()

// Helper to create asset IDs for a category
export function createCategoryAssetIds(categoryId, count) {
  return Array.from(
    { length: count },
    (_, i) => `${categoryId}-${String(i + 1).padStart(3, "0")}`
  )
}

// Helper to get assets by category from mock data
export function getMockAssetsByCategory(categoryId) {
  if (categoryId === "all") return mockAssets
  return mockAssets.filter((asset) => asset.category === categoryId)
}
