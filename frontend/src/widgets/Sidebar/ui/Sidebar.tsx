"use client";

import { useState } from "react";
import { TreeNode } from "@/entities/folder/model/types";
import { useOpenFileModel } from "@/features/file";
import { useFolderStore } from "@/entities/folder";

export const Sidebar = () => {
  const root = useFolderStore((s) => s.root);
  const { openFile } = useOpenFileModel();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (path: string) =>
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));

  const renderNode = (node: TreeNode, level = 0) => {
    const isFolder = node.type === "folder";

    return (
      <div key={node.path}>
        <div
          style={{ paddingLeft: level * 12 }}
          className="cursor-pointer hover:bg-gray-700 rounded px-2 py-1 flex items-center"
          onClick={() => {
            if (isFolder) toggle(node.path);
            else openFile(node.path);
          }}
        >
          {isFolder ? (expanded[node.path] ? "📂" : "📁") : "📄"} {node.name}
        </div>

        {isFolder &&
          expanded[node.path] &&
          node.children.map((child) => renderNode(child, level + 1))}
      </div>
    );
  };

  return (
    <aside className="w-72 bg-[#181e22] text-gray-200 h-full p-2 overflow-y-auto border-r border-gray-700">
      {root && renderNode(root)}
    </aside>
  );
};
