"use client";

import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useOpenFile } from "@/features/file";
import { useContextMenu } from "@/shared/hooks/ContextMenu";
import { AnimatedContextMenu } from "@/shared/ui/AnimatedContextMenu/AnimatedContextMenu";
import { useFolderExplorer } from "@/features/folder";

export const ToolBar = () => {
  const { 
    activePath, 
    openFileInWindow, 
    handleSaveFile, 
    handleSaveFileAs, 
    lastSaved 
  } = useOpenFile();

  const { openFolderInWindow } = useFolderExplorer();

  const {
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
  } = useContextMenu<void>();

  const items = [
    { label: "Создать новый файл", action: ()=>{} },
    { label: "📂 Открыть папку", action: openFolderInWindow },
    { label: "📂 Открыть файл", action: openFileInWindow },
    { label: "💾 Сохранить", action: handleSaveFile, disabled: !activePath },
    { label: "📁 Сохранить как", action: handleSaveFileAs, disabled: !activePath },
  ];

  return (
    <header
      className="flex justify-between items-center bg-gray-850 relative select-none"
      onContextMenu={(e) => handleContextMenu(e, undefined)}
    >
      <div className="flex gap-2 items-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => handleContextMenu(e as any, undefined)}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <Menu size={18} />
        </motion.button>
        <span className="text-sm text-gray-300">Markdown Editor</span>
      </div>

      {lastSaved && (
        <span className="text-xs text-green-400 animate-pulse">{lastSaved}</span>
      )}

      <AnimatedContextMenu
        visible={!!contextMenu}
        x={contextMenu?.x || 0}
        y={contextMenu?.y || 0}
        items={items}
        menuRef={menuRef as unknown as React.RefObject<HTMLElement>}
        onClose={closeMenu}
      />
    </header>
  );
};
