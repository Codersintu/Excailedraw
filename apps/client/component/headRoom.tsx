import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

export default function HeadRoom({setShow}:any) {
    return (
        <div className="max-w-6xl mx-auto top-4 fixed left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border border-gray-400  bg-linear-to-r from-[#465362] via-[#62240C] to-[#526881] rounded-full">
            <div className="max-w-7xl mx-auto flex justify-between px-6 py-3">
                <Link href={"/"}>
                    <Pencil className="w-10 h-10 text-[#62240C]" />
                </Link>
                <div onClick={() => setShow(true)} className="flex justify-center items-center gap-1 bg-blue-700 px-5 py-3 rounded-xl text-white font-semibold cursor-pointer">
                    <Plus />
                    Create workspace
                </div>
            </div>
        </div>
    );
}