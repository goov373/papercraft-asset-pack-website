import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { CartProvider, useCart } from "./CartContext"
import { PRICE_PER_ITEM, MINIMUM_CART } from "@/data/assets"

// Wrapper for renderHook
const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

describe("CartContext", () => {
  describe("CartProvider", () => {
    it("renders children correctly", () => {
      const { result } = renderHook(() => useCart(), { wrapper })
      expect(result.current).toBeDefined()
    })

    it("provides context value to consumers", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current).toHaveProperty("selectedItems")
      expect(result.current).toHaveProperty("toggleItem")
      expect(result.current).toHaveProperty("togglePack")
      expect(result.current).toHaveProperty("isItemSelected")
      expect(result.current).toHaveProperty("isPackSelected")
      expect(result.current).toHaveProperty("isPackPartiallySelected")
      expect(result.current).toHaveProperty("clearCart")
      expect(result.current).toHaveProperty("selectAll")
      expect(result.current).toHaveProperty("cartTotals")
      expect(result.current).toHaveProperty("selectedItemsList")
    })
  })

  describe("useCart", () => {
    it("throws error when used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

      expect(() => {
        renderHook(() => useCart())
      }).toThrow("useCart must be used within a CartProvider")

      consoleSpy.mockRestore()
    })
  })

  describe("toggleItem", () => {
    it("adds item to cart when not selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      expect(result.current.isItemSelected("scissors-001")).toBe(true)
      expect(result.current.cartTotals.itemCount).toBe(1)
    })

    it("removes item from cart when already selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Add then remove
      act(() => {
        result.current.toggleItem("scissors-001")
      })
      act(() => {
        result.current.toggleItem("scissors-001")
      })

      expect(result.current.isItemSelected("scissors-001")).toBe(false)
      expect(result.current.cartTotals.itemCount).toBe(0)
    })

    it("handles multiple items independently", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("scissors-002")
        result.current.toggleItem("paper-001")
      })

      expect(result.current.cartTotals.itemCount).toBe(3)
      expect(result.current.isItemSelected("scissors-001")).toBe(true)
      expect(result.current.isItemSelected("scissors-002")).toBe(true)
      expect(result.current.isItemSelected("paper-001")).toBe(true)
    })

    it("handles rapid toggling (double-click scenario)", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Rapid toggle should result in item being deselected
      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("scissors-001")
      })

      expect(result.current.isItemSelected("scissors-001")).toBe(false)
    })
  })

  describe("togglePack", () => {
    it("selects all items in category when none are selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.togglePack("scissors")
      })

      // All 18 scissors items should be selected
      expect(result.current.isPackSelected("scissors")).toBe(true)
      expect(result.current.cartTotals.itemCount).toBe(18)
    })

    it("selects all items when pack is partially selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Select some scissors items first
      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("scissors-002")
      })

      expect(result.current.isPackPartiallySelected("scissors")).toBe(true)

      // Toggle pack should select all
      act(() => {
        result.current.togglePack("scissors")
      })

      expect(result.current.isPackSelected("scissors")).toBe(true)
      expect(result.current.isPackPartiallySelected("scissors")).toBe(false)
    })

    it("deselects all items when pack is fully selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Select all scissors
      act(() => {
        result.current.togglePack("scissors")
      })

      expect(result.current.isPackSelected("scissors")).toBe(true)

      // Toggle should deselect all
      act(() => {
        result.current.togglePack("scissors")
      })

      expect(result.current.isPackSelected("scissors")).toBe(false)
      expect(result.current.cartTotals.itemCount).toBe(0)
    })

    it("handles multiple packs independently", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.togglePack("scissors")
        result.current.togglePack("paper")
      })

      expect(result.current.isPackSelected("scissors")).toBe(true)
      expect(result.current.isPackSelected("paper")).toBe(true)
      // scissors (18) + paper (24)
      expect(result.current.cartTotals.itemCount).toBe(42)
    })
  })

  describe("isItemSelected", () => {
    it("returns true for selected item", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      expect(result.current.isItemSelected("scissors-001")).toBe(true)
    })

    it("returns false for unselected item", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current.isItemSelected("scissors-001")).toBe(false)
    })

    it("returns false for non-existent item", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current.isItemSelected("non-existent-item")).toBe(false)
    })
  })

  describe("isPackSelected", () => {
    it("returns true when all items in pack are selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.togglePack("scissors")
      })

      expect(result.current.isPackSelected("scissors")).toBe(true)
    })

    it("returns false when any item is missing from pack", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Select all scissors except one
      act(() => {
        result.current.togglePack("scissors")
        result.current.toggleItem("scissors-001") // Remove one
      })

      expect(result.current.isPackSelected("scissors")).toBe(false)
    })

    it("returns false when pack is empty", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current.isPackSelected("scissors")).toBe(false)
    })
  })

  describe("isPackPartiallySelected", () => {
    it("returns true when some but not all items are selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("scissors-002")
      })

      expect(result.current.isPackPartiallySelected("scissors")).toBe(true)
    })

    it("returns false when no items are selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current.isPackPartiallySelected("scissors")).toBe(false)
    })

    it("returns false when all items are selected", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.togglePack("scissors")
      })

      expect(result.current.isPackPartiallySelected("scissors")).toBe(false)
    })
  })

  describe("clearCart", () => {
    it("removes all selected items", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Add some items
      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("paper-001")
        result.current.togglePack("writing")
      })

      expect(result.current.cartTotals.itemCount).toBeGreaterThan(0)

      // Clear cart
      act(() => {
        result.current.clearCart()
      })

      expect(result.current.cartTotals.itemCount).toBe(0)
      expect(result.current.selectedItems.size).toBe(0)
    })

    it("handles already empty cart gracefully", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Clear empty cart should not throw
      act(() => {
        result.current.clearCart()
      })

      expect(result.current.cartTotals.itemCount).toBe(0)
    })
  })

  describe("selectAll", () => {
    it("selects all 150 assets", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.selectAll()
      })

      expect(result.current.cartTotals.itemCount).toBe(150)
      expect(result.current.selectedItems.size).toBe(150)
    })

    it("handles already full cart (idempotent)", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Select all twice
      act(() => {
        result.current.selectAll()
      })
      act(() => {
        result.current.selectAll()
      })

      expect(result.current.cartTotals.itemCount).toBe(150)
    })

    it("adds remaining items when cart is partially filled", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Add some items first
      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("paper-001")
      })

      expect(result.current.cartTotals.itemCount).toBe(2)

      // Select all should add the rest
      act(() => {
        result.current.selectAll()
      })

      expect(result.current.cartTotals.itemCount).toBe(150)
    })
  })

  describe("cartTotals", () => {
    it("computes itemCount correctly", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current.cartTotals.itemCount).toBe(0)

      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("scissors-002")
        result.current.toggleItem("scissors-003")
      })

      expect(result.current.cartTotals.itemCount).toBe(3)
    })

    it("computes price correctly using PRICE_PER_ITEM", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("scissors-002")
        result.current.toggleItem("scissors-003")
      })

      // 3 items × $0.26 = $0.78
      expect(result.current.cartTotals.price).toBeCloseTo(3 * PRICE_PER_ITEM)
    })

    it("meetsMinimum returns true when price >= $6.99", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Need 27 items to reach $6.99 ($0.26 × 27 = $7.02)
      act(() => {
        // Select enough items to meet minimum
        for (let i = 1; i <= 27; i++) {
          result.current.toggleItem(`scissors-${String(i).padStart(3, "0")}`)
        }
      })

      expect(result.current.cartTotals.meetsMinimum).toBe(true)
    })

    it("meetsMinimum returns false when price < $6.99", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // 26 items = $6.76, under minimum
      act(() => {
        for (let i = 1; i <= 26; i++) {
          result.current.toggleItem(`scissors-${String(i).padStart(3, "0")}`)
        }
      })

      expect(result.current.cartTotals.meetsMinimum).toBe(false)
    })

    it("computes amountToMinimum correctly", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      // 1 item = $0.26, need $6.73 more
      const expectedAmount = MINIMUM_CART - PRICE_PER_ITEM
      expect(result.current.cartTotals.amountToMinimum).toBeCloseTo(expectedAmount)
    })

    it("amountToMinimum is 0 when minimum is met", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.togglePack("scissors") // 18 items
        result.current.togglePack("paper")    // 24 items
      })

      expect(result.current.cartTotals.meetsMinimum).toBe(true)
      expect(result.current.cartTotals.amountToMinimum).toBe(0)
    })

    it("computes itemsToMinimum correctly", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      // Empty cart needs 27 items to reach $6.99
      expect(result.current.cartTotals.itemsToMinimum).toBe(Math.ceil(MINIMUM_CART / PRICE_PER_ITEM))
    })
  })

  describe("selectedItemsList", () => {
    it("returns empty array when cart is empty", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      expect(result.current.selectedItemsList).toEqual([])
    })

    it("returns correct asset objects for selected items", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
        result.current.toggleItem("paper-001")
      })

      expect(result.current.selectedItemsList).toHaveLength(2)
      expect(result.current.selectedItemsList.map(a => a.id)).toContain("scissors-001")
      expect(result.current.selectedItemsList.map(a => a.id)).toContain("paper-001")
    })

    it("updates when items are added or removed", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      expect(result.current.selectedItemsList).toHaveLength(1)

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      expect(result.current.selectedItemsList).toHaveLength(0)
    })

    it("returns full asset objects with all properties", () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      const item = result.current.selectedItemsList[0]
      expect(item).toHaveProperty("id")
      expect(item).toHaveProperty("name")
      expect(item).toHaveProperty("category")
      expect(item).toHaveProperty("emoji")
    })
  })
})
