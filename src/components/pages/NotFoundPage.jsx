import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { HomeIcon, ArrowLeftIcon } from 'lucide-react'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="text-center px-6">
        {/* Paper-style 404 card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-12 shadow-paper-2 border border-border max-w-md mx-auto">
          {/* Large 404 number with papercraft styling */}
          <h1 className="text-8xl font-bold text-foreground/20 select-none">
            404
          </h1>

          <h2 className="text-2xl font-semibold text-foreground mt-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mt-3 text-base">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button asChild variant="default" size="lg">
              <Link to="/">
                <HomeIcon className="size-4 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/library">
                <ArrowLeftIcon className="size-4 mr-2" />
                View Components
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
