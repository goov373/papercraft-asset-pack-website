import { BrowserRouter } from "react-router-dom"
import { CursorProvider } from "@/components/ui/custom-cursor"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// Import global styles (Tailwind CSS)
import "../src/index.css"

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "paper-white",
      values: [
        { name: "paper-white", value: "#FEFDFB" },
        { name: "paper-cream", value: "#FAF8F5" },
        { name: "paper-kraft", value: "#F5EEE6" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
    layout: "centered",
  },
  decorators: [
    // Wrap stories in providers they may need
    // eslint-disable-next-line no-unused-vars
    function withProviders(Story) {
      return (
        <BrowserRouter>
          <CursorProvider enabled={false}>
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          </CursorProvider>
        </BrowserRouter>
      )
    },
  ],
}

export default preview
