"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Catalogue } from "@/lib/constData";
import exifr from "exifr";

const Collection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  // Function to extract metadata from the selected image
  const extractMetadata = async (index: number) => {
    try {
      const response = await fetch(Catalogue[index].imgUrl.src);
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

  // Open modal and extract metadata for the selected image
  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  // Close modal and reset metadata
  const closeModal = () => {
    setSelectedIndex(null);
    setMetadata(null);
    document.body.style.overflow = "auto";
  };

  // Go to the previous image
  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? Catalogue.length - 1 : prev! - 1
      );
    }
  };

  // Go to the next image
  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === Catalogue.length - 1 ? 0 : prev! + 1
      );
    }
  };

  // Extract metadata whenever selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== null) {
      extractMetadata(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <div className="columns-1 gap-4 auto-rows-auto sm:columns-2 xl:columns-3 2xl:columns-4">
      {Catalogue.map((data, index) => (
        <div
          key={index}
          onClick={() => openModal(index)}
          className="cursor-pointer overflow-hidden"
        >
          <Image
            src={data.imgUrl}
            alt={data.alt}
            className="hover:brightness-110  hover:scale-105 duration-300"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}

      {selectedIndex !== null && (
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

          {/* Preview Thumbnails */}
          <div className="flex gap-2 mb-4 duration-300 items-center">
            {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
              const previewIndex =
                (selectedIndex + offset + Catalogue.length) % Catalogue.length;
              return (
                <Image
                  key={previewIndex}
                  src={Catalogue[previewIndex].imgUrl}
                  alt={Catalogue[previewIndex].alt}
                  className={` object-cover duration-300 ease-in-out cursor-pointer ${
                    offset === 0
                      ? "opacity-100 brightness-125 w-16 h-16 border-2 border-white p-1"
                      : "opacity-50 hover:opacity-100 w-14 h-14"
                  }`}
                  width={64}
                  height={64}
                  onClick={() => setSelectedIndex(previewIndex)}
                />
              );
            })}
          </div>

          <Image
            src={Catalogue[selectedIndex].imgUrl}
            alt={Catalogue[selectedIndex].alt}
            className="md:max-w-[90vw] max-w-[70vw]  flex-1 md:max-h-[80vh] max-h-[70vh] object-contain"
            width={800}
            height={600}
          />

          <button
            onClick={nextImage}
            className="absolute right-5 text-white md:text-4xl text-xl"
          >
            ▶
          </button>

          {metadata && (
            <div className="bg-white absolute flex flex-col md:text-base text-xs gap-2 text-left min-w-[22rem] text-black p-4 pr-24 top-3/4 -right-24 lg:-right-12 rounded-md mt-4 ">
              <p>Aperture: F{metadata.ApertureValue || "N/A"}</p>
              <p>ISO: {metadata.ISO || "N/A"}</p>
              <p>Shutter-Speed: {metadata.ExposureTime || "N/A"}</p>
              {/* <p>Shutter Speed: {metadata.DateTimeOriginal || "N/A"}</p> */}
              <p>Camera: {metadata.Model || "Unknown"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
