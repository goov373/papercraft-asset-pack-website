import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import {
  Calculator,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  User,
  Smile,
  FileText,
  Music,
  Image,
} from "lucide-react"

function SpecializedInputsSection() {
  const [date, setDate] = useState(new Date())
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 0, 25)
  })
  const [otpValue, setOtpValue] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Specialized Inputs</h2>
        <p className="text-muted-foreground mb-6">
          Complex input patterns for specific use cases, styled with papercraft aesthetics.
        </p>
      </div>

      {/* Command */}
      <Card>
        <CardHeader>
          <CardTitle>Command</CardTitle>
          <CardDescription>
            Paper search slip with stacked results. Used for command palettes and search interfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md">
            <Command className="rounded-lg border">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>
            Desk calendar paper style with day cells that lift on hover.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8">
            {/* Single Date */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Single Date</p>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
              {date && (
                <p className="text-sm text-muted-foreground">
                  Selected: {date.toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Date Range</p>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
              />
              {dateRange?.from && dateRange?.to && (
                <p className="text-sm text-muted-foreground">
                  Range: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input OTP */}
      <Card>
        <CardHeader>
          <CardTitle>Input OTP</CardTitle>
          <CardDescription>
            Separated paper input squares for verification codes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Standard OTP */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">6-digit Code</p>
            <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
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
            </InputOTP>
            {otpValue && (
              <p className="text-sm text-muted-foreground">
                Value: {otpValue}
              </p>
            )}
          </div>

          {/* Continuous OTP */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">4-digit PIN</p>
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
      </Card>

      {/* Carousel */}
      <Card>
        <CardHeader>
          <CardTitle>Carousel</CardTitle>
          <CardDescription>
            Paper card slider with navigation buttons that lift on hover.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Basic Carousel */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Basic Carousel</p>
              <div className="px-14">
                <Carousel className="w-full max-w-sm">
                  <CarouselContent>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <CarouselItem key={index}>
                        <div className="p-6">
                          <div className="flex aspect-square items-center justify-center">
                            <span className="text-4xl font-semibold text-muted-foreground">{index}</span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            {/* Content Carousel */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Content Cards</p>
              <div className="px-14">
                <Carousel className="w-full max-w-lg">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <FileText className="size-10 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium text-foreground">Documents</h4>
                            <p className="text-sm text-muted-foreground">Manage your files</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <Image className="size-10 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium text-foreground">Images</h4>
                            <p className="text-sm text-muted-foreground">View your gallery</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <Music className="size-10 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium text-foreground">Music</h4>
                            <p className="text-sm text-muted-foreground">Play your tracks</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { SpecializedInputsSection }
