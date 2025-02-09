"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Catalogue } from "@/lib/constData";
import ImageModal from "@/containers/modal/imagemodal";

const Collection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

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
            className="hover:brightness-110 hover:scale-105 duration-300"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}

      {selectedIndex !== null && (
        <ImageModal
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Collection;
