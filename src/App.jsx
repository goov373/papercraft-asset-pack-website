import { PaperFilters } from '@/components/ui/paper-filters'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* SVG filter definitions for papercraft effects */}
      <PaperFilters />
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-900">Papercraft Assets</div>
          <div className="hidden md:flex space-x-8">
            <a href="#packs" className="text-amber-700 hover:text-amber-900 transition">Asset Packs</a>
            <a href="#gallery" className="text-amber-700 hover:text-amber-900 transition">Gallery</a>
            <a href="#about" className="text-amber-700 hover:text-amber-900 transition">About</a>
          </div>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Download
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            Beautiful Papercraft
            <span className="text-orange-600"> Asset Packs</span>
          </h1>
          <p className="text-xl text-amber-700 mb-10">
            High-quality papercraft textures, patterns, and design elements
            for your creative projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition">
              Browse Packs
            </button>
            <button className="border border-amber-400 hover:border-amber-500 text-amber-800 px-8 py-3 rounded-lg font-medium text-lg transition">
              View Gallery
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
