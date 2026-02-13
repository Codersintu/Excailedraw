"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons({ session }: { session: any }) {
  if (session) {
    return (
      <div className="flex gap-6">
        <div className="flex items-center gap-10">
            <Link href="/createRoom">
              <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                Start Drawing
              </button>
            </Link>

            <button onClick={() => signOut()} className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">Log Out</button>
          </div>
        </div>
    );
  }

  return  <button onClick={() => signIn()} className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
              Login / Sign Up
            </button>;
}