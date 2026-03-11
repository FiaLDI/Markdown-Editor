"use client";

import { useOpenFile } from "@/features/file";
import { parse } from "@/shared/lib/markdown/parse";
import { useMemo, useRef } from "react";
import { useEditorContextMenu } from "../model/useEditorContextMenu";
import { AnimatedContextMenu } from "@/shared/ui/ContextMenu";

export const EditorPanel = () => {
  const { content, updateContent, activePath } = useOpenFile();
  const html = useMemo(() => parse(content), [content]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    contextMenu,
    handleContextMenu,
    closeMenu,
    menuRef,
    items,
    setSelectedText,
  } = useEditorContextMenu({
    editorRef: textareaRef,
    content,
    activePath,
    updateContent,
  });
  return (
    <div className="flex flex-1 overflow-hidden">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => {
          if (activePath) updateContent(activePath, e.target.value);
        }}
        onSelect={(e) => {
          const textarea = e.target as HTMLTextAreaElement;
          const selectedText = textarea.value.substring(
            textarea.selectionStart,
            textarea.selectionEnd
          );
          setSelectedText(selectedText);
        }}
        onContextMenu={(e) => handleContextMenu(e)}
        className="w-1/2 p-4 custom-scrollbar bg-[#1c2125] border-r border-gray-700 font-mono resize-none focus:outline-none"
      />

      <div
        className="w-1/2 p-4 bg-[#1c2125] custom-scrollbar overflow-auto prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <AnimatedContextMenu
        visible={!!contextMenu}
        x={contextMenu?.x || 0}
        y={contextMenu?.y || 0}
        items={items}
        menuRef={menuRef as unknown as React.RefObject<HTMLElement>}
        onClose={closeMenu}
      />
    </div>
  );
};