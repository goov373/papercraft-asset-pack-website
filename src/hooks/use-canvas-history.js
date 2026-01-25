import { useState, useCallback, useEffect, useRef } from "react"

/**
 * useCanvasHistory - Undo/redo state management for the sticker playground
 *
 * Features:
 * - Cmd/Ctrl+Z to undo, Cmd/Ctrl+Shift+Z to redo
 * - 30 action history limit
 * - Debounced during continuous drag (only saves on release)
 * - Tracks add, delete, transform, reorder actions
 *
 * Usage:
 * ```jsx
 * const {
 *   canvasState,
 *   setCanvasState,
 *   pushState,
 *   undo,
 *   redo,
 *   canUndo,
 *   canRedo,
 *   clearHistory,
 * } = useCanvasHistory(initialStickers)
 * ```
 *
 * @param {Array} initialState - Initial stickers array
 * @param {number} maxHistory - Maximum number of states to keep (default: 30)
 * @returns {Object} History management utilities
 */
export function useCanvasHistory(initialState = [], maxHistory = 30) {
  // History stack: array of past states
  const [history, setHistory] = useState([initialState])
  // Current index in history
  const [currentIndex, setCurrentIndex] = useState(0)
  // Flag to prevent keyboard shortcuts from triggering during other operations
  const isHandlingRef = useRef(false)

  // Current state is at currentIndex in history
  const canvasState = history[currentIndex]

  // Can undo if we're not at the beginning of history
  const canUndo = currentIndex > 0

  // Can redo if we're not at the end of history
  const canRedo = currentIndex < history.length - 1

  /**
   * Set canvas state directly (used for controlled updates)
   * This updates the current state but doesn't push to history
   */
  const setCanvasState = useCallback(
    (newState) => {
      const resolvedState =
        typeof newState === "function" ? newState(canvasState) : newState

      setHistory((prev) => {
        const newHistory = [...prev]
        newHistory[currentIndex] = resolvedState
        return newHistory
      })
    },
    [canvasState, currentIndex]
  )

  /**
   * Push a new state to history
   * This is what should be called when a transform/action completes
   */
  const pushState = useCallback(
    (newState) => {
      setHistory((prev) => {
        // If we're not at the end of history, truncate future states
        const newHistory = prev.slice(0, currentIndex + 1)

        // Add new state
        newHistory.push(newState)

        // Trim history if exceeds max
        if (newHistory.length > maxHistory) {
          return newHistory.slice(newHistory.length - maxHistory)
        }

        return newHistory
      })

      // Move index to the new state (accounting for potential truncation)
      setCurrentIndex((prev) => Math.min(prev + 1, maxHistory - 1))
    },
    [currentIndex, maxHistory]
  )

  /**
   * Undo - move back one state in history
   */
  const undo = useCallback(() => {
    if (canUndo && !isHandlingRef.current) {
      isHandlingRef.current = true
      setCurrentIndex((prev) => prev - 1)
      // Reset flag after a short delay
      setTimeout(() => {
        isHandlingRef.current = false
      }, 50)
    }
  }, [canUndo])

  /**
   * Redo - move forward one state in history
   */
  const redo = useCallback(() => {
    if (canRedo && !isHandlingRef.current) {
      isHandlingRef.current = true
      setCurrentIndex((prev) => prev + 1)
      // Reset flag after a short delay
      setTimeout(() => {
        isHandlingRef.current = false
      }, 50)
    }
  }, [canRedo])

  /**
   * Clear all history and reset to initial state
   */
  const clearHistory = useCallback(
    (newInitialState = initialState) => {
      setHistory([newInitialState])
      setCurrentIndex(0)
    },
    [initialState]
  )

  /**
   * Keyboard shortcuts: Cmd/Ctrl+Z for undo, Cmd/Ctrl+Shift+Z for redo
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Cmd (Mac) or Ctrl (Windows/Linux)
      const isMod = e.metaKey || e.ctrlKey

      if (isMod && e.key === "z") {
        e.preventDefault()

        if (e.shiftKey) {
          // Cmd/Ctrl+Shift+Z = Redo
          redo()
        } else {
          // Cmd/Ctrl+Z = Undo
          undo()
        }
      }

      // Also support Cmd/Ctrl+Y for redo (Windows convention)
      if (isMod && e.key === "y") {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [undo, redo])

  return {
    canvasState,
    setCanvasState,
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
    // Expose history info for debugging/UI
    historyLength: history.length,
    currentIndex,
  }
}

/**
 * Helper: Create a deep clone of sticker state for history
 * Use this before pushing to ensure immutability
 */
export function cloneStickerState(stickers) {
  return stickers.map((sticker) => ({
    ...sticker,
    // Deep clone any nested objects if needed
  }))
}

/**
 * Helper: Apply a transform to a sticker in the state array
 */
export function applyStickerTransform(stickers, stickerId, transform) {
  return stickers.map((sticker) =>
    sticker.id === stickerId ? { ...sticker, ...transform } : sticker
  )
}

/**
 * Helper: Delete a sticker from state
 */
export function deleteSticker(stickers, stickerId) {
  return stickers.filter((sticker) => sticker.id !== stickerId)
}

/**
 * Helper: Duplicate a sticker (with new ID and offset position)
 */
export function duplicateSticker(stickers, stickerId, generateId = () => `sticker-${Date.now()}`) {
  const original = stickers.find((s) => s.id === stickerId)
  if (!original) return stickers

  const duplicate = {
    ...original,
    id: generateId(),
    x: (original.x || 0) + 20,
    y: (original.y || 0) + 20,
  }

  return [...stickers, duplicate]
}

/**
 * Helper: Bring sticker forward (move up in array = rendered on top)
 */
export function bringForward(stickers, stickerId) {
  const index = stickers.findIndex((s) => s.id === stickerId)
  if (index === -1 || index === stickers.length - 1) return stickers

  const newStickers = [...stickers]
  // Swap with next element
  ;[newStickers[index], newStickers[index + 1]] = [
    newStickers[index + 1],
    newStickers[index],
  ]
  return newStickers
}

/**
 * Helper: Send sticker backward (move down in array = rendered behind)
 */
export function sendBackward(stickers, stickerId) {
  const index = stickers.findIndex((s) => s.id === stickerId)
  if (index <= 0) return stickers

  const newStickers = [...stickers]
  // Swap with previous element
  ;[newStickers[index], newStickers[index - 1]] = [
    newStickers[index - 1],
    newStickers[index],
  ]
  return newStickers
}
