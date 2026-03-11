
import { getFS } from "@/shared/lib/tauri/fs/fs.service";
import { useFolderTreeStore } from "@/entities/folder";
import { useFileStore } from "@/entities/file";
export const useCreateFile = () => {

    const createTreeNode = useFolderTreeStore((s) => s.createTreeNode);

    const setFile = useFileStore((s) => s.setFile);

    const fs = getFS();

    const onCreateFileHandler = async (path: string, name: string) => {
        if (!path) return;
        if (!name) return;

        const newPath = `${path}/${name}`;

        await fs.createFile(newPath);

        createTreeNode(path, name, "file");
        setFile(newPath, "");
    }

    return {
        onCreateFileHandler
    }
}