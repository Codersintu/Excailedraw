
import { Bottom } from "@/component/Bottom";
import Feature from "@/component/Feature";
import Header from "@/component/Header";
import Hero from "@/component/Hero";
import { Showcase } from "@/component/Showcase";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero/>
      <Feature/>
      <Showcase/>
      <Bottom/>
    </div>
  );
}
