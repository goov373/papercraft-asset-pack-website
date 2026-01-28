import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { AssetCard } from "./asset-card"
import { PRICE_PER_ITEM, formatPrice } from "@/data/assets"

const mockAsset = {
  id: "scissors-001",
  name: "Classic Scissors",
  category: "scissors",
  emoji: "✂️",
}

describe("AssetCard", () => {
  describe("rendering", () => {
    it("displays asset emoji", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByText("✂️")).toBeInTheDocument()
    })

    it("displays asset name", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByText("Classic Scissors")).toBeInTheDocument()
    })

    it("displays formatted price", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByText(formatPrice(PRICE_PER_ITEM))).toBeInTheDocument()
    })

    it("renders checkbox", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByRole("checkbox")).toBeInTheDocument()
    })

    it("sets title attribute with asset name", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByRole("option")).toHaveAttribute(
        "title",
        "Classic Scissors"
      )
    })
  })

  describe("selection state", () => {
    it("shows selected styling when isSelected is true", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={true} onToggle={() => {}} />
      )

      const card = screen.getByRole("option")
      expect(card).toHaveAttribute("aria-selected", "true")
    })

    it("shows unselected styling when isSelected is false", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      const card = screen.getByRole("option")
      expect(card).toHaveAttribute("aria-selected", "false")
    })

    it("checkbox is checked when isSelected is true", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={true} onToggle={() => {}} />
      )

      expect(screen.getByRole("checkbox")).toBeChecked()
    })

    it("checkbox is unchecked when isSelected is false", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByRole("checkbox")).not.toBeChecked()
    })
  })

  describe("interactions", () => {
    it("calls onToggle with asset id when card is clicked", async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(
        <AssetCard
          asset={mockAsset}
          isSelected={false}
          onToggle={handleToggle}
        />
      )

      await user.click(screen.getByRole("option"))

      expect(handleToggle).toHaveBeenCalledTimes(1)
      expect(handleToggle).toHaveBeenCalledWith("scissors-001")
    })

    it("calls onToggle when checkbox is clicked", async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(
        <AssetCard
          asset={mockAsset}
          isSelected={false}
          onToggle={handleToggle}
        />
      )

      await user.click(screen.getByRole("checkbox"))

      expect(handleToggle).toHaveBeenCalledTimes(1)
      expect(handleToggle).toHaveBeenCalledWith("scissors-001")
    })

    it("toggles on Enter key", async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(
        <AssetCard
          asset={mockAsset}
          isSelected={false}
          onToggle={handleToggle}
        />
      )

      const card = screen.getByRole("option")
      card.focus()
      await user.keyboard("{Enter}")

      expect(handleToggle).toHaveBeenCalledTimes(1)
      expect(handleToggle).toHaveBeenCalledWith("scissors-001")
    })

    it("toggles on Space key", async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(
        <AssetCard
          asset={mockAsset}
          isSelected={false}
          onToggle={handleToggle}
        />
      )

      const card = screen.getByRole("option")
      card.focus()
      await user.keyboard(" ")

      expect(handleToggle).toHaveBeenCalledTimes(1)
      expect(handleToggle).toHaveBeenCalledWith("scissors-001")
    })

    it("does not trigger multiple toggles when clicking checkbox within card", async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(
        <AssetCard
          asset={mockAsset}
          isSelected={false}
          onToggle={handleToggle}
        />
      )

      // Click the checkbox (should only trigger once due to stopPropagation)
      await user.click(screen.getByRole("checkbox"))

      expect(handleToggle).toHaveBeenCalledTimes(1)
    })
  })

  describe("accessibility", () => {
    it("has role='option'", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByRole("option")).toBeInTheDocument()
    })

    it("has aria-selected attribute", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={true} onToggle={() => {}} />
      )

      expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true")
    })

    it("is focusable with tabIndex=0", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(screen.getByRole("option")).toHaveAttribute("tabIndex", "0")
    })

    it("checkbox has accessible label", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      expect(
        screen.getByRole("checkbox", { name: /select classic scissors/i })
      ).toBeInTheDocument()
    })

    it("emoji is hidden from screen readers", () => {
      render(
        <AssetCard asset={mockAsset} isSelected={false} onToggle={() => {}} />
      )

      const emoji = screen.getByText("✂️")
      expect(emoji).toHaveAttribute("aria-hidden", "true")
    })
  })
})
