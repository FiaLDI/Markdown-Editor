import { useContextMenu } from "@/shared/ui/ContextMenu";

export const useSidebarContextMenu = () => {

    const {
        contextMenu,
        handleContextMenu,
        closeMenu,
        menuRef,
    } = useContextMenu<string>();

    const items = [
        { label: "Создать новый файл", action: () => {} },
        { label: "Создать новую директорию", action: () => {}},
        { label: "Переименовать", action: () => {}},
        { label: "Удалить", action: () => {}},
        { label: "Скопировать", action: () => {}},
        { label: "Скопировать путь", action: () => {}},
        { label: "Скопировать относительный путь", action: () => {}},
        { label: "Открыть в проводнике", action: () => {}}
    ];

    return {
        contextMenu,
        handleContextMenu,
        closeMenu,
        menuRef,
        items
    }
}