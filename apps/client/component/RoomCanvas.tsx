"use client"
import { WS_URL } from "@repo/backend-common/config"
import { useEffect, useState } from "react"
import Canvas from "./Canvas"

function RoomCanvas({roomId}:{roomId:string}) {
  const [socket,setSocket]=useState<WebSocket | null>(null)
  useEffect(()=>{
   const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc2OTUzMjIzMH0.nC633XvQq-8OgZ_EsgexL3ZAWbBxRx7hbqTeH5xYUfM`)
   ws.onopen=()=>{
        setSocket(ws)
        ws.send(JSON.stringify({
            type:"join_room",
            roomId:Number(roomId)
        }))
   }
  },[])
  if (!socket) return "Connecting to ws server..."

  return <Canvas socket={socket} roomId={roomId}/>

}

export default RoomCanvas;