import { useOpenFile } from "@/features/file";
import { useFolderExplorer } from "@/features/folder";
import { useContextMenu } from "@/shared/ui/ContextMenu";

export const useToolbarContextMenu = () => {

    const { 
        activePath, 
        openFileInWindow, 
        handleSaveFile, 
        handleSaveFileAs, 
        lastSaved
    } = useOpenFile();
      
    const { openFolderInWindow } = useFolderExplorer();

    const {
        contextMenu,
        handleContextMenu,
        closeMenu,
        menuRef,
    } = useContextMenu<void>();

    const items = [
        { label: "Создать новый файл", action: ()=>{} },
        { label: "Открыть папку", action: openFolderInWindow },
        { label: "Открыть файл", action: openFileInWindow },
        { label: "Сохранить", action: handleSaveFile, disabled: !activePath },
        { label: "Сохранить как", action: handleSaveFileAs, disabled: !activePath },
    ];  

    return {
        contextMenu,
        handleContextMenu,
        closeMenu,
        lastSaved,
        menuRef,
        items
    }
}