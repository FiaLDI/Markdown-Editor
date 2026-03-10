"use client";

import { useFolderTreeStore } from "@/entities/folder";
import { TreeNode } from "./TreeNode";

export const Sidebar = () => {
  const tree = useFolderTreeStore((s) => s.tree);

  if (!tree) return null;

  return (
    <aside className="w-72 bg-[#181e22] text-gray-200 h-full p-2 overflow-y-auto border-r border-gray-700">
      <TreeNode node={tree} />
    </aside>
  );
};
