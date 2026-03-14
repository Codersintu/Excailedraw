import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { Pencil } from "lucide-react"
import { getServerSession } from "next-auth";
import AuthButtons from "./AuthButton";
async function Header() {
  const session = await getServerSession(authOptions as any);
  return (
    <header  className="fixed top-4 left-0 right-0 z-50">
      <nav className="max-w-7xl  bg-white/80 backdrop-blur-md border border-gray-200 mx-auto px-6 py-4 flex items-center justify-between rounded-full bg-linear-to-r from-[#465362] via-[#62240C] to-[#526881]">
        <div className="flex items-center gap-2">
          <Pencil className="w-10 h-10 text-[#62240C]" strokeWidth={2.5} />
          <span className="text-3xl font-bold text-[#c5b1a9]">PencilDraw</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-gray-200 transition-colors">
            Features
          </a>
          <a href="#showcase" className="text-gray-400 hover:text-gray-200 transition-colors">
            Showcase
          </a>
          <a href="#github" className="text-gray-400 hover:text-gray-200 transition-colors">
            GitHub
          </a>
        </div>

        <AuthButtons session={session} />

      </nav>
    </header>
  )
}

export default Header