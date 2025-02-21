"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Bilat = () => {
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const animateText = (
      ref: React.RefObject<HTMLParagraphElement>,
      text: string
    ) => {
      if (!ref.current) return;

      ref.current.innerText = text;

      // Split text into characters
      const split = new SplitType(ref.current as HTMLParagraphElement, {
        types: "chars",
      });

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
            trigger: ref.current,
            start: "top 80%", // Animation triggers when the text enters the viewport
          },
        }
      );
    };

    // Animate both text elements
    if (textRef1.current) animateText(textRef1, "Catalogue");
    if (textRef2.current) animateText(textRef2, "Projects");
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Side with First Animated Text */}
      <div className="flex-1 bg-white hover:cursor-pointer grid place-content-center">
        <p ref={textRef1} className="text-4xl font-bold"></p>
      </div>

      {/* Right Side with Second Animated Text */}
      <div className="flex-1 bg-black hover:cursor-pointer grid place-content-center text-white">
        <p ref={textRef2} className="text-4xl font-bold"></p>
      </div>
    </div>
  );
};

export default Bilat;
