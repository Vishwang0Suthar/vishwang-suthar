import Link from "next/link";
import React from "react";
import Volume from "@/public/icons/volume.svg";
import Sun from "@/public/icons/sun.svg";
import Image from "next/image";

const navItems = [
  { href: "/catalogue", label: "Catalogue" },

  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

const Header = () => {
  return (
    <header className="border-t-2 z-50 bg-white border-b-2 sticky border-black w-full top-0 mt-2  h-16 ">
      <div className="flex justify-between border-r-2 border-l-2 border-black items-center divide-x-2  divide-black  h-full">
        <div className="aspect-square  flex items-center h-full justify-center ">
          <Image src={Volume} alt="Volume Icon" className="h-8 w-8" />
        </div>
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex-1 h-full   cursor-pointer  duration-300 hover:bg-black group"
          >
            <Link href={item.href} className="h-full grid items-center w-full">
              <p className="text-lg lg:text-2xl text-center  text-black group-hover:text-white">
                {item.label}
              </p>
            </Link>
          </div>
        ))}
        <div className="aspect-square flex items-center h-full justify-center ">
          <Image src={Sun} alt="Sun Icon" className="h-8 w-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
