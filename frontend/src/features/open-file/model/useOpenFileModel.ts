import { useEffect, useState } from "react";
import { useFileStore } from "@/entities/file/model/store";
import { safeInvoke } from "@/shared/lib/tauri/tauriClient";
import { open, save } from "@tauri-apps/plugin-dialog";

export const useOpenFileModel = () => {
  const {
    openFiles,
    activePath,
    openFile,
    updateContent,
    markSaved,
    setActive,
  } = useFileStore();

  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const activeFile = openFiles.find((f) => f.path === activePath);
  const content = activeFile?.content || "";

  const openFileInWindow = async () => {
    const selected = await open({
      title: "Открыть Markdown-файл",
      multiple: false,
      filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
    });
    if (!selected || Array.isArray(selected)) return;

    const data = await safeInvoke<string>("open_file", { path: selected });
    openFile(selected, data || "");
  };

  const openFileByPath = async (path: string) => {
    const data = await safeInvoke<string>("open_file", { path });
    openFile(path, data || "");
  };

  const handleSaveFile = async () => {
    if (!activePath) return;
    await safeInvoke("save_file", { path: activePath, data: content });
    markSaved(activePath);
    setLastSaved("💾 Сохранено");
    setTimeout(() => setLastSaved(null), 3000);
  };

  const handleSaveFileAs = async () => {
    if (!activeFile) return;
    let newPath = await save({
      title: "Сохранить как...",
      filters: [{ name: "Markdown", extensions: ["md"] }],
      defaultPath: activeFile.path ?? "new-file.md",
    });
    if (!newPath) return;
    await safeInvoke("save_file", { path: newPath, data: content });
    openFile(newPath, content);
    markSaved(newPath);
    setLastSaved("💾 Сохранено как новый");
    setTimeout(() => setLastSaved(null), 3000);
  };

  useEffect(() => {
    if (!activePath) return;
    const timeout = setTimeout(() => {
      const file = openFiles.find((f) => f.path === activePath);
      if (file && file.content !== file.savedContent) {
        safeInvoke("save_file", { path: activePath, data: file.content });
        markSaved(activePath);
        setLastSaved("💾 Автосохранено");
        setTimeout(() => setLastSaved(null), 3000);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [content, activePath, openFiles, markSaved]);

  return {
    content,
    activePath,
    setActive,
    updateContent,
    openFile: openFileByPath,
    openFileInWindow,
    handleSaveFile,
    handleSaveFileAs,
    lastSaved,
  };
};
