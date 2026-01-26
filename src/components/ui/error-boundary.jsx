import * as React from "react"
import { AlertCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Error Boundary component for graceful error handling
 * with papercraft-styled fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })

    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })

    // Call optional onReset callback
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return typeof this.props.fallback === "function"
          ? this.props.fallback({
              error: this.state.error,
              errorInfo: this.state.errorInfo,
              reset: this.handleReset,
            })
          : this.props.fallback
      }

      // Default papercraft-styled error UI
      return (
        <div
          role="alert"
          className={cn(
            "relative w-full rounded-lg border px-4 py-4",
            "bg-destructive/10 text-destructive border-destructive/30",
            "[box-shadow:var(--paper-elevation-1)]",
            "transition-[box-shadow,transform,background-color] duration-200",
            this.props.className
          )}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <h3 className="font-medium tracking-tight">
                {this.props.title || "Something went wrong"}
              </h3>
              <p className="text-sm text-destructive/80">
                {this.props.description ||
                  "An unexpected error occurred. Please try again."}
              </p>
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-2">
                  <summary className="text-xs cursor-pointer hover:underline">
                    Error details
                  </summary>
                  <pre className="mt-2 text-xs bg-destructive/5 p-2 rounded overflow-auto max-h-32">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleReset}
                className="mt-2"
              >
                <RotateCcw className="size-3.5" />
                Try again
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based error boundary wrapper for functional components
 * Usage: <ErrorBoundaryWrapper fallback={<MyFallback />}><MyComponent /></ErrorBoundaryWrapper>
 */
function ErrorBoundaryWrapper({
  children,
  fallback,
  onError,
  onReset,
  title,
  description,
  className,
}) {
  return (
    <ErrorBoundary
      fallback={fallback}
      onError={onError}
      onReset={onReset}
      title={title}
      description={description}
      className={className}
    >
      {children}
    </ErrorBoundary>
  )
}

export { ErrorBoundary, ErrorBoundaryWrapper }
