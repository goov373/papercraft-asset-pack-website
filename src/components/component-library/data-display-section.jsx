import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/ui/star-rating"

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

function DataDisplaySection() {
  return (
    <div>
      <ComponentShowcase
        title="Avatar"
        description="Display user profile images with fallback initials. Commonly used in testimonials and user interfaces."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">With Image</h4>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">shadcn</p>
                <p className="text-sm text-muted-foreground">@shadcn</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Fallback Initials</h4>
            <p className="text-sm text-amber-600 mb-3">When no image is available, shows initials.</p>
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-accent text-accent-foreground">MJ</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-destructive/10 text-destructive">ER</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Different Sizes</h4>
            <div className="flex items-end gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="size-10">
                <AvatarFallback className="text-sm">MD</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Avatar className="size-16">
                <AvatarFallback className="text-lg">XL</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Avatar Group</h4>
            <p className="text-sm text-amber-600 mb-3">Overlapping avatars for showing multiple users.</p>
            <div className="flex -space-x-3">
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-secondary text-secondary-foreground">B</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-accent text-accent-foreground">C</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="bg-muted text-muted-foreground">+5</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">In Testimonial Card</h4>
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border max-w-sm">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Graphic Designer</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Star Rating"
        description="Display ratings using filled and unfilled stars. Used in testimonials and product reviews."
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Full Ratings</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span className="text-sm text-muted-foreground">5 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={4} />
                <span className="text-sm text-muted-foreground">4 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={3} />
                <span className="text-sm text-muted-foreground">3 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={2} />
                <span className="text-sm text-muted-foreground">2 stars</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={1} />
                <span className="text-sm text-muted-foreground">1 star</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">Different Sizes</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <StarRating rating={5} className="[&>svg]:size-3" />
                <span className="text-sm text-muted-foreground">Small</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={5} className="[&>svg]:size-6" />
                <span className="text-sm text-muted-foreground">Large</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-3">In Context</h4>
            <div className="p-4 bg-card rounded-lg border border-border max-w-md">
              <StarRating rating={5} className="mb-3" />
              <blockquote className="text-foreground mb-4">
                "These papercraft assets saved me hours of work. The quality is incredible!"
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">Graphic Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

export { DataDisplaySection }
