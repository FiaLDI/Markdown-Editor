import { useContextMenu } from "@/shared/ui/ContextMenu";

export const useEditorContextMenu = () => {

    const {
        contextMenu,
        handleContextMenu,
        closeMenu,
        menuRef,
    } = useContextMenu<string>();

    const items = [
        { label: "Скопировать", action: () => {} },
        { label: "Вставить", action: () => {}},
        { label: "Вырезать", action: () => {}},
        { label: "Удалить", action: () => {}},
        { label: "Поиск по файлу", action: () => {}},
    ];

    return {
        contextMenu,
        handleContextMenu,
        closeMenu,
        menuRef,
        items
    }
}