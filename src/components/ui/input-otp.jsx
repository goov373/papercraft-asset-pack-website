import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * InputOTP - Separated paper input squares
 *
 * Papercraft treatment:
 * - Each slot is a small paper square/card
 * - Active slot lifts slightly with focus ring
 * - Slots have subtle paper elevation
 * - Warm amber tones throughout
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props} />
  );
}

function InputOTPGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props} />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base paper square styling
        "relative flex h-10 w-10 items-center justify-center text-sm font-medium",
        "rounded-md",
        // Paper background and border
        "bg-amber-50 border border-amber-200/60",
        "text-amber-900",
        // Paper elevation
        "[box-shadow:var(--paper-elevation-1)]",
        // Hover state - subtle lift
        "hover:bg-amber-100/50 hover:border-amber-300/60",
        // Active state - paper lift
        "data-[active=true]:border-amber-400",
        "data-[active=true]:-translate-y-0.5",
        "data-[active=true]:[box-shadow:var(--paper-elevation-2)]",
        "data-[active=true]:ring-2 data-[active=true]:ring-amber-400/30",
        "data-[active=true]:z-10",
        // Invalid state
        "aria-invalid:border-red-400",
        "data-[active=true]:aria-invalid:border-red-500",
        "data-[active=true]:aria-invalid:ring-red-400/30",
        // Transition
        "transition-all duration-150 ease-out",
        "outline-none",
        className
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-amber-600 h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  ...props
}) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="text-amber-400"
      {...props}>
      <MinusIcon className="size-4" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
