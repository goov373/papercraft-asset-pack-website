// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  // Main app files
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Config files (vite, vitest, storybook) - Node.js environment
  {
    files: ['*.config.{js,ts}', '.storybook/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Component files that export both components and utilities (e.g., buttonVariants, sectionVariants)
  {
    files: ['src/components/ui/**/*.jsx', 'src/components/pricing/**/*.jsx', 'src/components/sections/section.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Test files - allow export * pattern
  {
    files: ['src/test/**/*.{js,jsx}', '**/*.test.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Storybook config
  ...storybook.configs["flat/recommended"],
])
