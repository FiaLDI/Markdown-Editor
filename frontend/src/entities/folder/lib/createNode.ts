import { TreeNode } from "../model/types";

export const createNode = (
  node: TreeNode,
  path: string,
  name: string
): TreeNode => {

  if (node.type === "folder") {

    if (node.path === path) {
      return {
        ...node,
        children: [
          ...node.children,
          {
            name,
            type: "folder",
            children: [],
            path: `${node.path}/${name}`,
          },
        ],
      };
    }

    return {
      ...node,
      children: node.children.map((child) =>
        createNode(child, path, name)
      ),
    };
  }

  return node;
};
