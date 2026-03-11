"use client";

import { useFolderTreeStore } from "@/entities/folder";
import { TreeNode } from "./TreeNode";
import { AnimatedContextMenu } from "@/shared/ui/ContextMenu";
import { useSidebarContextMenu } from "../model/useSidebarContextMenu";
import { useFileWatcher } from "../model/useFileWatcher";
import { useRestoreWorkspace } from "../model/useRestoreWorkspace";

export const Sidebar = () => {
  const tree = useFolderTreeStore((s) => s.tree);
  const {contextMenu, items, menuRef, closeMenu, handleContextMenu} = useSidebarContextMenu();
  useRestoreWorkspace();

  useFileWatcher(tree?.path);

  if (!tree) return null;

  return (
    <aside 
      onContextMenu={(e) => {
        e.stopPropagation();
        handleContextMenu(e, tree.path);
      }}
      className="w-72 bg-[#181e22] text-gray-200 h-full p-2 overflow-y-auto border-r border-gray-700"
    >
      <TreeNode node={tree} handleContextMenu={handleContextMenu} />

      <AnimatedContextMenu
        visible={!!contextMenu}
        x={contextMenu?.x || 0}
        y={contextMenu?.y || 0}
        items={items}
        menuRef={menuRef as unknown as React.RefObject<HTMLElement>}
        onClose={closeMenu}
      />
    </aside>
  );
};
