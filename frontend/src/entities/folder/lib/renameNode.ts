import { TreeNode } from "../model/types";


export const renameNode = (
  node: TreeNode,
  path: string,
  newName: string
): TreeNode => {
  if (node.path === path) {
    return { ...node, name: newName };
  }

  if (node.type === "folder") {
    return {
      ...node,
      children: node.children.map((child) =>
        renameNode(child, path, newName)
      ),
    };
  }

  return node;
};
