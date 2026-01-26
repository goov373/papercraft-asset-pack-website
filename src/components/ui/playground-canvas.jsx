import { useRef, useState, useCallback, useEffect } from "react"
// eslint-disable-next-line no-unused-vars -- motion is used as JSX namespace
import { motion, AnimatePresence } from "framer-motion"
import { EditableSticker } from "@/components/ui/editable-sticker"
import { StickerToolbar } from "@/components/ui/sticker-toolbar"
import { Button } from "@/components/ui/button"
import { useConfetti } from "@/components/ui/confetti"
import {
  useCanvasHistory,
  cloneStickerState,
  applyStickerTransform,
  deleteSticker,
  duplicateSticker,
  bringForward,
  sendBackward,
} from "@/hooks/use-canvas-history"
import { cn } from "@/lib/utils"
import { RotateCcwIcon, Undo2Icon, Redo2Icon } from "lucide-react"

// Sample asset data - will be replaced with real assets
const DEFAULT_TRAY_ASSETS = [
  { id: "scissors", emoji: "✂️", label: "Scissors" },
  { id: "pencil", emoji: "✏️", label: "Pencil" },
  { id: "ruler", emoji: "📏", label: "Ruler" },
  { id: "paper", emoji: "📄", label: "Paper" },
  { id: "clip", emoji: "📎", label: "Clip" },
  { id: "tape", emoji: "🎀", label: "Tape" },
  { id: "glue", emoji: "🧴", label: "Glue" },
  { id: "pin", emoji: "📌", label: "Pin" },
]

// Pre-positioned assets on the canvas (for initial aesthetic)
const DEFAULT_CANVAS_ASSETS = [
  { id: "canvas-scissors", emoji: "✂️", x: 60, y: 40, rotation: -15, scale: 1, flipH: false, flipV: false, isPopped: false },
  { id: "canvas-pencil", emoji: "✏️", x: 180, y: 120, rotation: 25, scale: 1, flipH: false, flipV: false, isPopped: false },
  { id: "canvas-paper", emoji: "📄", x: 100, y: 180, rotation: -5, scale: 1, flipH: false, flipV: false, isPopped: false },
]

function PlaygroundCanvas({
  className,
  trayAssets = DEFAULT_TRAY_ASSETS,
  initialCanvasAssets = DEFAULT_CANVAS_ASSETS,
  variant = "corkboard", // "corkboard" | "whiteboard" | "kraft"
  showControls = true,
  onAssetMove,
  onReset,
}) {
  const canvasRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)
  const [canvasBounds, setCanvasBounds] = useState({ width: 800, height: 600 })

  // History management with undo/redo
  const {
    canvasState: stickers,
    setCanvasState: setStickers,
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  } = useCanvasHistory(initialCanvasAssets)

  // Confetti effect
  const { trigger: fireConfetti, ConfettiComponent } = useConfetti()

  // Update canvas bounds on resize
  useEffect(() => {
    const updateBounds = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setCanvasBounds({ width: rect.width, height: rect.height })
      }
    }
    updateBounds()
    window.addEventListener("resize", updateBounds)
    return () => window.removeEventListener("resize", updateBounds)
  }, [])

  // Get selected sticker data
  const selectedSticker = stickers.find((s) => s.id === selectedId)

  // Calculate toolbar position based on selected sticker
  const toolbarPosition = selectedSticker
    ? { x: selectedSticker.x, y: selectedSticker.y }
    : { x: 0, y: 0 }

  const stickerBounds = { width: 64, height: 64 } // Approximate sticker size

  // Get background style based on variant
  const getCanvasBackground = () => {
    switch (variant) {
      case "corkboard":
        return "bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900"
      case "whiteboard":
        return "bg-gradient-to-br from-slate-50 to-slate-100"
      case "kraft":
        return "bg-paper-kraft"
      default:
        return "bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900"
    }
  }

  // Get texture overlay based on variant
  const getTextureOverlay = () => {
    switch (variant) {
      case "corkboard":
        return (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `var(--texture-noise-svg)`,
              backgroundSize: '200px 200px',
              opacity: 'var(--texture-opacity-medium)',
            }}
          />
        )
      case "whiteboard":
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        )
      default:
        return null
    }
  }

  // Add asset to canvas from tray
  const handleAddAsset = useCallback(
    (assetId, dropPoint) => {
      const trayAsset = trayAssets.find((a) => a.id === assetId)
      if (!trayAsset || !canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const x = Math.max(20, Math.min(dropPoint.x - canvasRect.left - 30, canvasRect.width - 80))
      const y = Math.max(20, Math.min(dropPoint.y - canvasRect.top - 30, canvasRect.height - 80))

      const newSticker = {
        id: `canvas-${assetId}-${Date.now()}`,
        emoji: trayAsset.emoji,
        src: trayAsset.src,
        x,
        y,
        rotation: (Math.random() - 0.5) * 20,
        scale: 1,
        flipH: false,
        flipV: false,
        isPopped: false,
      }

      const newState = [...stickers, newSticker]
      pushState(newState)
      setSelectedId(newSticker.id)
    },
    [trayAssets, stickers, pushState]
  )

  // Handle sticker selection
  const handleSelect = useCallback((id) => {
    setSelectedId(id)
  }, [])

  // Handle canvas click (deselect)
  const handleCanvasClick = useCallback(() => {
    setSelectedId(null)
  }, [])

  // Handle transform change (live updates without history)
  const handleTransformChange = useCallback(
    (transform) => {
      setStickers((prev) =>
        prev.map((s) =>
          s.id === transform.id
            ? {
                ...s,
                scale: transform.scale,
                rotation: transform.rotation,
                x: transform.x,
                y: transform.y,
              }
            : s
        )
      )
      onAssetMove?.(transform.id, { x: transform.x, y: transform.y })
    },
    [setStickers, onAssetMove]
  )

  // Handle transform end (save to history)
  const handleTransformEnd = useCallback(
    (transform) => {
      const newState = applyStickerTransform(stickers, transform.id, {
        scale: transform.scale,
        rotation: transform.rotation,
        x: transform.x,
        y: transform.y,
      })
      pushState(cloneStickerState(newState))
    },
    [stickers, pushState]
  )

  // Toolbar actions
  const handleDelete = useCallback(() => {
    if (!selectedId) return
    const newState = deleteSticker(stickers, selectedId)
    pushState(newState)
    setSelectedId(null)
  }, [selectedId, stickers, pushState])

  const handleDuplicate = useCallback(() => {
    if (!selectedId) return
    const newState = duplicateSticker(stickers, selectedId)
    pushState(newState)
    // Select the new duplicate
    const newSticker = newState[newState.length - 1]
    setSelectedId(newSticker.id)
  }, [selectedId, stickers, pushState])

  const handleFlipH = useCallback(() => {
    if (!selectedId) return
    const newState = stickers.map((s) =>
      s.id === selectedId ? { ...s, flipH: !s.flipH } : s
    )
    pushState(newState)
  }, [selectedId, stickers, pushState])

  const handleFlipV = useCallback(() => {
    if (!selectedId) return
    const newState = stickers.map((s) =>
      s.id === selectedId ? { ...s, flipV: !s.flipV } : s
    )
    pushState(newState)
  }, [selectedId, stickers, pushState])

  const handleBringForward = useCallback(() => {
    if (!selectedId) return
    const newState = bringForward(stickers, selectedId)
    pushState(newState)
  }, [selectedId, stickers, pushState])

  const handleSendBackward = useCallback(() => {
    if (!selectedId) return
    const newState = sendBackward(stickers, selectedId)
    pushState(newState)
  }, [selectedId, stickers, pushState])

  const handleToggleShadow = useCallback(() => {
    if (!selectedId) return
    const newState = stickers.map((s) =>
      s.id === selectedId ? { ...s, isPopped: !s.isPopped } : s
    )
    pushState(newState)
  }, [selectedId, stickers, pushState])

  const handleConfetti = useCallback(() => {
    fireConfetti(30)
  }, [fireConfetti])

  // Reset canvas to initial state
  const handleReset = useCallback(() => {
    clearHistory(initialCanvasAssets)
    setSelectedId(null)
    onReset?.()
  }, [initialCanvasAssets, clearHistory, onReset])

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Asset Tray */}
      <div
        className={cn(
          "flex gap-2 p-3 rounded-xl overflow-x-auto scrollbar-thin",
          "bg-card border border-border/50",
          "[box-shadow:var(--paper-elevation-1)]"
        )}
      >
        <div className="flex gap-3 px-1">
          {trayAssets.map((asset) => (
            <AssetTrayItem
              key={asset.id}
              id={asset.id}
              src={asset.src}
              emoji={asset.emoji}
              label={asset.label}
              onDragToCanvas={handleAddAsset}
            />
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className={cn(
          "relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden",
          "border-4 border-amber-900/30",
          "[box-shadow:var(--paper-elevation-2),inset_0_2px_8px_rgba(0,0,0,0.2)]",
          getCanvasBackground()
        )}
      >
        {/* Texture overlay */}
        {getTextureOverlay()}

        {/* Confetti container */}
        <ConfettiComponent className="z-[300]" />

        {/* Pin holes for corkboard */}
        {variant === "corkboard" && (
          <div className="absolute inset-4 pointer-events-none">
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-amber-950/30" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-950/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-amber-950/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-amber-950/30" />
          </div>
        )}

        {/* Editable stickers */}
        <AnimatePresence>
          {stickers.map((sticker, index) => (
            <motion.div
              key={sticker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              style={{ zIndex: index + 1 }}
            >
              <EditableSticker
                id={sticker.id}
                selected={selectedId === sticker.id}
                onSelect={handleSelect}
                onTransformChange={handleTransformChange}
                onTransformEnd={handleTransformEnd}
                initialScale={sticker.scale}
                initialRotation={sticker.rotation}
                initialPosition={{ x: sticker.x, y: sticker.y }}
                flipH={sticker.flipH}
                flipV={sticker.flipV}
                isPopped={sticker.isPopped}
                constraintsRef={canvasRef}
              >
                {sticker.src ? (
                  <img
                    src={sticker.src}
                    alt="Sticker"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-card flex items-center justify-center [box-shadow:var(--paper-elevation-1)]">
                    <span className="text-2xl sm:text-3xl pointer-events-none">
                      {sticker.emoji}
                    </span>
                  </div>
                )}
              </EditableSticker>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Sticker Toolbar */}
        <StickerToolbar
          visible={!!selectedSticker}
          position={toolbarPosition}
          stickerBounds={stickerBounds}
          canvasBounds={canvasBounds}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onFlipH={handleFlipH}
          onFlipV={handleFlipV}
          onBringForward={handleBringForward}
          onSendBackward={handleSendBackward}
          onToggleShadow={handleToggleShadow}
          onConfetti={handleConfetti}
          isPopped={selectedSticker?.isPopped || false}
        />

        {/* Empty state hint */}
        {stickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-amber-200/60 pointer-events-none">
            <p className="text-sm font-medium">Drag assets here to create your collage</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex gap-2 justify-between">
          {/* Undo/Redo */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Cmd+Z)"
              className="gap-1.5"
            >
              <Undo2Icon className="size-4" />
              <span className="hidden sm:inline">Undo</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Cmd+Shift+Z)"
              className="gap-1.5"
            >
              <Redo2Icon className="size-4" />
              <span className="hidden sm:inline">Redo</span>
            </Button>
          </div>

          {/* Reset */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcwIcon className="size-4" />
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}

// Asset Tray Item - for assets in the tray that can be dragged onto canvas
function AssetTrayItem({
  id,
  src,
  emoji,
  label,
  onDragToCanvas,
  className,
}) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      data-tray-asset-id={id}
      className={cn(
        "relative flex-shrink-0 cursor-grab select-none touch-none",
        "w-14 h-14 sm:w-16 sm:h-16 rounded-lg",
        "bg-card border border-border/50",
        "flex items-center justify-center",
        "transition-shadow duration-200",
        isDragging && "cursor-grabbing opacity-50",
        className
      )}
      style={{
        boxShadow: isDragging
          ? "var(--paper-elevation-2)"
          : "var(--paper-elevation-1)",
      }}
      drag
      dragSnapToOrigin
      dragElastic={0.5}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false)
        // If dragged far enough, trigger canvas placement
        if (Math.abs(info.offset.y) > 50 || Math.abs(info.offset.x) > 50) {
          onDragToCanvas?.(id, info.point)
        }
      }}
      whileDrag={{
        scale: 1.1,
        rotate: -5,
        zIndex: 9999,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {src ? (
        <img
          src={src}
          alt={label || "Asset"}
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain pointer-events-none"
          draggable={false}
        />
      ) : (
        <span className="text-2xl sm:text-3xl pointer-events-none">{emoji || "📄"}</span>
      )}
    </motion.div>
  )
}

export { PlaygroundCanvas, AssetTrayItem }
