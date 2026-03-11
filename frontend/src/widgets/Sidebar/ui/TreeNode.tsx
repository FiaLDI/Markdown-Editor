"use client";

import { memo } from "react";
import { useTreeNodeModel } from "../model/useTreeNodeModel";
import { TreeNodeProps } from "../model/types";

export const TreeNode = memo(({ node, level = 0, handleContextMenu }: TreeNodeProps) => {
  
  const {isSelected, isFolder, toggleFolder, select, openFile, expanded} = useTreeNodeModel({node, level});

  return (
    <div>
      <div
        style={{ paddingLeft: level * 12 }}
        className={`cursor-pointer rounded px-2 py-1 flex items-center hover:bg-gray-700
        ${isSelected ? "bg-gray-700" : ""}`}
        onClick={() => {
          if (isFolder) {
            toggleFolder(node.path);
          } else {
            select(node.path);
            openFile(node.path);
          }
        }}
        onContextMenu={(e) => {if(handleContextMenu) handleContextMenu(e, node.path)}}
      >
        {isFolder ? (expanded ? "📂" : "📁") : "📄"} {node.name}
      </div>

      {isFolder &&
        expanded &&
        node.type == "folder" &&
        node.children.map((child) => (
          <TreeNode key={child.path} node={child} level={level + 1} handleContextMenu={handleContextMenu} />
        ))}
    </div>
  );
});