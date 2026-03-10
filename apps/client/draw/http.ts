import { BACKEND_URL } from "@repo/backend-common/config"
import { Shape } from "./game"
import axios from "axios"
import { getSession } from "next-auth/react"

export default async function existingCanvasShape(roomId: string): Promise<Shape[]> {
  try {
    const session=await getSession()
    const response = await axios.get(`${BACKEND_URL}/api/v1/chat/${roomId}`,{
      headers:{
        Authorization:`${session?.accessToken}`
      }
    })

    return response.data.message.map(
      (x: { message: string }) => JSON.parse(x.message).shape
    )

  } catch (err) {
    console.error("Failed to fetch shapes", err)
    return []
  }
}