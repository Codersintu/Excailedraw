import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global{
    namespace Express{
        interface Request{
            userId:string;
        }
    }
}

export const userMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
try {
    const authHeader=req.headers.authorization;
    console.log("authHeader",authHeader)
    if (!authHeader) {
        res.status(401).json({message:"u are not loged In"})
        return;
    }
    const decodes=await jwt.verify(authHeader,JWT_SECRET || "") as {userId:string} | undefined
    console.log(decodes)
    if (!decodes) {
        res.status(401).json({message:"u are  not loged In"})
        return;
    }
    req.userId=decodes.userId;
    console.log("userId",req.userId);
    next()

} catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
}
}