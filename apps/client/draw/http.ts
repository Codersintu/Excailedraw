import { BACKEND_URL } from "@repo/backend-common/config"
import axios from "@/lib/axios" 
import { Shape } from "./game"

export default async function existingCanvasShape(roomId: string): Promise<Shape[]> {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/chat/${roomId}`)

    return response.data.message.map(
      (x: { message: string }) => JSON.parse(x.message).shape
    )

  } catch (err) {
    console.error("Failed to fetch shapes", err)
    return []
  }
}