import { forwardRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * StickerToolbar - Floating action toolbar for selected stickers
 *
 * Appears when a sticker is selected, providing quick actions:
 * - Delete, Duplicate, Flip H/V
 * - Bring forward/backward (layer ordering)
 * - Pop shadow toggle
 * - Confetti burst (the one fun effect)
 *
 * Features:
 * - Smart positioning (above sticker, repositions at edges)
 * - Touch-friendly 44px minimum targets
 * - Papercraft visual styling
 *
 * @param {boolean} visible - Whether toolbar is visible
 * @param {object} position - { x, y } position relative to canvas
 * @param {object} stickerBounds - { width, height } of selected sticker
 * @param {object} canvasBounds - { width, height } of canvas container
 * @param {function} onDelete - Delete sticker callback
 * @param {function} onDuplicate - Duplicate sticker callback
 * @param {function} onFlipH - Flip horizontal callback
 * @param {function} onFlipV - Flip vertical callback
 * @param {function} onBringForward - Bring to front callback
 * @param {function} onSendBackward - Send to back callback
 * @param {function} onToggleShadow - Toggle pop shadow callback
 * @param {function} onConfetti - Trigger confetti callback
 * @param {boolean} isPopped - Current shadow state
 */
const StickerToolbar = forwardRef(function StickerToolbar(
  {
    visible = false,
    position = { x: 0, y: 0 },
    stickerBounds = { width: 100, height: 100 },
    canvasBounds = { width: 800, height: 600 },
    onDelete,
    onDuplicate,
    onFlipH,
    onFlipV,
    onBringForward,
    onSendBackward,
    onToggleShadow,
    onConfetti,
    isPopped = false,
    className,
    ...props
  },
  ref
) {
  // Calculate toolbar position (above sticker by default, below if near top)
  const toolbarPosition = useMemo(() => {
    const toolbarHeight = 48
    const toolbarWidth = 320
    const padding = 16
    const gap = 12 // Gap between sticker and toolbar

    let x = position.x + stickerBounds.width / 2 - toolbarWidth / 2
    let y = position.y - toolbarHeight - gap

    // If too close to top, position below sticker
    if (y < padding) {
      y = position.y + stickerBounds.height + gap
    }

    // Clamp horizontal position
    x = Math.max(padding, Math.min(canvasBounds.width - toolbarWidth - padding, x))

    return { x, y }
  }, [position, stickerBounds, canvasBounds])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute z-[200] flex items-center gap-1 p-1.5",
            "rounded-xl",
            "bg-[var(--paper-cream,#FFFBF5)]",
            "border border-amber-200/60",
            "[box-shadow:var(--paper-elevation-2)]",
            "dark:bg-amber-950 dark:border-amber-800/40",
            className
          )}
          style={{
            left: toolbarPosition.x,
            top: toolbarPosition.y,
          }}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {/* Delete */}
          <ToolbarButton
            icon={<TrashIcon />}
            label="Delete"
            onClick={onDelete}
            variant="danger"
          />

          <ToolbarDivider />

          {/* Duplicate */}
          <ToolbarButton
            icon={<CopyIcon />}
            label="Duplicate"
            onClick={onDuplicate}
          />

          <ToolbarDivider />

          {/* Flip controls */}
          <ToolbarButton
            icon={<FlipHIcon />}
            label="Flip horizontal"
            onClick={onFlipH}
          />
          <ToolbarButton
            icon={<FlipVIcon />}
            label="Flip vertical"
            onClick={onFlipV}
          />

          <ToolbarDivider />

          {/* Layer controls */}
          <ToolbarButton
            icon={<BringForwardIcon />}
            label="Bring forward"
            onClick={onBringForward}
          />
          <ToolbarButton
            icon={<SendBackwardIcon />}
            label="Send backward"
            onClick={onSendBackward}
          />

          <ToolbarDivider />

          {/* Shadow toggle */}
          <ToolbarButton
            icon={<ShadowIcon />}
            label={isPopped ? "Flatten" : "Pop shadow"}
            onClick={onToggleShadow}
            active={isPopped}
          />

          <ToolbarDivider />

          {/* Confetti */}
          <ToolbarButton
            icon={<ConfettiIcon />}
            label="Celebrate!"
            onClick={onConfetti}
            variant="fun"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
})

/**
 * ToolbarButton - Individual action button
 */
function ToolbarButton({
  icon,
  label,
  onClick,
  active = false,
  variant = "default",
  disabled = false,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={cn(
        // Base styles - 44px touch target
        "relative w-9 h-9 flex items-center justify-center",
        "rounded-lg touch-none",
        "transition-all duration-150",
        // Default variant
        variant === "default" && [
          "text-muted-foreground hover:text-foreground",
          "hover:bg-amber-100",
          "active:bg-amber-200",
          "dark:hover:text-foreground",
          "dark:hover:bg-amber-800/50",
        ],
        // Danger variant (delete)
        variant === "danger" && [
          "text-red-600 hover:text-red-700",
          "hover:bg-red-50",
          "active:bg-red-100",
          "dark:text-red-400 dark:hover:text-red-300",
          "dark:hover:bg-red-900/30",
        ],
        // Fun variant (confetti)
        variant === "fun" && [
          "text-orange-500 hover:text-orange-600",
          "hover:bg-orange-50",
          "active:bg-orange-100",
          "dark:text-orange-400 dark:hover:text-orange-300",
          "dark:hover:bg-orange-900/30",
        ],
        // Active state (shadow toggle)
        active && [
          "bg-amber-200 text-foreground",
          "dark:bg-amber-700 dark:text-foreground",
        ],
        // Disabled state
        disabled && "opacity-50 pointer-events-none"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  )
}

/**
 * ToolbarDivider - Visual separator between button groups
 */
function ToolbarDivider() {
  return (
    <div className="w-px h-6 bg-amber-200/60 dark:bg-amber-700/40 mx-0.5" />
  )
}

// Icons
function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function FlipHIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18" />
      <path d="M16 7l4 5-4 5" />
      <path d="M8 7l-4 5 4 5" />
    </svg>
  )
}

function FlipVIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h18" />
      <path d="M7 8l5-4 5 4" />
      <path d="M7 16l5 4 5-4" />
    </svg>
  )
}

function BringForwardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function SendBackwardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="12" height="12" rx="2" />
      <path d="M8 20h10a2 2 0 0 0 2-2V8" />
    </svg>
  )
}

function ShadowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M7 21h12a2 2 0 0 0 2-2V7" opacity="0.5" />
    </svg>
  )
}

function ConfettiIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.8 11.3L2 22l10.7-3.8" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="M22 13l-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="M11 2l.33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
    </svg>
  )
}

export { StickerToolbar }
