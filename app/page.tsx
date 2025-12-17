"use client";

import NavBar from "@/components/Layout/NavBar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import LoveLetter from "@/components/LoveLetter";
import FinalSurprise from "@/components/FinalSurprise";

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <Hero />
      <Timeline />
      <LoveLetter />
      <FinalSurprise />
    </main>
  );
}
