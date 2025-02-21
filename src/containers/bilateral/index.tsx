"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Bilat = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = "Projects";

    if (textRef.current) {
      textRef.current.innerText = text;
    }

    // Split text into characters
    const split = new SplitType(textRef.current, { types: "chars" });

    // GSAP Animation
    gsap.fromTo(
      split.chars,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%", // Animation triggers when the text enters the viewport
        },
      }
    );
  }, []);
  return (
    <div className="flex  h-screen">
      <div className="flex-1 bg-white hover:cursor-pointer"></div>
      <div className="flex-1  bg-black hover:cursor-pointer grid place-content-center text-white">
        <p ref={textRef} className="text-4xl"></p>
      </div>
    </div>
  );
};

export default Bilat;
