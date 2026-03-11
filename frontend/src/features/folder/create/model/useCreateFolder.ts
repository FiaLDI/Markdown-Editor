
import { getFS } from "@/shared/lib/tauri/fs/fs.service";
import { useFolderTreeStore } from "@/entities/folder";

export const useCreateFolder = () => {
    const createTreeNode = useFolderTreeStore((s) => s.createTreeNode);

    const fs = getFS();

    const onCreateFolderHandler = async (path: string, name: string) => {
        if (!path) return;
        if (!name) return;

        const newPath = `${path}/${name}`;

        await fs.createDir(newPath);

        createTreeNode(path, name, "folder");
    }

    return {
        onCreateFolderHandler
    }
}