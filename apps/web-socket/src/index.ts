import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8081 })
interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}
const users: User[] = []
async function checkUser(token: string) {
    try {
        const decode = await jwt.verify(token, JWT_SECRET) as { userId: string }
        console.log(decode.userId)
        return decode.userId;

    } catch (error) {
        return null
    }

}
wss.on("connection", async function connection(ws, request) {
    const url = request?.url;
    if (!url) {
        ws.close()
        return;
    };
    const queryParams = new URLSearchParams(url.split("?")[1])
    const token = queryParams.get("token")
    if (!token) {
        ws.close()
        return;
    }
    const userId = await checkUser(token)
    if (!userId) {
        ws.close()
        return;
    }

    users.push({ userId, ws, rooms: [] })

    ws.on("message", async function message(data) {
        const Parsedata = JSON.parse(data as unknown as string)
        if (Parsedata.type === "join_room") {
            const user = users.find(x => x.ws == ws)
            user?.rooms.push(Parsedata.roomId)
        }

        if (Parsedata.type == "leave_room") {
            const user = users.find(x => x.ws == ws)
            if (!user) return;
            user.rooms = user.rooms.filter(x => x != Parsedata.roomId)
        }

        if (Parsedata.type === "chat") {
            const roomId = Parsedata.roomId
            const message = Parsedata.message;
            await client.chat.create({
                data: {
                    message,
                    roomId,
                    userId: Number(userId)
                }
            })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message,
                        roomId
                    }))
                }
            })
        }
    })
})