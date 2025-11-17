"use client";
import { useState, useEffect, useMemo } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";
import { safeInvoke } from "../utils/tauriClient";
import { marked } from "marked";

interface FileEntry {
  name: string;
  path: string;
  isFile: boolean;
}

export default function Page() {
  const [content, setContent] = useState<string>("# Привет, Markdown!");
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  // 🔄 Превью Markdown
  const htmlPreview = useMemo(() => {
    try {
      return marked.parse(content);
    } catch {
      return "<p style='color:red'>Ошибка разбора Markdown</p>";
    }
  }, [content]);

  // 📂 Открыть файл
  const handleOpenFile = async (customPath?: string) => {
    try {
      const selected =
        customPath ||
        (await open({
          title: "Открыть Markdown-файл",
          multiple: false,
          filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
        }));

      if (!selected || Array.isArray(selected)) return;

      const result = await safeInvoke<string>("open_file", { path: selected });
      if (result) {
        setContent(result);
        setCurrentPath(selected);
      }
    } catch (err) {
      console.error("Ошибка при открытии:", err);
    }
  };

  // 💾 Сохранить
  const handleSaveFile = async () => {
    if (!currentPath) return handleSaveFileAs();
    try {
      await safeInvoke("save_file", { path: currentPath, data: content });
      alert(`✅ Файл сохранён: ${currentPath}`);
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
    }
  };

  // 📁 Сохранить как
  const handleSaveFileAs = async () => {
    try {
      let savePath = await save({
        title: "Сохранить Markdown-файл как...",
        filters: [{ name: "Markdown", extensions: ["md"] }],
        defaultPath: currentPath ?? "new-file.md",
      });
      if (!savePath) return;
      if (!savePath.toLowerCase().endsWith(".md")) savePath += ".md";

      await safeInvoke("save_file", { path: savePath, data: content });
      setCurrentPath(savePath);
      alert(`💾 Сохранено как: ${savePath}`);
    } catch (err) {
      console.error("Ошибка при сохранении как:", err);
    }
  };

  // 📁 Открыть папку
  const handleOpenFolder = async () => {
    try {
      const folder = await open({
        title: "Выберите папку с Markdown-файлами",
        directory: true,
      });
      if (!folder || Array.isArray(folder)) return;

      setCurrentFolder(folder);
      setLoadingFiles(true);

      const entries = await readDir(folder);
      const mdFiles = entries
        .filter((e) => e.isFile && e.name?.endsWith(".md"))
        .map((e) => ({
          name: e.name ?? "unnamed",
          path: `${folder}/${e.name}`,
          isFile: true,
        }));

      setFiles(mdFiles);
    } catch (err) {
      console.error("Ошибка при чтении папки:", err);
    } finally {
      setLoadingFiles(false);
    }
  };

  return (
    
    <main className="flex h-screen bg-gray-900 text-white">
      {/* 🧭 Сайдбар — список файлов */}
      <aside className="w-64 border-r border-gray-700 bg-gray-850 p-3 flex flex-col">
        <button
          onClick={handleOpenFolder}
          className="w-full mb-3 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded"
        >
          📁 Открыть папку
        </button>

        {loadingFiles && <p className="text-sm text-gray-400">Загрузка...</p>}

        {!loadingFiles && (
          <ul className="flex-1 overflow-y-auto text-sm">
            {files.map((file) => (
              <li key={file.path}>
                <button
                  onClick={() => handleOpenFile(file.path)}
                  className={`block w-full text-left p-2 rounded hover:bg-gray-700 ${
                    currentPath === file.path ? "bg-gray-700" : ""
                  }`}
                >
                  {file.name}
                </button>
              </li>
            ))}
            {files.length === 0 && (
              <p className="text-gray-500 mt-3 text-center text-sm">
                Нет .md файлов
              </p>
            )}
          </ul>
        )}
      </aside>

      {/* 📝 Центральная зона — редактор и предпросмотр */}
      <section className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-3 border-b border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenFile()}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded"
            >
              📂 Открыть файл
            </button>
            <button
              onClick={handleSaveFile}
              className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded"
            >
              💾 Сохранить
            </button>
            <button
              onClick={handleSaveFileAs}
              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded"
            >
              📁 Сохранить как
            </button>
          </div>
          <p className="text-xs text-gray-400">
            {currentPath ? `📄 ${currentPath}` : "Новый файл"}
          </p>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Редактор */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-1/2 p-4 bg-gray-800 border-r border-gray-700 font-mono resize-none focus:outline-none"
          />

          {/* Предпросмотр */}
          <div
            className="w-1/2 p-4 bg-gray-850 overflow-auto prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      </section>
    </main>
  );
}
