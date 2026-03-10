"use client"
import { WS_URL } from "@repo/backend-common/config"
import { useEffect, useState } from "react"
import Canvas from "./Canvas"
import { getSession } from "next-auth/react"

function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  useEffect(() => {
    async function wsconnect() {
      const session = await getSession()
      const ws = new WebSocket(`${WS_URL}?token=${session?.accessToken}`)
      ws.onopen = () => {
        setSocket(ws)
        ws.send(JSON.stringify({
          type: "join_room",
          roomId: Number(roomId)
        }))
      }
    }
    wsconnect()
  }, [])
  if (!socket) return "Connecting to ws server..."

  return <Canvas socket={socket} roomId={roomId} />

}

export default RoomCanvas;