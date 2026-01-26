# Component API Reference

Complete props and usage documentation for all components in the Papercraft Asset Pack Website.

---

## Table of Contents

- [UI Components](#ui-components)
  - [Layout](#layout)
  - [Buttons & Controls](#buttons--controls)
  - [Cards](#cards)
  - [Form Inputs](#form-inputs)
  - [Navigation](#navigation)
  - [Dialogs & Overlays](#dialogs--overlays)
  - [Data Display](#data-display)
  - [Media & Content](#media--content)
  - [Text & Typography](#text--typography)
  - [Status & Feedback](#status--feedback)
  - [Animation Effects](#animation-effects)
  - [Canvas & Interactive](#canvas--interactive)
  - [Theme & Visual](#theme--visual)
  - [Data Visualization](#data-visualization)
  - [Cart & Commerce](#cart--commerce)
- [Section Components](#section-components)
- [Page Components](#page-components)
- [Pricing Components](#pricing-components)
- [Context Providers](#context-providers)
- [Custom Hooks](#custom-hooks)
- [Data Utilities](#data-utilities)

---

## UI Components

### Layout

#### Container

**File:** `src/components/ui/container.jsx`

Responsive max-width wrapper for page content.

| Prop        | Type      | Default | Description            |
| ----------- | --------- | ------- | ---------------------- |
| `className` | string    | -       | Additional CSS classes |
| `children`  | ReactNode | -       | Content to wrap        |

```jsx
import { Container } from "@/components/ui/container"

<Container>
  <h1>Page content</h1>
</Container>

// Custom max-width
<Container className="max-w-4xl">
  <p>Narrower content</p>
</Container>
```

---

#### Section

**File:** `src/components/sections/section.jsx`

Section wrapper with consistent vertical spacing.

| Prop        | Type      | Default | Description            |
| ----------- | --------- | ------- | ---------------------- |
| `className` | string    | -       | Additional CSS classes |
| `children`  | ReactNode | -       | Section content        |

```jsx
import { Section } from "@/components/sections/section";

<Section className="bg-muted">
  <Container>
    <h2>Section Title</h2>
  </Container>
</Section>;
```

---

#### SectionHeading

**File:** `src/components/ui/section-heading.jsx`

Standardized section title with optional description.

| Prop          | Type   | Default | Description            |
| ------------- | ------ | ------- | ---------------------- |
| `title`       | string | -       | Main heading text      |
| `description` | string | -       | Optional subtitle      |
| `className`   | string | -       | Additional CSS classes |

```jsx
import { SectionHeading } from "@/components/ui/section-heading";

<SectionHeading
  title="What's Included"
  description="Everything you get in the pack"
/>;
```

---

### Buttons & Controls

#### Button

**File:** `src/components/ui/button.jsx`

Primary action button with multiple variants. Built on shadcn/ui.

| Prop        | Type    | Default     | Description                                                                        |
| ----------- | ------- | ----------- | ---------------------------------------------------------------------------------- |
| `variant`   | string  | `"default"` | `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link`        |
| `size`      | string  | `"default"` | `default` \| `xs` \| `sm` \| `lg` \| `icon` \| `icon-xs` \| `icon-sm` \| `icon-lg` |
| `asChild`   | boolean | `false`     | Render as child element (for links)                                                |
| `className` | string  | -           | Additional CSS classes                                                             |
| `disabled`  | boolean | `false`     | Disable interactions                                                               |

```jsx
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// As link
<Button asChild>
  <Link to="/pricing">Get the Pack</Link>
</Button>
```

---

#### TextureButton

**File:** `src/components/ui/texture-button.jsx`

Button with papercraft texture styling.

| Prop        | Type      | Default | Description            |
| ----------- | --------- | ------- | ---------------------- |
| `className` | string    | -       | Additional CSS classes |
| `children`  | ReactNode | -       | Button content         |

```jsx
import { TextureButton } from "@/components/ui/texture-button";

<TextureButton>Embossed Button</TextureButton>;
```

---

#### Toggle

**File:** `src/components/ui/toggle.jsx`

Single toggle button. Built on Radix UI.

| Prop              | Type     | Default | Description                 |
| ----------------- | -------- | ------- | --------------------------- |
| `pressed`         | boolean  | -       | Controlled pressed state    |
| `defaultPressed`  | boolean  | `false` | Initial pressed state       |
| `onPressedChange` | function | -       | Callback when state changes |
| `className`       | string   | -       | Additional CSS classes      |

```jsx
import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

<Toggle aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>

// Controlled
const [bold, setBold] = useState(false)
<Toggle pressed={bold} onPressedChange={setBold}>
  <Bold />
</Toggle>
```

---

#### ToggleGroup

**File:** `src/components/ui/toggle-group.jsx`

Group of toggle buttons (single or multiple selection).

| Prop            | Type               | Default    | Description                     |
| --------------- | ------------------ | ---------- | ------------------------------- |
| `type`          | string             | `"single"` | `single` \| `multiple`          |
| `value`         | string \| string[] | -          | Controlled value                |
| `onValueChange` | function           | -          | Callback when selection changes |
| `className`     | string             | -          | Additional CSS classes          |

```jsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

<ToggleGroup type="single" defaultValue="left">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>;
```

---

### Cards

#### Card

**File:** `src/components/ui/card.jsx`

Container with papercraft shadow styling. Multiple variants available.

| Prop        | Type   | Default     | Description                                                     |
| ----------- | ------ | ----------- | --------------------------------------------------------------- |
| `variant`   | string | `"default"` | `default` \| `interactive` \| `notebook` \| `sticky` \| `kraft` |
| `className` | string | -           | Additional CSS classes                                          |

**Variants:**

- `default` - Standard paper card with elevation
- `interactive` - Lifts on hover, clickable feel
- `notebook` - Lined paper with red margin
- `sticky` - Post-it note style
- `kraft` - Brown kraft paper texture

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<Card variant="interactive">
  <CardContent>Hover to lift</CardContent>
</Card>

// Sticky note
<Card variant="sticky">
  <CardContent>Looks like a post-it!</CardContent>
</Card>

// Kraft paper
<Card variant="kraft">
  <CardContent>Brown paper bag feel</CardContent>
</Card>
```

**Sub-components:**

- `CardHeader` - Header wrapper
- `CardTitle` - Main title
- `CardDescription` - Subtitle text
- `CardAction` - Action button slot (top-right)
- `CardContent` - Main content area
- `CardFooter` - Footer with actions

---

#### Card3D

**File:** `src/components/ui/card-3d.jsx`

Card with 3D perspective tilt effect on mouse move.

| Prop        | Type      | Default | Description            |
| ----------- | --------- | ------- | ---------------------- |
| `className` | string    | -       | Additional CSS classes |
| `children`  | ReactNode | -       | Card content           |

```jsx
import { Card3D } from "@/components/ui/card-3d";

<Card3D>
  <img src="/preview.jpg" alt="Preview" />
  <h3>3D Effect</h3>
</Card3D>;
```

---

#### CardStack

**File:** `src/components/ui/card-stack.jsx`

Stacked cards with scroll-triggered animation.

| Prop        | Type   | Default | Description            |
| ----------- | ------ | ------- | ---------------------- |
| `items`     | array  | -       | Array of card objects  |
| `className` | string | -       | Additional CSS classes |

```jsx
import { CardStack } from "@/components/ui/card-stack"

const items = [
  { id: 1, title: "Card 1", content: "First card" },
  { id: 2, title: "Card 2", content: "Second card" },
]

<CardStack items={items} />
```

---

#### ExpandableCard

**File:** `src/components/ui/expandable-card.jsx`

Card with expand/collapse animation.

| Prop          | Type      | Default | Description            |
| ------------- | --------- | ------- | ---------------------- |
| `title`       | string    | -       | Card title             |
| `description` | string    | -       | Preview description    |
| `content`     | ReactNode | -       | Expanded content       |
| `className`   | string    | -       | Additional CSS classes |

```jsx
import { ExpandableCard } from "@/components/ui/expandable-card";

<ExpandableCard
  title="Click to Expand"
  description="Preview text"
  content={<FullContent />}
/>;
```

---

### Form Inputs

#### Input

**File:** `src/components/ui/input.jsx`

Text input field.

| Prop          | Type    | Default  | Description            |
| ------------- | ------- | -------- | ---------------------- |
| `type`        | string  | `"text"` | Input type             |
| `placeholder` | string  | -        | Placeholder text       |
| `disabled`    | boolean | `false`  | Disable input          |
| `className`   | string  | -        | Additional CSS classes |

```jsx
import { Input } from "@/components/ui/input"

<Input placeholder="Enter your email" />
<Input type="password" />
<Input type="file" />
```

---

#### InputOTP

**File:** `src/components/ui/input-otp.jsx`

6-digit one-time password input.

| Prop         | Type     | Default | Description                      |
| ------------ | -------- | ------- | -------------------------------- |
| `value`      | string   | -       | Controlled value                 |
| `onChange`   | function | -       | Callback with new value          |
| `onComplete` | function | -       | Callback when all digits entered |
| `maxLength`  | number   | `6`     | Number of digits                 |

```jsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

<InputOTP maxLength={6} onComplete={(code) => verify(code)}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>;
```

---

#### Checkbox

**File:** `src/components/ui/checkbox.jsx`

Checkbox toggle. Built on Radix UI.

| Prop              | Type     | Default | Description                 |
| ----------------- | -------- | ------- | --------------------------- |
| `checked`         | boolean  | -       | Controlled checked state    |
| `defaultChecked`  | boolean  | `false` | Initial checked state       |
| `onCheckedChange` | function | -       | Callback when state changes |
| `disabled`        | boolean  | `false` | Disable checkbox            |
| `className`       | string   | -       | Additional CSS classes      |

```jsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Controlled
const [checked, setChecked] = useState(false)
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

---

#### RadioGroup

**File:** `src/components/ui/radio-group.jsx`

Radio button group. Built on Radix UI.

| Prop            | Type     | Default | Description                     |
| --------------- | -------- | ------- | ------------------------------- |
| `value`         | string   | -       | Controlled value                |
| `defaultValue`  | string   | -       | Initial value                   |
| `onValueChange` | function | -       | Callback when selection changes |
| `className`     | string   | -       | Additional CSS classes          |

```jsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>;
```

---

#### Switch

**File:** `src/components/ui/switch.jsx`

Toggle switch. Built on Radix UI.

| Prop              | Type     | Default | Description              |
| ----------------- | -------- | ------- | ------------------------ |
| `checked`         | boolean  | -       | Controlled checked state |
| `defaultChecked`  | boolean  | `false` | Initial state            |
| `onCheckedChange` | function | -       | Callback when toggled    |
| `disabled`        | boolean  | `false` | Disable switch           |

```jsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>;
```

---

#### Slider

**File:** `src/components/ui/slider.jsx`

Range slider. Built on Radix UI.

| Prop            | Type     | Default | Description                 |
| --------------- | -------- | ------- | --------------------------- |
| `value`         | number[] | -       | Controlled value            |
| `defaultValue`  | number[] | `[50]`  | Initial value               |
| `onValueChange` | function | -       | Callback when value changes |
| `min`           | number   | `0`     | Minimum value               |
| `max`           | number   | `100`   | Maximum value               |
| `step`          | number   | `1`     | Step increment              |

```jsx
import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />

// Range slider
<Slider defaultValue={[25, 75]} max={100} />
```

---

#### Select

**File:** `src/components/ui/select.jsx`

Dropdown select. Built on Radix UI.

| Prop            | Type     | Default | Description                     |
| --------------- | -------- | ------- | ------------------------------- |
| `value`         | string   | -       | Controlled value                |
| `defaultValue`  | string   | -       | Initial value                   |
| `onValueChange` | function | -       | Callback when selection changes |
| `placeholder`   | string   | -       | Placeholder text                |

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>;
```

---

#### Textarea

**File:** `src/components/ui/textarea.jsx`

Multi-line text input.

| Prop          | Type    | Default | Description            |
| ------------- | ------- | ------- | ---------------------- |
| `placeholder` | string  | -       | Placeholder text       |
| `rows`        | number  | -       | Number of visible rows |
| `disabled`    | boolean | `false` | Disable textarea       |
| `className`   | string  | -       | Additional CSS classes |

```jsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Enter your message" rows={4} />;
```

---

#### Label

**File:** `src/components/ui/label.jsx`

Form label.

| Prop        | Type   | Default | Description            |
| ----------- | ------ | ------- | ---------------------- |
| `htmlFor`   | string | -       | ID of associated input |
| `className` | string | -       | Additional CSS classes |

```jsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>;
```

---

### Navigation

#### NavigationMenu

**File:** `src/components/ui/navigation-menu.jsx`

Desktop navigation menu with dropdowns. Built on Radix UI.

```jsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/feature-1">Feature 1</NavigationMenuLink>
        <NavigationMenuLink href="/feature-2">Feature 2</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>;
```

---

#### Breadcrumb

**File:** `src/components/ui/breadcrumb.jsx`

Breadcrumb navigation trail.

```jsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Preview</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

---

#### Pagination

**File:** `src/components/ui/pagination.jsx`

Page navigation controls.

```jsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>;
```

---

#### FloatingDock

**File:** `src/components/ui/floating-dock.jsx`

Floating action bar (macOS Dock style).

| Prop       | Type   | Default    | Description                              |
| ---------- | ------ | ---------- | ---------------------------------------- |
| `items`    | array  | -          | Array of `{ icon, label, href }` objects |
| `position` | string | `"bottom"` | `top` \| `bottom` \| `left` \| `right`   |

```jsx
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Settings, User } from "lucide-react"

const items = [
  { icon: <Home />, label: "Home", href: "/" },
  { icon: <User />, label: "Profile", href: "/profile" },
  { icon: <Settings />, label: "Settings", href: "/settings" },
]

<FloatingDock items={items} position="bottom" />
```

---

### Dialogs & Overlays

#### Dialog

**File:** `src/components/ui/dialog.jsx`

Modal dialog. Built on Radix UI.

| Prop           | Type     | Default | Description                 |
| -------------- | -------- | ------- | --------------------------- |
| `open`         | boolean  | -       | Controlled open state       |
| `onOpenChange` | function | -       | Callback when state changes |

```jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text</DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here</p>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

---

#### AlertDialog

**File:** `src/components/ui/alert-dialog.jsx`

Confirmation dialog for destructive actions.

```jsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

---

#### Drawer

**File:** `src/components/ui/drawer.jsx`

Slide-out drawer panel. Built on Vaul.

| Prop           | Type     | Default    | Description                            |
| -------------- | -------- | ---------- | -------------------------------------- |
| `open`         | boolean  | -          | Controlled open state                  |
| `onOpenChange` | function | -          | Callback when state changes            |
| `direction`    | string   | `"bottom"` | `top` \| `bottom` \| `left` \| `right` |

```jsx
import { Drawer } from "vaul";

<Drawer.Root direction="right">
  <Drawer.Trigger asChild>
    <Button>Open Menu</Button>
  </Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
    <Drawer.Content className="fixed right-0 top-0 bottom-0 w-[280px] bg-background">
      <p>Drawer content</p>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>;
```

---

#### Sheet

**File:** `src/components/ui/sheet.jsx`

Side sheet overlay (alternative to Drawer).

```jsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description</SheetDescription>
    </SheetHeader>
    <p>Sheet content</p>
  </SheetContent>
</Sheet>;
```

---

#### Popover

**File:** `src/components/ui/popover.jsx`

Floating popover. Built on Radix UI.

```jsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content</p>
  </PopoverContent>
</Popover>;
```

---

#### HoverCard

**File:** `src/components/ui/hover-card.jsx`

Card that appears on hover.

```jsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#">@username</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <Avatar />
    <p>User bio and details</p>
  </HoverCardContent>
</HoverCard>;
```

---

#### Tooltip

**File:** `src/components/ui/tooltip.jsx`

Simple tooltip on hover.

```jsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

---

#### DropdownMenu

**File:** `src/components/ui/dropdown-menu.jsx`

Dropdown menu. Built on Radix UI.

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

---

#### ContextMenu

**File:** `src/components/ui/context-menu.jsx`

Right-click context menu.

```jsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>;
```

---

### Data Display

#### Tabs

**File:** `src/components/ui/tabs.jsx`

Basic tabbed interface. Built on Radix UI.

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>;
```

---

#### DirectionAwareTabs

**File:** `src/components/ui/direction-aware-tabs.jsx`

Tabs with animated sliding indicator. Papercraft styled.

| Prop            | Type     | Default | Description               |
| --------------- | -------- | ------- | ------------------------- |
| `defaultValue`  | string   | -       | Initial tab value         |
| `value`         | string   | -       | Controlled tab value      |
| `onValueChange` | function | -       | Callback when tab changes |

```jsx
import {
  DirectionAwareTabs,
  DirectionAwareTabsList,
  DirectionAwareTabsTrigger,
  DirectionAwareTabsContent,
} from "@/components/ui/direction-aware-tabs"

<DirectionAwareTabs defaultValue="all">
  <DirectionAwareTabsList>
    <DirectionAwareTabsTrigger value="all">All</DirectionAwareTabsTrigger>
    <DirectionAwareTabsTrigger value="scissors">Scissors</DirectionAwareTabsTrigger>
    <DirectionAwareTabsTrigger value="paper">Paper</DirectionAwareTabsTrigger>
  </DirectionAwareTabsList>
  <DirectionAwareTabsContent value="all">
    All items content
  </DirectionAwareTabsContent>
</DirectionAwareTabs>

// Simple API
import { DirectionAwareTabsSimple } from "@/components/ui/direction-aware-tabs"

const tabs = [
  { value: "tab1", label: "Tab 1", content: <Content1 /> },
  { value: "tab2", label: "Tab 2", content: <Content2 /> },
]

<DirectionAwareTabsSimple tabs={tabs} />
```

---

#### Accordion

**File:** `src/components/ui/accordion.jsx`

Expandable accordion. Built on Radix UI.

```jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1?</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2?</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>;
```

---

#### Collapsible

**File:** `src/components/ui/collapsible.jsx`

Single collapsible section.

```jsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Collapsible content</CollapsibleContent>
</Collapsible>;
```

---

#### Table

**File:** `src/components/ui/table.jsx`

Data table components.

```jsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableCaption>A list of items</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>$10</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

---

#### Timeline

**File:** `src/components/ui/timeline.jsx`

Vertical timeline display.

| Prop    | Type  | Default | Description                                     |
| ------- | ----- | ------- | ----------------------------------------------- |
| `items` | array | -       | Array of `{ date, title, description }` objects |

```jsx
import { Timeline } from "@/components/ui/timeline"

const items = [
  { date: "Jan 2024", title: "Launch", description: "Initial release" },
  { date: "Feb 2024", title: "Update", description: "New features" },
]

<Timeline items={items} />
```

---

### Media & Content

#### Carousel

**File:** `src/components/ui/carousel.jsx`

Image/content carousel. Built on Embla.

```jsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>;
```

---

#### AspectRatio

**File:** `src/components/ui/aspect-ratio.jsx`

Container with fixed aspect ratio.

| Prop    | Type   | Default | Description        |
| ------- | ------ | ------- | ------------------ |
| `ratio` | number | `1`     | Width/height ratio |

```jsx
import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <img src="/image.jpg" alt="Image" className="object-cover" />
</AspectRatio>;
```

---

#### ScrollArea

**File:** `src/components/ui/scroll-area.jsx`

Custom scrollbar container. Built on Radix UI.

```jsx
import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-[300px] w-full">
  <div className="p-4">{/* Long content */}</div>
</ScrollArea>;
```

---

#### Avatar

**File:** `src/components/ui/avatar.jsx`

User avatar with fallback. Built on Radix UI.

```jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>;
```

---

#### Skeleton

**File:** `src/components/ui/skeleton.jsx`

Loading placeholder.

```jsx
import { Skeleton } from "@/components/ui/skeleton";

<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>;
```

---

### Text & Typography

#### Badge

**File:** `src/components/ui/badge.jsx`

Small label badge with variants.

| Prop      | Type    | Default     | Description                                                                                       |
| --------- | ------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `variant` | string  | `"default"` | `default` \| `secondary` \| `destructive` \| `outline` \| `ghost` \| `link` \| `sticky` \| `torn` |
| `asChild` | boolean | `false`     | Render as child element                                                                           |

```jsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="sticky">Post-it style</Badge>
```

---

#### NeumorphBadge

**File:** `src/components/ui/neumorph-badge.jsx`

Neumorphic styled badge.

```jsx
import { NeumorphBadge } from "@/components/ui/neumorph-badge";

<NeumorphBadge>Premium</NeumorphBadge>;
```

---

#### SparklesText

**File:** `src/components/ui/sparkles-text.jsx`

Text with animated sparkle effect.

| Prop        | Type   | Default | Description            |
| ----------- | ------ | ------- | ---------------------- |
| `text`      | string | -       | Text to display        |
| `className` | string | -       | Additional CSS classes |

```jsx
import { SparklesText } from "@/components/ui/sparkles-text";

<SparklesText text="Special Offer" />;
```

---

#### Kbd

**File:** `src/components/ui/kbd.jsx`

Keyboard key display.

```jsx
import { Kbd } from "@/components/ui/kbd";

<p>
  Press <Kbd>Cmd</Kbd> + <Kbd>Z</Kbd> to undo
</p>;
```

---

#### Separator

**File:** `src/components/ui/separator.jsx`

Visual divider line.

| Prop          | Type   | Default        | Description                |
| ------------- | ------ | -------------- | -------------------------- |
| `orientation` | string | `"horizontal"` | `horizontal` \| `vertical` |

```jsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" className="h-6" />
```

---

### Status & Feedback

#### Progress

**File:** `src/components/ui/progress.jsx`

Progress bar.

| Prop    | Type   | Default | Description                 |
| ------- | ------ | ------- | --------------------------- |
| `value` | number | `0`     | Progress percentage (0-100) |

```jsx
import { Progress } from "@/components/ui/progress";

<Progress value={60} />;
```

---

#### Spinner

**File:** `src/components/ui/spinner.jsx`

Loading spinner with variants.

| Prop        | Type   | Default     | Description                                       |
| ----------- | ------ | ----------- | ------------------------------------------------- |
| `size`      | string | `"default"` | `xs` \| `sm` \| `default` \| `md` \| `lg` \| `xl` |
| `className` | string | -           | Additional CSS classes                            |

```jsx
import { Spinner } from "@/components/ui/spinner"

<Spinner />
<Spinner size="lg" />
<Spinner size="xs" className="text-primary" />
```

---

#### Alert

**File:** `src/components/ui/alert.jsx`

Alert message box.

| Prop      | Type   | Default     | Description                |
| --------- | ------ | ----------- | -------------------------- |
| `variant` | string | `"default"` | `default` \| `destructive` |

```jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>This is an important message.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

---

#### Sonner (Toast)

**File:** `src/components/ui/sonner.jsx`

Toast notifications. Built on Sonner.

```jsx
import { toast } from "sonner";

// In component
toast("Event has been created");
toast.success("Success!");
toast.error("Error occurred");

// In App.jsx
import { Toaster } from "@/components/ui/sonner";
<Toaster />;
```

---

### Animation Effects

#### AnimatedBeam

**File:** `src/components/ui/animated-beam.jsx`

Animated connecting line between elements.

| Prop       | Type   | Default | Description                  |
| ---------- | ------ | ------- | ---------------------------- |
| `fromRef`  | ref    | -       | Starting element ref         |
| `toRef`    | ref    | -       | Ending element ref           |
| `duration` | number | `3`     | Animation duration (seconds) |
| `delay`    | number | `0`     | Animation delay (seconds)    |

```jsx
import { AnimatedBeam } from "@/components/ui/animated-beam"

const fromRef = useRef(null)
const toRef = useRef(null)

<div ref={fromRef}>Start</div>
<div ref={toRef}>End</div>
<AnimatedBeam fromRef={fromRef} toRef={toRef} duration={5} />
```

---

#### BlurFade

**File:** `src/components/ui/blur-fade.jsx`

Blur + fade entrance animation.

| Prop        | Type   | Default | Description                         |
| ----------- | ------ | ------- | ----------------------------------- |
| `blur`      | string | `"6px"` | Blur amount                         |
| `duration`  | number | `0.4`   | Animation duration                  |
| `delay`     | number | `0`     | Animation delay                     |
| `direction` | string | `"up"`  | `up` \| `down` \| `left` \| `right` |

```jsx
import { BlurFade } from "@/components/ui/blur-fade";

<BlurFade delay={0.1}>
  <h1>Fades in with blur</h1>
</BlurFade>;
```

---

#### Marquee

**File:** `src/components/ui/marquee.jsx`

Scrolling content marquee.

| Prop           | Type    | Default | Description           |
| -------------- | ------- | ------- | --------------------- |
| `speed`        | number  | `20`    | Pixels per second     |
| `gap`          | number  | `16`    | Gap between items     |
| `repeat`       | number  | `4`     | Number of repetitions |
| `pauseOnHover` | boolean | `true`  | Pause on mouse hover  |
| `reverse`      | boolean | `false` | Reverse direction     |

```jsx
import { Marquee } from "@/components/ui/marquee";

<Marquee>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Marquee>;
```

---

#### ParallaxScroll

**File:** `src/components/ui/parallax-scroll.jsx`

Parallax scroll effect.

| Prop     | Type   | Default | Description               |
| -------- | ------ | ------- | ------------------------- |
| `offset` | number | `50`    | Parallax offset amount    |
| `speed`  | number | `0.5`   | Parallax speed multiplier |

```jsx
import { ParallaxScroll } from "@/components/ui/parallax-scroll";

<ParallaxScroll offset={100} speed={0.3}>
  <img src="/background.jpg" />
</ParallaxScroll>;
```

---

#### BentoGrid

**File:** `src/components/ui/bento-grid.jsx`

Masonry-style grid layout.

```jsx
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

<BentoGrid>
  <BentoGridItem title="Item 1" description="Description" />
  <BentoGridItem
    title="Item 2"
    description="Description"
    className="col-span-2"
  />
</BentoGrid>;
```

---

#### Confetti

**File:** `src/components/ui/confetti.jsx`

Confetti burst effect.

| Hook Return         | Type      | Description                   |
| ------------------- | --------- | ----------------------------- |
| `trigger`           | function  | Fire confetti (count: number) |
| `ConfettiComponent` | component | Render in DOM                 |

```jsx
import { useConfetti } from "@/components/ui/confetti";

function Celebration() {
  const { trigger, ConfettiComponent } = useConfetti();

  return (
    <>
      <Button onClick={() => trigger(30)}>Celebrate!</Button>
      <ConfettiComponent />
    </>
  );
}
```

---

### Canvas & Interactive

#### EditableSticker

**File:** `src/components/ui/editable-sticker.jsx`

Transform wrapper with drag, scale, and rotate handles.

| Prop                | Type     | Default      | Description                 |
| ------------------- | -------- | ------------ | --------------------------- |
| `id`                | string   | -            | Unique sticker identifier   |
| `selected`          | boolean  | `false`      | Selection state             |
| `onSelect`          | function | -            | Selection callback          |
| `onTransformChange` | function | -            | Live transform callback     |
| `onTransformEnd`    | function | -            | Transform complete callback |
| `initialScale`      | number   | `1`          | Initial scale               |
| `initialRotation`   | number   | `0`          | Initial rotation (degrees)  |
| `initialPosition`   | object   | `{x:0, y:0}` | Initial position            |
| `flipH`             | boolean  | `false`      | Horizontal flip             |
| `flipV`             | boolean  | `false`      | Vertical flip               |
| `isPopped`          | boolean  | `false`      | Elevated shadow state       |
| `constraintsRef`    | ref      | -            | Drag constraints container  |
| `disabled`          | boolean  | `false`      | Disable interactions        |

```jsx
import { EditableSticker } from "@/components/ui/editable-sticker";

<EditableSticker
  id="sticker-1"
  selected={selectedId === "sticker-1"}
  onSelect={setSelectedId}
  onTransformEnd={handleTransformEnd}
  initialPosition={{ x: 100, y: 50 }}
  initialRotation={-15}
  constraintsRef={canvasRef}
>
  <img src="/sticker.png" alt="Sticker" />
</EditableSticker>;
```

**Features:**

- 4 corner scale handles (aspect ratio locked)
- 1 rotation handle (top center)
- Touch gestures: pinch-to-zoom, two-finger rotate
- Selection ring visual
- Spring animations on release

---

#### StickerToolbar

**File:** `src/components/ui/sticker-toolbar.jsx`

Floating action toolbar for selected stickers.

| Prop             | Type     | Default                   | Description                |
| ---------------- | -------- | ------------------------- | -------------------------- |
| `visible`        | boolean  | `false`                   | Toolbar visibility         |
| `position`       | object   | `{x:0, y:0}`              | Sticker position           |
| `stickerBounds`  | object   | `{width:100, height:100}` | Sticker dimensions         |
| `canvasBounds`   | object   | `{width:800, height:600}` | Canvas dimensions          |
| `onDelete`       | function | -                         | Delete callback            |
| `onDuplicate`    | function | -                         | Duplicate callback         |
| `onFlipH`        | function | -                         | Flip horizontal callback   |
| `onFlipV`        | function | -                         | Flip vertical callback     |
| `onBringForward` | function | -                         | Bring forward callback     |
| `onSendBackward` | function | -                         | Send backward callback     |
| `onToggleShadow` | function | -                         | Toggle pop shadow callback |
| `onConfetti`     | function | -                         | Trigger confetti callback  |
| `isPopped`       | boolean  | `false`                   | Current shadow state       |

```jsx
import { StickerToolbar } from "@/components/ui/sticker-toolbar";

<StickerToolbar
  visible={!!selectedSticker}
  position={toolbarPosition}
  stickerBounds={{ width: 64, height: 64 }}
  canvasBounds={canvasBounds}
  onDelete={handleDelete}
  onDuplicate={handleDuplicate}
  onFlipH={handleFlipH}
  onFlipV={handleFlipV}
  onBringForward={handleBringForward}
  onSendBackward={handleSendBackward}
  onToggleShadow={handleToggleShadow}
  onConfetti={handleConfetti}
  isPopped={selectedSticker?.isPopped}
/>;
```

---

#### PlaygroundCanvas

**File:** `src/components/ui/playground-canvas.jsx`

Complete interactive sticker canvas with tray and controls.

| Prop                  | Type     | Default       | Description                            |
| --------------------- | -------- | ------------- | -------------------------------------- |
| `className`           | string   | -             | Additional CSS classes                 |
| `trayAssets`          | array    | default set   | Assets in drag tray                    |
| `initialCanvasAssets` | array    | default set   | Initial canvas stickers                |
| `variant`             | string   | `"corkboard"` | `corkboard` \| `whiteboard` \| `kraft` |
| `showControls`        | boolean  | `true`        | Show undo/redo/reset                   |
| `onAssetMove`         | function | -             | Callback when asset moves              |
| `onReset`             | function | -             | Callback when canvas reset             |

```jsx
import { PlaygroundCanvas } from "@/components/ui/playground-canvas"

const trayAssets = [
  { id: "scissors", emoji: "✂️", label: "Scissors" },
  { id: "pencil", emoji: "✏️", label: "Pencil" },
]

<PlaygroundCanvas
  trayAssets={trayAssets}
  variant="corkboard"
  showControls
/>
```

---

#### DraggableAsset

**File:** `src/components/ui/draggable-asset.jsx`

Draggable asset component for tray items.

```jsx
import { DraggableAsset } from "@/components/ui/draggable-asset";

<DraggableAsset
  id="asset-1"
  src="/asset.png"
  label="Asset"
  onDragEnd={handleDragEnd}
/>;
```

---

### Theme & Visual

#### PaperFilters

**File:** `src/components/ui/paper-filters.jsx`

SVG filter definitions for paper textures. Add once at app root.

```jsx
import { PaperFilters } from "@/components/ui/paper-filters";

// In App.jsx
function App() {
  return (
    <>
      <PaperFilters />
      {/* rest of app */}
    </>
  );
}
```

---

#### TextureOverlay

**File:** `src/components/ui/texture-overlay.jsx`

Background texture overlay.

| Prop      | Type   | Default   | Description     |
| --------- | ------ | --------- | --------------- |
| `variant` | string | `"paper"` | Texture type    |
| `opacity` | number | `0.5`     | Overlay opacity |

```jsx
import { TextureOverlay } from "@/components/ui/texture-overlay";

<div className="relative">
  <TextureOverlay variant="paper" opacity={0.3} />
  <Content />
</div>;
```

---

#### DotPattern

**File:** `src/components/ui/dot-pattern.jsx`

Dot grid background pattern.

| Prop        | Type   | Default | Description            |
| ----------- | ------ | ------- | ---------------------- |
| `className` | string | -       | Additional CSS classes |

```jsx
import { DotPattern } from "@/components/ui/dot-pattern";

<div className="relative">
  <DotPattern className="opacity-20" />
  <Content />
</div>;
```

---

#### WavyBackground

**File:** `src/components/ui/wavy-background.jsx`

Animated wavy SVG background.

```jsx
import { WavyBackground } from "@/components/ui/wavy-background";

<WavyBackground>
  <Content />
</WavyBackground>;
```

---

#### ShineBorder

**File:** `src/components/ui/shine-border.jsx`

Animated shining border effect.

```jsx
import { ShineBorder } from "@/components/ui/shine-border";

<ShineBorder>
  <Card>Special content</Card>
</ShineBorder>;
```

---

#### SquiggleArrow

**File:** `src/components/ui/squiggle-arrow.jsx`

Hand-drawn squiggly arrow decoration.

| Prop        | Type   | Default   | Description     |
| ----------- | ------ | --------- | --------------- |
| `direction` | string | `"right"` | Arrow direction |

```jsx
import { SquiggleArrow } from "@/components/ui/squiggle-arrow";

<SquiggleArrow direction="down" />;
```

---

#### Spotlight

**File:** `src/components/ui/spotlight.jsx`

Mouse-following spotlight effect.

```jsx
import { Spotlight } from "@/components/ui/spotlight";

<div className="relative">
  <Spotlight />
  <Content />
</div>;
```

---

#### CustomCursor

**File:** `src/components/ui/custom-cursor.jsx`

Custom cursor styling (paper-themed).

```jsx
import { CursorProvider } from "@/components/ui/custom-cursor";

// In App.jsx
<CursorProvider>
  <App />
</CursorProvider>;
```

---

#### ViewToggle

**File:** `src/components/ui/view-toggle.jsx`

Toggle between website and component library views.

```jsx
import { ViewToggle } from "@/components/ui/view-toggle";

<ViewToggle view={view} onToggle={setView} />;
```

---

### Data Visualization

#### NumberTicker

**File:** `src/components/ui/number-ticker.jsx`

Animated counting number.

| Prop            | Type   | Default | Description                  |
| --------------- | ------ | ------- | ---------------------------- |
| `value`         | number | -       | Target value                 |
| `from`          | number | `0`     | Starting value               |
| `duration`      | number | `2`     | Animation duration (seconds) |
| `decimalPlaces` | number | `0`     | Decimal places to show       |

```jsx
import { NumberTicker } from "@/components/ui/number-ticker"

<NumberTicker value={150} />
<NumberTicker value={39.99} decimalPlaces={2} duration={1.5} />
```

---

#### StarRating

**File:** `src/components/ui/star-rating.jsx`

Star rating display/input.

| Prop       | Type     | Default | Description            |
| ---------- | -------- | ------- | ---------------------- |
| `value`    | number   | -       | Current rating         |
| `maxStars` | number   | `5`     | Maximum stars          |
| `readonly` | boolean  | `false` | Disable interaction    |
| `onChange` | function | -       | Rating change callback |

```jsx
import { StarRating } from "@/components/ui/star-rating"

// Display only
<StarRating value={4.5} readonly />

// Interactive
<StarRating value={rating} onChange={setRating} />
```

---

#### Compare

**File:** `src/components/ui/compare.jsx`

Before/after comparison slider.

| Prop     | Type      | Default | Description    |
| -------- | --------- | ------- | -------------- |
| `before` | ReactNode | -       | Before content |
| `after`  | ReactNode | -       | After content  |

```jsx
import { Compare } from "@/components/ui/compare";

<Compare before={<img src="/before.jpg" />} after={<img src="/after.jpg" />} />;
```

---

#### ProductQuiz

**File:** `src/components/ui/product-quiz.jsx`

Interactive product recommendation quiz.

```jsx
import { ProductQuiz } from "@/components/ui/product-quiz";

<ProductQuiz
  questions={questions}
  onComplete={(results) => console.log(results)}
/>;
```

---

### Cart & Commerce

#### StickyCart

**File:** `src/components/ui/sticky-cart.jsx`

Floating cart widget in bottom-right corner.

**No props** - Uses CartContext internally.

```jsx
import { StickyCart } from "@/components/ui/sticky-cart";

// Inside CartProvider
<StickyCart />;
```

**Features:**

- Hidden when empty
- Collapsed: circular button with count + price
- Expanded: item list, totals, checkout button
- Warning when under $6.99 minimum
- ESC key or click outside to close

---

#### AssetCard

**File:** `src/components/ui/asset-card.jsx`

Individual asset display card with selection checkbox.

| Prop         | Type     | Default | Description                                |
| ------------ | -------- | ------- | ------------------------------------------ |
| `asset`      | object   | -       | Asset object `{id, name, category, emoji}` |
| `isSelected` | boolean  | -       | Selection state                            |
| `onToggle`   | function | -       | Toggle callback, receives `assetId`        |

```jsx
import { AssetCard } from "@/components/ui/asset-card";

<AssetCard
  asset={{ id: "scissors-001", name: "Scissors", emoji: "✂️" }}
  isSelected={isItemSelected("scissors-001")}
  onToggle={toggleItem}
/>;
```

**Features:**

- Entire card clickable for selection
- 44px touch target checkbox
- Keyboard accessible (Enter/Space to toggle)
- ARIA attributes for accessibility

---

#### CategoryPackHeader

**File:** `src/components/ui/category-pack-header.jsx`

Category section header with "Add All" toggle.

| Prop                  | Type     | Default | Description                                 |
| --------------------- | -------- | ------- | ------------------------------------------- |
| `category`            | object   | -       | Category object `{id, label, count, emoji}` |
| `isSelected`          | boolean  | -       | All items selected                          |
| `isPartiallySelected` | boolean  | -       | Some items selected                         |
| `onTogglePack`        | function | -       | Toggle callback, receives `categoryId`      |
| `sticky`              | boolean  | `false` | Sticky positioning                          |

```jsx
import { CategoryPackHeader } from "@/components/ui/category-pack-header";

<CategoryPackHeader
  category={{ id: "scissors", label: "Scissors", count: 18, emoji: "✂️" }}
  isSelected={isPackSelected("scissors")}
  isPartiallySelected={isPackPartiallySelected("scissors")}
  onTogglePack={togglePack}
  sticky
/>;
```

**Button states:**

- None selected: "Add All"
- Partial: "Add Rest"
- All selected: "Remove Pack"

---

## Section Components

### Hero

**File:** `src/components/sections/Hero.jsx`

Landing page hero section with PlaygroundCanvas.

```jsx
import Hero from "@/components/sections/Hero";

<Hero />;
```

---

### Nav

**File:** `src/components/sections/Nav.jsx`

Site navigation header with mobile drawer.

```jsx
import Nav from "@/components/sections/Nav";

<Nav />;
```

**Features:**

- Fixed position, transparent until scroll
- Desktop: inline links
- Mobile: Vaul drawer slide-out menu

---

### Footer

**File:** `src/components/sections/Footer.jsx`

Site footer with links and social icons.

```jsx
import Footer from "@/components/sections/Footer";

<Footer />;
```

---

### PreviewHero

**File:** `src/components/sections/PreviewHero.jsx`

Preview page header section.

```jsx
import { PreviewHero } from "@/components/sections/PreviewHero";

<PreviewHero />;
```

---

### PreviewGrid

**File:** `src/components/sections/PreviewGrid.jsx`

Main asset grid with category tabs and pagination.

```jsx
import { PreviewGrid } from "@/components/sections/PreviewGrid";

// Inside CartProvider
<PreviewGrid />;
```

**Features:**

- DirectionAwareTabs for category filtering
- Responsive grid: 2→3→4→6 columns
- 18 items per page with "View More"

---

### FAQ

**File:** `src/components/sections/FAQ.jsx`

FAQ section with notebook paper styling.

```jsx
import FAQ from "@/components/sections/FAQ";

<FAQ />;
```

---

### Pricing

**File:** `src/components/sections/Pricing.jsx`

Pricing cards section.

```jsx
import Pricing from "@/components/sections/Pricing";

<Pricing />;
```

---

### Other Sections

| Component             | File                    | Description                |
| --------------------- | ----------------------- | -------------------------- |
| `AssetGallery`        | AssetGallery.jsx        | Featured asset showcase    |
| `CollectionsShowcase` | CollectionsShowcase.jsx | Themed collections display |
| `WhatsIncluded`       | WhatsIncluded.jsx       | Feature list section       |
| `GetStarted`          | GetStarted.jsx          | Getting started CTA        |
| `FinalCTA`            | FinalCTA.jsx            | Final conversion CTA       |
| `Testimonials`        | Testimonials.jsx        | Customer reviews           |
| `TrustBar`            | TrustBar.jsx            | Trust indicators           |
| `UseCases`            | UseCases.jsx            | Use case examples          |
| `SocialChannelsCTA`   | SocialChannelsCTA.jsx   | Social media links         |
| `stats`               | stats.jsx               | Animated statistics        |

---

## Page Components

### PreviewPage

**File:** `src/components/pages/PreviewPage.jsx`

Complete preview page with cart functionality.

```jsx
import PreviewPage from "@/components/pages/PreviewPage";

// In App.jsx routes
<Route path="/preview" element={<PreviewPage />} />;
```

**Structure:**

```jsx
<CartProvider>
  <Nav />
  <PreviewHero />
  <PreviewGrid />
  <Footer />
  <StickyCart />
</CartProvider>
```

---

### PricingPage

**File:** `src/components/pages/PricingPage.jsx`

Pricing details page.

```jsx
import PricingPage from "@/components/pages/PricingPage";

<Route path="/pricing" element={<PricingPage />} />;
```

---

## Pricing Components

Located in `src/components/pricing/`:

| Component      | Description                  |
| -------------- | ---------------------------- |
| `PricingCard`  | Individual pricing tier card |
| `PriceDisplay` | Formatted price display      |
| `FeatureList`  | Checklist of features        |
| `TrustBadges`  | Trust/security badges        |

---

## Context Providers

### CartContext

**File:** `src/context/CartContext.jsx`

Shopping cart state management.

```jsx
import { CartProvider, useCart } from "@/context/CartContext";

// Wrap components
<CartProvider>
  <PreviewGrid />
  <StickyCart />
</CartProvider>;

// Use in components
function Component() {
  const {
    selectedItems, // Set of selected IDs
    toggleItem, // (assetId) => void
    togglePack, // (categoryId) => void
    isItemSelected, // (assetId) => boolean
    isPackSelected, // (categoryId) => boolean
    isPackPartiallySelected, // (categoryId) => boolean
    clearCart, // () => void
    selectAll, // () => void
    cartTotals, // { itemCount, price, meetsMinimum, amountToMinimum, itemsToMinimum }
    selectedItemsList, // Asset[] (for display)
  } = useCart();
}
```

---

## Custom Hooks

### useCanvasHistory

**File:** `src/hooks/use-canvas-history.js`

Undo/redo state management for sticker playground.

| Parameter      | Type   | Default | Description            |
| -------------- | ------ | ------- | ---------------------- |
| `initialState` | array  | `[]`    | Initial stickers array |
| `maxHistory`   | number | `30`    | Max history states     |

| Return           | Type     | Description         |
| ---------------- | -------- | ------------------- |
| `canvasState`    | array    | Current stickers    |
| `setCanvasState` | function | Direct state update |
| `pushState`      | function | Push to history     |
| `undo`           | function | Undo action         |
| `redo`           | function | Redo action         |
| `canUndo`        | boolean  | Undo available      |
| `canRedo`        | boolean  | Redo available      |
| `clearHistory`   | function | Reset history       |

```jsx
import { useCanvasHistory } from "@/hooks/use-canvas-history";

const { canvasState, pushState, undo, redo, canUndo, canRedo } =
  useCanvasHistory(initialStickers);
```

**Helper functions:**

- `cloneStickerState(stickers)` - Deep clone
- `applyStickerTransform(stickers, id, transform)` - Update sticker
- `deleteSticker(stickers, id)` - Remove sticker
- `duplicateSticker(stickers, id)` - Copy with offset
- `bringForward(stickers, id)` - Move up in z-order
- `sendBackward(stickers, id)` - Move down in z-order

---

### useIsMobile

**File:** `src/hooks/use-mobile.js`

Detect mobile viewport.

```jsx
import { useIsMobile } from "@/hooks/use-mobile";

const isMobile = useIsMobile(); // true if < 768px
```

---

## Data Utilities

### assets.js

**File:** `src/data/assets.js`

Asset data and pricing constants.

```javascript
import {
  assets, // Array of 150 asset objects
  categories, // Array of 9 category objects
  PRICE_PER_ITEM, // 0.26
  TOTAL_PRICE, // 39
  MINIMUM_CART, // 6.99
  getAssetsByCategory, // (categoryId) => Asset[]
  getCategoryById, // (categoryId) => Category
  formatPrice, // (amount) => "$X.XX"
} from "@/data/assets";
```

**Asset shape:**

```javascript
{
  id: "scissors-001",
  name: "Classic Scissors",
  category: "scissors",
  emoji: "✂️"
}
```

**Category shape:**

```javascript
{
  id: "scissors",
  label: "Scissors & Cutting",
  count: 18,
  emoji: "✂️"
}
```

---

## CSS Custom Properties

Used throughout components for consistent styling:

```css
/* Paper elevations */
--paper-elevation-0   /* Flat/pressed */
--paper-elevation-1   /* Default resting */
--paper-elevation-2   /* Hover/lifted */
--paper-elevation-3   /* Modal/floating */

/* Paper colors */
--paper-cream         /* #FFFBF5 */
--paper-kraft         /* Brown kraft */
--paper-white         /* #FEFDFB */

/* Durations */
--paper-duration-instant  /* Very fast */
--paper-duration-fast     /* 150ms */
--paper-duration-normal   /* 250ms */
```

---

## Utility Functions

### cn()

**File:** `src/lib/utils.js`

Merge Tailwind classes with conflict resolution.

```javascript
import { cn } from "@/lib/utils";

<div
  className={cn(
    "base-classes",
    condition && "conditional-class",
    "override-class",
  )}
/>;
```
