import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  useCanvasHistory,
  cloneStickerState,
  applyStickerTransform,
  deleteSticker,
  duplicateSticker,
  bringForward,
  sendBackward,
} from "./use-canvas-history"
import {
  mockStickers,
  singleSticker,
} from "@/test/fixtures/canvas-fixtures"

describe("useCanvasHistory", () => {
  describe("initialization", () => {
    it("starts with initialState in history", () => {
      const { result } = renderHook(() => useCanvasHistory(mockStickers))

      expect(result.current.canvasState).toEqual(mockStickers)
    })

    it("initializes currentIndex at 0", () => {
      const { result } = renderHook(() => useCanvasHistory(mockStickers))

      expect(result.current.currentIndex).toBe(0)
    })

    it("initializes historyLength at 1", () => {
      const { result } = renderHook(() => useCanvasHistory(mockStickers))

      expect(result.current.historyLength).toBe(1)
    })

    it("canUndo is false initially", () => {
      const { result } = renderHook(() => useCanvasHistory(mockStickers))

      expect(result.current.canUndo).toBe(false)
    })

    it("canRedo is false initially", () => {
      const { result } = renderHook(() => useCanvasHistory(mockStickers))

      expect(result.current.canRedo).toBe(false)
    })

    it("uses empty array as default initialState", () => {
      const { result } = renderHook(() => useCanvasHistory())

      expect(result.current.canvasState).toEqual([])
    })

    it("accepts custom maxHistory parameter", () => {
      const { result } = renderHook(() => useCanvasHistory([], 5))

      // Push 6 states to verify limit
      for (let i = 0; i < 6; i++) {
        act(() => {
          result.current.pushState([{ id: `sticker-${i}` }])
        })
      }

      // Should be capped at 5
      expect(result.current.historyLength).toBeLessThanOrEqual(5)
    })
  })

  describe("pushState", () => {
    it("adds new state to history", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([singleSticker])
      })

      expect(result.current.historyLength).toBe(2)
      expect(result.current.canvasState).toEqual([singleSticker])
    })

    it("increments currentIndex", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      expect(result.current.currentIndex).toBe(0)

      act(() => {
        result.current.pushState([singleSticker])
      })

      expect(result.current.currentIndex).toBe(1)
    })

    it("truncates future states when pushing after undo (fork)", () => {
      vi.useFakeTimers()
      const { result } = renderHook(() => useCanvasHistory([]))

      // Push 3 states
      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })
      act(() => {
        result.current.pushState([{ id: "state-2" }])
      })
      act(() => {
        result.current.pushState([{ id: "state-3" }])
      })

      expect(result.current.historyLength).toBe(4) // initial + 3

      // Undo twice (back to state-1) - need to wait for debounce
      act(() => {
        result.current.undo()
        vi.advanceTimersByTime(100)
      })
      act(() => {
        result.current.undo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(1)

      // Push new state (should truncate state-2 and state-3)
      act(() => {
        result.current.pushState([{ id: "state-new" }])
      })

      expect(result.current.historyLength).toBe(3) // initial, state-1, state-new
      expect(result.current.canvasState).toEqual([{ id: "state-new" }])
      vi.useRealTimers()
    })

    it("respects maxHistory (30 state limit)", () => {
      const { result } = renderHook(() => useCanvasHistory([], 30))

      // Push 35 states
      for (let i = 0; i < 35; i++) {
        act(() => {
          result.current.pushState([{ id: `sticker-${i}` }])
        })
      }

      // Should be capped at 30
      expect(result.current.historyLength).toBeLessThanOrEqual(30)
    })

    it("slides window when at max history limit", () => {
      const { result } = renderHook(() => useCanvasHistory([{ id: "initial" }], 5))

      // Push 5 more states (total 6, should slide to keep 5)
      for (let i = 0; i < 5; i++) {
        act(() => {
          result.current.pushState([{ id: `state-${i}` }])
        })
      }

      // History should have slid, oldest state removed
      expect(result.current.historyLength).toBeLessThanOrEqual(5)
      // Current state should be the last pushed
      expect(result.current.canvasState).toEqual([{ id: "state-4" }])
    })
  })

  describe("setCanvasState", () => {
    it("updates current state in-place", () => {
      const { result } = renderHook(() => useCanvasHistory([singleSticker]))

      act(() => {
        result.current.setCanvasState([{ ...singleSticker, x: 200 }])
      })

      expect(result.current.canvasState[0].x).toBe(200)
    })

    it("accepts function updater", () => {
      const { result } = renderHook(() => useCanvasHistory([singleSticker]))

      act(() => {
        result.current.setCanvasState((prev) =>
          prev.map((s) => ({ ...s, scale: s.scale * 2 }))
        )
      })

      expect(result.current.canvasState[0].scale).toBe(2)
    })

    it("does not push to history", () => {
      const { result } = renderHook(() => useCanvasHistory([singleSticker]))

      expect(result.current.historyLength).toBe(1)

      act(() => {
        result.current.setCanvasState([{ ...singleSticker, x: 200 }])
      })

      expect(result.current.historyLength).toBe(1)
      expect(result.current.canUndo).toBe(false)
    })

    it("does not change currentIndex", () => {
      const { result } = renderHook(() => useCanvasHistory([singleSticker]))

      act(() => {
        result.current.setCanvasState([{ ...singleSticker, x: 200 }])
      })

      expect(result.current.currentIndex).toBe(0)
    })
  })

  describe("undo", () => {
    it("decrements currentIndex", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })

      expect(result.current.currentIndex).toBe(1)

      act(() => {
        result.current.undo()
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it("updates canvasState to previous state", () => {
      const initialState = [{ id: "initial" }]
      const newState = [{ id: "new" }]

      const { result } = renderHook(() => useCanvasHistory(initialState))

      act(() => {
        result.current.pushState(newState)
      })

      expect(result.current.canvasState).toEqual(newState)

      act(() => {
        result.current.undo()
      })

      expect(result.current.canvasState).toEqual(initialState)
    })

    it("sets canUndo false at index 0", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })

      expect(result.current.canUndo).toBe(true)

      act(() => {
        result.current.undo()
      })

      expect(result.current.canUndo).toBe(false)
    })

    it("enables canRedo after undo", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })

      expect(result.current.canRedo).toBe(false)

      act(() => {
        result.current.undo()
      })

      expect(result.current.canRedo).toBe(true)
    })

    it("ignores call when canUndo is false", () => {
      const { result } = renderHook(() => useCanvasHistory([{ id: "initial" }]))

      expect(result.current.canUndo).toBe(false)

      act(() => {
        result.current.undo()
      })

      // Should still be at index 0
      expect(result.current.currentIndex).toBe(0)
    })
  })

  describe("redo", () => {
    it("increments currentIndex", () => {
      vi.useFakeTimers()
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })
      act(() => {
        result.current.undo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(0)

      act(() => {
        result.current.redo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(1)
      vi.useRealTimers()
    })

    it("updates canvasState to next state", () => {
      vi.useFakeTimers()
      const initialState = [{ id: "initial" }]
      const newState = [{ id: "new" }]

      const { result } = renderHook(() => useCanvasHistory(initialState))

      act(() => {
        result.current.pushState(newState)
      })
      act(() => {
        result.current.undo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.canvasState).toEqual(initialState)

      act(() => {
        result.current.redo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.canvasState).toEqual(newState)
      vi.useRealTimers()
    })

    it("sets canRedo false at end of history", () => {
      vi.useFakeTimers()
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })
      act(() => {
        result.current.undo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.canRedo).toBe(true)

      act(() => {
        result.current.redo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.canRedo).toBe(false)
      vi.useRealTimers()
    })

    it("ignores call when canRedo is false", () => {
      const { result } = renderHook(() => useCanvasHistory([{ id: "initial" }]))

      expect(result.current.canRedo).toBe(false)

      act(() => {
        result.current.redo()
      })

      // Should still be at index 0
      expect(result.current.currentIndex).toBe(0)
    })
  })

  describe("clearHistory", () => {
    it("resets to new initial state", () => {
      const { result } = renderHook(() => useCanvasHistory([{ id: "initial" }]))

      // Add some history
      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })
      act(() => {
        result.current.pushState([{ id: "state-2" }])
      })

      expect(result.current.historyLength).toBe(3)

      // Clear with new initial state
      act(() => {
        result.current.clearHistory([{ id: "new-initial" }])
      })

      expect(result.current.canvasState).toEqual([{ id: "new-initial" }])
      expect(result.current.historyLength).toBe(1)
    })

    it("resets currentIndex to 0", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
        result.current.pushState([{ id: "state-2" }])
      })

      expect(result.current.currentIndex).toBe(2)

      act(() => {
        result.current.clearHistory([])
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it("uses original initialState if no argument provided", () => {
      const originalInitial = [{ id: "original" }]
      const { result } = renderHook(() => useCanvasHistory(originalInitial))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
        result.current.clearHistory()
      })

      expect(result.current.canvasState).toEqual(originalInitial)
    })

    it("resets canUndo and canRedo to false", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })

      expect(result.current.canUndo).toBe(true)

      act(() => {
        result.current.clearHistory([])
      })

      expect(result.current.canUndo).toBe(false)
      expect(result.current.canRedo).toBe(false)
    })
  })

  describe("keyboard shortcuts", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it("Cmd+Z triggers undo (Mac)", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })

      expect(result.current.currentIndex).toBe(1)

      // Simulate Cmd+Z
      act(() => {
        const event = new KeyboardEvent("keydown", {
          key: "z",
          metaKey: true,
          bubbles: true,
        })
        window.dispatchEvent(event)
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it("Ctrl+Z triggers undo (Windows)", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })

      // Simulate Ctrl+Z
      act(() => {
        const event = new KeyboardEvent("keydown", {
          key: "z",
          ctrlKey: true,
          bubbles: true,
        })
        window.dispatchEvent(event)
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it("Cmd+Shift+Z triggers redo", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
      })
      act(() => {
        result.current.undo()
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(0)

      // Simulate Cmd+Shift+Z
      act(() => {
        const event = new KeyboardEvent("keydown", {
          key: "z",
          metaKey: true,
          shiftKey: true,
          bubbles: true,
        })
        window.dispatchEvent(event)
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(1)
    })

    it("Ctrl+Y triggers redo (Windows)", () => {
      const { result } = renderHook(() => useCanvasHistory([]))

      act(() => {
        result.current.pushState([{ id: "state-1" }])
        result.current.undo()
        vi.advanceTimersByTime(100)
      })

      // Simulate Ctrl+Y
      act(() => {
        const event = new KeyboardEvent("keydown", {
          key: "y",
          ctrlKey: true,
          bubbles: true,
        })
        window.dispatchEvent(event)
        vi.advanceTimersByTime(100)
      })

      expect(result.current.currentIndex).toBe(1)
    })

    it("keyboard handler is cleaned up on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener")

      const { unmount } = renderHook(() => useCanvasHistory([]))

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      )

      removeEventListenerSpy.mockRestore()
    })
  })
})

describe("Helper Functions", () => {
  describe("cloneStickerState", () => {
    it("creates a new array", () => {
      const original = mockStickers
      const cloned = cloneStickerState(original)

      expect(cloned).not.toBe(original)
    })

    it("creates new objects for each sticker", () => {
      const original = mockStickers
      const cloned = cloneStickerState(original)

      cloned.forEach((sticker, i) => {
        expect(sticker).not.toBe(original[i])
      })
    })

    it("preserves all sticker properties", () => {
      const original = [singleSticker]
      const cloned = cloneStickerState(original)

      expect(cloned[0]).toEqual(singleSticker)
    })

    it("does not mutate original when clone is modified", () => {
      const original = [{ ...singleSticker }]
      const cloned = cloneStickerState(original)

      cloned[0].x = 999

      expect(original[0].x).toBe(singleSticker.x)
    })

    it("handles empty array", () => {
      const cloned = cloneStickerState([])

      expect(cloned).toEqual([])
    })
  })

  describe("applyStickerTransform", () => {
    it("updates correct sticker by id", () => {
      const result = applyStickerTransform(mockStickers, "sticker-1", {
        x: 200,
        y: 300,
      })

      const updated = result.find((s) => s.id === "sticker-1")
      expect(updated.x).toBe(200)
      expect(updated.y).toBe(300)
    })

    it("leaves other stickers unchanged", () => {
      const result = applyStickerTransform(mockStickers, "sticker-1", {
        x: 200,
      })

      const other = result.find((s) => s.id === "sticker-2")
      expect(other).toEqual(mockStickers.find((s) => s.id === "sticker-2"))
    })

    it("returns new array (immutable)", () => {
      const result = applyStickerTransform(mockStickers, "sticker-1", {
        x: 200,
      })

      expect(result).not.toBe(mockStickers)
    })

    it("creates new object for updated sticker", () => {
      const result = applyStickerTransform(mockStickers, "sticker-1", {
        x: 200,
      })

      const originalSticker = mockStickers.find((s) => s.id === "sticker-1")
      const updatedSticker = result.find((s) => s.id === "sticker-1")

      expect(updatedSticker).not.toBe(originalSticker)
    })

    it("merges transform properties correctly", () => {
      const result = applyStickerTransform(mockStickers, "sticker-1", {
        rotation: 45,
        scale: 1.5,
      })

      const updated = result.find((s) => s.id === "sticker-1")
      expect(updated.rotation).toBe(45)
      expect(updated.scale).toBe(1.5)
      expect(updated.x).toBe(mockStickers[0].x) // Original preserved
    })

    it("returns unchanged array if sticker id not found", () => {
      const result = applyStickerTransform(mockStickers, "non-existent", {
        x: 200,
      })

      expect(result).toEqual(mockStickers)
    })
  })

  describe("deleteSticker", () => {
    it("removes sticker by id", () => {
      const result = deleteSticker(mockStickers, "sticker-1")

      expect(result).toHaveLength(mockStickers.length - 1)
      expect(result.find((s) => s.id === "sticker-1")).toBeUndefined()
    })

    it("returns new array (immutable)", () => {
      const result = deleteSticker(mockStickers, "sticker-1")

      expect(result).not.toBe(mockStickers)
    })

    it("returns unchanged array if id not found", () => {
      const result = deleteSticker(mockStickers, "non-existent")

      expect(result).toHaveLength(mockStickers.length)
    })

    it("preserves other stickers", () => {
      const result = deleteSticker(mockStickers, "sticker-1")

      expect(result.find((s) => s.id === "sticker-2")).toBeDefined()
      expect(result.find((s) => s.id === "sticker-3")).toBeDefined()
    })

    it("handles single sticker array", () => {
      const result = deleteSticker([singleSticker], singleSticker.id)

      expect(result).toEqual([])
    })
  })

  describe("duplicateSticker", () => {
    it("adds copy with new id", () => {
      const mockGenerateId = () => "new-sticker-id"
      const result = duplicateSticker(mockStickers, "sticker-1", mockGenerateId)

      expect(result).toHaveLength(mockStickers.length + 1)
      expect(result.find((s) => s.id === "new-sticker-id")).toBeDefined()
    })

    it("offsets position by 20px", () => {
      const mockGenerateId = () => "new-id"
      const original = mockStickers.find((s) => s.id === "sticker-1")
      const result = duplicateSticker(mockStickers, "sticker-1", mockGenerateId)

      const duplicate = result.find((s) => s.id === "new-id")
      expect(duplicate.x).toBe(original.x + 20)
      expect(duplicate.y).toBe(original.y + 20)
    })

    it("preserves other properties from original", () => {
      const mockGenerateId = () => "new-id"
      const original = mockStickers.find((s) => s.id === "sticker-1")
      const result = duplicateSticker(mockStickers, "sticker-1", mockGenerateId)

      const duplicate = result.find((s) => s.id === "new-id")
      expect(duplicate.emoji).toBe(original.emoji)
      expect(duplicate.rotation).toBe(original.rotation)
      expect(duplicate.scale).toBe(original.scale)
    })

    it("returns unchanged array if sticker not found", () => {
      const result = duplicateSticker(mockStickers, "non-existent")

      expect(result).toEqual(mockStickers)
    })

    it("uses default id generator if not provided", () => {
      const result = duplicateSticker(mockStickers, "sticker-1")

      // Should have one more sticker
      expect(result).toHaveLength(mockStickers.length + 1)
      // New sticker should have a generated ID
      const newSticker = result[result.length - 1]
      expect(newSticker.id).toMatch(/^sticker-\d+$/)
    })

    it("handles sticker with no x/y (defaults to 0)", () => {
      const stickerNoPosition = { id: "no-pos", emoji: "✂️" }
      const mockGenerateId = () => "new-id"
      const result = duplicateSticker([stickerNoPosition], "no-pos", mockGenerateId)

      const duplicate = result.find((s) => s.id === "new-id")
      expect(duplicate.x).toBe(20)
      expect(duplicate.y).toBe(20)
    })
  })

  describe("bringForward", () => {
    it("swaps sticker with next element in array", () => {
      const result = bringForward(mockStickers, "sticker-1")

      expect(result[0].id).toBe("sticker-2")
      expect(result[1].id).toBe("sticker-1")
    })

    it("no-op when sticker is already at end of array", () => {
      const result = bringForward(mockStickers, "sticker-3")

      expect(result).toEqual(mockStickers)
    })

    it("returns new array (immutable)", () => {
      const result = bringForward(mockStickers, "sticker-1")

      expect(result).not.toBe(mockStickers)
    })

    it("returns unchanged array if sticker not found", () => {
      const result = bringForward(mockStickers, "non-existent")

      expect(result).toEqual(mockStickers)
    })

    it("preserves sticker properties during swap", () => {
      const result = bringForward(mockStickers, "sticker-1")

      const movedSticker = result[1]
      const originalSticker = mockStickers[0]

      expect(movedSticker.x).toBe(originalSticker.x)
      expect(movedSticker.y).toBe(originalSticker.y)
      expect(movedSticker.rotation).toBe(originalSticker.rotation)
    })
  })

  describe("sendBackward", () => {
    it("swaps sticker with previous element in array", () => {
      const result = sendBackward(mockStickers, "sticker-2")

      expect(result[0].id).toBe("sticker-2")
      expect(result[1].id).toBe("sticker-1")
    })

    it("no-op when sticker is already at start of array", () => {
      const result = sendBackward(mockStickers, "sticker-1")

      expect(result).toEqual(mockStickers)
    })

    it("returns new array (immutable)", () => {
      const result = sendBackward(mockStickers, "sticker-2")

      expect(result).not.toBe(mockStickers)
    })

    it("returns unchanged array if sticker not found", () => {
      const result = sendBackward(mockStickers, "non-existent")

      expect(result).toEqual(mockStickers)
    })

    it("preserves sticker properties during swap", () => {
      const result = sendBackward(mockStickers, "sticker-2")

      const movedSticker = result[0]
      const originalSticker = mockStickers[1]

      expect(movedSticker.x).toBe(originalSticker.x)
      expect(movedSticker.rotation).toBe(originalSticker.rotation)
    })
  })
})
