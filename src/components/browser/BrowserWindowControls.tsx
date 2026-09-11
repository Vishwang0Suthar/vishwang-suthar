"use client";

import Image from "next/image";

import { Icons } from "@/lib/constData";

type Props = {
  isDark: boolean;

  onMinimize: () => void;

  onMaximize: () => void;

  onClose: () => void;
};

const BrowserWindowControls = ({
  isDark,
  onMinimize,
  onMaximize,
  onClose,
}: Props) => {
  const handleAction = (action: string) => {
    switch (action) {
      case "onMinimize":
        onMinimize();
        break;

      case "onMaximize":
        onMaximize();
        break;

      case "onClose":
        onClose();
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="flex h-full shrink-0 items-center gap-1 px-1"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {Icons.map(({ Icon, alt, action }) => (
        <button
          key={alt}
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => handleAction(action)}
          className="grid h-7 w-7 place-items-center transition hover:bg-gray-300"
          aria-label={alt}
        >
          <Image
            src={Icon}
            alt={alt}
            width={16}
            height={16}
            className={isDark ? "invert-0" : "invert"}
          />
        </button>
      ))}
    </div>
  );
};

export default BrowserWindowControls;
