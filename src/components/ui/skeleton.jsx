import { cn } from "@/lib/utils"

/**
 * Skeleton - Paper cutout placeholder
 *
 * Papercraft treatment:
 * - Warm amber background like cut paper
 * - Subtle pulse animation
 * - Paper-like rounded corners
 */
function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        // Paper cutout styling
        "bg-amber-200/40 animate-pulse rounded-md",
        // Subtle paper texture hint
        "border border-amber-200/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
