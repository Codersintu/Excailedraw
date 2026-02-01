import { Pencil} from "lucide-react"
import Link from "next/link"
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-b-gray-200">
    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Pencil className="w-8 h-8 text-blue-600" strokeWidth={2.5}/>
        <span className="text-2xl font-bold text-gray-900">Excalidraw</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
         <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#showcase" className="text-gray-600 hover:text-gray-900 transition-colors">
            Showcase
          </a>
          <a href="https://github.com" className="text-gray-600 hover:text-gray-900 transition-colors">
            GitHub
          </a>
        </div>
        <Link href="/canvas/2">
        <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
          Start Drawing
        </button>
        </Link>
    </nav>
    </header>
  )
}

export default Header