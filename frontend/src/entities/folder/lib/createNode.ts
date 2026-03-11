import { TreeNode } from "../model/types";

export const createNode = (
  node: TreeNode,
  path: string,
  name: string,
  type: "folder" | "file"
): TreeNode => {
  if (node.type !== "folder") return node;

  if (node.path === path) {
    const newNode: TreeNode =
      type === "folder"
        ? {
            type: "folder",
            name,
            path: `${node.path}/${name}`,
            children: [],
          }
        : {
            type: "file",
            name,
            path: `${node.path}/${name}`,
          };

    return {
      ...node,
      children: [...node.children, newNode],
    };
  }

  return {
    ...node,
    children: node.children.map((child) =>
      createNode(child, path, name, type)
    ),
  };
};
