import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor'
          }
          // React Router
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'router-vendor'
          }
          // Radix UI primitives
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor'
          }
          // Animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor'
          }
          // Form handling
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform') || id.includes('node_modules/zod')) {
            return 'form-vendor'
          }
          // AI SDK (large, load separately)
          if (id.includes('node_modules/@ai-sdk') || id.includes('node_modules/ai/')) {
            return 'ai-vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
