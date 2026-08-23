"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeContext";

const navItems = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mute, setMute] = useState(false);
  const toggleMute = () => {
    setMute((prev) => !prev);
  };

  return (
    <header
      className={`flex w-full top-0 z-50 sticky  backdrop-blur-sm flex-col `}
    >
      <div className="w-full h-2 bg-transparent"></div>
      <div
        className={`border-t-2 shadow-sm   ${
          isDark
            ? "bg-white text-black border-black"
            : "bg-black text-white border-white"
        } border-b-2   w-full  mt-2  h-16 `}
      >
        <div
          className={`flex justify-between border-r-2 border-l-2 ${
            isDark ? "border-black divide-black" : "border-white divide-white"
          } items-center divide-x-2    h-full`}
        >
          <div
            onClick={toggleMute}
            className="aspect-square cursor-pointer flex items-center h-full justify-center "
          >
            {mute ? (
              <Image
                src="/icons/volume.svg"
                alt="Volume Icon"
                className={`${
                  isDark ? "invert-0" : "invert"
                } invert h-7 w-7 lg:h-8 lg:w-8 volume`}
                width="100"
                height="100"
              />
            ) : (
              <Image
                src="/icons/volume-mute.svg"
                alt="Volume mute Icon"
                className={`${isDark ? "invert-0" : "invert"} invert h-7 w-7 lg:h-8 lg:w-8 volume-mute`}
                width="100"
                height="100"
              />
            )}
          </div>
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex-1 h-full cursor-pointer relative duration-300 overflow-hidden  group"
            >
              <Link
                href={item.href}
                className="h-full grid items-center w-full"
              >
                <div className="absolute h-full w-full filter group-hover:-translate-y-[0] invert duration-300 mix-blend-difference bg-black translate-y-[100%] "></div>
                <p className="text-base lg:text-2xl text-center  ">
                  {item.label}
                </p>{" "}
              </Link>
            </div>
          ))}

          <div
            className="aspect-square cursor-pointer flex items-center h-full justify-center "
            onClick={toggleTheme}
          >
            {isDark ? (
              <Image
                src="/icons/sun-toggle.svg"
                alt="Sun Icon"
                className="sun h-7 w-7 lg:h-8 lg:w-8"
                width="100"
                height="100"
              />
            ) : (
              <Image
                src="/icons/moon-toggle.svg"
                alt="Moon Icon"
                className="moon h-7 w-7 invert lg:h-8 lg:w-8"
                width="100"
                height="100"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
