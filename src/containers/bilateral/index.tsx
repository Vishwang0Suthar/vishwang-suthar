"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Link from "next/link";
import CursorFollower from "@/components/customCursor";
import Image from "next/image";

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
    <div className="flex  h-screen">
      {/* <CursorFollower /> */}
      {/* Left Side with First Animated Text */}
      <Link
        className="flex-1 grid place-content-center group relative bg-white "
        href="/catalogue"
      >
        <Image
          height={100}
          alt="arrow"
          width={100}
          className="h-7  rotate-90 group-hover:opacity-100 opacity-0 duration-500 translate-y-10 group-hover:translate-y-0 absolute top-8 right-0  aspect-square "
          src="/icons/arrow.svg"
        />
        <div className=" text-black ">
          <p ref={textRef1} className="text-4xl font-bold"></p>
        </div>
      </Link>

      {/* Right Side with Second Animated Text */}
      <Link
        className="flex-1 bg-black grid place-content-center group relative"
        href="/projects"
      >
        <>
          <Image
            height={100}
            alt="arrow"
            width={100}
            className="h-7 invert rotate-90 group-hover:opacity-100 opacity-0 duration-500 translate-y-10 group-hover:translate-y-0 absolute top-8 right-0  aspect-square "
            src="/icons/arrow.svg"
          />
          <div className=" text-white">
            <p ref={textRef2} className="text-4xl font-bold"></p>
          </div>
        </>
      </Link>
    </div>
  );
};

export default Bilat;
