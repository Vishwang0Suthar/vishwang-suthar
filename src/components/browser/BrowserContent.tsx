"use client";

import { useEffect } from "react";

type Props = {
  type: "website" | "video";

  url: string;

  reloadKey: number;

  title: string;

  onLoad: () => void;
};

const BrowserProjectContent = ({
  type,
  url,
  reloadKey,
  title,
  onLoad,
}: Props) => {
  useEffect(() => {
    onLoad();
  }, [reloadKey, onLoad]);

  if (!url) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm opacity-60">No content available.</p>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="flex flex-1 items-center justify-center bg-black p-4">
        <video
          key={reloadKey}
          src={url}
          title={title}
          controls
          autoPlay
          className="max-h-full max-w-full"
          onLoadedData={onLoad}
        />
      </div>
    );
  }

  return (
    <div className="relative flex-1 z-0 overflow-hidden bg-white">
      <iframe
        key={reloadKey}
        src={url}
        title={title}
        className="h-full  w-full border-0"
        onLoad={onLoad}
        allow="autoplay; fullscreen"
      />
    </div>
  );
};

export default BrowserProjectContent;
