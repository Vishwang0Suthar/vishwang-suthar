"use client";

import type { RefObject } from "react";

type Props = {
  isDark: boolean;

  url: string;

  title: string;

  favicon?: string;

  isLoading: boolean;

  canGoBack: boolean;

  canGoForward: boolean;

  addressInputRef: RefObject<HTMLInputElement | null>;

  onBack: () => void;

  onForward: () => void;

  onReload: () => void;

  onNavigate: (url: string) => void;

  onStartDrag: (e: React.MouseEvent) => void;

  onDoubleClick: () => void;
};

const BrowserChrome = ({
  isDark,
  url,
  favicon,
  isLoading,
  canGoBack,
  canGoForward,
  addressInputRef,
  onBack,
  onForward,
  onReload,
  onNavigate,
  onStartDrag,
  onDoubleClick,
}: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let nextUrl = String(formData.get("url") || "").trim();

    if (!nextUrl) return;

    if (!nextUrl.startsWith("http://") && !nextUrl.startsWith("https://")) {
      nextUrl = `https://${nextUrl}`;
    }

    onNavigate(nextUrl);
  };

  return (
    <div
      onMouseDown={onStartDrag}
      onDoubleClick={onDoubleClick}
      className={`flex h-11 shrink-0 cursor-grab items-center gap-2 border-b-2 px-2 ${
        isDark ? "border-black" : "border-white"
      }`}
    >
      {/* Navigation */}

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onBack}
          disabled={!canGoBack}
          className={`grid h-7 w-7 place-items-center text-lg ${
            canGoBack ? "hover:bg-gray-300" : "cursor-default opacity-30"
          }`}
          aria-label="Back"
        >
          ←
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onForward}
          disabled={!canGoForward}
          className={`grid h-7 w-7 place-items-center text-lg ${
            canGoForward ? "hover:bg-gray-300" : "cursor-default opacity-30"
          }`}
          aria-label="Forward"
        >
          →
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onReload}
          className="grid h-7 w-7 place-items-center text-lg hover:bg-gray-300"
          aria-label="Reload"
        >
          ⟳
        </button>
      </div>

      {/* URL bar */}

      <form
        onSubmit={handleSubmit}
        onMouseDown={(e) => e.stopPropagation()}
        className={`flex h-7 min-w-0 flex-1 items-center gap-2 border px-2 ${
          isDark ? "border-black" : "border-white"
        }`}
      >
        {/* Security */}

        <span
          className="shrink-0 text-xs"
          title={
            url.startsWith("https://")
              ? "Secure connection"
              : "Connection is not secure"
          }
        >
          {url.startsWith("https://") ? "🔒" : "⚠"}
        </span>

        {/* Favicon */}

        {favicon ? (
          <img
            src={favicon}
            alt=""
            className="h-3.5 w-3.5 shrink-0 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="shrink-0 text-[10px]">◉</span>
        )}

        <input
          ref={addressInputRef}
          name="url"
          defaultValue={url}
          key={url}
          spellCheck={false}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-xs outline-none"
          aria-label="Address"
        />

        {isLoading && (
          <span className="shrink-0 animate-pulse text-[9px]">LOADING</span>
        )}
      </form>
    </div>
  );
};

export default BrowserChrome;
