import { Pencil } from "lucide-react";
import Link from "next/link";

export default function HeadRoom() {
    return (
         <div className="top-0 fixed left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 ">
            <div className="max-w-7xl mx-auto flex justify-between px-6 py-4">
                   <Link href={"/"}>
                    <Pencil  className="w-10 h-10 text-blue-800"/>
                    </Link>
                    <p className="text-2xl font-bold  text-blue-500">WELCOME 🙏</p>
            </div>
         </div>
    );
}