"use client";

import Image from "next/image";

import { ProjectInfo } from "@/lib/constData";

type Props = {
  isDark: boolean;

  onSelectProject: (project: { title: string; url: string }) => void;

  onClose: () => void;
};

const getDeploymentUrl = (deploymentLink: string) => {
  // Handles:
  // https://example.com
  //
  // and:
  // [https://example.com](https://example.com)

  const markdownMatch = deploymentLink.match(/\]\((https?:\/\/[^)]+)\)/);

  if (markdownMatch) {
    return markdownMatch[1];
  }

  const urlMatch = deploymentLink.match(/https?:\/\/[^\s)]+/);

  return urlMatch?.[0] ?? deploymentLink;
};

const BrowserProjectPicker = ({ isDark, onSelectProject, onClose }: Props) => {
  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center ${
        isDark ? "bg-white/95 text-black" : "bg-black/95 text-white"
      }`}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-full w-full flex-col">
        {/* Header */}

        <div
          className={`flex h-10 shrink-0 items-center justify-between border-b-2 px-3 ${
            isDark ? "border-black" : "border-white"
          }`}
        >
          <span className="text-sm font-bold">Select a project</span>

          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center text-lg transition hover:bg-gray-300"
            aria-label="Close project picker"
          >
            ×
          </button>
        </div>

        {/* Projects */}

        <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 md:grid-cols-3">
          {ProjectInfo.map((project) => {
            const projectUrl = getDeploymentUrl(project.deploymentLink);

            return (
              <button
                key={project.title}
                type="button"
                onClick={() =>
                  onSelectProject({
                    title: project.title,
                    url: projectUrl,
                  })
                }
                className={`group overflow-hidden border-2 text-left transition ${
                  isDark
                    ? "border-black bg-white hover:bg-gray-200"
                    : "border-white bg-black hover:bg-gray-800"
                }`}
              >
                {/* Thumbnail */}

                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.imgURL}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-200 group-hover:scale-105"
                  />
                </div>

                {/* Info */}

                <div className="flex items-center justify-between gap-2 p-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold">
                      {project.title}
                    </p>

                    <p
                      className={`truncate text-[10px] ${
                        isDark ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {project.heading}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowserProjectPicker;
