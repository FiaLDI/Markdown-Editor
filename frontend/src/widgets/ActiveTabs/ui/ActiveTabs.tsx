"use client";
import { useFileStore } from "@/entities/file/model/store";
import { useContextMenu } from "@/shared/hooks/ContextMenu";
import { AnimatedContextMenu } from "@/shared/ui/AnimatedContextMenu/AnimatedContextMenu";

export const ActiveTabs = () => {
  const { openFiles, activePath, setActive, closeFile } = useFileStore();
  const { contextMenu, handleContextMenu, closeMenu, menuRef } =
    useContextMenu<string>();

  const handleAction = (action: string, targetPath?: string) => {
    switch (action) {
      case "close":
        if (targetPath) closeFile(targetPath);
        break;
      case "closeAll":
        openFiles.forEach((f) => closeFile(f.path));
        break;
      case "closeOthers":
        openFiles
          .filter((f) => f.path !== targetPath)
          .forEach((f) => closeFile(f.path));
        break;
      case "closeLeft": {
        const index = openFiles.findIndex((f) => f.path === targetPath);
        openFiles.slice(0, index).forEach((f) => closeFile(f.path));
        break;
      }
      case "closeRight": {
        const index = openFiles.findIndex((f) => f.path === targetPath);
        openFiles.slice(index + 1).forEach((f) => closeFile(f.path));
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
      { label: "Close Left", action: () => handleAction("closeLeft", contextMenu.data) },
      { label: "Close Right", action: () => handleAction("closeRight", contextMenu.data) },
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
      <div className="flex bg-[#1c2125] border-b border-gray-700 overflow-x-auto">
        {openFiles.map((file) => {
          const isActive = file.path === activePath;
          const isModified = file.content !== file.savedContent;
          const name = file.path.split(/[\\/]/).pop() ?? file.path;
          return (
            <div
              key={file.path}
              onContextMenu={(e) => handleContextMenu(e, file.path)}
              data-active={isActive}
              className={`flex items-center px-3 py-1 cursor-pointer select-none border-r border-gray-700 
                ${isActive ? "bg-[#23292d] text-white" : "bg-[#1c2125]/60 text-gray-400 hover:bg-gray-700"}`}
              onClick={() => setActive(file.path)}
            >
              <span className="mr-2">
                {name}
                {isModified && <span className="text-yellow-400">*</span>}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file.path);
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
