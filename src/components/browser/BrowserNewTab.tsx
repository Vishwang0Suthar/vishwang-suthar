"use client";

import Image from "next/image";

import { ProjectInfo } from "@/lib/constData";

import type { BrowserTab } from "./browser.types";

type Props = {
  isDark: boolean;

  onSelectProject: (
    project: (typeof ProjectInfo)[number],
    type: "website" | "video",
  ) => void;

  tabs: BrowserTab[];
};

const getProjectUrl = (value?: string) => {
  if (!value) return "";

  const markdownMatch = value.match(/\((https?:\/\/[^)]+)\)/);

  if (markdownMatch) {
    return markdownMatch[1];
  }

  return value.trim();
};

const BrowserNewTab = ({ isDark, onSelectProject }: Props) => {
  return (
    <div
      className={`flex h-full flex-1 flex-col overflow-auto p-6 ${
        isDark ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Open Project</h1>

        <p
          className={`mt-1 text-sm ${
            isDark ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Select a project and choose what you want to open.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ProjectInfo.map((project) => {
          const websiteUrl = getProjectUrl(project.deploymentLink);

          const videoUrl = getProjectUrl(project.videoLink);

          return (
            <div
              key={project.title}
              className={`overflow-hidden border-2 ${
                isDark ? "border-black" : "border-white"
              }`}
            >
              {/* Project image */}

              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={project.imgURL}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project information */}

              <div className="p-4">
                <p
                  className={`mb-1 text-xs uppercase tracking-wide ${
                    isDark ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {project.heading}
                </p>

                <h2 className="text-lg font-semibold">{project.title}</h2>

                <p
                  className={`mt-2 line-clamp-3 text-sm ${
                    isDark ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {project.body}
                </p>

                {/* Actions */}

                <div className="mt-4 flex gap-2">
                  {websiteUrl && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(project, "website")}
                      className={`flex-1 border-2 px-3 py-2 text-sm transition ${
                        isDark
                          ? "border-black bg-white text-black hover:bg-black hover:text-white"
                          : "border-white bg-black text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      Website
                    </button>
                  )}

                  {videoUrl && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(project, "video")}
                      className={`flex-1 border-2 px-3 py-2 text-sm transition ${
                        isDark
                          ? "border-black bg-white text-black hover:bg-black hover:text-white"
                          : "border-white bg-black text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowserNewTab;
