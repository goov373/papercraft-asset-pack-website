/**
 * Theme utilities for CSS variable management and color conversion
 */

// Default theme values extracted from index.css
export const DEFAULT_THEME = {
  darkMode: false,
  paperWhite: "oklch(0.98 0.01 90)",
  paperCream: "oklch(0.96 0.02 85)",
  paperKraft: "oklch(0.75 0.08 70)",
  radius: 0.625,
  textureOpacityFaint: 0.04,
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
    id: "preset-1",
    name: "Rose Garden",
    description: "Soft pink and rose tones",
    colors: {
      primary: "oklch(0.4549 0.1832 3.3628)",
      accent: "oklch(0.7533 0.1207 344.5817)",
      background: "oklch(0.9692 0.0192 343.9343)",
    },
    css: `:root {
  --background: oklch(0.9692 0.0192 343.9343);
  --foreground: oklch(0.4426 0.1653 352.3762);
  --card: oklch(0.9903 0.0084 325.6400);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9903 0.0084 325.6400);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4549 0.1832 3.3628);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5334 0.0586 326.3602);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9494 0.0335 341.0157);
  --muted-foreground: oklch(0.5693 0.0643 344.7824);
  --accent: oklch(0.7533 0.1207 344.5817);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.6009 0.1243 311.7958);
  --border: oklch(0.9195 0.0534 342.7281);
  --input: oklch(0.8201 0.0533 343.4258);
  --ring: oklch(0.5549 0.1836 3.2603);
}
.dark {
  --background: oklch(0.1808 0.0535 313.7159);
  --foreground: oklch(0.8624 0.1307 326.6356);
  --card: oklch(0.1515 0.0532 312.9049);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1515 0.0532 312.9049);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7543 0.2319 332.0212);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6517 0.0566 319.0224);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2075 0.0915 313.7602);
  --muted-foreground: oklch(0.7030 0.0690 313.7252);
  --accent: oklch(0.3988 0.1732 317.6091);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6921 0.1802 293.9790);
  --border: oklch(0.2672 0.1053 313.0833);
  --input: oklch(0.3676 0.1055 312.8664);
  --ring: oklch(0.6546 0.2327 331.9360);
}`,
  },
  {
    id: "preset-2",
    name: "Burnt Sienna",
    description: "Earthy orange and warm gray",
    colors: {
      primary: "oklch(0.4747 0.1516 36.3521)",
      accent: "oklch(0.8372 0.0751 36.1425)",
      background: "oklch(0.9383 0.0042 236.4995)",
    },
    css: `:root {
  --background: oklch(0.9383 0.0042 236.4995);
  --foreground: oklch(0.3211 0.0000 0.0000);
  --card: oklch(0.9684 0.0042 236.4971);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9684 0.0042 236.4971);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4747 0.1516 36.3521);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5100 0.0116 267.2740);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9444 0.0042 236.4990);
  --muted-foreground: oklch(0.5247 0.0120 248.0565);
  --accent: oklch(0.8372 0.0751 36.1425);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.5778 0.0759 254.1573);
  --border: oklch(0.9022 0.0052 247.8823);
  --input: oklch(0.8032 0.0054 247.8918);
  --ring: oklch(0.5751 0.1515 36.6169);
}
.dark {
  --background: oklch(0.2598 0.0306 262.6666);
  --foreground: oklch(0.9219 0.0000 0.0000);
  --card: oklch(0.2300 0.0298 261.3216);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.2300 0.0298 261.3216);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.6397 0.1720 36.4421);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6470 0.0170 269.8877);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2239 0.0243 270.0992);
  --muted-foreground: oklch(0.7278 0.0168 266.2378);
  --accent: oklch(0.3940 0.0668 33.4355);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6583 0.0645 254.7414);
  --border: oklch(0.3030 0.0281 270.3205);
  --input: oklch(0.4026 0.0281 268.9623);
  --ring: oklch(0.5395 0.1722 36.3528);
}`,
  },
  {
    id: "preset-3",
    name: "Ocean Teal",
    description: "Cool teal and cyan tones",
    colors: {
      primary: "oklch(0.4811 0.0820 203.8339)",
      accent: "oklch(0.7249 0.0836 201.4430)",
      background: "oklch(0.9491 0.0085 197.0128)",
    },
    css: `:root {
  --background: oklch(0.9491 0.0085 197.0128);
  --foreground: oklch(0.3772 0.0619 212.6640);
  --card: oklch(0.9791 0.0085 197.0183);
  --card-foreground: oklch(0.0000 0.0000 0.0000);
  --popover: oklch(0.9791 0.0085 197.0183);
  --popover-foreground: oklch(0.0000 0.0000 0.0000);
  --primary: oklch(0.4811 0.0820 203.8339);
  --primary-foreground: oklch(1.0000 0.0000 0.0000);
  --secondary: oklch(0.5354 0.0192 196.5936);
  --secondary-foreground: oklch(1.0000 0.0000 0.0000);
  --muted: oklch(0.9539 0.0107 204.1231);
  --muted-foreground: oklch(0.5732 0.0203 205.2399);
  --accent: oklch(0.7249 0.0836 201.4430);
  --accent-foreground: oklch(0.0000 0.0000 0.0000);
  --destructive: oklch(0.6174 0.1009 201.7529);
  --border: oklch(0.9241 0.0152 207.1054);
  --input: oklch(0.8234 0.0145 207.8677);
  --ring: oklch(0.5819 0.0821 203.7435);
}
.dark {
  --background: oklch(0.2068 0.0247 224.4533);
  --foreground: oklch(0.8520 0.1269 195.0354);
  --card: oklch(0.1760 0.0253 224.7984);
  --card-foreground: oklch(1.0000 0.0000 0.0000);
  --popover: oklch(0.1760 0.0253 224.7984);
  --popover-foreground: oklch(1.0000 0.0000 0.0000);
  --primary: oklch(0.7521 0.1206 194.8944);
  --primary-foreground: oklch(0.0000 0.0000 0.0000);
  --secondary: oklch(0.6389 0.0382 216.8158);
  --secondary-foreground: oklch(0.0000 0.0000 0.0000);
  --muted: oklch(0.2247 0.0403 217.6111);
  --muted-foreground: oklch(0.7234 0.0320 217.5998);
  --accent: oklch(0.4070 0.0695 194.7690);
  --accent-foreground: oklch(1.0000 0.0000 0.0000);
  --destructive: oklch(0.6620 0.0725 194.3757);
  --border: oklch(0.3009 0.0497 216.3744);
  --input: oklch(0.4018 0.0496 215.3063);
  --ring: oklch(0.6566 0.1121 194.7690);
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
