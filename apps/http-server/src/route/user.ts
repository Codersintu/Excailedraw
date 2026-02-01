import express from "express"
import {signInSchema, userSchema,roomSchema} from "@repo/common/type"
import {client} from "@repo/db/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"
import { userMiddleware } from "../userMiddleware.js"
const router: express.Router = express.Router();


router.post("/register",async(req,res)=>{
    try {
   
    const Parsedata=userSchema.safeParse(req.body)
    if (!Parsedata.success) {
      res.status(400).json({message:Parsedata.error.issues[0]?.message})
      return;
    }
    const {email,username,password,photo}=Parsedata.data;
    const isUserExist=await client.user.findFirst({
        where:{
            email
        }
    })
    if (isUserExist) {
        res.status(400).json({message:"user already exist!"})
        return;
    }
    const passwordHashed=await bcrypt.hash(password,10)

    const newUser=await client.user.create({
        data:{
            email:email,
            username:username,
            password:passwordHashed,
            photo:photo
        }
    })

    if (!newUser) {
        res.status(400).json({message:"creating account failed!"})
        return;
    }

    res.status(201).json({messages:{
        message:"account created successfully😍",
        email:newUser.email,
        username:newUser.username
    }})
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error 🥸"})
    }

})

router.post("/login",async(req,res)=>{
    try {
        const Parsedata=signInSchema.safeParse(req.body);
        if (!Parsedata.success) {
            res.status(400).json({message:Parsedata.error.issues[0]?.message})
            return;
        }
        const {email,password}=Parsedata.data
        const checkExistUser=await client.user.findFirst({where:{email }})
        if (!checkExistUser) {
            res.status(400).json({message:"user does not exist! please do register🙏"})
            return;
        }
        const isMatchpassword=await bcrypt.compare(password,checkExistUser.password)
        if (!isMatchpassword) {
            res.status(400).json({message:"password is wrong!"})
            return;
        }

        const token =jwt.sign({userId:checkExistUser.id},JWT_SECRET)
         return res.status(201).json({
            message: "Login successfully",
            token,
            user: {
                id: checkExistUser.id,
                email: checkExistUser.email,
                username: checkExistUser.username,
                photo: checkExistUser.photo
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
})

router.post("/room",userMiddleware,async(req,res)=>{
    try {
        const adminId=Number(req.userId);
        if (!adminId) {
            res.status(400).json({message:"u are not logged In"})
            return;
        }
        const Parsedata=roomSchema.safeParse(req.body)
        if (!Parsedata.success) {
            res.status(400).json({message:Parsedata.error.issues[0]?.message})
            return;
        }
        const {name}=Parsedata.data;
        const newRoom=await client.room.create({
            data:{
                slug:name,
                adminId
            }
        })

        return res.status(201).json({
            message:"Newroom created successfully!",
            room:{
                roomName:newRoom.slug
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
})

router.get("/chat/:roomId",userMiddleware,async(req,res)=>{
    try {
        const roomId=Number(req.params.roomId);
        const userId=Number(req.userId)
        const message=await client.chat.findMany({
            where:{
                roomId,
                userId
            },
            orderBy:{
                id:"desc"
            },
            take:1000
        })

        return res.status(201).json({message})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
})

router.get("/room/:slug",userMiddleware,async(req,res)=>{
    const slug=req.params.slug;
    const room=await client.room.findFirst({
        where:{
            slug
        }
    })

    return res.json({room})
})



export default router;