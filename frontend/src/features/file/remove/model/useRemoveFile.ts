"use client";

import { useFileStore } from "@/entities/file";
import { useTabStore } from "@/entities/tabs";

export const useRemoveFileModel = () => {

    const { removeFile } = useFileStore();
    const { activePath,  closeTab } = useTabStore();

    const onRemoveFileHandler = (path: string) => {
        if (activePath == path) closeTab(path);
        
        removeFile(path);
    }

    return {
        onRemoveFileHandler
    }
}