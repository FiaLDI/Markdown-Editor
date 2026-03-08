
import { buildTree } from "@/entities/folder/lib/buildTree";
import { useFolderTreeStore, useFolderUIStore } from "@/entities/folder";
import { FileEntry } from "@/entities/folder/model/types";
import { getFS } from "@/shared/lib/tauri/fs/fs.service";
import { getDialog } from "@/shared/lib/tauri/dialog/dialog.service";

export const useFolderExplorer = () => {
  const { setTree } = useFolderTreeStore();
  const { setCurrentPath } = useFolderUIStore();

  const fs = getFS();
  const dialog = getDialog();

  const scanFolder = async (dirPath: string): Promise<FileEntry[]> => {
    const entries = await fs.readDir(dirPath);
    const result: FileEntry[] = [];

    for (const e of entries) {
      const fullPath = `${dirPath}/${e.name}`;

      result.push({
        name: e.name ?? "",
        path: fullPath,
        isDir: e.isDirectory ?? false,
      });

      if (e.isDirectory) {
        const children = await scanFolder(fullPath);
        result.push(...children);
      }
    }

    return result;
  };

  const openFolder = async (path: string) => {
    try {
      const allEntries = await scanFolder(path);
      const tree = buildTree(allEntries, path);

      setTree(tree);
      setCurrentPath(path);

    } catch (err) {
      console.error("Ошибка при чтении папки:", err);
    }
  };

  const openFolderInWindow = async () => {
    try {
      const path = await dialog.readPath(
        "Выберите папку проекта",
        true
      );

      if (!path || Array.isArray(path)) return;

      await openFolder(path);

    } catch (err) {
      console.error("Ошибка при открытии папки:", err);
    }
  };

  return { openFolder, openFolderInWindow };
};
