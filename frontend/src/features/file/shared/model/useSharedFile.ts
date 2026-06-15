import { useFileStore } from "@/entities/file";
import { useFolderTreeStore } from "@/entities/folder";

export const useShareFile = () => {

    const { sharedFile } = useFileStore();

    const onSharedFileHandler = async (path: string) => {
        if (!path) return;
        sharedFile(path);
        useFolderTreeStore.getState().shareTreeNode(path);
    }

    return {
        onSharedFileHandler,
    }
}
