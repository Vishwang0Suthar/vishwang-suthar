export type PreviewType = "website" | "video";

export type BrowserPosition = {
  x: number;
  y: number;
};

export type BrowserSize = {
  width: number;
  height: number;
};

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export type BrowserTab = {
  id: string;

  title: string;

  url: string;

  type: PreviewType;

  favicon?: string;

  // Each tab maintains its own browser history
  history: string[];

  historyIndex: number;

  // Forces iframe reload
  reloadKey: number;
};
