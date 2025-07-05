import Bilat from "@/containers/bilateral";
import Contact from "@/containers/contact";
import Hero from "@/containers/hero-section";

export default function Home() {
  return (
    <>
      <div className="h-auto py-1 flex items-center w-full bg-black ">
        <marquee className="text-white ">bruh</marquee>
      </div>
      <Hero />
      <Bilat />
      {/* <Contact /> */}
    </>
  );
}
