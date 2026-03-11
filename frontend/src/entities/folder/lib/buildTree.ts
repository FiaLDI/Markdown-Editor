import { readDir, DirEntry } from "@tauri-apps/plugin-fs";
import { FolderNode } from "../model/types";

export const buildTree = async (rootPath: string): Promise<FolderNode> => {
  const root: FolderNode = {
    type: "folder",
    name: rootPath.split(/[\\/]/).pop() || rootPath,
    path: rootPath,
    children: [],
  };

  const build = async (dirPath: string, parent: FolderNode) => {
    const entries: DirEntry[] = await readDir(dirPath);

    for (const entry of entries) {
      const fullPath = `${dirPath}/${entry.name}`;

      if (entry.isDirectory) {
        const folder: FolderNode = {
          type: "folder",
          name: entry.name,
          path: fullPath,
          children: [],
        };

        parent.children.push(folder);

        await build(fullPath, folder);
      } else {
        parent.children.push({
          type: "file",
          name: entry.name,
          path: fullPath,
        });
      }
    }
  };

  await build(rootPath, root);

  return root;
};
