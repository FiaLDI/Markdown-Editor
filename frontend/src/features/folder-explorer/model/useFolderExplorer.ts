import { useFolderStore } from "@/entities/folder/model/store";
import { readDir } from "@tauri-apps/plugin-fs";
import { open } from "@tauri-apps/plugin-dialog";

interface FileEntry {
  name: string;
  path: string;
  isDir: boolean;
}

export const useFolderExplorer = () => {
  const { setEntries, setCurrentPath } = useFolderStore();

  const scanFolder = async (dirPath: string): Promise<FileEntry[]> => {
    const entries = await readDir(dirPath);
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
      setEntries(allEntries);
      setCurrentPath(path);
    } catch (err) {
      console.error("Ошибка при чтении папки:", err);
    }
  };

  const openFolderInWindow = async () => {
    try {
      const path = await open({
        title: "Выберите папку проекта",
        directory: true,
      });
      if (!path || Array.isArray(path)) return;
      await openFolder(path);
    } catch (err) {
      console.error("Ошибка при открытии папки:", err);
    }
  };

  return { openFolder, openFolderInWindow };
};
