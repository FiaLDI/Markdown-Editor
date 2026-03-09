import { useFileStore } from "@/entities/file";
import { useTabStore } from "@/entities/tabs";
import { useContextMenuTabs } from "@/features/tabs";

export const useActiveTabs = () => {
  const { tabs, activePath, setActive, closeTab } = useTabStore();
  const files = useFileStore((s) => s.files);

  const isModify = (path: string): boolean => {
    return files[path] && files[path].content !== files[path].savedContent;
  }

  const {contextMenu, contextItems, menuRef, closeMenu, handleContextMenu} = useContextMenuTabs({tabs, closeTab})
    
  return {
      contextMenu, contextItems, menuRef, closeMenu, tabs, activePath, handleContextMenu, setActive, closeTab, isModify
  }
}
