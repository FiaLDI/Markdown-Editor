import { useFolderTreeStore, useFolderUIStore } from "@/entities/folder";
import { getFS } from "@/shared/lib/tauri/fs/fs.service";

export const useRenameFolder = () => {
    
    const { renameTree } = useFolderTreeStore();
    const { rename } = useFolderUIStore();

    const fs = getFS();

    const RenameFolder = () => {
        
    }

    return {

    }
}