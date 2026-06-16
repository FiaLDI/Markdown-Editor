import { TreeNode } from "../model/types";

export const shareNode = (node: TreeNode, path: string): TreeNode => {
  if (node.path === path) {
    return { ...node, isShared: true };
  }

if (node.type === "folder") {
    return {
        ...node,
        isShared: node.isShared || false,
        children: node.children.map((child) =>
        shareNode(child, path)
      ),
    };
  }

  return node;
}