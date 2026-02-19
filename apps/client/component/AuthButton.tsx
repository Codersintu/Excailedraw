"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "@/lib/axios"
import { BACKEND_URL } from "@repo/backend-common/config";

export default function AuthButtons({ session }: { session: any }) {
  const handleLogOut=async()=>{
    try {
      await axios.post(`${BACKEND_URL}/api/v1/logout`);

      await signOut({
        redirect:true,
        callbackUrl:"/"
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (session) {
    return (
      <div className="flex gap-6">
        <div className="flex items-center gap-10">
            <Link href="/createRoom">
              <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                Start Drawing
              </button>
            </Link>

            <button onClick={handleLogOut} className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">Log Out</button>
          </div>
        </div>
    );
  }

  return  <button onClick={() => signIn()} className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
              Login / Sign Up
            </button>;
}