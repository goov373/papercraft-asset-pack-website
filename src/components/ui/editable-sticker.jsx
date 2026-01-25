import { useState, useRef, useCallback, forwardRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useGesture } from "@use-gesture/react"
import { cn } from "@/lib/utils"

/**
 * EditableSticker - Transform wrapper with direct manipulation handles
 *
 * Provides resize (corner handles), rotation (top handle), and drag support.
 * Used in the sticker playground for arranging assets.
 *
 * Features:
 * - Selection state with visual ring
 * - 4 corner scale handles (aspect ratio locked)
 * - 1 rotation handle (top center)
 * - Touch gestures: pinch-to-zoom, two-finger rotate
 * - Spring animations on release
 *
 * @param {string} id - Unique identifier for the sticker
 * @param {boolean} selected - Whether this sticker is currently selected
 * @param {function} onSelect - Callback when sticker is clicked/selected
 * @param {function} onTransformChange - Callback with { scale, rotation, x, y, flipH, flipV }
 * @param {function} onTransformEnd - Callback when transform gesture ends (for history)
 * @param {number} initialScale - Starting scale (default: 1)
 * @param {number} initialRotation - Starting rotation in degrees (default: 0)
 * @param {object} initialPosition - Starting { x, y } position (default: { x: 0, y: 0 })
 * @param {boolean} flipH - Horizontal flip state
 * @param {boolean} flipV - Vertical flip state
 * @param {boolean} isPopped - Elevated shadow state
 * @param {object} constraintsRef - Ref for drag constraints
 */
const EditableSticker = forwardRef(function EditableSticker(
  {
    id,
    children,
    selected = false,
    onSelect,
    onTransformChange,
    onTransformEnd,
    initialScale = 1,
    initialRotation = 0,
    initialPosition = { x: 0, y: 0 },
    flipH = false,
    flipV = false,
    isPopped = false,
    constraintsRef,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [zIndex, setZIndex] = useState(1)

  // Motion values for transforms
  const x = useMotionValue(initialPosition.x)
  const y = useMotionValue(initialPosition.y)
  const scale = useMotionValue(initialScale)
  const rotation = useMotionValue(initialRotation)

  // Scale limits
  const MIN_SCALE = 0.5
  const MAX_SCALE = 2

  // Handle selection
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      onSelect?.(id)
    },
    [id, onSelect]
  )

  // Report transform changes
  const reportTransform = useCallback(() => {
    onTransformChange?.({
      id,
      scale: scale.get(),
      rotation: rotation.get(),
      x: x.get(),
      y: y.get(),
      flipH,
      flipV,
    })
  }, [id, scale, rotation, x, y, flipH, flipV, onTransformChange])

  // Handle drag
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    setZIndex(9999)
    onSelect?.(id)
  }, [id, onSelect])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setTimeout(() => setZIndex(selected ? 100 : 1), 300)
    onTransformEnd?.({
      id,
      scale: scale.get(),
      rotation: rotation.get(),
      x: x.get(),
      y: y.get(),
    })
  }, [id, selected, scale, rotation, x, y, onTransformEnd])

  const handleDrag = useCallback(() => {
    reportTransform()
  }, [reportTransform])

  // Touch gesture handling (pinch to zoom, two-finger rotate)
  useGesture(
    {
      onPinch: ({ offset: [s, r], first, last }) => {
        if (disabled) return
        if (first) {
          setIsTransforming(true)
          onSelect?.(id)
        }

        // Apply pinch scale (clamped)
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, initialScale * s))
        scale.set(newScale)

        // Apply rotation from pinch gesture
        rotation.set(initialRotation + r)

        reportTransform()

        if (last) {
          setIsTransforming(false)
          onTransformEnd?.({
            id,
            scale: scale.get(),
            rotation: rotation.get(),
            x: x.get(),
            y: y.get(),
          })
        }
      },
    },
    {
      target: containerRef,
      pinch: { scaleBounds: { min: MIN_SCALE, max: MAX_SCALE } },
      eventOptions: { passive: false },
    }
  )

  // Compute flip transform
  const flipTransform = `scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`

  return (
    <motion.div
      ref={(node) => {
        containerRef.current = node
        if (ref) {
          if (typeof ref === "function") ref(node)
          else ref.current = node
        }
      }}
      data-sticker-id={id}
      className={cn(
        "absolute select-none touch-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      style={{
        x,
        y,
        scale,
        rotate: rotation,
        zIndex: selected ? 100 : zIndex,
        boxShadow: isPopped
          ? "var(--paper-elevation-3)"
          : isDragging
            ? "var(--paper-elevation-2)"
            : "var(--paper-elevation-1)",
      }}
      drag={!disabled}
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      whileDrag={{ scale: scale.get() * 1.02 }}
      {...props}
    >
      {/* Selection ring */}
      {selected && (
        <div
          className={cn(
            "absolute -inset-2 rounded-lg pointer-events-none",
            "border-2 border-dashed border-amber-500/70",
            "bg-amber-500/5"
          )}
        />
      )}

      {/* Content wrapper with flip */}
      <div style={{ transform: flipTransform }}>{children}</div>

      {/* Transform handles (only when selected) */}
      {selected && !disabled && (
        <>
          {/* Rotation handle */}
          <RotationHandle
            rotation={rotation}
            initialRotation={initialRotation}
            onRotationChange={reportTransform}
            onRotationEnd={() =>
              onTransformEnd?.({
                id,
                scale: scale.get(),
                rotation: rotation.get(),
                x: x.get(),
                y: y.get(),
              })
            }
          />

          {/* Corner scale handles */}
          <ScaleHandle
            position="top-left"
            scale={scale}
            minScale={MIN_SCALE}
            maxScale={MAX_SCALE}
            onScaleChange={reportTransform}
            onScaleEnd={() =>
              onTransformEnd?.({
                id,
                scale: scale.get(),
                rotation: rotation.get(),
                x: x.get(),
                y: y.get(),
              })
            }
          />
          <ScaleHandle
            position="top-right"
            scale={scale}
            minScale={MIN_SCALE}
            maxScale={MAX_SCALE}
            onScaleChange={reportTransform}
            onScaleEnd={() =>
              onTransformEnd?.({
                id,
                scale: scale.get(),
                rotation: rotation.get(),
                x: x.get(),
                y: y.get(),
              })
            }
          />
          <ScaleHandle
            position="bottom-left"
            scale={scale}
            minScale={MIN_SCALE}
            maxScale={MAX_SCALE}
            onScaleChange={reportTransform}
            onScaleEnd={() =>
              onTransformEnd?.({
                id,
                scale: scale.get(),
                rotation: rotation.get(),
                x: x.get(),
                y: y.get(),
              })
            }
          />
          <ScaleHandle
            position="bottom-right"
            scale={scale}
            minScale={MIN_SCALE}
            maxScale={MAX_SCALE}
            onScaleChange={reportTransform}
            onScaleEnd={() =>
              onTransformEnd?.({
                id,
                scale: scale.get(),
                rotation: rotation.get(),
                x: x.get(),
                y: y.get(),
              })
            }
          />
        </>
      )}
    </motion.div>
  )
})

/**
 * RotationHandle - Circular grab point above sticker for rotation
 */
function RotationHandle({
  rotation,
  initialRotation,
  onRotationChange,
  onRotationEnd,
}) {
  const [isRotating, setIsRotating] = useState(false)
  const handleRef = useRef(null)
  const startAngleRef = useRef(0)
  const startRotationRef = useRef(0)

  const bind = useGesture(
    {
      onDragStart: ({ event }) => {
        event.stopPropagation()
        setIsRotating(true)

        // Calculate center of sticker
        const parent = handleRef.current?.parentElement
        if (!parent) return

        const rect = parent.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Get initial angle from center to mouse
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY
        startAngleRef.current = Math.atan2(dy, dx) * (180 / Math.PI)
        startRotationRef.current = rotation.get()
      },
      onDrag: ({ event, shiftKey }) => {
        event.stopPropagation()

        const parent = handleRef.current?.parentElement
        if (!parent) return

        const rect = parent.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate current angle
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY
        const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI)

        // Calculate rotation delta
        let newRotation =
          startRotationRef.current + (currentAngle - startAngleRef.current)

        // Snap to 45 degree increments if shift is held
        if (shiftKey) {
          newRotation = Math.round(newRotation / 45) * 45
        }

        rotation.set(newRotation)
        onRotationChange?.()
      },
      onDragEnd: () => {
        setIsRotating(false)
        onRotationEnd?.()
      },
    },
    { drag: { filterTaps: true } }
  )

  return (
    <>
      {/* Connection line */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 w-px h-6 -top-8",
          "bg-amber-500/50"
        )}
      />

      {/* Handle */}
      <motion.div
        ref={handleRef}
        {...bind()}
        className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-12",
          "w-6 h-6 rounded-full",
          "bg-white border-2 border-amber-500",
          "cursor-grab touch-none",
          "[box-shadow:var(--paper-elevation-2)]",
          "flex items-center justify-center",
          "hover:bg-amber-50 hover:scale-110",
          "transition-transform duration-150",
          isRotating && "cursor-grabbing bg-amber-100 scale-110"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotation icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-600"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      </motion.div>
    </>
  )
}

/**
 * ScaleHandle - Corner handle for resizing
 */
function ScaleHandle({
  position,
  scale,
  minScale,
  maxScale,
  onScaleChange,
  onScaleEnd,
}) {
  const [isScaling, setIsScaling] = useState(false)
  const handleRef = useRef(null)
  const startDistanceRef = useRef(0)
  const startScaleRef = useRef(1)

  // Position classes
  const positionClasses = {
    "top-left": "-top-3 -left-3 cursor-nwse-resize",
    "top-right": "-top-3 -right-3 cursor-nesw-resize",
    "bottom-left": "-bottom-3 -left-3 cursor-nesw-resize",
    "bottom-right": "-bottom-3 -right-3 cursor-nwse-resize",
  }

  const bind = useGesture(
    {
      onDragStart: ({ event }) => {
        event.stopPropagation()
        setIsScaling(true)

        // Calculate center of sticker
        const parent = handleRef.current?.parentElement
        if (!parent) return

        const rect = parent.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Get initial distance from center
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY
        startDistanceRef.current = Math.sqrt(dx * dx + dy * dy)
        startScaleRef.current = scale.get()
      },
      onDrag: ({ event }) => {
        event.stopPropagation()

        const parent = handleRef.current?.parentElement
        if (!parent) return

        const rect = parent.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate current distance from center
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY
        const currentDistance = Math.sqrt(dx * dx + dy * dy)

        // Calculate scale ratio
        const ratio = currentDistance / startDistanceRef.current
        let newScale = startScaleRef.current * ratio

        // Clamp scale
        newScale = Math.max(minScale, Math.min(maxScale, newScale))

        scale.set(newScale)
        onScaleChange?.()
      },
      onDragEnd: () => {
        setIsScaling(false)
        // Spring animate to final scale for nice feel
        animate(scale, scale.get(), {
          type: "spring",
          stiffness: 300,
          damping: 25,
        })
        onScaleEnd?.()
      },
    },
    { drag: { filterTaps: true } }
  )

  return (
    <motion.div
      ref={handleRef}
      {...bind()}
      className={cn(
        "absolute w-5 h-5 rounded-sm",
        "bg-white border-2 border-amber-500",
        "touch-none",
        "[box-shadow:var(--paper-elevation-1)]",
        "hover:bg-amber-50 hover:scale-110",
        "transition-transform duration-150",
        positionClasses[position],
        isScaling && "bg-amber-100 scale-110"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    />
  )
}

export { EditableSticker }
