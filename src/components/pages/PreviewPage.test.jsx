import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import PreviewPage from "./PreviewPage"
import { MINIMUM_CART, PRICE_PER_ITEM } from "@/data/assets"

// Helper to render PreviewPage with router
function renderPreviewPage() {
  return render(
    <MemoryRouter initialEntries={["/preview"]}>
      <PreviewPage />
    </MemoryRouter>
  )
}

describe("PreviewPage Integration", () => {
  describe("full page render", () => {
    it("renders all main sections", async () => {
      renderPreviewPage()

      // Nav should be present
      expect(screen.getByRole("navigation")).toBeInTheDocument()

      // PreviewHero content
      await waitFor(() => {
        expect(screen.getByText(/preview all assets/i)).toBeInTheDocument()
      })

      // PreviewGrid with tabs
      expect(screen.getByRole("tab", { name: /all/i })).toBeInTheDocument()

      // Asset grid
      expect(screen.getByRole("listbox", { name: /select assets/i })).toBeInTheDocument()

      // Footer
      expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    })

    it("does not show cart when empty", () => {
      renderPreviewPage()

      // StickyCart should not be visible with 0 items
      expect(screen.queryByLabelText(/shopping cart/i)).not.toBeInTheDocument()
    })
  })

  describe("cart integration flow", () => {
    it("selecting assets in PreviewGrid updates StickyCart count", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Select first 3 assets
      const listbox = screen.getByRole("listbox")
      const options = within(listbox).getAllByRole("option")

      await user.click(options[0])
      await user.click(options[1])
      await user.click(options[2])

      // StickyCart should appear with 3 items
      await waitFor(() => {
        expect(screen.getByLabelText(/shopping cart, 3 items/i)).toBeInTheDocument()
      })

      // Badge should show 3
      expect(screen.getByText("3")).toBeInTheDocument()
    })

    it("deselecting assets updates cart count", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      const listbox = screen.getByRole("listbox")
      const options = within(listbox).getAllByRole("option")

      // Select 2 items
      await user.click(options[0])
      await user.click(options[1])

      await waitFor(() => {
        expect(screen.getByText("2")).toBeInTheDocument()
      })

      // Deselect 1 item
      await user.click(options[0])

      await waitFor(() => {
        expect(screen.getByText("1")).toBeInTheDocument()
      })
    })
  })

  describe("minimum threshold flow", () => {
    it("shows warning in cart when under $6.99 minimum", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Select 5 items ($1.30 < $6.99)
      const listbox = screen.getByRole("listbox")
      const options = within(listbox).getAllByRole("option")

      for (let i = 0; i < 5; i++) {
        await user.click(options[i])
      }

      // Expand cart
      await waitFor(() => {
        expect(screen.getByLabelText(/shopping cart, 5 items/i)).toBeInTheDocument()
      })

      await user.click(screen.getByLabelText(/shopping cart, 5 items/i))

      // Should show warning
      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument()
        expect(screen.getByText(/add .* more to checkout/i)).toBeInTheDocument()
      })

      // Checkout should be disabled
      expect(screen.getByRole("button", { name: /checkout/i })).toBeDisabled()
    })

    it("enables checkout when minimum is met", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Need 27 items to meet $6.99 minimum
      // Select scissors pack (18 items) + more
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })

      // Add all scissors (18 items)
      await user.click(screen.getByRole("button", { name: /add all/i }))

      // Switch to paper and add some more
      await user.click(screen.getByRole("tab", { name: /paper/i }))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })

      // Add all paper (24 items) - now 42 total
      await user.click(screen.getByRole("button", { name: /add all/i }))

      // Expand cart
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /shopping cart/i })).toBeInTheDocument()
      })

      await user.click(screen.getByRole("button", { name: /shopping cart/i }))

      // Wait for expanded cart to appear (shows "Your Cart" header)
      await waitFor(() => {
        expect(screen.getByText("Your Cart")).toBeInTheDocument()
      })

      // Should NOT show warning
      expect(screen.queryByRole("alert")).not.toBeInTheDocument()

      // Checkout should be enabled
      expect(screen.getByRole("button", { name: /checkout/i })).not.toBeDisabled()
    })
  })

  describe("clear cart flow", () => {
    it("Clear button resets all selections in PreviewGrid", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Select some items
      const listbox = screen.getByRole("listbox")
      const options = within(listbox).getAllByRole("option")

      await user.click(options[0])
      await user.click(options[1])
      await user.click(options[2])

      // Verify selected
      expect(options[0]).toHaveAttribute("aria-selected", "true")
      expect(options[1]).toHaveAttribute("aria-selected", "true")
      expect(options[2]).toHaveAttribute("aria-selected", "true")

      // Open cart and clear
      await waitFor(() => {
        expect(screen.getByLabelText(/shopping cart, 3 items/i)).toBeInTheDocument()
      })

      await user.click(screen.getByLabelText(/shopping cart, 3 items/i))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument()
      })

      await user.click(screen.getByRole("button", { name: /clear/i }))

      // Cart should disappear
      await waitFor(() => {
        expect(screen.queryByText("Your Cart")).not.toBeInTheDocument()
      })

      // Items should be deselected
      const updatedOptions = within(screen.getByRole("listbox")).getAllByRole("option")
      expect(updatedOptions[0]).toHaveAttribute("aria-selected", "false")
      expect(updatedOptions[1]).toHaveAttribute("aria-selected", "false")
      expect(updatedOptions[2]).toHaveAttribute("aria-selected", "false")
    })
  })

  describe("category pack selection flow", () => {
    it("selecting pack updates cart with all category items", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Switch to scissors category
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })

      // Add entire pack
      await user.click(screen.getByRole("button", { name: /add all/i }))

      // Button should change to "Remove Pack"
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /remove pack/i })).toBeInTheDocument()
      })

      // Cart should show 18 items (scissors count)
      await waitFor(() => {
        expect(screen.getByText("18")).toBeInTheDocument()
      })

      // All visible items should be selected
      const options = within(screen.getByRole("listbox")).getAllByRole("option")
      options.forEach((option) => {
        expect(option).toHaveAttribute("aria-selected", "true")
      })
    })

    it("removing pack deselects all category items", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Switch to scissors and add pack
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })

      await user.click(screen.getByRole("button", { name: /add all/i }))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /remove pack/i })).toBeInTheDocument()
      })

      // Remove pack
      await user.click(screen.getByRole("button", { name: /remove pack/i }))

      // Button should change back to "Add All"
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })

      // Cart should disappear (0 items)
      await waitFor(() => {
        expect(screen.queryByLabelText(/shopping cart/i)).not.toBeInTheDocument()
      })
    })
  })

  describe("pagination and selection persistence", () => {
    it("selected items persist across pagination", async () => {
      const user = userEvent.setup()
      renderPreviewPage()

      // Select first item
      const listbox = screen.getByRole("listbox")
      const firstOption = within(listbox).getAllByRole("option")[0]

      await user.click(firstOption)
      expect(firstOption).toHaveAttribute("aria-selected", "true")

      // Load more items
      await user.click(screen.getByRole("button", { name: /view more/i }))

      // Wait for more items to load
      await waitFor(() => {
        const options = within(screen.getByRole("listbox")).getAllByRole("option")
        expect(options.length).toBeGreaterThan(18)
      })

      // First item should still be selected
      const updatedOptions = within(screen.getByRole("listbox")).getAllByRole("option")
      expect(updatedOptions[0]).toHaveAttribute("aria-selected", "true")
    })
  })
})
