import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
