import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import cors from "cors"
import authRouter from "./route/user.js"
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/api/v1", authRouter)

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message:err.message || "Internal Server Error"
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
