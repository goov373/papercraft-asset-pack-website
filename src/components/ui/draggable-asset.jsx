import { useState, forwardRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { cn } from "@/lib/utils"

const DraggableAsset = forwardRef(function DraggableAsset(
  {
    id,
    src,
    alt,
    className,
    initialPosition = { x: 0, y: 0 },
    initialRotation = 0,
    constraintsRef,
    onDragStart,
    onDragEnd,
    onPositionChange,
    disabled = false,
    ...props
  },
  ref
) {
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(1)

  // Motion values for position and rotation
  const x = useMotionValue(initialPosition.x)
  const y = useMotionValue(initialPosition.y)
  const rotation = useMotionValue(initialRotation)

  // Transform scale based on drag state
  const scale = useTransform(
    () => (isDragging ? 1.08 : 1)
  )

  const handleDragStart = (event, info) => {
    setIsDragging(true)
    setZIndex(9999)
    onDragStart?.(id, { x: x.get(), y: y.get() })
  }

  const handleDragEnd = (event, info) => {
    setIsDragging(false)

    // Settle animation - slight bounce when dropped
    animate(rotation, initialRotation + (Math.random() - 0.5) * 6, {
      type: "spring",
      stiffness: 300,
      damping: 20,
    })

    const finalPosition = { x: x.get(), y: y.get() }
    onDragEnd?.(id, finalPosition)
    onPositionChange?.(id, finalPosition)

    // Reset z-index after animation
    setTimeout(() => setZIndex(1), 300)
  }

  const handleDrag = (event, info) => {
    // Add slight rotation while dragging based on velocity
    const velocityRotation = info.velocity.x * 0.02
    rotation.set(initialRotation + velocityRotation)
  }

  return (
    <motion.div
      ref={ref}
      data-asset-id={id}
      className={cn(
        "absolute select-none touch-none cursor-grab",
        "transition-shadow duration-200",
        isDragging && "cursor-grabbing",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      style={{
        x,
        y,
        rotate: rotation,
        scale,
        zIndex,
        boxShadow: isDragging
          ? "var(--paper-elevation-3)"
          : "var(--paper-elevation-1)",
      }}
      drag={!disabled}
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileDrag={{
        scale: 1.08,
        rotate: initialRotation - 3,
      }}
      whileHover={!isDragging ? { scale: 1.02 } : undefined}
      whileTap={!isDragging ? { scale: 0.98 } : undefined}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Draggable asset"}
          className="pointer-events-none w-full h-full object-contain"
          draggable={false}
        />
      ) : (
        // Placeholder for when no image is provided
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
          <span className="text-foreground text-2xl">✂️</span>
        </div>
      )}
    </motion.div>
  )
})

// Asset Tray Item - for assets in the tray that can be dragged onto canvas
function AssetTrayItem({
  id,
  src,
  alt,
  emoji,
  label,
  onDragToCanvas,
  className,
  ...props
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
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || label || "Asset"}
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain pointer-events-none"
          draggable={false}
        />
      ) : (
        <span className="text-2xl sm:text-3xl pointer-events-none">{emoji || "📄"}</span>
      )}
      {label && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
          {label}
        </span>
      )}
    </motion.div>
  )
}

export { DraggableAsset, AssetTrayItem }
