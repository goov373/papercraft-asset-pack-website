import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { PreviewGrid } from "./PreviewGrid"
import { CartProvider } from "@/context/CartContext"
import { categories } from "@/data/assets"

// Helper to render with CartProvider
function renderPreviewGrid() {
  return render(
    <CartProvider>
      <PreviewGrid />
    </CartProvider>
  )
}

describe("PreviewGrid", () => {
  describe("rendering", () => {
    it("renders category tabs", () => {
      renderPreviewGrid()

      // Should have all category tabs
      categories.forEach((category) => {
        expect(screen.getByRole("tab", { name: new RegExp(category.label, "i") })).toBeInTheDocument()
      })
    })

    it("renders asset grid with listbox role", () => {
      renderPreviewGrid()

      expect(screen.getByRole("listbox", { name: /select assets/i })).toBeInTheDocument()
    })

    it("renders with multiselectable attribute", () => {
      renderPreviewGrid()

      expect(screen.getByRole("listbox")).toHaveAttribute("aria-multiselectable", "true")
    })

    it("shows first 18 assets by default", () => {
      renderPreviewGrid()

      const listbox = screen.getByRole("listbox")
      const options = within(listbox).getAllByRole("option")

      expect(options).toHaveLength(18)
    })

    it("shows 'All' tab as selected by default", () => {
      renderPreviewGrid()

      const allTab = screen.getByRole("tab", { name: /all/i })
      expect(allTab).toHaveAttribute("aria-selected", "true")
    })
  })

  describe("category tabs", () => {
    it("changes category on tab click", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Click on Scissors tab
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      // Scissors tab should be selected
      await waitFor(() => {
        expect(screen.getByRole("tab", { name: /scissors/i })).toHaveAttribute(
          "aria-selected",
          "true"
        )
      })
    })

    it("shows correct assets for selected category", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Click on Scissors category (18 items)
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      // Should show scissors assets
      await waitFor(() => {
        expect(screen.getByText("Classic Scissors")).toBeInTheDocument()
      })
    })

    it("does not show CategoryPackHeader for 'All' tab", () => {
      renderPreviewGrid()

      // Should not show pack toggle when "All" is selected
      expect(screen.queryByText(/add all|remove pack/i)).not.toBeInTheDocument()
    })

    it("shows CategoryPackHeader for category tabs", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      await waitFor(() => {
        // Should show the pack header with add/remove functionality
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })
    })
  })

  describe("pagination", () => {
    it("shows 'View More' when more items are available", () => {
      renderPreviewGrid()

      // With "All" selected (150 items), should show View More
      expect(screen.getByRole("button", { name: /view more/i })).toBeInTheDocument()
    })

    it("shows remaining count in View More button", () => {
      renderPreviewGrid()

      // 150 total - 18 visible = 132 remaining
      expect(screen.getByText(/132 remaining/i)).toBeInTheDocument()
    })

    it("loads next 18 items on View More click", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      const initialOptions = within(screen.getByRole("listbox")).getAllByRole("option")
      expect(initialOptions).toHaveLength(18)

      await user.click(screen.getByRole("button", { name: /view more/i }))

      await waitFor(() => {
        const options = within(screen.getByRole("listbox")).getAllByRole("option")
        expect(options).toHaveLength(36)
      })
    })

    it("resets pagination when category changes", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Load more items
      await user.click(screen.getByRole("button", { name: /view more/i }))

      await waitFor(() => {
        const options = within(screen.getByRole("listbox")).getAllByRole("option")
        expect(options).toHaveLength(36)
      })

      // Switch to scissors category
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      // Should reset to 18 (or less if category has fewer)
      await waitFor(() => {
        const options = within(screen.getByRole("listbox")).getAllByRole("option")
        expect(options.length).toBeLessThanOrEqual(18)
      })
    })

    it("shows 'Showing all X assets' when no more items", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Switch to a category with fewer items (scenes has 6)
      await user.click(screen.getByRole("tab", { name: /scenes/i }))

      await waitFor(() => {
        expect(screen.getByText(/showing all 6 assets/i)).toBeInTheDocument()
      })
    })

    it("hides View More when all items are shown", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Switch to scenes (6 items, less than 18)
      await user.click(screen.getByRole("tab", { name: /scenes/i }))

      await waitFor(() => {
        expect(screen.queryByRole("button", { name: /view more/i })).not.toBeInTheDocument()
      })
    })
  })

  describe("item selection", () => {
    it("toggles item selection on card click", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Get first asset card
      const firstOption = within(screen.getByRole("listbox")).getAllByRole("option")[0]

      expect(firstOption).toHaveAttribute("aria-selected", "false")

      await user.click(firstOption)

      expect(firstOption).toHaveAttribute("aria-selected", "true")
    })

    it("maintains selection state across pagination", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Select first item
      const firstOption = within(screen.getByRole("listbox")).getAllByRole("option")[0]
      await user.click(firstOption)

      expect(firstOption).toHaveAttribute("aria-selected", "true")

      // Load more items
      await user.click(screen.getByRole("button", { name: /view more/i }))

      // First item should still be selected
      await waitFor(() => {
        const options = within(screen.getByRole("listbox")).getAllByRole("option")
        expect(options[0]).toHaveAttribute("aria-selected", "true")
      })
    })
  })

  describe("pack selection", () => {
    it("toggles entire pack via header button", async () => {
      const user = userEvent.setup()
      renderPreviewGrid()

      // Switch to scissors category
      await user.click(screen.getByRole("tab", { name: /scissors/i }))

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /add all/i })).toBeInTheDocument()
      })

      // Toggle pack using the Add All button
      await user.click(screen.getByRole("button", { name: /add all/i }))

      // All visible items should be selected
      await waitFor(() => {
        const options = within(screen.getByRole("listbox")).getAllByRole("option")
        options.forEach((option) => {
          expect(option).toHaveAttribute("aria-selected", "true")
        })
      })

      // Button should now say "Remove Pack"
      expect(screen.getByRole("button", { name: /remove pack/i })).toBeInTheDocument()
    })
  })
})
