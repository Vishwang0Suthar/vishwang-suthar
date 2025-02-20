import React, { useState } from "react";
import Image from "next/image";

interface Metadata {
  ApertureValue?: number;
  ISO?: number;
  ExposureTime?: number;
  Model?: string;
  DateTimeOriginal?: string | Date;
}

interface MetadataInfoProps {
  metadata: Metadata | null;
}

const MetadataInfo: React.FC<MetadataInfoProps> = ({ metadata }) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  const formattedDate = metadata?.DateTimeOriginal
    ? new Date(metadata.DateTimeOriginal).toLocaleDateString()
    : "Unknown";

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
        <div className="rounded-full border-2 aspect-square flex h-6 items-center justify-center border-black">
          <Image
            src={toggleInfo ? "/icons/close.svg" : "/icons/info.svg"}
            className="duration-300"
            alt="toggle-info"
          />
        </div>
      </div>

      <div className="text-xs md:text-base">
        <p>
          Aperture: <span className="italic">f</span>{" "}
          {metadata?.ApertureValue ?? "N/A"}
        </p>
        <p>ISO: {metadata?.ISO ?? "N/A"}</p>
        <p>Shutter-Speed: {metadata?.ExposureTime ?? "N/A"}</p>
        <p>Camera: {metadata?.Model ?? "Unknown"}</p>
        <p>Date: {formattedDate}</p>
      </div>
    </div>
  );
};

export default MetadataInfo;
