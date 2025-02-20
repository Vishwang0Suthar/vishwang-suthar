import Image, { StaticImageData } from "next/image";
import { Icons } from "@/lib/constData";
// import Arrow from "@/public/icons/arrow.svg";
import React from "react";
import Link from "next/link";

type Props = {
  heading: string;
  title: string;
  body?: string;
  imgURL: StaticImageData;
  deploymentLink: string;
  videoLink?: string;
};

const Projectcard = ({
  heading,
  title,
  // body,
  imgURL,
  deploymentLink,
  videoLink,
}: Props) => {
  return (
    <div className="flex flex-col border-2  border-black ">
      <div className="md:text-lg text-xs flex justify-between title border-b-2 border-black">
        <div className="flex">
          <p> {`//C:`}</p>
          <p className="">{heading}</p>
        </div>
        <div className="flex items-center gap-2 p-1">
          {Icons.map((item, index) => (
            <div
              key={index}
              className="aspect-square h-full grid place-content-center hover:bg-gray-300"
            >
              <Image
                src={item.icon}
                alt={item.alt}
                className="md:h-4 md:w-4 h-2 w-2"
              />
            </div>
          ))}
        </div>
      </div>{" "}
      <div className="body group  p-4 duration-500 overflow-hidden flex relative aspect-video">
        {/* <div className="z-10 group-hover:bg-white duration-500 h-fit">
          <p>Gift Connect </p>
        </div>
        <Image
          src={Gift}
          alt="Project-img"
          className="absolute top-0 left-0 rotate-12 translate-x-20 z-0 translate-y-20 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-500 ease-in-out"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        /> */}
        <div className="z-10 gap-4 flex flex-col  w-full   h-fit">
          <div className="flex justify-between  opacity-0 group-hover:opacity-100 duration-500 translate-y-4 group-hover:translate-y-0">
            <p className=" w-fit font-semibold group-hover:bg-white duration-500">
              {title}{" "}
            </p>
            <div className="p-1 group-hover:bg-white duration-500">
              <Image
                src="/icons/arrow.svg"
                alt="link"
                className="h-4 w-4 rotate-90 "
                height={100}
                width={100}
              />
            </div>
          </div>
          <div className="  flex gap-2 justify-between">
            {videoLink && (
              <Link
                href={videoLink}
                className="flex-1 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className=" w-full relative md:h-28 h-28 flex items-center justify-center   aspect-square group-hover:bg-white opacity-0 text-sm group-hover:opacity-100 duration-300 translate-y-4 group-hover:translate-y-0">
                  <Image
                    src="/icons/vid-link.svg"
                    alt="link to video"
                    height={100}
                    width={100}
                    className=" md:h-16 md:w-16 h-6 w-6"
                  />
                </div>
              </Link>
            )}
            <Link
              href={deploymentLink} // Fallback to "#" if undefined (should never happen)
              className="flex-1 justify-center"
              target="_blank"
              // className=""
              rel="noopener noreferrer"
            >
              <div className="w-full relative md:h-28 h-28 flex items-center justify-center  aspect-square group-hover:bg-white opacity-0 text-sm group-hover:opacity-100 duration-300 translate-y-4 group-hover:translate-y-0">
                <Image
                  src="/icons/site.svg"
                  alt="link to site"
                  className=" md:h-16 md:w-16 h-6 w-6"
                  height={100}
                  width={100}
                />
              </div>
            </Link>
          </div>

          {/* <p className="group-hover:bg-white opacity-0 text-sm group-hover:opacity-100 duration-300 translate-y-4 group-hover:translate-y-0 ">
              {body}
            </p> */}
        </div>
        <Image
          src={imgURL}
          alt="Project-img"
          className="absolute top-0 left-0 group-hover:blur-sm transition-all duration-500 ease-in-out z-0"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>{" "}
    </div>
  );
};

export default Projectcard;
