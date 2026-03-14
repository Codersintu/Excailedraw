"use client";

import HeadRoom from "@/component/headRoom";
import RoomForm from "@/component/roomForm";
import { getRooms } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Github, Loader, Plus } from "lucide-react";
import { useState } from "react"
import { RoomProp } from "@repo/common/type"
import { useRouter } from "next/navigation";
export default function CreateRoom() {
  const [show, setShow] = useState(false);
  console.log(show)
  const { data, isLoading } = useQuery<RoomProp[]>({
    queryKey: ["userrooms"],
    queryFn: getRooms
  })

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center ">
        <Loader className="animate-spin w-16 h-16" />
      </div>
    )
  }
  if (!data || data.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-white flex flex-col relative">
          <div className="flex-1 flex justify-center items-center z-0">
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center gap-7 ">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-700">No workspace yet</h1>
                  <p className="text-xl text-gray-600">You haven't created any workspace yet. Let's change that!</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-gray-600">Don't want to create a workspace just yet? You are welcome to use our free open source</p>
                  <p className="text-sm text-gray-600">editor over at excalidraw.com in the meantime.</p>
                </div>

                <div onClick={() => setShow(true)} className="flex justify-center items-center gap-3 bg-blue-700 px-20 py-3 rounded-xl text-white font-semibold cursor-pointer">
                  <Plus />
                  Create workspace
                </div>

              </div>

              <div className="text-xs text-gray-500">
                --------------------------------------------------------------  Need help?  -----------------------------------------------------------------
              </div>
              <div className="">
                <div className="flex justify-center items-center gap-2 text-gray-500">
                  <Github className="w-4 h-4" />
                  <p className="text-xs">Report issue on GitHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {show && <RoomForm setShow={setShow} />}
      </>
    );
  }


  return <RoomName roomName={data} show={show} setShow={setShow} />

}




function RoomName({ roomName, setShow, show }: { roomName: RoomProp[], setShow: any, show: any }) {
  const router = useRouter();
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="relative w-full min-h-screen inset-0 bg-linear-to-r from-[#2D3844] via-[#62240C] to-[#62240C]">
          <div className="relative w-full min-h-screen inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)
          `, backgroundSize: "60px 60px",
          }}>
           <HeadRoom setShow={setShow} />
          <div className="max-w-6xl mx-auto py-28">
            <div className="flex flex-col items-start px-4">
              <h1 className="text-3xl font-bold text-teal-600">EXPLORE CANVAS ROOM </h1>
              <p className="text-xs font-semibold text-gray-400">Draw Innovative Idea into practical</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 p-5">
              {roomName.map((r) => (

                <div onClick={() => router.push(`canvas/${r.id}`)} key={r.id} className="w-full max-w-xl bg-teal-600 shadow-2xl rounded-2xl p-5 cursor-pointer">
                  <h1 className="text-xl text-white font-bold">{r.slug} ➡️</h1>
                  <span className="text-xs text-gray-600">Click to start Draw</span>
                </div>
              ))}


            </div>
          </div>
        </div>
        </div>
      </div>
      {show && <RoomForm setShow={setShow} />}
    </>
  )
}