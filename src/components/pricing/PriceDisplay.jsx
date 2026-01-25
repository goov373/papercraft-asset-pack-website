function PriceDisplay({
  price = "$39",
  suffix = "one-time",
  size = "large",
  className = ""
}) {
  const sizeClasses = {
    small: "text-4xl sm:text-5xl",
    medium: "text-5xl sm:text-6xl",
    large: "text-7xl sm:text-8xl lg:text-9xl",
  }

  return (
    <div className={className}>
      <span className={`${sizeClasses[size]} font-bold text-amber-900 leading-none`}>
        {price}
      </span>
      {suffix && (
        <span className="text-amber-700/70 ml-2 text-lg">{suffix}</span>
      )}
    </div>
  )
}

export { PriceDisplay }
