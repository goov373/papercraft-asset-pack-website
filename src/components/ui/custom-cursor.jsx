import { useState, useEffect, useCallback, createContext, useContext } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

// Cursor types with their emoji representations
const CURSOR_TYPES = {
  default: { emoji: "📄", label: "Paper cursor", scale: 1 },
  pointer: { emoji: "✂️", label: "Scissors cursor", scale: 1.1 },
  text: { emoji: "✏️", label: "Pencil cursor", scale: 0.9 },
  grab: { emoji: "🤚", label: "Hand cursor", scale: 1 },
  grabbing: { emoji: "✊", label: "Grabbing cursor", scale: 0.95 },
}

// Create context for cursor state
const CursorContext = createContext({
  setCursorType: () => {},
  isEnabled: false,
})

// Hook to use cursor context
function useCursor() {
  return useContext(CursorContext)
}

// Hook to set cursor type on hover
function useCursorHover(type = "pointer") {
  const { setCursorType, isEnabled } = useCursor()

  const onMouseEnter = useCallback(() => {
    if (isEnabled) setCursorType(type)
  }, [setCursorType, type, isEnabled])

  const onMouseLeave = useCallback(() => {
    if (isEnabled) setCursorType("default")
  }, [setCursorType, isEnabled])

  return { onMouseEnter, onMouseLeave }
}

/**
 * CustomCursor - The visual cursor element that follows mouse movement
 */
function CustomCursor({ cursorType, position, isVisible }) {
  const cursor = CURSOR_TYPES[cursorType] || CURSOR_TYPES.default

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[99999] select-none"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: cursor.scale,
            rotate: cursorType === "pointer" ? -30 : 0,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          aria-hidden="true"
        >
          <span
            className="text-2xl drop-shadow-md filter"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.15)",
            }}
          >
            {cursor.emoji}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * CursorProvider - Provides custom cursor functionality to the app
 *
 * Features:
 * - Follows mouse movement smoothly
 * - Changes based on hovered element type
 * - Respects prefers-reduced-motion
 * - Can be disabled globally
 * - Falls back to system cursor for accessibility
 */
function CursorProvider({ children, enabled = true }) {
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  // Check if device supports touch (disable custom cursor on touch devices)
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      )
    }
    checkTouch()
    window.addEventListener("resize", checkTouch)
    return () => window.removeEventListener("resize", checkTouch)
  }, [])

  // Determine if custom cursor should be active
  const isActive = enabled && !reducedMotion && !isTouch

  // Track mouse position
  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isActive])

  // Auto-detect cursor type based on hovered element
  useEffect(() => {
    if (!isActive) return

    const handleMouseOver = (e) => {
      const target = e.target
      const computedStyle = window.getComputedStyle(target)
      const cursorStyle = computedStyle.cursor

      // Check for interactive elements
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        cursorStyle === "pointer"
      ) {
        setCursorType("pointer")
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        cursorStyle === "text"
      ) {
        setCursorType("text")
      } else if (cursorStyle === "grab") {
        setCursorType("grab")
      } else if (cursorStyle === "grabbing") {
        setCursorType("grabbing")
      } else {
        setCursorType("default")
      }
    }

    document.addEventListener("mouseover", handleMouseOver)
    return () => document.removeEventListener("mouseover", handleMouseOver)
  }, [isActive])

  // Hide system cursor when custom cursor is active
  useEffect(() => {
    if (isActive) {
      document.body.style.cursor = "none"
      // Also hide cursor on all interactive elements
      const style = document.createElement("style")
      style.id = "custom-cursor-style"
      style.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.body.style.cursor = ""
        const existingStyle = document.getElementById("custom-cursor-style")
        if (existingStyle) existingStyle.remove()
      }
    }
  }, [isActive])

  return (
    <CursorContext.Provider
      value={{
        setCursorType,
        cursorType,
        isEnabled: isActive,
      }}
    >
      {children}
      {isActive && (
        <CustomCursor
          cursorType={cursorType}
          position={position}
          isVisible={isVisible}
        />
      )}
    </CursorContext.Provider>
  )
}

export { CursorProvider, useCursor, useCursorHover, CURSOR_TYPES }
