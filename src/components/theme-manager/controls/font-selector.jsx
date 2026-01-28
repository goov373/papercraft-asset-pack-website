import { useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  FONT_CATALOG,
  FONT_CATEGORIES,
  getFontsByCategory,
} from "@/lib/typography-config"
import { loadGoogleFont, getFontFamily } from "@/lib/theme-utils"

/**
 * Font Selector
 *
 * A dropdown for selecting fonts from the curated Google Fonts catalog.
 * Groups fonts by category and shows a live preview of each font.
 */
export function FontSelector({ value, onChange, label, recommendedFor }) {
  const fontsByCategory = useMemo(() => getFontsByCategory(), [])

  // Preload font on hover for better UX
  const handleFontHover = (fontId) => {
    loadGoogleFont(fontId)
  }

  const currentFont = FONT_CATALOG[value]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <span
              style={{ fontFamily: getFontFamily(value) }}
              className="truncate"
            >
              {currentFont?.name || "Select font..."}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Object.entries(FONT_CATEGORIES).map(([categoryId, category]) => {
            const fonts = fontsByCategory[categoryId] || []
            if (fonts.length === 0) return null

            return (
              <SelectGroup key={categoryId}>
                <SelectLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  {category.label}
                </SelectLabel>
                {fonts.map((font) => {
                  const isRecommended =
                    recommendedFor &&
                    (font.recommended === recommendedFor ||
                      font.recommended === "both")

                  return (
                    <SelectItem
                      key={font.id}
                      value={font.id}
                      onMouseEnter={() => handleFontHover(font.id)}
                      className="py-2"
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <span
                          style={{ fontFamily: getFontFamily(font.id) }}
                          className="text-base"
                        >
                          {font.name}
                        </span>
                        {isRecommended && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0"
                          >
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground block">
                        {font.preview}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
