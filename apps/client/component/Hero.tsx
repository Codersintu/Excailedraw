import { ArrowRight } from "lucide-react"
import './index.css'
import Animationbox from "./Animationbox"

function Hero() {
  return (
   <section className="py-30 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* left side */}
            <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
                <span className="px-5 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">Free & Open Source</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-gray-900">
                Draw freely,
                <br />
                <span className="relative text-blue-600">
                     collaborate
                <svg
                  className="absolute -bottom-2 left-0 w-full animate-draw-line"
                  viewBox="0 0 400 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 5 150 2 200 8C250 14 350 18 398 12"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                </span>
                <br />
                seamlessly
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              A virtual whiteboard for sketching hand-drawn like diagrams.
              Collaborative and end-to-end encrypted.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 cursor-pointer text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-xl flex items-center gap-2 group">
                Start Drawing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 cursor-pointer border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all transform hover:scale-105">
               Start Drawing
              </button>
            </div>
            </div>

            {/* right content */}
            <div className="">
              <Animationbox/>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Hero