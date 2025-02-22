"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  videoLink?: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const ListHover: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const breakpoint = 768;
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return (
    <div className="flex flex-col justify-center ">
      {items.map((item, index) => (
        <div
          key={index}
          className={`text-white  relative peer shadow-[0_1px_0_0_#fff] flex items-center md:py-8 py-4 justify-between group transition-all duration-500 ${
            hoveredIndex !== null && hoveredIndex !== index ? "blur-sm" : ""
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <p className="md:text-2xl text-lg">{item.text}</p>
          {/* <div className="flex gap-10 opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 duration-500"> */}
          <div className="flex md:gap-10 gap-0 ">
            {item.videoLink ? (
              <Link href={item.videoLink} target="_blank">
                <Image
                  src="/icons/vid-link.svg"
                  className="text-white md:h-10 h-6"
                  alt="video"
                  width={50}
                  height={50}
                />
              </Link>
            ) : (
              <></>
            )}
            <Link href={item.link} target="_blank">
              <Image
                src="/icons/site.svg"
                className="text-white md:h-10 h-6"
                alt="video"
                width={50}
                height={50}
              />
            </Link>
          </div>
          {!isMobile && (
            <Image
              width={300}
              height={300}
              alt={item.text}
              className="opacity-0 translate-y-2 group-hover:scale-125 bg-white p-2 group-hover:translate-y-0 left-1/2 -translate-x-1/2 z-10 group-hover:opacity-100 duration-500 absolute"
              src={item.image}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ListHover;
