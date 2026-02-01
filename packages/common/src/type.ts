import z from "zod"

export const userSchema=z.object({
    username:z.string().min(3,{message:"name must be 3 letter"}).max(20,{message:"name must be 20 letter"}),
    email:z.string().email({message:"Invalid email format"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"}),
    photo:z.string().optional()
})
export const signInSchema=z.object({
    email:z.string().email({message:"Invalid email format"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"}),
})
export const roomSchema=z.object({
    name:z.string().min(3,{message:"room name must be 3 letter"}).max(10,{message:"room name must be 10 letter"})
})