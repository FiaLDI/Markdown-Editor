
import { AnimatedContextMenu, ContextMenuItem, ContextMenuPosition } from "@/shared/ui/ContextMenu"

export const TabsContextMenu = ({
    contextMenu,
    contextItems,
    menuRef,
    closeMenu
}: {
    contextMenu: ContextMenuPosition<string>,
    contextItems: ContextMenuItem[],
    menuRef: any,
    closeMenu: () => void
}) => {

    return (
        <AnimatedContextMenu
          visible
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextItems!}
          menuRef={menuRef as any}
          onClose={closeMenu}
        />
    )
}