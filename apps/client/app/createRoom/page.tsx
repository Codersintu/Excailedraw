"use client";

import HeadRoom from "@/component/headRoom";
import RoomForm from "@/component/roomForm";
import { Github, Plus } from "lucide-react";
import { useState } from "react";

export default function CreateRoom() {
  const [show,setShow]=useState(false);


  return (
    <>
    <div className="min-h-screen bg-white flex flex-col relative">
       <HeadRoom/>
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
            
               <div onClick={()=>setShow(!show)} className="flex justify-center items-center gap-3 bg-blue-700 px-20 py-3 rounded-xl text-white font-semibold cursor-pointer">
                <Plus/>
                Create workspace
               </div>
               
          </div>

          <div className="text-xs text-gray-500">
            --------------------------------------------------------------  Need help?  -----------------------------------------------------------------
          </div>
          <div className="">
            <div className="flex justify-center items-center gap-2 text-gray-500">
              <Github className="w-4 h-4"/>
              <p className="text-xs">Report issue on GitHub</p>
            </div>
          </div>
        </div>
       </div>
    </div>
    {show && <RoomForm/>}
    </>
  );
}