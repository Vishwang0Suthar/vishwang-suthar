import React, { useState } from "react";
import Image from "next/image";
import info from "@/public/icons/info.svg";
import close from "@/public/icons/close.svg";

interface MetadataInfoProps {
  metadata: any;
}

const MetadataInfo: React.FC<MetadataInfoProps> = ({ metadata }) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  return (
    <div
      className={`bg-white absolute z-10 flex gap-4 items-center duration-300 text-left min-w-[23rem] text-black p-4 pr-24 top-3/4 -right-24 lg:-right-10 rounded-md mt-4 ${
        toggleInfo ? "translate-x-10 " : "translate-x-[60%] lg:translate-x-3/4"
      }`}
    >
      <div
        className="min-h-20 items-center flex cursor-pointer"
        onClick={() => setToggleInfo(!toggleInfo)}
      >
        <div className="rounded-full border-2 aspect-square flex h-6 items-center justify-center  border-black">
          <Image
            src={toggleInfo ? close : info}
            //   className={` duration-300 ${toggleInfo ? "rotatSe-0 " : "rotate-0"}`}
            className="duration-300 "
            alt="toggle-info"
          />
        </div>
      </div>

      {/* {toggleInfo && ( */}
      <div className="text-xs md:text-base">
        <p>
          Aperture: <span className="italic">f</span>{" "}
          {metadata.ApertureValue || "N/A"}
        </p>
        <p>ISO: {metadata.ISO || "N/A"}</p>
        <p>Shutter-Speed: {metadata.ExposureTime || "N/A"}</p>
        <p>Camera: {metadata.Model || "Unknown"}</p>
      </div>
      {/* )} */}
    </div>
  );
};

export default MetadataInfo;
