"use client";

import { useFolderTreeStore, useFolderUIStore } from "@/entities/folder";
import { TreeNode } from "@/entities/folder/model/types";
import { useOpenFile } from "@/features/file";

export const Sidebar = () => {
  const tree = useFolderTreeStore((s) => s.tree);

  const expandedFolders = useFolderUIStore((s) => s.expandedFolders);
  const toggleFolder = useFolderUIStore((s) => s.toggleFolder);
  const select = useFolderUIStore((s) => s.select);
  const selected = useFolderUIStore((s) => s.selected);

  const { openFile } = useOpenFile();

  const renderNode = (node: TreeNode, level = 0) => {
    const isFolder = node.type === "folder";
    const expanded = expandedFolders.includes(node.path);
    const isSelected = selected === node.path;

    return (
      <div key={node.path}>
        <div
          style={{ paddingLeft: level * 12 }}
          className={`cursor-pointer rounded px-2 py-1 flex items-center hover:bg-gray-700
            ${isSelected ? "bg-gray-700" : ""}
          `}
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              select(node.path);
              openFile(node.path);
            }
          }}
        >
          {isFolder ? (expanded ? "📂" : "📁") : "📄"} {node.name}
        </div>

        {isFolder &&
          expanded &&
          node.children.map((child) => renderNode(child, level + 1))}
      </div>
    );
  };

  return (
    <aside className="w-72 bg-[#181e22] text-gray-200 h-full p-2 overflow-y-auto border-r border-gray-700">
      {tree && renderNode(tree)}
    </aside>
  );
};