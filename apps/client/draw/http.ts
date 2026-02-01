import { BACKEND_URL } from "@repo/backend-common/config"
import axios from "axios"
import { Shape } from "./game"

export default async function existingCanvasShape(roomId: string): Promise<Shape[]> {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/chat/${roomId}`,
      {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc2OTUzMjIzMH0.nC633XvQq-8OgZ_EsgexL3ZAWbBxRx7hbqTeH5xYUfM"
        }
      }
    )

    return response.data.message.map(
      (x: { message: string }) => JSON.parse(x.message).shape
    )

  } catch (err) {
    console.error("Failed to fetch shapes", err)
    return []
  }
}