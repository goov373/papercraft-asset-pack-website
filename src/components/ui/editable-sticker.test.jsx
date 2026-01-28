import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { EditableSticker } from "./editable-sticker"

// Mock framer-motion to simplify testing
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion")
  return {
    ...actual,
    motion: {
      div: ({ children, style, className, onClick, ...props }) => (
        <div
          className={className}
          onClick={onClick}
          style={{
            // Convert motion values to plain values for testing
            transform: `translateX(${style?.x?.get?.() ?? style?.x ?? 0}px) translateY(${style?.y?.get?.() ?? style?.y ?? 0}px)`,
          }}
          {...props}
        >
          {children}
        </div>
      ),
    },
    useMotionValue: (initial) => ({
      get: () => initial,
      set: vi.fn(),
    }),
    animate: vi.fn(),
  }
})

// Mock @use-gesture/react
vi.mock("@use-gesture/react", () => ({
  useGesture: () => () => ({}),
}))

describe("EditableSticker", () => {
  const defaultProps = {
    id: "sticker-1",
    onSelect: vi.fn(),
    onTransformChange: vi.fn(),
    onTransformEnd: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders children", () => {
      render(
        <EditableSticker {...defaultProps}>
          <span>Test Content</span>
        </EditableSticker>
      )

      expect(screen.getByText("Test Content")).toBeInTheDocument()
    })

    it("has data-sticker-id attribute", () => {
      render(
        <EditableSticker {...defaultProps}>
          <span>Content</span>
        </EditableSticker>
      )

      expect(screen.getByText("Content").closest("[data-sticker-id]")).toHaveAttribute(
        "data-sticker-id",
        "sticker-1"
      )
    })

    it("applies custom className", () => {
      render(
        <EditableSticker {...defaultProps} className="custom-class">
          <span>Content</span>
        </EditableSticker>
      )

      expect(screen.getByText("Content").closest(".custom-class")).toBeInTheDocument()
    })
  })

  describe("selection", () => {
    it("calls onSelect when clicked", async () => {
      const onSelect = vi.fn()
      const user = userEvent.setup()

      render(
        <EditableSticker {...defaultProps} onSelect={onSelect}>
          <span>Click Me</span>
        </EditableSticker>
      )

      await user.click(screen.getByText("Click Me"))

      expect(onSelect).toHaveBeenCalledWith("sticker-1")
    })

    it("shows selection ring when selected", () => {
      render(
        <EditableSticker {...defaultProps} selected={true}>
          <span>Selected</span>
        </EditableSticker>
      )

      // Selection ring has dashed border class
      const selectionRing = document.querySelector(".border-dashed")
      expect(selectionRing).toBeInTheDocument()
    })

    it("does not show selection ring when not selected", () => {
      render(
        <EditableSticker {...defaultProps} selected={false}>
          <span>Not Selected</span>
        </EditableSticker>
      )

      const selectionRing = document.querySelector(".border-dashed")
      expect(selectionRing).not.toBeInTheDocument()
    })

    it("shows transform handles when selected", () => {
      render(
        <EditableSticker {...defaultProps} selected={true}>
          <span>Selected</span>
        </EditableSticker>
      )

      // Should have rotation handle and 4 scale handles (5 total interactive elements)
      // The handles have specific cursor classes
      expect(document.querySelector(".cursor-nwse-resize")).toBeInTheDocument()
      expect(document.querySelector(".cursor-nesw-resize")).toBeInTheDocument()
    })

    it("hides transform handles when not selected", () => {
      render(
        <EditableSticker {...defaultProps} selected={false}>
          <span>Not Selected</span>
        </EditableSticker>
      )

      expect(document.querySelector(".cursor-nwse-resize")).not.toBeInTheDocument()
    })
  })

  describe("initial transforms", () => {
    it("renders with initial position props", () => {
      render(
        <EditableSticker
          {...defaultProps}
          initialPosition={{ x: 100, y: 200 }}
        >
          <span>Positioned</span>
        </EditableSticker>
      )

      // Verify component renders without error with position props
      const container = screen.getByText("Positioned").closest("[data-sticker-id]")
      expect(container).toBeInTheDocument()
    })

    it("applies flip transforms", () => {
      render(
        <EditableSticker {...defaultProps} flipH={true} flipV={false}>
          <span>Flipped</span>
        </EditableSticker>
      )

      // Content wrapper should have scaleX(-1)
      const content = screen.getByText("Flipped")
      expect(content.parentElement).toHaveStyle({ transform: "scaleX(-1) scaleY(1)" })
    })

    it("applies both flip transforms", () => {
      render(
        <EditableSticker {...defaultProps} flipH={true} flipV={true}>
          <span>Double Flipped</span>
        </EditableSticker>
      )

      const content = screen.getByText("Double Flipped")
      expect(content.parentElement).toHaveStyle({ transform: "scaleX(-1) scaleY(-1)" })
    })
  })

  describe("disabled state", () => {
    it("applies disabled styling", () => {
      render(
        <EditableSticker {...defaultProps} disabled={true}>
          <span>Disabled</span>
        </EditableSticker>
      )

      const container = screen.getByText("Disabled").closest("[data-sticker-id]")
      expect(container).toHaveClass("opacity-50")
      expect(container).toHaveClass("pointer-events-none")
    })

    it("does not show handles when disabled and selected", () => {
      render(
        <EditableSticker {...defaultProps} disabled={true} selected={true}>
          <span>Disabled Selected</span>
        </EditableSticker>
      )

      // Handles should not appear even when selected
      expect(document.querySelector(".cursor-nwse-resize")).not.toBeInTheDocument()
    })
  })

  describe("shadow states", () => {
    it("renders with isPopped true", () => {
      render(
        <EditableSticker {...defaultProps} isPopped={true}>
          <span>Popped</span>
        </EditableSticker>
      )

      // Verify component renders without error with isPopped
      const container = screen.getByText("Popped").closest("[data-sticker-id]")
      expect(container).toBeInTheDocument()
    })

    it("renders with isPopped false", () => {
      render(
        <EditableSticker {...defaultProps} isPopped={false}>
          <span>Not Popped</span>
        </EditableSticker>
      )

      const container = screen.getByText("Not Popped").closest("[data-sticker-id]")
      expect(container).toBeInTheDocument()
    })
  })

  describe("ref forwarding", () => {
    it("forwards ref to container element", () => {
      const ref = { current: null }

      render(
        <EditableSticker {...defaultProps} ref={ref}>
          <span>Ref Test</span>
        </EditableSticker>
      )

      expect(ref.current).toBeInstanceOf(HTMLElement)
      expect(ref.current).toHaveAttribute("data-sticker-id", "sticker-1")
    })

    it("supports callback ref", () => {
      const refCallback = vi.fn()

      render(
        <EditableSticker {...defaultProps} ref={refCallback}>
          <span>Callback Ref</span>
        </EditableSticker>
      )

      expect(refCallback).toHaveBeenCalled()
      expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLElement))
    })
  })
})
