import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Catalogue } from "@/lib/constData";
import exifr from "exifr";
import MetadataInfo from "@/components/metadata";
import ThumbnailPreview from "@/components/previmages";

interface ImageModalProps {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  closeModal: () => void;
}

interface Metadata {
  ApertureValue?: number;
  ISO?: number;
  ExposureTime?: number;
  Model?: string;
  DateTimeOriginal?: string | Date;
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedIndex,
  setSelectedIndex,
  closeModal,
}) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    const extractMetadata = async () => {
      try {
        const response = await fetch(Catalogue[selectedIndex].imgUrl.src);
        const arrayBuffer = await response.arrayBuffer();
        const exifData = await exifr.parse(arrayBuffer);

        if (exifData?.ExposureTime) {
          exifData.ExposureTime = parseFloat(exifData.ExposureTime.toFixed(5));
        }

        setMetadata(exifData);
      } catch (error) {
        console.error("Error extracting metadata:", error);
        setMetadata(null);
      }
    };

    extractMetadata();
  }, [selectedIndex]);

  const prevImage = () => {
    setSelectedIndex((prev: number | null) => {
      // Since we're in the modal, we know prev won't be null here,
      // but TypeScript doesn't know that, so we need to handle it
      const currentIndex = prev === null ? 0 : prev;
      return currentIndex === 0 ? Catalogue.length - 1 : currentIndex - 1;
    });
  };

  const nextImage = () => {
    setSelectedIndex((prev: number | null) => {
      // Since we're in the modal, we know prev won't be null here,
      // but TypeScript doesn't know that, so we need to handle it
      const currentIndex = prev === null ? 0 : prev;
      return currentIndex === Catalogue.length - 1 ? 0 : currentIndex + 1;
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-80 z-50">
      <button
        className="absolute top-5 right-5 text-white text-xl md:text-3xl"
        onClick={closeModal}
      >
        ✕
      </button>
      <button
        onClick={prevImage}
        className="absolute left-5 text-white md:text-4xl text-xl"
      >
        ◀
      </button>

      <ThumbnailPreview
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      {/* <div className="bg-white flex items-center  justify-center  p-4 pb-12 md:pb-24"> */}
      <Image
        src={Catalogue[selectedIndex].imgUrl}
        alt={Catalogue[selectedIndex].alt}
        className="md:max-w-[90vw] max-w-[70vw] w-fit md:min-h-[80vh] min-h-[70vh] object-contain"
        width={720}
        height={560}
      />
      {/* </div> */}

      <button
        onClick={nextImage}
        className="absolute right-5 text-white md:text-4xl text-xl"
      >
        ▶
      </button>

      {metadata &&
        (metadata.ApertureValue ||
          metadata.ISO ||
          metadata.ExposureTime ||
          metadata.Model) && <MetadataInfo metadata={metadata} />}
    </div>
  );
};

export default ImageModal;
