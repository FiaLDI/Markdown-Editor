// entities/folder/lib/buildTree.ts

import { FileEntry, FolderNode } from "../model/types";

export const buildTree = (
  entries: FileEntry[],
  rootPath: string
): FolderNode => {
  const root: FolderNode = {
    type: "folder",
    name: rootPath.split(/[\\/]/).pop() || rootPath,
    path: rootPath,
    children: [],
  };

  const map = new Map<string, FolderNode>();
  map.set(rootPath, root);

  for (const entry of entries) {
    const parentPath =
      entry.path.substring(0, entry.path.lastIndexOf("/")) || rootPath;

    const parent = map.get(parentPath);

    if (!parent) continue;

    if (entry.isDir) {
      const folder: FolderNode = {
        type: "folder",
        name: entry.name,
        path: entry.path,
        children: [],
      };

      parent.children.push(folder);
      map.set(entry.path, folder);
    } else {
      parent.children.push({
        type: "file",
        name: entry.name,
        path: entry.path,
      });
    }
  }

  return root;
};
