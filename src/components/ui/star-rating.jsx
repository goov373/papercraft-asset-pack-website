import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

function StarRating({
  rating = 5,
  max = 5,
  size = "default",
  className,
  ...props
}) {
  const sizes = {
    sm: "size-3",
    default: "size-4",
    lg: "size-5",
  }

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of ${max} stars`}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizes[size],
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  )
}

export { StarRating }
