import React from "react";
import Image from "next/image";
import { Catalogue } from "@/lib/constData";

interface ThumbnailPreviewProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <div className="flex gap-2 my-4 duration-300 items-center justify-center relative">
      <div className="absolute border-2 md:w-16 md:h-16 w-12 h-12 border-white"></div>
      {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
        const previewIndex =
          (selectedIndex + offset + Catalogue.length) % Catalogue.length;
        return (
          <Image
            key={previewIndex}
            src={Catalogue[previewIndex].imgUrl}
            alt={Catalogue[previewIndex].alt}
            className={`object-cover duration-300  cursor-pointer ${
              offset === 0
                ? "opacity-100 brightness-125 md:w-16 md:h-16 w-12 h-12  p-1"
                : "opacity-50 hover:opacity-100 md:w-14 w-10 md:h-14 h-10"
            }`}
            width={64}
            height={64}
            onClick={() => setSelectedIndex(previewIndex)}
          />
        );
      })}
    </div>
  );
};

export default ThumbnailPreview;
