"use client";
import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Cursor } from "@/components/Cursor";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { Work } from "@/components/sections/Work";
import { Cases } from "@/components/sections/Cases";
import { Studio } from "@/components/sections/Studio";
import { Principles } from "@/components/sections/Principles";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Cursor />
      <NavBar />
      <main>
        <Hero animate={loaded} />
        <div style={{ padding: "clamp(80px,15vw,120px) 40px" }}>
          <MarqueeSection />
          <Work />
          <Cases />
          <Studio />
          <Principles />
          <Services />
          <Testimonials />
        </div>
        <Footer />
      </main>
    </>
  );
}
