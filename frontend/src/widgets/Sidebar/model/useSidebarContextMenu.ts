import { useContextMenu } from "@/shared/ui/ContextMenu";
import { useCreateFile } from "@/features/file/create";
import { useRemoveFile } from "@/features/file/remove";
import { useCreateFolder } from "@/features/folder/create";
import { useCopyFileName } from "@/features/file/copy";
import { useRenameFile } from "@/features/file/rename";

export const useSidebarContextMenu = () => {
  const {
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
  } = useContextMenu<string>();

  const createFile = useCreateFile();
  const createFolder = useCreateFolder();
  const removeFile = useRemoveFile();
  const renameFile = useRenameFile();
  const copyFile = useCopyFileName();

  const getPath = () => contextMenu?.data;

  const items = [
    {
      label: "Создать новый файл",
      action: async () => {
        const path = getPath();
        if (!path) return;

        const name = prompt("Имя файла");
        if (!name) return;

        await createFile.onCreateFileHandler(path, name);
      },
    },

    {
      label: "Создать новую директорию",
      action: async () => {
        const path = getPath();
        if (!path) return;

        const name = prompt("Имя папки");
        if (!name) return;

        await createFolder.onCreateFolderHandler(path, name);
      },
    },

    {
      label: "Переименовать",
      action: async () => {
        const path = getPath();
        if (!path) return;

        const name = prompt("Новое имя");
        if (!name) return;

        await renameFile.onRenameHandler(path, name);
      },
    },

    {
      label: "Удалить",
      action: async () => {
        const path = getPath();
        if (!path) return;

        await removeFile.onRemoveFileHandler(path);
      },
    },

    {
      label: "Скопировать путь",
      action: async () => {
        const path = getPath();
        if (!path) return;

        await copyFile.onCopyFileNameHandler(path);
      },
    },

    {
      label: "Скопировать относительный путь",
      action: async () => {
        const path = getPath();
        if (!path) return;

        await copyFile.onCopyFileRelativeNameHandler(path);
      },
    },
  ];

  return {
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
    items,
  };
};
