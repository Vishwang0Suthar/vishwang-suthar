"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ProjectInfo } from "@/lib/constData";
import { useTheme } from "@/components/ThemeContext";

import BrowserChrome from "./BrowserChrome";
import BrowserTabs from "./BrowserTabs";
import BrowserContent from "./BrowserContent";

import type {
  BrowserPosition,
  BrowserSize,
  BrowserTab,
  PreviewType,
  ResizeDirection,
} from "./browser.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  type: PreviewType;
  url: string;
  title: string;
};

const MIN_WIDTH = 360;
const MIN_HEIGHT = 280;

const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 600;

const PreviewBrowser = ({ isOpen, onClose, type, url, title }: Props) => {
  const { isDark } = useTheme();

  // =========================================================
  // WINDOW STATE
  // =========================================================

  const [position, setPosition] = useState<BrowserPosition>({
    x: 0,
    y: 0,
  });

  const [size, setSize] = useState<BrowserSize>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });

  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // =========================================================
  // PROJECT PICKER
  // =========================================================

  const [showProjectPicker, setShowProjectPicker] = useState(false);

  // =========================================================
  // TAB STATE
  // =========================================================

  const [tabs, setTabs] = useState<BrowserTab[]>([]);
  const [activeTab, setActiveTab] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  // =========================================================
  // REFS
  // =========================================================

  const addressInputRef = useRef<HTMLInputElement>(null);

  const dragging = useRef(false);
  const resizing = useRef(false);

  const resizeDirection = useRef<ResizeDirection | null>(null);

  const dragStart = useRef({
    mouseX: 0,
    mouseY: 0,
    windowX: 0,
    windowY: 0,
  });

  const resizeStart = useRef({
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const previousWindow = useRef<{
    position: BrowserPosition;
    size: BrowserSize;
  } | null>(null);

  // =========================================================
  // FAVICON
  // =========================================================

  const getFavicon = useCallback((targetUrl: string) => {
    try {
      const parsed = new URL(targetUrl);

      return `${parsed.origin}/favicon.ico`;
    } catch {
      return undefined;
    }
  }, []);

  // =========================================================
  // CREATE TAB
  // =========================================================

  const createTab = useCallback(
    (
      id: string,
      tabUrl: string,
      tabTitle: string,
      tabType: PreviewType,
    ): BrowserTab => {
      return {
        id,
        title: tabTitle,
        url: tabUrl,
        type: tabType,
        favicon: getFavicon(tabUrl),

        history: [tabUrl],
        historyIndex: 0,
        reloadKey: 0,
      };
    },
    [getFavicon],
  );

  // =========================================================
  // CURRENT TAB
  // =========================================================

  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const currentUrl = currentTab?.url ?? url;

  const currentTitle = currentTab?.title ?? title;

  const canGoBack = !!currentTab && currentTab.historyIndex > 0;

  const canGoForward =
    !!currentTab && currentTab.historyIndex < currentTab.history.length - 1;

  // =========================================================
  // INITIALIZE WINDOW
  // =========================================================

  const initializeWindow = useCallback(() => {
    const width = Math.min(DEFAULT_WIDTH, window.innerWidth - 48);

    const height = Math.min(DEFAULT_HEIGHT, window.innerHeight - 48);

    setSize({
      width: Math.max(MIN_WIDTH, width),
      height: Math.max(MIN_HEIGHT, height),
    });

    setPosition({
      x: Math.max(24, (window.innerWidth - width) / 2),

      y: Math.max(24, (window.innerHeight - height) / 2),
    });

    setIsMaximized(false);
    setIsMinimized(false);
  }, []);

  // =========================================================
  // INITIAL OPEN
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    initializeWindow();

    const initialId = `tab-${Date.now()}`;

    const initialTab = createTab(initialId, url, title, type);

    setTabs([initialTab]);
    setActiveTab(initialId);

    setShowProjectPicker(false);
    setIsLoading(true);
  }, [isOpen, url, title, type, initializeWindow, createTab]);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const navigate = useCallback(
    (nextUrl: string) => {
      if (!currentTab) return;

      const favicon = getFavicon(nextUrl);

      setTabs((previousTabs) =>
        previousTabs.map((tab) => {
          if (tab.id !== activeTab) {
            return tab;
          }

          const nextHistory = [
            ...tab.history.slice(0, tab.historyIndex + 1),
            nextUrl,
          ];

          return {
            ...tab,

            url: nextUrl,
            favicon,

            history: nextHistory,
            historyIndex: nextHistory.length - 1,
          };
        }),
      );

      setIsLoading(true);
    },
    [activeTab, currentTab, getFavicon],
  );

  // =========================================================
  // BACK
  // =========================================================

  const goBack = useCallback(() => {
    if (!currentTab) return;

    if (currentTab.historyIndex <= 0) {
      return;
    }

    setTabs((previousTabs) =>
      previousTabs.map((tab) => {
        if (tab.id !== activeTab) {
          return tab;
        }

        const nextIndex = tab.historyIndex - 1;

        const nextUrl = tab.history[nextIndex];

        return {
          ...tab,

          historyIndex: nextIndex,
          url: nextUrl,
          favicon: getFavicon(nextUrl),
        };
      }),
    );

    setIsLoading(true);
  }, [activeTab, currentTab, getFavicon]);

  // =========================================================
  // FORWARD
  // =========================================================

  const goForward = useCallback(() => {
    if (!currentTab) return;

    if (currentTab.historyIndex >= currentTab.history.length - 1) {
      return;
    }

    setTabs((previousTabs) =>
      previousTabs.map((tab) => {
        if (tab.id !== activeTab) {
          return tab;
        }

        const nextIndex = tab.historyIndex + 1;

        const nextUrl = tab.history[nextIndex];

        return {
          ...tab,

          historyIndex: nextIndex,
          url: nextUrl,
          favicon: getFavicon(nextUrl),
        };
      }),
    );

    setIsLoading(true);
  }, [activeTab, currentTab, getFavicon]);

  // =========================================================
  // RELOAD
  // =========================================================

  const reload = useCallback(() => {
    if (!currentTab) return;

    setTabs((previousTabs) =>
      previousTabs.map((tab) =>
        tab.id === activeTab
          ? {
              ...tab,
              reloadKey: tab.reloadKey + 1,
            }
          : tab,
      ),
    );

    setIsLoading(true);
  }, [activeTab, currentTab]);

  // =========================================================
  // EXTRACT PROJECT URL
  // =========================================================

  const extractUrl = (value: string) => {
    const markdownMatch = value.match(/\((https?:\/\/[^)]+)\)/);

    if (markdownMatch?.[1]) {
      return markdownMatch[1];
    }

    const plainUrlMatch = value.match(/https?:\/\/[^\s]+/);

    return plainUrlMatch?.[0] ?? value.trim();
  };

  // =========================================================
  // SELECT PROJECT
  // =========================================================

  /**
   * previewType is important here.
   *
   * The project picker decides whether the user wants
   * to open the project as a WEBSITE or VIDEO.
   *
   * We must preserve that choice inside the BrowserTab.
   */
  const selectProject = (projectIndex: number, previewType: PreviewType) => {
    const project = ProjectInfo[projectIndex];

    if (!project) return;

    // -------------------------------------------------------
    // Decide which URL to load
    // -------------------------------------------------------

    let projectUrl = "";

    if (previewType === "video") {
      if (!project.videoLink) {
        return;
      }

      projectUrl = extractUrl(project.videoLink);
    } else {
      projectUrl = extractUrl(project.deploymentLink);
    }

    if (!projectUrl) {
      return;
    }

    // -------------------------------------------------------
    // If this exact project + preview type already exists,
    // switch to it instead of creating another tab.
    // -------------------------------------------------------

    const existingTab = tabs.find(
      (tab) => tab.url === projectUrl && tab.type === previewType,
    );

    if (existingTab) {
      setActiveTab(existingTab.id);
      setShowProjectPicker(false);
      setIsLoading(true);

      return;
    }

    // -------------------------------------------------------
    // Create new tab
    // -------------------------------------------------------

    const id =
      typeof crypto !== "undefined"
        ? crypto.randomUUID()
        : `${Date.now()}-${projectIndex}`;

    const newTab = createTab(id, projectUrl, project.title, previewType);

    setTabs((previousTabs) => [...previousTabs, newTab]);

    setActiveTab(id);

    setShowProjectPicker(false);
    setIsLoading(true);
  };

  // =========================================================
  // NEW TAB
  // =========================================================

  const createNewTab = () => {
    setShowProjectPicker((previous) => !previous);
  };

  // =========================================================
  // SELECT TAB
  // =========================================================

  const selectTab = (id: string) => {
    const tab = tabs.find((item) => item.id === id);

    if (!tab) return;

    setActiveTab(id);

    setShowProjectPicker(false);

    setIsLoading(true);
  };

  // =========================================================
  // CLOSE TAB
  // =========================================================

  const closeTab = (id: string) => {
    setShowProjectPicker(false);

    // -------------------------------------------------------
    // Closing the last tab closes the browser
    // -------------------------------------------------------

    if (tabs.length === 1) {
      onClose();
      return;
    }

    const index = tabs.findIndex((tab) => tab.id === id);

    const remainingTabs = tabs.filter((tab) => tab.id !== id);

    setTabs(remainingTabs);

    // -------------------------------------------------------
    // If closing active tab, activate nearby tab
    // -------------------------------------------------------

    if (id === activeTab) {
      const nextTab = remainingTabs[Math.max(0, index - 1)];

      setActiveTab(nextTab.id);

      setIsLoading(true);
    }
  };

  // =========================================================
  // DRAGGING
  // =========================================================

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isMaximized || dragging.current) {
      return;
    }

    dragging.current = true;

    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      windowX: position.x,
      windowY: position.y,
    };

    document.body.style.userSelect = "none";

    document.body.style.cursor = "grabbing";
  };

  // =========================================================
  // RESIZING
  // =========================================================

  const startResize = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMaximized || isMinimized) {
      return;
    }

    resizing.current = true;

    resizeDirection.current = direction;

    resizeStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,

      x: position.x,
      y: position.y,

      width: size.width,
      height: size.height,
    };

    document.body.style.userSelect = "none";
  };

  // =========================================================
  // MOUSE MOVEMENT
  // =========================================================

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // -----------------------------------------------------
      // Drag
      // -----------------------------------------------------

      if (dragging.current) {
        const dx = e.clientX - dragStart.current.mouseX;

        const dy = e.clientY - dragStart.current.mouseY;

        /*
         * Important:
         *
         * When minimized, the browser is still movable.
         * Therefore we use the actual rendered width/height
         * instead of assuming the normal browser size.
         */

        const currentWidth = isMinimized ? 420 : size.width;

        const currentHeight = isMinimized ? 44 : size.height;

        const maxX = window.innerWidth - currentWidth;

        const maxY = window.innerHeight - currentHeight;

        setPosition({
          x: Math.min(
            Math.max(0, dragStart.current.windowX + dx),
            Math.max(0, maxX),
          ),

          y: Math.min(
            Math.max(0, dragStart.current.windowY + dy),
            Math.max(0, maxY),
          ),
        });

        return;
      }

      // -----------------------------------------------------
      // Resize
      // -----------------------------------------------------

      if (!resizing.current) {
        return;
      }

      const direction = resizeDirection.current;

      if (!direction) {
        return;
      }

      const start = resizeStart.current;

      const dx = e.clientX - start.mouseX;

      const dy = e.clientY - start.mouseY;

      let width = start.width;

      let height = start.height;

      let x = start.x;
      let y = start.y;

      if (direction.includes("e")) {
        width = start.width + dx;
      }

      if (direction.includes("w")) {
        width = start.width - dx;

        x = start.x + dx;
      }

      if (direction.includes("s")) {
        height = start.height + dy;
      }

      if (direction.includes("n")) {
        height = start.height - dy;

        y = start.y + dy;
      }

      // -----------------------------------------------------
      // Minimum width
      // -----------------------------------------------------

      if (width < MIN_WIDTH) {
        if (direction.includes("w")) {
          x = start.x + start.width - MIN_WIDTH;
        }

        width = MIN_WIDTH;
      }

      // -----------------------------------------------------
      // Minimum height
      // -----------------------------------------------------

      if (height < MIN_HEIGHT) {
        if (direction.includes("n")) {
          y = start.y + start.height - MIN_HEIGHT;
        }

        height = MIN_HEIGHT;
      }

      // -----------------------------------------------------
      // Keep inside viewport
      // -----------------------------------------------------

      width = Math.min(width, window.innerWidth - x);

      height = Math.min(height, window.innerHeight - y);

      setPosition({
        x: Math.max(0, x),
        y: Math.max(0, y),
      });

      setSize({
        width,
        height,
      });
    };

    const handleMouseUp = () => {
      dragging.current = false;

      resizing.current = false;

      resizeDirection.current = null;

      document.body.style.cursor = "";

      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [size, isMinimized]);

  // =========================================================
  // MINIMIZE
  // =========================================================

  const toggleMinimize = () => {
    setIsMinimized((previous) => !previous);
  };

  // =========================================================
  // MAXIMIZE
  // =========================================================

  const toggleMaximize = () => {
    /*
     * Do not maximize while minimized.
     *
     * The user should restore from minimized first.
     */
    if (isMinimized) {
      return;
    }

    // -------------------------------------------------------
    // MAXIMIZE
    // -------------------------------------------------------

    if (!isMaximized) {
      previousWindow.current = {
        position,
        size,
      };

      setPosition({
        x: 0,
        y: 0,
      });

      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setIsMaximized(true);

      return;
    }

    // -------------------------------------------------------
    // RESTORE
    // -------------------------------------------------------

    if (previousWindow.current) {
      setPosition(previousWindow.current.position);

      setSize(previousWindow.current.size);
    }

    setIsMaximized(false);
  };

  // =========================================================
  // KEYBOARD SHORTCUTS
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const modifier = e.ctrlKey || e.metaKey;

      // -----------------------------------------------------
      // Escape
      // -----------------------------------------------------

      if (e.key === "Escape") {
        onClose();
        return;
      }

      // -----------------------------------------------------
      // Ctrl/Cmd + L
      // -----------------------------------------------------

      if (modifier && e.key.toLowerCase() === "l") {
        e.preventDefault();

        addressInputRef.current?.focus();

        addressInputRef.current?.select();

        return;
      }

      // -----------------------------------------------------
      // Ctrl/Cmd + R
      // -----------------------------------------------------

      if (modifier && e.key.toLowerCase() === "r") {
        e.preventDefault();

        reload();

        return;
      }

      // -----------------------------------------------------
      // Alt + Left
      // -----------------------------------------------------

      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();

        goBack();

        return;
      }

      // -----------------------------------------------------
      // Alt + Right
      // -----------------------------------------------------

      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();

        goForward();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, reload, goBack, goForward]);

  // =========================================================
  // RENDER
  // =========================================================

  if (!isOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        style={{
          left: position.x,
          top: position.y,

          width: isMinimized ? 420 : size.width,

          height: isMinimized ? 44 : size.height,
        }}
        className={`pointer-events-auto absolute flex flex-col overflow-hidden border-2 shadow-2xl ${
          isDark
            ? "border-black bg-white text-black"
            : "border-white bg-black text-white"
        }`}
      >
        {/* =================================================
            TABS / WINDOW CONTROLS
            ================================================= */}

        <BrowserTabs
          tabs={tabs}
          activeTab={activeTab}
          isDark={isDark}
          onSelect={selectTab}
          onClose={closeTab}
          onNewTab={createNewTab}
          onMinimize={toggleMinimize}
          onMaximize={toggleMaximize}
          onCloseBrowser={onClose}
        />

        {/* =================================================
            BROWSER CHROME

            Hidden when minimized.
            ================================================= */}

        {!isMinimized && (
          <BrowserChrome
            isDark={isDark}
            url={currentUrl}
            favicon={currentTab?.favicon}
            isLoading={isLoading}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            addressInputRef={addressInputRef}
            onBack={goBack}
            onForward={goForward}
            onReload={reload}
            onNavigate={navigate}
            onStartDrag={startDrag}
            onDoubleClick={toggleMaximize}
          />
        )}

        {/* =================================================
            CONTENT

            BrowserContent decides whether the current tab
            is rendered as a website or video based on:

              currentTab.type
              currentTab.url
              currentTab.reloadKey
            ================================================= */}

        {!isMinimized && currentTab && (
          <BrowserContent
            type={currentTab.type}
            url={currentTab.url}
            title={currentTab.title}
            reloadKey={currentTab.reloadKey}
            onLoad={() => setIsLoading(false)}
          />
        )}

        {/* =================================================
            RESIZE HANDLES
            ================================================= */}

        {!isMaximized && !isMinimized && (
          <>
            {/* NW */}
            <div
              onMouseDown={(e) => startResize(e, "nw")}
              className="absolute left-0 top-0 z-30 h-3 w-3 cursor-nwse-resize"
            />

            {/* NE */}
            <div
              onMouseDown={(e) => startResize(e, "ne")}
              className="absolute right-0 top-0 z-30 h-3 w-3 cursor-nesw-resize"
            />

            {/* SW */}
            <div
              onMouseDown={(e) => startResize(e, "sw")}
              className="absolute bottom-0 left-0 z-30 h-3 w-3 cursor-nesw-resize"
            />

            {/* SE */}
            <div
              onMouseDown={(e) => startResize(e, "se")}
              className="absolute bottom-0 right-0 z-30 h-4 w-4 cursor-nwse-resize"
            />

            {/* N */}
            <div
              onMouseDown={(e) => startResize(e, "n")}
              className="absolute left-3 right-3 top-0 z-20 h-2 cursor-ns-resize"
            />

            {/* S */}
            <div
              onMouseDown={(e) => startResize(e, "s")}
              className="absolute bottom-0 left-3 right-3 z-20 h-2 cursor-ns-resize"
            />

            {/* W */}
            <div
              onMouseDown={(e) => startResize(e, "w")}
              className="absolute bottom-3 left-0 top-3 z-20 w-2 cursor-ew-resize"
            />

            {/* E */}
            <div
              onMouseDown={(e) => startResize(e, "e")}
              className="absolute bottom-3 right-0 top-3 z-20 w-2 cursor-ew-resize"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewBrowser;
