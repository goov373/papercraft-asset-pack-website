import { Button } from "./button"
import { Mail, Loader2, ChevronRight, Heart, Settings } from "lucide-react"

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs", "lg", "icon", "icon-sm", "icon-xs", "icon-lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

// Default button
export const Default = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
}

// All variants
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// All sizes
export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// With icons
export const WithIcons = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail />
        Login with Email
      </Button>
      <Button variant="outline">
        <ChevronRight />
        Continue
      </Button>
      <Button variant="secondary">
        <Heart />
        Like
      </Button>
      <Button disabled>
        <Loader2 className="animate-spin" />
        Loading...
      </Button>
    </div>
  ),
}

// Icon buttons
export const IconButtons = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon-xs" variant="ghost">
        <Settings />
      </Button>
      <Button size="icon-sm" variant="outline">
        <Settings />
      </Button>
      <Button size="icon" variant="default">
        <Settings />
      </Button>
      <Button size="icon-lg" variant="secondary">
        <Settings />
      </Button>
    </div>
  ),
}

// Disabled states
export const Disabled = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default</Button>
      <Button disabled variant="destructive">Destructive</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="link">Link</Button>
    </div>
  ),
}
