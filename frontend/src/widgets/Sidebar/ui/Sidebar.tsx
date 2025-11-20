"use client";
import { useState } from "react";
import { useFolderStore } from "@/entities/folder/model/store";
import { useOpenFileModel } from "@/features/open-file/model/useOpenFileModel";

export const Sidebar = () => {
  const { currentPath, entries } = useFolderStore();
  const { openFile } = useOpenFileModel();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (basePath: string, level = 0) =>
    entries
      .filter((e) => e.path.startsWith(basePath) && e.path !== basePath)
      .filter((e) => e.isDir || e.name.match(/\.(md|txt)$/i))
      .sort((a, b) => Number(!a.isDir) - Number(!b.isDir))
      .map((e) => (
        <div key={e.path}>
          <div
            style={{ paddingLeft: `${level * 12}px` }}
            className={`cursor-pointer hover:bg-gray-700 rounded px-2 py-1 flex items-center ${
              e.isDir ? "font-bold text-blue-300" : "text-gray-300"
            }`}
            onClick={() => {
              if (e.isDir) toggleExpand(e.path);
              else openFile(e.path);
            }}
          >
            {e.isDir ? (expanded[e.path] ? "📂" : "📁") : "📄"} {e.name}
          </div>
          {e.isDir && expanded[e.path] && <div>{renderTree(e.path, level + 1)}</div>}
        </div>
      ));

  return (
    <aside className="w-72 bg-[#181e22] text-gray-200 h-full p-2 overflow-y-hidden border-r border-gray-700">
      

      <div className="text-xs text-gray-400 mb-2 break-all">
        {currentPath || "(папка не выбрана)"}
      </div>

      <div className="text-sm h-full scroll-hidden overflow-y-auto">{currentPath && renderTree(currentPath)}</div>
    </aside>
  );
};
