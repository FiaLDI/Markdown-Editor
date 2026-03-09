import { useFileStore } from "@/entities/file";
import { useTabStore } from "@/entities/tabs";
import { useContextMenu } from "@/shared/hooks/ContextMenu";

export const useActiveTabs = () => {
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
    
    return {
        contextMenu, contextItems, menuRef, closeMenu, tabs, files, activePath, handleContextMenu, setActive, closeTab
    }
}
