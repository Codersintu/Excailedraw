import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

export default function HeadRoom({setShow}:any) {
    return (
        <div className="top-0 fixed left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 ">
            <div className="max-w-7xl mx-auto flex justify-between px-6 py-4">
                <Link href={"/"}>
                    <Pencil className="w-10 h-10 text-blue-800" />
                </Link>
                <div onClick={() => setShow(true)} className="flex justify-center items-center gap-1 bg-blue-700 px-5 py-3 rounded-xl text-white font-semibold cursor-pointer">
                    <Plus />
                    Create workspace
                </div>
            </div>
        </div>
    );
}