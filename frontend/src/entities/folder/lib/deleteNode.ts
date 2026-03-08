import { TreeNode } from "../model/types";

export const deleteNode = (
  node: TreeNode,
  path: string
): TreeNode => {

  if (node.type === "folder") {
    return {
      ...node,
      children: node.children
        .filter((child) => child.path !== path)
        .map((child) => deleteNode(child, path)),
    };
  }

  return node;
};
