/**
 * Theme utilities for CSS variable management and color conversion
 */

import { FONT_CATALOG, TYPE_SCALES, LINE_HEIGHTS } from "./typography-config"

// Default theme values extracted from index.css
export const DEFAULT_THEME = {
  darkMode: false,
  paperWhite: "oklch(0.98 0.01 90)",
  paperCream: "oklch(0.96 0.02 85)",
  paperKraft: "oklch(0.75 0.08 70)",
  radius: 0.625,
  textureOpacityFaint: 0.04,
  // Typography
  fontHeading: "system-ui",
  fontBody: "system-ui",
  fontWeightHeading: 600,
  fontWeightBody: 400,
  typeScale: "default",
  lineHeightPreset: "normal",
}

/**
 * Default typography values
 */
export const DEFAULT_TYPOGRAPHY = {
  fontHeading: "system-ui",
  fontBody: "system-ui",
  fontWeightHeading: 600,
  fontWeightBody: 400,
  typeScale: "default",
  lineHeightPreset: "normal",
}

// Storage keys
export const STORAGE_KEY = "papercraft-theme"
export const PRESETS_KEY = "papercraft-theme-presets"

/**
 * Set a CSS custom property on :root
 */
export function setCSSVariable(name, value) {
  document.documentElement.style.setProperty(name, value)
}

/**
 * Get a CSS custom property value from :root
 */
export function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/**
 * Apply theme state to DOM via CSS custom properties
 */
export function applyThemeToDOM(themeState) {
  // Dark mode
  if (themeState.darkMode) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // Paper surfaces
  setCSSVariable("--paper-white", themeState.paperWhite)
  setCSSVariable("--paper-cream", themeState.paperCream)
  setCSSVariable("--paper-kraft", themeState.paperKraft)

  // Radius
  setCSSVariable("--radius", `${themeState.radius}rem`)

  // Texture opacity
  setCSSVariable("--texture-opacity-faint", themeState.textureOpacityFaint)

  // Typography
  applyTypographyToDOM(themeState)
}

// Track which fonts have been loaded to avoid duplicate requests
const loadedFonts = new Set()

/**
 * Load a Google Font dynamically
 * @param {string} fontId - The font ID from FONT_CATALOG
 * @returns {boolean} Whether the font was loaded (or already loaded)
 */
export function loadGoogleFont(fontId) {
  const font = FONT_CATALOG[fontId]
  if (!font?.googleFont) return false

  // Already loaded
  if (loadedFonts.has(fontId)) return true

  // Create and append the link element
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`
  document.head.appendChild(link)

  loadedFonts.add(fontId)
  return true
}

/**
 * Get the CSS font-family value for a font ID
 * @param {string} fontId - The font ID from FONT_CATALOG
 * @returns {string} CSS font-family value
 */
export function getFontFamily(fontId) {
  const font = FONT_CATALOG[fontId]
  if (!font) return "system-ui, sans-serif"

  if (fontId === "system-ui") {
    return font.fallback
  }

  return `"${font.name}", ${font.fallback}`
}

/**
 * Apply typography state to DOM via CSS custom properties
 * @param {Object} themeState - The theme state containing typography settings
 */
export function applyTypographyToDOM(themeState) {
  const {
    fontHeading = "system-ui",
    fontBody = "system-ui",
    fontWeightHeading = 600,
    fontWeightBody = 400,
    typeScale = "default",
    lineHeightPreset = "normal",
  } = themeState

  // Load fonts if needed
  loadGoogleFont(fontHeading)
  loadGoogleFont(fontBody)

  // Get font families
  const headingFamily = getFontFamily(fontHeading)
  const bodyFamily = getFontFamily(fontBody)

  // Get type scale values
  const scale = TYPE_SCALES[typeScale] || TYPE_SCALES.default

  // Get line height values
  const lineHeights = LINE_HEIGHTS[lineHeightPreset] || LINE_HEIGHTS.normal

  // Apply CSS custom properties
  setCSSVariable("--font-family-heading", headingFamily)
  setCSSVariable("--font-family-body", bodyFamily)
  setCSSVariable("--font-weight-heading", fontWeightHeading)
  setCSSVariable("--font-weight-body", fontWeightBody)
  setCSSVariable("--font-size-base", `${scale.baseFontSize}px`)
  setCSSVariable("--type-scale-ratio", scale.ratio)
  setCSSVariable("--line-height-heading", lineHeights.heading)
  setCSSVariable("--line-height-body", lineHeights.body)

  // Compute and set derived font sizes
  const ratio = scale.ratio
  const base = scale.baseFontSize

  // Font size variables (used by our CSS)
  const sizeXs = `${(base / ratio / ratio).toFixed(2)}px`
  const sizeSm = `${(base / ratio).toFixed(2)}px`
  const sizeBase = `${base}px`
  const sizeLg = `${(base * ratio).toFixed(2)}px`
  const sizeXl = `${(base * ratio * ratio).toFixed(2)}px`
  const size2xl = `${(base * ratio * ratio * ratio).toFixed(2)}px`
  const size3xl = `${(base * ratio * ratio * ratio * ratio).toFixed(2)}px`
  const size4xl = `${(base * ratio * ratio * ratio * ratio * ratio).toFixed(2)}px`

  // Set --font-size-* variables (our naming)
  setCSSVariable("--font-size-xs", sizeXs)
  setCSSVariable("--font-size-sm", sizeSm)
  setCSSVariable("--font-size-lg", sizeLg)
  setCSSVariable("--font-size-xl", sizeXl)
  setCSSVariable("--font-size-2xl", size2xl)
  setCSSVariable("--font-size-3xl", size3xl)
  setCSSVariable("--font-size-4xl", size4xl)

  // Set --text-* variables (Tailwind's naming for text-xs, text-sm, etc.)
  setCSSVariable("--text-xs", sizeXs)
  setCSSVariable("--text-sm", sizeSm)
  setCSSVariable("--text-base", sizeBase)
  setCSSVariable("--text-lg", sizeLg)
  setCSSVariable("--text-xl", sizeXl)
  setCSSVariable("--text-2xl", size2xl)
  setCSSVariable("--text-3xl", size3xl)
  setCSSVariable("--text-4xl", size4xl)

  // Set line height utilities
  setCSSVariable("--leading-heading", lineHeights.heading)
  setCSSVariable("--leading-body", lineHeights.body)
}

/**
 * Generate Google Fonts import URL for typography state
 * @param {Object} themeState - The theme state
 * @returns {string|null} Google Fonts import URL or null if using system fonts
 */
export function generateGoogleFontsImport(themeState) {
  const { fontHeading = "system-ui", fontBody = "system-ui" } = themeState
  const fonts = []

  const headingFont = FONT_CATALOG[fontHeading]
  const bodyFont = FONT_CATALOG[fontBody]

  if (headingFont?.googleFont) {
    fonts.push(headingFont.googleFont)
  }

  if (bodyFont?.googleFont && bodyFont.googleFont !== headingFont?.googleFont) {
    fonts.push(bodyFont.googleFont)
  }

  if (fonts.length === 0) return null

  return `@import url('https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${f}`).join("&")}&display=swap');`
}

/**
 * Export typography as CSS
 * @param {Object} themeState - The theme state
 * @returns {string} CSS string with typography variables
 */
export function exportTypographyAsCSS(themeState) {
  const {
    fontHeading = "system-ui",
    fontBody = "system-ui",
    fontWeightHeading = 600,
    fontWeightBody = 400,
    typeScale = "default",
    lineHeightPreset = "normal",
  } = themeState

  const headingFamily = getFontFamily(fontHeading)
  const bodyFamily = getFontFamily(fontBody)
  const scale = TYPE_SCALES[typeScale] || TYPE_SCALES.default
  const lineHeights = LINE_HEIGHTS[lineHeightPreset] || LINE_HEIGHTS.normal

  const ratio = scale.ratio
  const base = scale.baseFontSize

  const googleImport = generateGoogleFontsImport(themeState)

  let css = ""

  if (googleImport) {
    css += `/* Google Fonts */\n${googleImport}\n\n`
  }

  css += `:root {
  /* Typography */
  --font-family-heading: ${headingFamily};
  --font-family-body: ${bodyFamily};
  --font-weight-heading: ${fontWeightHeading};
  --font-weight-body: ${fontWeightBody};
  --font-size-base: ${base}px;
  --type-scale-ratio: ${ratio};
  --line-height-heading: ${lineHeights.heading};
  --line-height-body: ${lineHeights.body};

  /* Computed Sizes */
  --font-size-xs: ${(base / ratio / ratio).toFixed(2)}px;
  --font-size-sm: ${(base / ratio).toFixed(2)}px;
  --font-size-lg: ${(base * ratio).toFixed(2)}px;
  --font-size-xl: ${(base * ratio * ratio).toFixed(2)}px;
  --font-size-2xl: ${(base * ratio * ratio * ratio).toFixed(2)}px;
  --font-size-3xl: ${(base * ratio * ratio * ratio * ratio).toFixed(2)}px;
  --font-size-4xl: ${(base * ratio * ratio * ratio * ratio * ratio).toFixed(2)}px;
}`

  return css
}

/**
 * Get default theme values
 */
export function getDefaultTheme() {
  return { ...DEFAULT_THEME }
}

/**
 * Convert hex color to oklch (approximate)
 * Note: This is a simplified conversion. For production, consider using a library like culori
 */
export function hexToOklch(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, "")

  // Parse RGB values
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255

  // Convert to linear RGB
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  const lr = toLinear(r)
  const lg = toLinear(g)
  const lb = toLinear(b)

  // Convert to XYZ (D65)
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb

  // Convert to Lab
  const xn = 0.95047
  const yn = 1.0
  const zn = 1.08883

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116)

  const L = 116 * f(y / yn) - 16
  const a = 500 * (f(x / xn) - f(y / yn))
  const bVal = 200 * (f(y / yn) - f(z / zn))

  // Convert Lab to oklch (approximate)
  const C = Math.sqrt(a * a + bVal * bVal)
  let H = Math.atan2(bVal, a) * (180 / Math.PI)
  if (H < 0) H += 360

  // Normalize L to 0-1 range for oklch
  const oklchL = L / 100

  return `oklch(${oklchL.toFixed(3)} ${(C / 100).toFixed(3)} ${H.toFixed(0)})`
}

/**
 * Convert oklch to hex (approximate)
 * Note: This is a simplified conversion
 */
export function oklchToHex(oklchStr) {
  // Parse oklch string: oklch(L C H) or oklch(L C H / alpha)
  const match = oklchStr.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)/)
  if (!match) return "#888888"

  const L = parseFloat(match[1]) * 100 // Scale back to 0-100
  const C = parseFloat(match[2]) * 100
  const H = parseFloat(match[3])

  // Convert to Lab
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // Convert Lab to XYZ
  const xn = 0.95047
  const yn = 1.0
  const zn = 1.08883

  const fy = (L + 16) / 116
  const fx = a / 500 + fy
  const fz = fy - b / 200

  const f3 = (t) => (t > 0.206893 ? t * t * t : (t - 16 / 116) / 7.787)

  const x = xn * f3(fx)
  const y = yn * f3(fy)
  const z = zn * f3(fz)

  // Convert XYZ to linear RGB
  let lr = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z
  let lg = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z
  let lb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z

  // Convert to sRGB
  const toSRGB = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055

  const r = Math.round(Math.max(0, Math.min(1, toSRGB(lr))) * 255)
  const g = Math.round(Math.max(0, Math.min(1, toSRGB(lg))) * 255)
  const bComp = Math.round(Math.max(0, Math.min(1, toSRGB(lb))) * 255)

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bComp.toString(16).padStart(2, "0")}`
}

/**
 * Load theme from localStorage
 */
export function loadThemeFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_THEME, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.warn("Failed to load theme from storage:", e)
  }
  return getDefaultTheme()
}

/**
 * Save theme to localStorage
 */
export function saveThemeToStorage(themeState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themeState))
  } catch (e) {
    console.warn("Failed to save theme to storage:", e)
  }
}

/**
 * Load presets from localStorage
 */
export function loadPresetsFromStorage() {
  try {
    const stored = localStorage.getItem(PRESETS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn("Failed to load presets from storage:", e)
  }
  return []
}

/**
 * Save presets to localStorage
 */
export function savePresetsToStorage(presets) {
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets))
  } catch (e) {
    console.warn("Failed to save presets to storage:", e)
  }
}

/**
 * Built-in theme presets
 * These are full shadcn theme presets that can be applied
 */
export const BUILT_IN_PRESETS = [
  {
    id: "default",
    name: "Default (Amber)",
    description: "Warm amber papercraft theme",
    colors: {
      primary: "oklch(0.666 0.179 58.318)",
      accent: "oklch(0.705 0.191 47.604)",
      background: "oklch(0.987 0.022 95.277)",
    },
    css: null, // Uses the default CSS from index.css
  },
  {
    id: "forest-meadow",
    name: "Forest Meadow",
    description: "Fresh green with orange accents",
    colors: {
      primary: "oklch(0.5033 0.1399 149.6019)",
      accent: "oklch(0.7582 0.0561 123.7742)",
      background: "oklch(0.9815 0.0073 132.4141)",
    },
    css: `:root {
  --background: oklch(0.9815 0.0073 132.4141);
  --foreground: oklch(0.2463 0.0129 258.3721);
  --card: oklch(0.9974 0.0056 128.5237);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9974 0.0056 128.5237);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.5033 0.1399 149.6019);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.6230 0.1258 70.7906);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.9548 0.0164 121.7705);
  --muted-foreground: oklch(0.5363 0.0236 122.2078);
  --accent: oklch(0.7582 0.0561 123.7742);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5507 0.1744 139.3368);
  --border: oklch(0.9266 0.0263 123.4396);
  --input: oklch(0.8262 0.0255 121.9922);
  --ring: oklch(0.6043 0.1405 149.5930);
}
.dark {
  --background: oklch(0.1816 0.0159 119.4121);
  --foreground: oklch(0.9461 0.0000 0.0000);
  --card: oklch(0.1507 0.0135 115.0483);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1507 0.0135 115.0483);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7062 0.1207 158.5659);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6998 0.1068 76.4583);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2174 0.0136 120.4922);
  --muted-foreground: oklch(0.7234 0.0044 121.5910);
  --accent: oklch(0.4396 0.1101 124.7054);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6710 0.2048 138.9434);
  --border: oklch(0.2866 0.0073 118.2750);
  --input: oklch(0.3878 0.0084 115.9746);
  --ring: oklch(0.6047 0.1205 158.5127);
}`,
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    description: "Cool blue and teal tones",
    colors: {
      primary: "oklch(0.5091 0.0947 222.8499)",
      accent: "oklch(0.7652 0.0517 180.3042)",
      background: "oklch(0.9817 0.0057 264.5328)",
    },
    css: `:root {
  --background: oklch(0.9817 0.0057 264.5328);
  --foreground: oklch(0.2463 0.0129 258.3721);
  --card: oklch(0.9985 0.0021 197.1238);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9985 0.0021 197.1238);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.5091 0.0947 222.8499);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5449 0.1065 228.6478);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9454 0.0187 265.9819);
  --muted-foreground: oklch(0.5240 0.0266 266.7015);
  --accent: oklch(0.7652 0.0517 180.3042);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5649 0.1976 287.4462);
  --border: oklch(0.9055 0.0307 265.3249);
  --input: oklch(0.8063 0.0303 264.3907);
  --ring: oklch(0.6088 0.0946 222.9309);
}
.dark {
  --background: oklch(0.1686 0.0322 260.3378);
  --foreground: oklch(0.9461 0.0000 0.0000);
  --card: oklch(0.1402 0.0316 258.7964);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1402 0.0316 258.7964);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7252 0.1302 217.8508);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6743 0.1002 229.4848);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2132 0.0213 263.9644);
  --muted-foreground: oklch(0.7212 0.0124 264.4898);
  --accent: oklch(0.4765 0.0920 172.3996);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6780 0.1532 290.8433);
  --border: oklch(0.2799 0.0221 262.4889);
  --input: oklch(0.3808 0.0210 259.4005);
  --ring: oklch(0.6324 0.1160 221.0131);
}`,
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Minimal grayscale palette",
    colors: {
      primary: "oklch(0.4381 0.0042 354.8654)",
      accent: "oklch(0.7163 0.0012 17.1848)",
      background: "oklch(0.9761 0.0000 0.0000)",
    },
    css: `:root {
  --background: oklch(0.9761 0.0000 0.0000);
  --foreground: oklch(0.1776 0.0000 0.0000);
  --card: oklch(1.0000 0.0000 0.0000);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(1.0000 0.0000 0.0000);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4381 0.0042 354.8654);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5103 0.0000 0.0000);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9431 0.0000 0.0000);
  --muted-foreground: oklch(0.5231 0.0077 5.8280);
  --accent: oklch(0.7163 0.0012 17.1848);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5357 0.0012 17.1964);
  --border: oklch(0.9006 0.0000 0.0000);
  --input: oklch(0.8015 0.0000 0.0000);
  --ring: oklch(0.5378 0.0040 354.8028);
}
.dark {
  --background: oklch(0.2090 0.0000 0.0000);
  --foreground: oklch(1.0000 0.0000 0.0000);
  --card: oklch(0.1776 0.0000 0.0000);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1776 0.0000 0.0000);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7284 0.0000 0.0000);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.7284 0.0000 0.0000);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2170 0.0102 355.9078);
  --muted-foreground: oklch(0.7231 0.0018 325.5951);
  --accent: oklch(0.4005 0.0131 355.5123);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6588 0.0072 5.7329);
  --border: oklch(0.2891 0.0000 0.0000);
  --input: oklch(0.3904 0.0000 0.0000);
  --ring: oklch(0.6268 0.0000 0.0000);
}`,
  },
  {
    id: "slate-minimal",
    name: "Slate Minimal",
    description: "Pure neutral slate tones",
    colors: {
      primary: "oklch(0.4743 0.0041 354.8392)",
      accent: "oklch(0.7260 0.0011 17.1843)",
      background: "oklch(1.0000 0.0000 0.0000)",
    },
    css: `:root {
  --background: oklch(1.0000 0.0000 0.0000);
  --foreground: oklch(0.1448 0.0000 0.0000);
  --card: oklch(1.0000 0.0000 0.0000);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(1.0000 0.0000 0.0000);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4743 0.0041 354.8392);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5113 0.0106 0.4442);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9529 0.0011 17.1768);
  --muted-foreground: oklch(0.5345 0.0089 7.5013);
  --accent: oklch(0.7260 0.0011 17.1843);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5555 0.0000 0.0000);
  --border: oklch(0.9219 0.0000 0.0000);
  --input: oklch(0.8234 0.0000 0.0000);
  --ring: oklch(0.5756 0.0039 354.7853);
}
.dark {
  --background: oklch(0.1448 0.0000 0.0000);
  --foreground: oklch(0.9851 0.0000 0.0000);
  --card: oklch(0.1149 0.0000 0.0000);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1149 0.0000 0.0000);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.6409 0.0012 17.1887);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6993 0.0000 0.0000);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2096 0.0119 359.1372);
  --muted-foreground: oklch(0.7098 0.0012 17.1851);
  --accent: oklch(0.3923 0.0075 351.1576);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6409 0.0012 17.1887);
  --border: oklch(0.2763 0.0048 355.0804);
  --input: oklch(0.3758 0.0057 0.2912);
  --ring: oklch(0.5417 0.0000 0.0000);
}`,
  },
  {
    id: "olive-grove",
    name: "Olive Grove",
    description: "Warm olive and sage tones",
    colors: {
      primary: "oklch(0.4923 0.0920 118.5021)",
      accent: "oklch(0.7541 0.0464 132.8387)",
      background: "oklch(0.8798 0.0534 91.7893)",
    },
    css: `:root {
  --background: oklch(0.8798 0.0534 91.7893);
  --foreground: oklch(0.4265 0.0310 59.2153);
  --card: oklch(0.9103 0.0530 91.7820);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9103 0.0530 91.7820);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4923 0.0920 118.5021);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5504 0.0538 91.7791);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9116 0.0188 57.2003);
  --muted-foreground: oklch(0.5096 0.0385 59.4582);
  --accent: oklch(0.7541 0.0464 132.8387);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.6253 0.0286 136.3912);
  --border: oklch(0.8379 0.0271 58.2230);
  --input: oklch(0.7373 0.0271 55.9283);
  --ring: oklch(0.5930 0.0931 119.0587);
}
.dark {
  --background: oklch(0.3303 0.0214 88.0737);
  --foreground: oklch(0.9217 0.0235 82.1191);
  --card: oklch(0.2990 0.0203 86.4170);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.2990 0.0203 86.4170);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.6762 0.0567 132.4479);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6973 0.0155 84.5911);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2201 0.0214 86.2004);
  --muted-foreground: oklch(0.7138 0.0141 82.3974);
  --accent: oklch(0.3800 0.0421 129.7971);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6717 0.0403 137.8716);
  --border: oklch(0.2958 0.0223 84.4276);
  --input: oklch(0.3961 0.0225 86.1537);
  --ring: oklch(0.5774 0.0569 132.1780);
}`,
  },
  {
    id: "violet-mist",
    name: "Violet Mist",
    description: "Soft purple and teal accents",
    colors: {
      primary: "oklch(0.4368 0.0026 17.2571)",
      accent: "oklch(0.6948 0.0685 170.9074)",
      background: "oklch(0.9881 0.0000 0.0000)",
    },
    css: `:root {
  --background: oklch(0.9881 0.0000 0.0000);
  --foreground: oklch(0.2221 0.0000 0.0000);
  --card: oklch(1.0000 0.0000 0.0000);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(1.0000 0.0000 0.0000);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4368 0.0026 17.2571);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.6076 0.1404 276.7418);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.9439 0.0040 286.3226);
  --muted-foreground: oklch(0.5561 0.0110 273.2406);
  --accent: oklch(0.6948 0.0685 170.9074);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5475 0.1038 77.6126);
  --border: oklch(0.9040 0.0055 274.9596);
  --input: oklch(0.8051 0.0057 274.9478);
  --ring: oklch(0.5365 0.0025 17.2345);
}
.dark {
  --background: oklch(0.1735 0.0020 286.1848);
  --foreground: oklch(0.9187 0.0029 264.5414);
  --card: oklch(0.1452 0.0021 286.1313);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1452 0.0021 286.1313);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7251 0.0075 268.5249);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6518 0.1348 275.3355);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2019 0.0121 277.8070);
  --muted-foreground: oklch(0.7123 0.0045 271.3506);
  --accent: oklch(0.4653 0.0954 166.9717);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.7210 0.1130 95.0663);
  --border: oklch(0.2605 0.0058 271.1914);
  --input: oklch(0.3602 0.0053 271.2677);
  --ring: oklch(0.6263 0.0064 264.5173);
}`,
  },
  {
    id: "golden-sunset",
    name: "Golden Sunset",
    description: "Warm yellow with purple accent",
    colors: {
      primary: "oklch(0.5622 0.1171 78.3355)",
      accent: "oklch(0.7092 0.0979 265.5768)",
      background: "oklch(0.9816 0.0026 106.4481)",
    },
    css: `:root {
  --background: oklch(0.9816 0.0026 106.4481);
  --foreground: oklch(0.2099 0.0039 286.0588);
  --card: oklch(0.9994 0.0026 106.4470);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9994 0.0026 106.4470);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.5622 0.1171 78.3355);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.6065 0.1070 97.3025);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.9438 0.0046 78.2975);
  --muted-foreground: oklch(0.5245 0.0128 89.7997);
  --accent: oklch(0.7092 0.0979 265.5768);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5996 0.1866 23.7368);
  --border: oklch(0.9038 0.0071 88.6464);
  --input: oklch(0.8048 0.0073 88.6535);
  --ring: oklch(0.6624 0.1169 77.9619);
}
.dark {
  --background: oklch(0.1448 0.0000 0.0000);
  --foreground: oklch(0.9647 0.0027 286.3498);
  --card: oklch(0.1149 0.0000 0.0000);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1149 0.0000 0.0000);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7766 0.1589 92.5086);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.7318 0.0634 97.3246);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.1980 0.0100 285.4557);
  --muted-foreground: oklch(0.7096 0.0029 286.3263);
  --accent: oklch(0.4313 0.1071 253.6601);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.7379 0.1601 21.7419);
  --border: oklch(0.2524 0.0019 286.2657);
  --input: oklch(0.3527 0.0017 286.3117);
  --ring: oklch(0.6783 0.1386 89.0622);
}`,
  },
  {
    id: "tropical-lagoon",
    name: "Tropical Lagoon",
    description: "Teal primary with pink secondary",
    colors: {
      primary: "oklch(0.5322 0.0910 205.7465)",
      accent: "oklch(0.7202 0.0772 256.0959)",
      background: "oklch(0.9902 0.0039 106.4715)",
    },
    css: `:root {
  --background: oklch(0.9902 0.0039 106.4715);
  --foreground: oklch(0.3043 0.0394 214.0798);
  --card: oklch(0.9992 0.0039 106.4707);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9992 0.0039 106.4707);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.5322 0.0910 205.7465);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5495 0.1298 310.4451);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9297 0.0066 208.7822);
  --muted-foreground: oklch(0.5292 0.0153 214.4327);
  --accent: oklch(0.7202 0.0772 256.0959);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.6337 0.1570 54.9611);
  --border: oklch(0.8736 0.0091 214.3465);
  --input: oklch(0.7737 0.0094 214.3524);
  --ring: oklch(0.6312 0.0912 206.5386);
}
.dark {
  --background: oklch(0.2167 0.0015 197.0427);
  --foreground: oklch(0.9836 0.0021 197.1231);
  --card: oklch(0.1856 0.0016 197.0184);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1856 0.0016 197.0184);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7216 0.1120 204.7055);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.7070 0.0663 317.6064);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2019 0.0105 196.3508);
  --muted-foreground: oklch(0.7138 0.0023 197.1059);
  --accent: oklch(0.4214 0.0452 246.6475);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.7297 0.1130 55.5280);
  --border: oklch(0.2624 0.0029 196.9776);
  --input: oklch(0.3619 0.0027 197.0366);
  --ring: oklch(0.6234 0.1065 205.4181);
}`,
  },
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    description: "Soft pink and magenta tones",
    colors: {
      primary: "oklch(0.4493 0.1560 347.9904)",
      accent: "oklch(0.7883 0.0611 212.1546)",
      background: "oklch(0.9399 0.0203 345.6984)",
    },
    css: `:root {
  --background: oklch(0.9399 0.0203 345.6984);
  --foreground: oklch(0.4712 0.0000 0.0000);
  --card: oklch(0.9692 0.0192 343.9343);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9692 0.0192 343.9343);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4493 0.1560 347.9904);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5251 0.0592 198.5411);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9055 0.0623 344.0653);
  --muted-foreground: oklch(0.5251 0.1677 348.0801);
  --accent: oklch(0.7883 0.0611 212.1546);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.6302 0.0699 87.7535);
  --border: oklch(0.8387 0.0986 348.3813);
  --input: oklch(0.7391 0.0980 348.3666);
  --ring: oklch(0.5485 0.1562 347.9572);
}
.dark {
  --background: oklch(0.2497 0.0305 234.1628);
  --foreground: oklch(0.9306 0.0197 349.0784);
  --card: oklch(0.2206 0.0309 234.8662);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.2206 0.0309 234.8662);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7258 0.0728 87.2075);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.7794 0.0803 4.1330);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2272 0.0298 241.5558);
  --muted-foreground: oklch(0.7305 0.0224 241.4716);
  --accent: oklch(0.3992 0.0612 3.3090);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6699 0.0988 356.9762);
  --border: oklch(0.3080 0.0346 242.6067);
  --input: oklch(0.4067 0.0348 242.4675);
  --ring: oklch(0.6252 0.0729 86.5840);
}`,
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "Vibrant green on dark background",
    colors: {
      primary: "oklch(0.5466 0.1334 122.5747)",
      accent: "oklch(0.7344 0.1374 130.0166)",
      background: "oklch(0.3172 0.0868 139.1811)",
    },
    css: `:root {
  --background: oklch(0.3172 0.0868 139.1811);
  --foreground: oklch(0.9424 0.1962 121.0608);
  --card: oklch(0.3470 0.0867 139.2042);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.3470 0.0867 139.2042);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.5466 0.1334 122.5747);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.6726 0.2289 142.4953);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.9020 0.0731 129.7714);
  --muted-foreground: oklch(0.4837 0.1337 131.7125);
  --accent: oklch(0.7344 0.1374 130.0166);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5455 0.0804 140.6323);
  --border: oklch(0.8169 0.1047 129.7986);
  --input: oklch(0.7171 0.1054 129.8415);
  --ring: oklch(0.6477 0.1339 122.6188);
}
.dark {
  --background: oklch(0.1996 0.0501 138.4069);
  --foreground: oklch(0.9424 0.1962 121.0608);
  --card: oklch(0.1698 0.0488 138.6558);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1698 0.0488 138.6558);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7422 0.1779 120.8801);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.7697 0.2619 142.4953);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2248 0.0662 135.4491);
  --muted-foreground: oklch(0.7133 0.0924 128.6331);
  --accent: oklch(0.4010 0.1138 133.3280);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6380 0.0481 139.0019);
  --border: oklch(0.3007 0.0836 132.1240);
  --input: oklch(0.4005 0.0835 132.4122);
  --ring: oklch(0.6439 0.1562 121.9822);
}`,
  },
  {
    id: "terracotta",
    name: "Terracotta",
    description: "Warm earthy brown tones",
    colors: {
      primary: "oklch(0.4743 0.1320 46.6067)",
      accent: "oklch(0.7258 0.0090 56.2618)",
      background: "oklch(0.9885 0.0057 84.5659)",
    },
    css: `:root {
  --background: oklch(0.9885 0.0057 84.5659);
  --foreground: oklch(0.3660 0.0251 49.6084);
  --card: oklch(0.9989 0.0053 106.4943);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9989 0.0053 106.4943);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4743 0.1320 46.6067);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5348 0.0639 75.1808);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9522 0.0193 90.5436);
  --muted-foreground: oklch(0.5678 0.0342 88.4112);
  --accent: oklch(0.7258 0.0090 56.2618);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5538 0.1207 66.4416);
  --border: oklch(0.9193 0.0305 90.3355);
  --input: oklch(0.8200 0.0310 92.3631);
  --ring: oklch(0.5746 0.1320 46.6392);
}
.dark {
  --background: oklch(0.2161 0.0061 56.0433);
  --foreground: oklch(0.9699 0.0013 106.4243);
  --card: oklch(0.1850 0.0064 55.9597);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1850 0.0064 55.9597);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7049 0.1867 47.6044);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6973 0.0068 75.3872);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2225 0.0161 71.1564);
  --muted-foreground: oklch(0.7235 0.0055 67.7377);
  --accent: oklch(0.3713 0.0956 246.0800);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.7027 0.1442 84.1719);
  --border: oklch(0.2968 0.0115 67.3615);
  --input: oklch(0.3971 0.0120 72.4786);
  --ring: oklch(0.6066 0.1808 42.6576);
}`,
  },
]

/**
 * Apply a built-in preset by injecting CSS
 */
export function applyBuiltInPreset(presetId) {
  const preset = BUILT_IN_PRESETS.find((p) => p.id === presetId)
  if (!preset) return false

  // Remove any existing preset style element
  const existingStyle = document.getElementById("theme-preset-styles")
  if (existingStyle) {
    existingStyle.remove()
  }

  // If it's the default preset, just remove the override styles
  if (preset.id === "default" || !preset.css) {
    return true
  }

  // Create and inject the preset styles
  const styleElement = document.createElement("style")
  styleElement.id = "theme-preset-styles"
  styleElement.textContent = preset.css
  document.head.appendChild(styleElement)

  return true
}

/**
 * Get the currently active preset ID from localStorage
 */
export function getActivePresetId() {
  try {
    return localStorage.getItem("papercraft-active-preset") || "default"
  } catch {
    return "default"
  }
}

/**
 * Save the active preset ID to localStorage
 */
export function setActivePresetId(presetId) {
  try {
    localStorage.setItem("papercraft-active-preset", presetId)
  } catch (e) {
    console.warn("Failed to save active preset:", e)
  }
}
