import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./card"
import { Button } from "./button"
import { MoreHorizontal } from "lucide-react"

export default {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "interactive", "notebook", "sticky", "kraft"],
    },
  },
}

// Default card with all subcomponents
export const Default = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description goes here. This is a brief explanation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is the main content area of the card. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: "default",
  },
}

// All card variants
export const AllVariants = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard paper card</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">The default card with subtle elevation.</p>
        </CardContent>
      </Card>

      <Card variant="interactive" className="w-full">
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Lifts on hover</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Hover over this card to see the lift effect.</p>
        </CardContent>
      </Card>

      <Card variant="notebook" className="w-full">
        <CardHeader>
          <CardTitle>Notebook</CardTitle>
          <CardDescription>Lined paper style</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Features a red margin line like notebook paper.</p>
        </CardContent>
      </Card>

      <Card variant="sticky" className="w-full">
        <CardHeader>
          <CardTitle>Sticky</CardTitle>
          <CardDescription>Post-it note style</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Warm amber color with a slight tilt.</p>
        </CardContent>
      </Card>

      <Card variant="kraft" className="w-full">
        <CardHeader>
          <CardTitle>Kraft</CardTitle>
          <CardDescription>Brown paper style</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Kraft paper brown with rustic texture.</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Card with action button
export const WithCardAction = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project Update</CardTitle>
        <CardDescription>Last updated 2 hours ago</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          The project is progressing well. All milestones are on track.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">View Details</Button>
        <Button size="sm">Continue</Button>
      </CardFooter>
    </Card>
  ),
}
