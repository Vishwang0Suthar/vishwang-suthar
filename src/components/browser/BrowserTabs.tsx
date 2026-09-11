"use client";

import { useState } from "react";

import type { BrowserTab } from "./browser.types";
import BrowserButtons from "./BrowserWindowControls";

import { ProjectInfo } from "@/lib/constData";

type Props = {
  tabs: BrowserTab[];
  activeTab: string;
  isDark: boolean;

  onSelect: (id: string) => void;
  onClose: (id: string) => void;

  onNewTab: (project?: (typeof ProjectInfo)[number]) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onCloseBrowser: () => void;
};

const BrowserTabs = ({
  tabs,
  activeTab,
  isDark,
  onSelect,
  onClose,
  onNewTab,
  onMinimize,
  onMaximize,
  onCloseBrowser,
}: Props) => {
  const [showProjectPicker, setShowProjectPicker] = useState(false);

  /**
   * Open the project picker.
   */
  const handleNewTabClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setShowProjectPicker((prev) => !prev);
  };

  /**
   * Select one of the user's projects.
   */
  const handleProjectSelect = (project: (typeof ProjectInfo)[number]) => {
    setShowProjectPicker(false);
    onNewTab(project);
  };

  return (
    <div
      className={`relative flex h-9 shrink-0 items-center justify-between border-b-2 ${
        isDark ? "border-black" : "border-white"
      }`}
    >
      {/* Project Tabs */}

      <div className="flex h-full min-w-0 flex-1 items-end gap-1 overflow-hidden px-2">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <div
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`group flex h-8 min-w-35 max-w-55 shrink-0 cursor-pointer items-center gap-2 border-x-2 border-t-2 px-3 text-xs ${
                active
                  ? isDark
                    ? "border-black bg-white text-black"
                    : "border-white bg-black text-white"
                  : isDark
                    ? "border-transparent bg-gray-200 text-black hover:bg-gray-300"
                    : "border-transparent bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {/* Favicon */}

              {tab.favicon ? (
                <img
                  src={tab.favicon}
                  alt=""
                  className="h-3.5 w-3.5 shrink-0 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="shrink-0 text-[10px]">◉</span>
              )}

              {/* Title */}

              <span className="min-w-0 flex-1 truncate">
                {tab.title || "New Tab"}
              </span>

              {/* Close Tab */}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
                className="shrink-0 text-sm opacity-50 transition hover:opacity-100"
                aria-label={`Close ${tab.title}`}
              >
                ×
              </button>
            </div>
          );
        })}

        {/* New Tab */}

        <button
          type="button"
          onClick={handleNewTabClick}
          className={`grid h-8 w-8 shrink-0 place-items-center text-lg transition hover:bg-gray-300 ${
            isDark ? "text-black" : "text-white"
          }`}
          aria-label="New tab"
        >
          +
        </button>
      </div>

      {/* Project Picker */}

      {showProjectPicker && (
        <div
          className={`absolute left-2 top-10 z-100 w-72 border-2 p-2 shadow-2xl ${
            isDark
              ? "border-black bg-white text-black"
              : "border-white bg-black text-white"
          }`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-2 border-b-2 pb-2 text-xs font-bold uppercase">
            Open Project
          </div>

          <div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
            {ProjectInfo.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => handleProjectSelect(project)}
                className={`flex w-full items-center gap-3 border px-2 py-2 text-left text-xs transition ${
                  isDark
                    ? "border-black hover:bg-black hover:text-white"
                    : "border-white hover:bg-white hover:text-black"
                }`}
              >
                {/* Project thumbnail */}

                <div className="h-10 w-14 shrink-0 overflow-hidden border">
                  <img
                    src={project.imgURL.src}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Project information */}

                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{project.title}</div>

                  <div className="truncate opacity-60">{project.heading}</div>
                </div>

                <span className="shrink-0 text-sm">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Window Controls */}

      <BrowserButtons
        isDark={isDark}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onCloseBrowser}
      />
    </div>
  );
};

export default BrowserTabs;
