
import { BACKEND_URL } from "@repo/backend-common/config";
import { RoomProp } from "@repo/common/type";
import axios from "axios";
import { getSession } from "next-auth/react";
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const getRooms=async()=>{
    const session=await getSession()
      const res=await axios.get(`${BACKEND_URL}/api/v1/room`,{
      headers:{
        Authorization:`${session?.accessToken}`
      }
      });

      return res.data.rooms;
}