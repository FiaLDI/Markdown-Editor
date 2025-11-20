"use client";
import { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { AppWindow, Minus, X } from "lucide-react";
import { ToolBar } from "@/widgets/Toolbar";
import { useFileStore } from "@/entities/file/model/store";

export const TitleBar = () => {
  const [win, setWin] = useState<WebviewWindow | null>(null);

  const hydrate = useFileStore((s) => s.hydrate);
  
    useEffect(() => {
      hydrate();
    }, [hydrate]);

  useEffect(() => {
    (async () => {
      const w =
        (await WebviewWindow.getByLabel("main")) ??
        new WebviewWindow("main");
      setWin(w);
    })();
  }, []);

  return (
    <div
      data-tauri-drag-region
      className="flex justify-between items-center bg-[#181e22]/80 text-gray-200 px-4 py-2 backdrop-blur select-none border-b border-gray-700 "
    >
      <ToolBar />

      <div className="flex gap-3">
        <button
          onClick={() => win?.minimize()}
          className="hover:text-yellow-400 transition"
        >
          <Minus />
        </button>
        <button
          onClick={() => win?.toggleMaximize()}
          className="hover:text-green-400 transition"
        >
          <AppWindow />
        </button>
        <button
          onClick={() => win?.close()}
          className="hover:text-red-400 transition"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
