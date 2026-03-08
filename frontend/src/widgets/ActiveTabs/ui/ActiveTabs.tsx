"use client";

import { useFileStore } from "@/entities/file/model/store";
import { useTabStore } from "@/entities/tabs/model/store";
import { useContextMenu } from "@/shared/hooks/ContextMenu";
import { AnimatedContextMenu } from "@/shared/ui/AnimatedContextMenu/AnimatedContextMenu";

export const ActiveTabs = () => {
  const { tabs, activePath, setActive, closeTab } = useTabStore();
  const files = useFileStore((s) => s.files);

  const { contextMenu, handleContextMenu, closeMenu, menuRef } =
    useContextMenu<string>();

  const handleAction = (action: string, targetPath?: string) => {
    switch (action) {
      case "close":
        if (targetPath) closeTab(targetPath);
        break;

      case "closeAll":
        tabs.forEach((t) => closeTab(t.path));
        break;

      case "closeOthers":
        tabs
          .filter((t) => t.path !== targetPath)
          .forEach((t) => closeTab(t.path));
        break;

      case "closeLeft": {
        const index = tabs.findIndex((t) => t.path === targetPath);
        tabs.slice(0, index).forEach((t) => closeTab(t.path));
        break;
      }

      case "closeRight": {
        const index = tabs.findIndex((t) => t.path === targetPath);
        tabs.slice(index + 1).forEach((t) => closeTab(t.path));
        break;
      }

      case "copyPath":
        navigator.clipboard.writeText(targetPath || "");
        break;

      case "copyRelative":
        if (targetPath) {
          const relative = targetPath.replace(process.cwd(), ".");
          navigator.clipboard.writeText(relative);
        }
        break;
    }
  };

  const contextItems =
    contextMenu &&
    [
      { label: "Close", action: () => handleAction("close", contextMenu.data) },
      {
        label: "Close Others",
        action: () => handleAction("closeOthers", contextMenu.data),
      },
      { label: "Close All", action: () => handleAction("closeAll") },
      {
        label: "Close Left",
        action: () => handleAction("closeLeft", contextMenu.data),
      },
      {
        label: "Close Right",
        action: () => handleAction("closeRight", contextMenu.data),
      },
      { label: "─", action: () => {} },
      {
        label: "Copy Path",
        action: () => handleAction("copyPath", contextMenu.data),
      },
      {
        label: "Copy Relative Path",
        action: () => handleAction("copyRelative", contextMenu.data),
      },
    ].filter(Boolean);

  return (
    <>
      <div className="flex bg-[#1c2125] border-b border-gray-700">
        {tabs.map((tab) => {
          const file = files[tab.path];
          const isActive = tab.path === activePath;

          const name = tab.path.split(/[\\/]/).pop() ?? tab.path;

          const isModified =
            file && file.content !== file.savedContent;

          return (
            <div
              key={tab.path}
              onContextMenu={(e) => handleContextMenu(e, tab.path)}
              className={`flex items-center px-3 py-1 cursor-pointer select-none border-r border-gray-700 
                ${
                  isActive
                    ? "bg-[#23292d] text-white"
                    : "bg-[#1c2125]/60 text-gray-400 hover:bg-gray-700"
                }`}
              onClick={() => setActive(tab.path)}
            >
              <span className="mr-2 whitespace-nowrap">
                {name}
                {isModified && (
                  <span className="text-yellow-400">*</span>
                )}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.path);
                }}
                className="text-gray-500 hover:text-red-400 ml-1"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {contextMenu && (
        <AnimatedContextMenu
          visible
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextItems!}
          menuRef={menuRef as any}
          onClose={closeMenu}
        />
      )}
    </>
  );
};
