import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Kbd } from "@/components/ui/kbd"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Home, Settings, FileText, Inbox } from "lucide-react"

function UtilityLayoutSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Utility & Layout</h2>
        <p className="text-muted-foreground mb-6">
          Helper components and layout utilities with papercraft styling.
        </p>
      </div>

      {/* Kbd (Keyboard) */}
      <Card>
        <CardHeader>
          <CardTitle>Kbd (Keyboard)</CardTitle>
          <CardDescription>
            Typewriter key or label maker style for keyboard shortcuts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Default variant */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Typewriter Style (Default)</p>
            <div className="flex flex-wrap items-center gap-2">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
              <span className="text-muted-foreground mx-1">or</span>
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>Shift</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>P</Kbd>
            </div>
          </div>

          {/* Outline variant */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Label Maker Style</p>
            <div className="flex flex-wrap items-center gap-2">
              <Kbd variant="outline">Enter</Kbd>
              <Kbd variant="outline">Space</Kbd>
              <Kbd variant="outline">Esc</Kbd>
            </div>
          </div>

          {/* Ghost variant */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Ghost Style</p>
            <p className="text-sm text-muted-foreground">
              Press <Kbd variant="ghost">⌘</Kbd> + <Kbd variant="ghost">S</Kbd> to save
            </p>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Sizes</p>
            <div className="flex items-center gap-3">
              <Kbd size="sm">sm</Kbd>
              <Kbd size="default">default</Kbd>
              <Kbd size="lg">lg</Kbd>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aspect Ratio */}
      <Card>
        <CardHeader>
          <CardTitle>Aspect Ratio</CardTitle>
          <CardDescription>
            Paper frame / mat board metaphor for maintaining aspect ratios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">16:9</p>
              <AspectRatio ratio={16 / 9} className="bg-amber-100 rounded-md border border-amber-200/60 overflow-hidden">
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  16:9
                </div>
              </AspectRatio>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">1:1 (Square)</p>
              <AspectRatio ratio={1} className="bg-amber-100 rounded-md border border-amber-200/60 overflow-hidden">
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  1:1
                </div>
              </AspectRatio>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">4:3</p>
              <AspectRatio ratio={4 / 3} className="bg-amber-100 rounded-md border border-amber-200/60 overflow-hidden">
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  4:3
                </div>
              </AspectRatio>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resizable */}
      <Card>
        <CardHeader>
          <CardTitle>Resizable</CardTitle>
          <CardDescription>
            Paper panels with fold/tear handles for resizing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Horizontal */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Horizontal Panels</p>
            <div className="h-48 rounded-md border border-amber-200/60 overflow-hidden">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Panel 1</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Panel 2</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>

          {/* Vertical */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Vertical Panels</p>
            <div className="h-64 rounded-md border border-amber-200/60 overflow-hidden">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={40} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Top Panel</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60} minSize={20}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-muted-foreground">Bottom Panel</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>
            Paper panel / folder system for navigation sidebars.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Sidebar Demo</p>
            <p className="text-sm text-muted-foreground mb-4">
              The sidebar component is designed for full-page layouts. Below is a preview of the menu styling.
            </p>

            {/* Inline sidebar preview */}
            <div className="border border-amber-200/60 rounded-lg p-4 bg-background/80 max-w-xs">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-2 mb-2">
                  Navigation
                </p>
                <button className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-foreground hover:bg-secondary hover:-translate-y-0.5 transition-all duration-150 hover:[box-shadow:var(--paper-elevation-1)]">
                  <Home className="size-4" />
                  <span>Home</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-foreground bg-secondary [box-shadow:var(--paper-elevation-1)]">
                  <Inbox className="size-4" />
                  <span>Inbox</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-foreground hover:bg-secondary hover:-translate-y-0.5 transition-all duration-150 hover:[box-shadow:var(--paper-elevation-1)]">
                  <FileText className="size-4" />
                  <span>Documents</span>
                </button>
                <button className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-foreground hover:bg-secondary hover:-translate-y-0.5 transition-all duration-150 hover:[box-shadow:var(--paper-elevation-1)]">
                  <Settings className="size-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { UtilityLayoutSection }
