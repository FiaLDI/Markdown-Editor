import { useContextMenu } from "@/shared/ui/ContextMenu";
import { RefObject, useState } from "react";

interface Props {
  editorRef: RefObject<HTMLTextAreaElement | null>;
  content: string;
  activePath?: string;
  updateContent: (path: string, content: string) => void;
}

export const useEditorContextMenu = ({
  editorRef,
  content,
  activePath,
  updateContent,
}: Props) => {
  const [selectedText, setSelectedText] = useState("");

  const {
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
  } = useContextMenu<void>();

  const replaceSelection = (text: string) => {
    const el = editorRef.current;
    if (!el || !activePath) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const newContent =
      content.slice(0, start) +
      text +
      content.slice(end);

    updateContent(activePath, newContent);

    requestAnimationFrame(() => {
      el.selectionStart = start + text.length;
      el.selectionEnd = start + text.length;
      el.focus();
    });
  };

  const deleteSelection = () => replaceSelection("");

  const items = [
    {
      label: "Скопировать",
      action: async () => {
        if (selectedText) {
          await navigator.clipboard.writeText(selectedText);
        }
        closeMenu();
      },
    },
    {
      label: "Вставить",
      action: async () => {
        const text = await navigator.clipboard.readText();
        replaceSelection(text);
        closeMenu();
      },
    },
    {
      label: "Вырезать",
      action: async () => {
        if (!selectedText) return;
        await navigator.clipboard.writeText(selectedText);
        deleteSelection();
        closeMenu();
      },
    },
    {
      label: "Удалить",
      action: () => {
        deleteSelection();
        closeMenu();
      },
    },
    {
      label: "Поиск",
      action: () => {
        if (selectedText) {
          window.open(
            `https://www.google.com/search?q=${encodeURIComponent(selectedText)}`,
            "_blank"
          );
        }
        closeMenu();
      },
    },
  ];

  return {
    selectedText,
    setSelectedText,
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
    items,
  };
};
