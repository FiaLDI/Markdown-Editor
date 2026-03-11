import { buildTree } from "@/entities/folder/lib/buildTree";
import { useFolderTreeStore, useFolderUIStore } from "@/entities/folder";
import { getDialog } from "@/shared/lib/tauri/dialog/dialog.service";

export const useFolderExplorer = () => {
  const { setTree } = useFolderTreeStore();
  const { setCurrentPath } = useFolderUIStore();

  const dialog = getDialog();

  const openFolder = async (path: string) => {
    try {
      const tree = await buildTree(path);

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
