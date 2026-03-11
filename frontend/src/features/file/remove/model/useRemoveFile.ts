"use client";

import { getFS } from "@/shared/lib/tauri/fs/fs.service";
import { useFileStore } from "@/entities/file";
import { useTabStore } from "@/entities/tabs";
import { useFolderTreeStore, useFolderUIStore } from "@/entities/folder";

export const useRemoveFile = () => {

    const { removeFile } = useFileStore();
    const { activePath,  closeTab } = useTabStore();
    
    const deleteTreeNode = useFolderTreeStore((s) => s.deleteTreeNode);

    const deleteUI = useFolderUIStore((s) => s.delete);

    const fs = getFS();

    const onRemoveFileHandler = async (path: string) => {
        if (activePath == path) closeTab(path);
        
        await fs.delete(path);

        deleteTreeNode(path);
        removeFile(path);
        deleteUI(path);
    }

    return {
        onRemoveFileHandler
    }
}