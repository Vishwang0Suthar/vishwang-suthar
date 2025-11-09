"use client";
import Bilat from "@/containers/bilateral";
import Contact from "@/containers/contact";
import Hero from "@/containers/hero-section";
import Header from "@/containers/Header";
import { useTheme } from "@/components/ThemeContext";
export default function Home() {
  const { isDark } = useTheme();
  return (
    <>
      <div className={`${isDark ? "bg-white" : "bg-black"}`}>
        <Hero />
        {/* <Bilat /> */}
        <Contact />
      </div>
    </>
  );
}
