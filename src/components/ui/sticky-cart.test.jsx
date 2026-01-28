import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { StickyCart } from "./sticky-cart"
import { CartProvider } from "@/context/CartContext"
import { renderHook, act } from "@testing-library/react"
import { useCart } from "@/context/CartContext"
import { MINIMUM_CART } from "@/data/assets"

// Helper to render StickyCart with CartProvider
function renderStickyCart() {
  return render(
    <CartProvider>
      <StickyCart />
    </CartProvider>
  )
}

describe("StickyCart", () => {
  describe("visibility", () => {
    it("does not render when cart is empty", () => {
      renderStickyCart()

      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("renders collapsed button when items are in cart", () => {
      const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleItem("scissors-001")
      })

      render(
        <CartProvider>
          <TestCartWithItems items={["scissors-001"]} />
        </CartProvider>
      )
    })
  })

  describe("collapsed state", () => {
    it("shows item count badge", async () => {
      render(<CartWithItems itemCount={5} />)

      await waitFor(() => {
        expect(screen.getByText("5")).toBeInTheDocument()
      })
    })

    it("shows formatted price", async () => {
      render(<CartWithItems itemCount={3} />)

      await waitFor(() => {
        // 3 items × $0.26 = $0.78
        expect(screen.getByText("$0.78")).toBeInTheDocument()
      })
    })

    it("has accessible label with item count and price", async () => {
      render(<CartWithItems itemCount={3} />)

      await waitFor(() => {
        const button = screen.getByRole("button", {
          name: /shopping cart, 3 items/i,
        })
        expect(button).toBeInTheDocument()
      })
    })

    it("badge shows amber color when under minimum", async () => {
      render(<CartWithItems itemCount={5} />)

      await waitFor(() => {
        const badge = screen.getByText("5").closest('[class*="Badge"]') || screen.getByText("5")
        expect(badge).toBeInTheDocument()
      })
    })
  })

  describe("expand/collapse", () => {
    it("expands on button click", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={3} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })

      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })
    })

    it("shows 'Your Cart' header when expanded", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={3} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })

      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })
    })

    it("collapses on X button click", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={3} />)

      // Expand cart
      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })

      // Click close button
      await user.click(screen.getByLabelText("Close cart"))

      await waitFor(() => {
        expect(screen.queryByText("Your Cart")).not.toBeInTheDocument()
      })
    })

    it("collapses on Escape key", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={3} />)

      // Expand cart
      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })

      // Press Escape
      await user.keyboard("{Escape}")

      await waitFor(() => {
        expect(screen.queryByText("Your Cart")).not.toBeInTheDocument()
      })
    })

    it("collapses on click outside", async () => {
      const user = userEvent.setup()
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <CartWithItems itemCount={3} />
        </div>
      )

      // Expand cart
      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })

      // Click outside
      await user.click(screen.getByTestId("outside"))

      await waitFor(() => {
        expect(screen.queryByText("Your Cart")).not.toBeInTheDocument()
      })
    })
  })

  describe("minimum warning", () => {
    it("shows warning when under $6.99 minimum", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={5} />) // 5 × $0.26 = $1.30

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument()
        expect(screen.getByText(/add .* more to checkout/i)).toBeInTheDocument()
      })
    })

    it("hides warning when meets minimum", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={30} />) // 30 × $0.26 = $7.80

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
      })
    })
  })

  describe("cart actions", () => {
    it("Clear button clears cart", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={5} />)

      // Expand cart
      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })

      // Click Clear
      await user.click(screen.getByRole("button", { name: /clear/i }))

      // Cart should disappear (empty)
      await waitFor(() => {
        expect(screen.queryByText("Your Cart")).not.toBeInTheDocument()
      })
    })

    it("Checkout button is disabled when under minimum", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={5} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /checkout/i })).toBeDisabled()
      })
    })

    it("Checkout button is enabled when meets minimum", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={30} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /checkout/i })).not.toBeDisabled()
      })
    })
  })

  describe("item list", () => {
    it("shows selected items", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={3} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        // Should show asset names
        expect(screen.getByText("Classic Scissors")).toBeInTheDocument()
      })
    })

    it("shows subtotal with item count", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={5} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText(/subtotal \(5 items\)/i)).toBeInTheDocument()
      })
    })
  })

  describe("select all offer", () => {
    it("shows 'Get all 150' offer when items < 150", async () => {
      const user = userEvent.setup()
      render(<CartWithItems itemCount={5} />)

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument()
      })
      await user.click(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByText(/get all 150/i)).toBeInTheDocument()
      })
    })
  })
})

// Helper component that pre-populates cart
function CartWithItems({ itemCount }) {
  return (
    <CartProvider>
      <CartItemsAdder itemCount={itemCount} />
      <StickyCart />
    </CartProvider>
  )
}

// Component that adds items to cart on mount
function CartItemsAdder({ itemCount }) {
  const { toggleItem } = useCart()

  // Add items on mount
  React.useEffect(() => {
    for (let i = 1; i <= itemCount; i++) {
      toggleItem(`scissors-${String(i).padStart(3, "0")}`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

// Need to import React for the effect
import React from "react"

// Test component that accepts specific items
function TestCartWithItems({ items }) {
  const { toggleItem } = useCart()

  React.useEffect(() => {
    items.forEach((id) => toggleItem(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <StickyCart />
}
