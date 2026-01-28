/**
 * Test fixtures for canvas and sticker-related tests
 */

// Mock stickers with varied transform states
export const mockStickers = [
  {
    id: "sticker-1",
    emoji: "✂️",
    src: null,
    x: 50,
    y: 50,
    rotation: 0,
    scale: 1,
    flipH: false,
    flipV: false,
    isPopped: false,
  },
  {
    id: "sticker-2",
    emoji: "📄",
    src: null,
    x: 150,
    y: 100,
    rotation: 15,
    scale: 1.2,
    flipH: true,
    flipV: false,
    isPopped: false,
  },
  {
    id: "sticker-3",
    emoji: "✏️",
    src: null,
    x: 200,
    y: 200,
    rotation: -10,
    scale: 0.8,
    flipH: false,
    flipV: true,
    isPopped: true,
  },
]

// Single sticker for simple tests
export const singleSticker = {
  id: "sticker-single",
  emoji: "🎨",
  src: null,
  x: 100,
  y: 100,
  rotation: 0,
  scale: 1,
  flipH: false,
  flipV: false,
  isPopped: false,
}

// Mock tray assets (source assets before adding to canvas)
export const mockTrayAssets = [
  { id: "tray-scissors", emoji: "✂️", label: "Scissors" },
  { id: "tray-paper", emoji: "📄", label: "Paper" },
  { id: "tray-pencil", emoji: "✏️", label: "Pencil" },
  { id: "tray-tape", emoji: "🎀", label: "Tape" },
]

// Helper to create a mock sticker with custom properties
export function createMockSticker(overrides = {}) {
  return {
    id: `sticker-${Date.now()}`,
    emoji: "✂️",
    src: null,
    x: 100,
    y: 100,
    rotation: 0,
    scale: 1,
    flipH: false,
    flipV: false,
    isPopped: false,
    ...overrides,
  }
}

// Helper to create a mock transform object
export function createMockTransform(overrides = {}) {
  return {
    x: 100,
    y: 100,
    scale: 1,
    rotation: 0,
    ...overrides,
  }
}

// Helper to create multiple stickers for history tests
export function createStickerBatch(count, baseId = "batch") {
  return Array.from({ length: count }, (_, i) => ({
    id: `${baseId}-${i + 1}`,
    emoji: ["✂️", "📄", "✏️", "🎨"][i % 4],
    src: null,
    x: 50 + i * 30,
    y: 50 + i * 20,
    rotation: i * 10,
    scale: 1,
    flipH: false,
    flipV: false,
    isPopped: false,
  }))
}

// Canvas bounds for testing toolbar positioning
export const mockCanvasBounds = {
  width: 800,
  height: 600,
  top: 0,
  left: 0,
  right: 800,
  bottom: 600,
}

// Sticker bounds for toolbar positioning tests
export const mockStickerBounds = {
  width: 64,
  height: 64,
}
