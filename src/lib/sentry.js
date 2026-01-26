import * as Sentry from "@sentry/react"

/**
 * Sentry Error Tracking Module
 *
 * Provides error tracking, user context, and breadcrumb logging
 * for production error monitoring.
 *
 * Usage:
 *   import { initSentry, captureError } from '@/lib/sentry'
 *
 *   // In main.jsx (before React renders):
 *   initSentry()
 *
 *   // Manual error capture:
 *   captureError(error, { context: 'payment-flow' })
 */

const isDev = import.meta.env.DEV
const isEnabled = import.meta.env.VITE_SENTRY_ENABLED === "true"
const dsn = import.meta.env.VITE_SENTRY_DSN
const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || (isDev ? "development" : "production")

/**
 * Initialize Sentry error tracking
 * Should be called in main.jsx before React renders
 */
export function initSentry() {
  // Skip if not enabled or no DSN configured
  if (!isEnabled || !dsn) {
    if (isDev) {
      console.log("[Sentry] Disabled - set VITE_SENTRY_ENABLED=true and VITE_SENTRY_DSN to enable")
    }
    return
  }

  Sentry.init({
    dsn,
    environment,

    // Capture 100% of transactions in development, 10% in production
    tracesSampleRate: isDev ? 1.0 : 0.1,

    // Only send errors in production by default
    enabled: isEnabled,

    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      // Network errors that aren't actionable
      "Failed to fetch",
      "NetworkError",
      "Load failed",
      // User-initiated navigation
      "AbortError",
    ],

    // Before sending, allow filtering
    beforeSend(event) {
      // Skip if error is from browser extension
      const frames = event.exception?.values?.[0]?.stacktrace?.frames || []
      const isFromExtension = frames.some(
        (frame) =>
          frame.filename?.includes("chrome-extension://") ||
          frame.filename?.includes("moz-extension://")
      )
      if (isFromExtension) {
        return null
      }

      return event
    },
  })

  if (isDev) {
    console.log(`[Sentry] Initialized for ${environment}`)
  }
}

/**
 * Capture an error manually with optional context
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context to attach
 */
export function captureError(error, context = {}) {
  if (!isEnabled || !dsn) {
    // In development without Sentry, just log to console
    console.error("[Sentry] Would capture error:", error, context)
    return
  }

  Sentry.withScope((scope) => {
    // Add any extra context
    if (context.componentStack) {
      scope.setExtra("componentStack", context.componentStack)
    }
    if (context.context) {
      scope.setTag("context", context.context)
    }

    // Add all other context as extras
    Object.entries(context).forEach(([key, value]) => {
      if (key !== "componentStack" && key !== "context") {
        scope.setExtra(key, value)
      }
    })

    Sentry.captureException(error)
  })
}

/**
 * Set user context for error tracking
 * @param {Object} user - User object with id, email, username
 */
export function setUser(user) {
  if (!isEnabled || !dsn) return

  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  })
}

/**
 * Clear user context (on logout)
 */
export function clearUser() {
  if (!isEnabled || !dsn) return

  Sentry.setUser(null)
}

/**
 * Add a breadcrumb for debugging
 * @param {string} message - Breadcrumb message
 * @param {string} category - Category (e.g., 'ui', 'navigation', 'api')
 * @param {Object} data - Additional data
 */
export function addBreadcrumb(message, category = "ui", data = {}) {
  if (!isEnabled || !dsn) {
    if (isDev) {
      console.log(`[Sentry Breadcrumb] [${category}] ${message}`, data)
    }
    return
  }

  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  })
}

// Export Sentry for advanced usage
export { Sentry }
