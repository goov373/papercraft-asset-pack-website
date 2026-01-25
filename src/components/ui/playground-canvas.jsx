import { useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DraggableAsset } from "@/components/ui/draggable-asset"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RotateCcwIcon, CameraIcon } from "lucide-react"

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
  { id: "canvas-scissors", emoji: "✂️", position: { x: 60, y: 40 }, rotation: -15 },
  { id: "canvas-pencil", emoji: "✏️", position: { x: 180, y: 120 }, rotation: 25 },
  { id: "canvas-paper", emoji: "📄", position: { x: 100, y: 180 }, rotation: -5 },
]

function PlaygroundCanvas({
  className,
  trayAssets = DEFAULT_TRAY_ASSETS,
  initialCanvasAssets = DEFAULT_CANVAS_ASSETS,
  variant = "corkboard", // "corkboard" | "whiteboard" | "kraft"
  showControls = true,
  onAssetMove,
  onReset,
  onScreenshot,
}) {
  const canvasRef = useRef(null)
  const [canvasAssets, setCanvasAssets] = useState(initialCanvasAssets)
  const [highestZ, setHighestZ] = useState(initialCanvasAssets.length + 1)

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
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        )
      case "whiteboard":
        return (
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid lines */}
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
  const handleAddAsset = useCallback((assetId, dropPoint) => {
    const trayAsset = trayAssets.find((a) => a.id === assetId)
    if (!trayAsset || !canvasRef.current) return

    // Calculate position relative to canvas
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const position = {
      x: Math.max(20, Math.min(dropPoint.x - canvasRect.left - 30, canvasRect.width - 80)),
      y: Math.max(20, Math.min(dropPoint.y - canvasRect.top - 30, canvasRect.height - 80)),
    }

    const newAsset = {
      id: `canvas-${assetId}-${Date.now()}`,
      emoji: trayAsset.emoji,
      src: trayAsset.src,
      position,
      rotation: (Math.random() - 0.5) * 20,
      zIndex: highestZ,
    }

    setCanvasAssets((prev) => [...prev, newAsset])
    setHighestZ((prev) => prev + 1)
  }, [trayAssets, highestZ])

  // Update asset position
  const handleAssetMove = useCallback((assetId, newPosition) => {
    setCanvasAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? { ...asset, position: newPosition }
          : asset
      )
    )
    onAssetMove?.(assetId, newPosition)
  }, [onAssetMove])

  // Bring asset to front when dragged
  const handleAssetDragStart = useCallback((assetId) => {
    setHighestZ((prev) => prev + 1)
    setCanvasAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? { ...asset, zIndex: highestZ + 1 }
          : asset
      )
    )
  }, [highestZ])

  // Reset canvas to initial state
  const handleReset = useCallback(() => {
    setCanvasAssets(initialCanvasAssets)
    setHighestZ(initialCanvasAssets.length + 1)
    onReset?.()
  }, [initialCanvasAssets, onReset])

  // Screenshot functionality (placeholder)
  const handleScreenshot = useCallback(() => {
    onScreenshot?.()
    // Future: Use html2canvas or similar
  }, [onScreenshot])

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
        className={cn(
          "relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden",
          "border-4 border-amber-900/30",
          "[box-shadow:var(--paper-elevation-2),inset_0_2px_8px_rgba(0,0,0,0.2)]",
          getCanvasBackground()
        )}
      >
        {/* Texture overlay */}
        {getTextureOverlay()}

        {/* Pin holes for corkboard */}
        {variant === "corkboard" && (
          <div className="absolute inset-4 pointer-events-none">
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-amber-950/30" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-950/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-amber-950/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-amber-950/30" />
          </div>
        )}

        {/* Draggable assets on canvas */}
        <AnimatePresence>
          {canvasAssets.map((asset) => (
            <motion.div
              key={asset.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              <DraggableAsset
                id={asset.id}
                src={asset.src}
                initialPosition={asset.position}
                initialRotation={asset.rotation}
                constraintsRef={canvasRef}
                onDragStart={handleAssetDragStart}
                onPositionChange={handleAssetMove}
              >
                {!asset.src && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-card flex items-center justify-center [box-shadow:var(--paper-elevation-1)]">
                    <span className="text-2xl sm:text-3xl">{asset.emoji}</span>
                  </div>
                )}
              </DraggableAsset>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state hint */}
        {canvasAssets.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-amber-200/60 pointer-events-none">
            <p className="text-sm font-medium">Drag assets here to create your collage</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcwIcon className="size-4" />
            Reset
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleScreenshot}
            className="gap-2"
          >
            <CameraIcon className="size-4" />
            Share
          </Button>
        </div>
      )}
    </div>
  )
}

// Re-export AssetTrayItem for use in the canvas
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
