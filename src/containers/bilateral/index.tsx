"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Bilat = () => {
  const [selected, setSelected] = useState<"catalogue" | "projects" | null>(
    null
  );
  const router = useRouter();

  const handleClick = (section: "catalogue" | "projects") => {
    setSelected(section);

    // Delay navigation for animation effect
    setTimeout(() => {
      router.push(section === "catalogue" ? "/catalogue" : "/projects");
    }, 700); // Matches transition duration
  };

  return (
    <div className="flex h-screen w-full transition-all duration-700 ease-in-out">
      {/* Catalogue Section */}
      <div
        onClick={() => handleClick("catalogue")}
        className={`relative py-20  group grid place-content-start cursor-pointer transition-all duration-500 ease-in-out ${
          selected === "catalogue"
            ? "w-full px-container"
            : selected === "projects"
            ? "w-0"
            : "w-1/2 px-container"
        } bg-white overflow-hidden`}
      >
        <Image
          height={100}
          alt="arrow"
          width={100}
          className="h-7 rotate-90 opacity-0 transition-all duration-500 translate-y-10 group-hover:translate-y-0 absolute top-8 right-0 aspect-square"
          src="/icons/arrow.svg"
        />
        <div className="text-black flex gap-4 flex-col">
          <p
            className={` ${
              selected === "projects"
                ? "opacity-0 "
                : selected === "catalogue"
                ? "text-6xl"
                : "text-4xl"
            }  duration-700`}
          >
            Catalogue
          </p>
          {/* <p className="absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 text-8xl duration-300 font-thin place-self-center ">{``}</p> */}
          <Image
            src="/icons/camera.svg"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0  duration-500  place-self-center"
            alt="camera"
            height={140}
            width={140}
          />
        </div>
      </div>

      {/* Projects Section */}
      <div
        onClick={() => handleClick("projects")}
        className={`relative py-20  group grid place-content-start cursor-pointer transition-all duration-500 ease-in-out ${
          selected === "projects"
            ? "w-full px-container"
            : selected === "catalogue"
            ? "w-0"
            : "w-1/2 px-container"
        } bg-black overflow-hidden `}
      >
        <Image
          height={100}
          alt="arrow"
          width={100}
          className="h-7 invert rotate-90 opacity-0 transition-all duration-500 translate-y-10 group-hover:translate-y-0 absolute top-8 right-0 aspect-square"
          src="/icons/arrow.svg"
        />
        <div className="text-white flex gap-4 flex-col">
          <p
            className={` ${
              selected === "projects"
                ? "text-6xl "
                : selected === "catalogue"
                ? "opacity-0"
                : "text-4xl"
            }  duration-700`}
          >
            Projects
          </p>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 text-8xl duration-500 font-thin place-self-center ">{`</>`}</p>
        </div>
      </div>
    </div>
  );
};

export default Bilat;
