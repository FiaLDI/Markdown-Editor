"use client";

import { Minus, X, AppWindow } from "lucide-react";
import { ToolBar } from "@/widgets/Toolbar";
import { getWindowSystem } from "@/shared/lib/tauri/system/window.service";

export const TitleBar = () => {
  const win = getWindowSystem();

  return (
    <div
      data-tauri-drag-region
      className="flex justify-between items-center bg-[#181e22]/80 text-gray-200 px-4 py-2 backdrop-blur select-none border-b border-gray-700"
    >
      <ToolBar />

      <div className="flex gap-3">
        <button
          onClick={() => win.minimize()}
          className="hover:text-yellow-400 transition"
        >
          <Minus />
        </button>

        <button
          onClick={() => win.toggleMaximize()}
          className="hover:text-green-400 transition"
        >
          <AppWindow />
        </button>

        <button
          onClick={() => win.close()}
          className="hover:text-red-400 transition"
        >
          <X />
        </button>
      </div>
    </div>
  );
};
