import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SunIcon, MoonIcon } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import { ColorsTab } from "./colors-tab"
import { PapercraftTab } from "./papercraft-tab"
import { PresetsTab } from "./presets-tab"

/**
 * Theme Manager
 *
 * A modal dialog with tabbed interface for customizing:
 * - Colors: Tinte integration for shadcn/ui colors
 * - Papercraft: Custom controls for paper surfaces, shadows, textures
 * - Presets: Save/load theme presets
 */
export function ThemeManager({ open, onOpenChange }) {
  const { themeState, setDarkMode } = useTheme()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Theme Manager</DialogTitle>
              <DialogDescription>
                Customize colors and papercraft styling
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!themeState.darkMode)}
              className="h-9 w-9 shrink-0"
              title={themeState.darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {themeState.darkMode ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="papercraft" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="papercraft">Papercraft</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="flex-1 overflow-auto">
            <ColorsTab />
          </TabsContent>

          <TabsContent value="papercraft" className="flex-1 overflow-auto">
            <PapercraftTab />
          </TabsContent>

          <TabsContent value="presets" className="flex-1 overflow-auto">
            <PresetsTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
