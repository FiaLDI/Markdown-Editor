"use client";

import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedContextMenu } from "@/shared/ui/ContextMenu";
import { useToolbarContextMenu } from "../model/useToolbarContextMenu";

export const ToolBar = () => {
  const {
    items, 
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
    lastSaved
  } = useToolbarContextMenu();

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
