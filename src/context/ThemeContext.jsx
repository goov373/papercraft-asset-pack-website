import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"
import {
  getDefaultTheme,
  applyThemeToDOM,
  loadThemeFromStorage,
  saveThemeToStorage,
  loadPresetsFromStorage,
  savePresetsToStorage,
  exportTypographyAsCSS,
} from "@/lib/theme-utils"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Theme state - loaded from localStorage on mount
  const [themeState, setThemeState] = useState(() => loadThemeFromStorage())

  // Presets state
  const [presets, setPresets] = useState(() => loadPresetsFromStorage())

  // Apply theme to DOM whenever state changes
  useEffect(() => {
    applyThemeToDOM(themeState)
    saveThemeToStorage(themeState)
  }, [themeState])

  // Save presets whenever they change
  useEffect(() => {
    savePresetsToStorage(presets)
  }, [presets])

  // Set a single token value
  const setToken = useCallback((tokenName, value) => {
    setThemeState((prev) => ({
      ...prev,
      [tokenName]: value,
    }))
  }, [])

  // Set dark mode
  const setDarkMode = useCallback((enabled) => {
    setThemeState((prev) => ({
      ...prev,
      darkMode: enabled,
    }))
  }, [])

  // Reset to default theme
  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultTheme()
    setThemeState(defaults)
  }, [])

  // Save current theme as a preset
  const savePreset = useCallback(
    (name) => {
      const newPreset = {
        id: Date.now().toString(),
        name,
        theme: { ...themeState },
        createdAt: new Date().toISOString(),
      }
      setPresets((prev) => [...prev, newPreset])
      return newPreset.id
    },
    [themeState]
  )

  // Load a preset by ID
  const loadPreset = useCallback((presetId) => {
    setPresets((currentPresets) => {
      const preset = currentPresets.find((p) => p.id === presetId)
      if (preset) {
        setThemeState(preset.theme)
      }
      return currentPresets
    })
  }, [])

  // Delete a preset by ID
  const deletePreset = useCallback((presetId) => {
    setPresets((prev) => prev.filter((p) => p.id !== presetId))
  }, [])

  // Export current theme as CSS
  const exportThemeAsCSS = useCallback(() => {
    const typographyCSS = exportTypographyAsCSS(themeState)

    return `${typographyCSS}

:root {
  /* Paper Surfaces */
  --paper-white: ${themeState.paperWhite};
  --paper-cream: ${themeState.paperCream};
  --paper-kraft: ${themeState.paperKraft};

  /* Shape */
  --radius: ${themeState.radius}rem;

  /* Texture */
  --texture-opacity-faint: ${themeState.textureOpacityFaint};
}`
  }, [themeState])

  const value = useMemo(
    () => ({
      // State
      themeState,
      presets,

      // Token actions
      setToken,
      setDarkMode,
      resetToDefaults,

      // Preset actions
      savePreset,
      loadPreset,
      deletePreset,

      // Export
      exportThemeAsCSS,
    }),
    [
      themeState,
      presets,
      setToken,
      setDarkMode,
      resetToDefaults,
      savePreset,
      loadPreset,
      deletePreset,
      exportThemeAsCSS,
    ]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- useTheme hook is intentionally co-located with ThemeProvider
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
