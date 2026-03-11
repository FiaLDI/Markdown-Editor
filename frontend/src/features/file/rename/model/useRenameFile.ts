import { getFS } from "@/shared/lib/tauri/fs/fs.service";
import { useFolderTreeStore } from "@/entities/folder";

export const useRenameFile = () => {
    const renameTree = useFolderTreeStore((s) => s.renameTree);

    const fs = getFS();
 
    const getParentPath = (path: string) =>
        path.split(/[\\/]/).slice(0, -1).join("/");

    const onRenameHandler = async (path: string, name: string) => {
        if (!path) return;
        if (!name) return;

        const newPath = `${getParentPath(path)}/${name}`;

        await fs.rename(path, newPath);

        renameTree(path, name);
      }

    return {
        onRenameHandler
    }
}