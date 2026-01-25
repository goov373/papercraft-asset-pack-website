import { useState } from "react"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function ComponentShowcase({ title, description, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-amber-900 mb-2">{title}</h3>
      <p className="text-amber-700 mb-4">{description}</p>
      <div className="bg-white/50 rounded-lg p-6 border border-amber-200">
        {children}
      </div>
    </div>
  )
}

function FormControlsSection() {
  const [inputValue, setInputValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [checked, setChecked] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const [switchOn, setSwitchOn] = useState(false)
  const [radioValue, setRadioValue] = useState("cardstock")
  const [sliderValue, setSliderValue] = useState([50])
  const [boldPressed, setBoldPressed] = useState(false)

  return (
    <div>
      <ComponentShowcase
        title="Input"
        description="Text input field with papercraft inset shadow styling that lifts on focus."
      >
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Default Input</Label>
            <Input
              id="demo-input"
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled-input">Disabled Input</Label>
            <Input
              id="disabled-input"
              placeholder="Disabled..."
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-input">Email Input</Label>
            <Input
              id="email-input"
              type="email"
              placeholder="email@example.com"
            />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Textarea"
        description="Multi-line text area with auto-resize and papercraft styling."
      >
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="demo-textarea">Default Textarea</Label>
            <Textarea
              id="demo-textarea"
              placeholder="Write your message..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
            <Textarea
              id="disabled-textarea"
              placeholder="Disabled..."
              disabled
            />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Select"
        description="Dropdown select component with floating paper card dropdown and smooth animations."
      >
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label>Default Select</Label>
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Cardstock Paper</SelectItem>
                <SelectItem value="option2">Construction Paper</SelectItem>
                <SelectItem value="option3">Kraft Paper</SelectItem>
                <SelectItem value="option4">Tissue Paper</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Small Select</Label>
            <Select>
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="Small size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s">Small</SelectItem>
                <SelectItem value="m">Medium</SelectItem>
                <SelectItem value="l">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Disabled Select</Label>
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Checkbox"
        description="Checkbox with inset paper hole styling that fills with color when checked."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="demo-checkbox"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <Label htmlFor="demo-checkbox">
              Accept terms and conditions
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checked-checkbox" defaultChecked />
            <Label htmlFor="checked-checkbox">
              Checked by default
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-checkbox" disabled />
            <Label htmlFor="disabled-checkbox">
              Disabled checkbox
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-checked-checkbox" disabled defaultChecked />
            <Label htmlFor="disabled-checked-checkbox">
              Disabled and checked
            </Label>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Switch"
        description="A paper slider that moves within a track, like a tab sliding through a slot cut in cardstock."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Sizes</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch size="sm" />
                <Label className="text-sm">Small</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label className="text-sm">Default {switchOn ? "(On)" : "(Off)"}</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch size="lg" defaultChecked />
                <Label className="text-sm">Large (checked)</Label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">States</h4>
            <div className="flex items-center gap-3">
              <Switch disabled />
              <Label className="text-sm text-muted-foreground">Disabled</Label>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Radio Group"
        description="Radio buttons styled like punched holes in paper that fill with color when selected."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Select Paper Type</h4>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cardstock" id="r1" />
                <Label htmlFor="r1">Cardstock (heavy, rigid)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="construction" id="r2" />
                <Label htmlFor="r2">Construction Paper (medium, colorful)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="kraft" id="r3" />
                <Label htmlFor="r3">Kraft Paper (brown, natural)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="tissue" id="r4" disabled />
                <Label htmlFor="r4" className="text-muted-foreground">Tissue Paper (disabled)</Label>
              </div>
            </RadioGroup>
          </div>
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{radioValue}</span>
          </p>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Slider"
        description="A paper strip track with a draggable paper tab marker that lifts on hover."
      >
        <div className="space-y-6 max-w-md">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Default Slider</h4>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Value: {sliderValue[0]}%
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Range Slider</h4>
            <Slider defaultValue={[25, 75]} max={100} step={1} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Disabled</h4>
            <Slider defaultValue={[50]} max={100} disabled />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Toggle"
        description="A paper button that shows pressed/raised states. When on, it lifts up like a flipped tab."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Variants</h4>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Default</p>
                <Toggle aria-label="Toggle bold" pressed={boldPressed} onPressedChange={setBoldPressed}>
                  <Bold className="size-4" />
                </Toggle>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Outline</p>
                <Toggle variant="outline" aria-label="Toggle italic">
                  <Italic className="size-4" />
                </Toggle>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Paper</p>
                <Toggle variant="paper" aria-label="Toggle underline">
                  <Underline className="size-4" />
                </Toggle>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Sizes</h4>
            <div className="flex items-end gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Small</p>
                <Toggle size="sm" variant="outline" aria-label="Bold">
                  <Bold className="size-4" />
                </Toggle>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Default</p>
                <Toggle variant="outline" aria-label="Bold">
                  <Bold className="size-4" />
                </Toggle>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Large</p>
                <Toggle size="lg" variant="outline" aria-label="Bold">
                  <Bold className="size-4" />
                </Toggle>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Text</h4>
            <Toggle variant="outline" aria-label="Toggle bold">
              <Bold className="size-4" />
              Bold
            </Toggle>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Toggle Group"
        description="Connected paper tabs where one is raised at a time, like folder tabs."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Connected (Single)</h4>
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Connected (Multiple)</h4>
            <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Spaced (Individual Paper Tabs)</h4>
            <ToggleGroup type="single" spacing={1} defaultValue="bold">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Label"
        description="Form label component with warm text color and disabled state styling."
      >
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="label-demo">Default Label</Label>
            <Input id="label-demo" placeholder="Associated input" />
          </div>
          <div className="space-y-2" data-disabled="true">
            <Label>Disabled Label (within disabled group)</Label>
            <Input placeholder="Disabled input" disabled />
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { FormControlsSection }
