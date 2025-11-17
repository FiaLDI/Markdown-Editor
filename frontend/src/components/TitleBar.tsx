"use client";
import { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { AppWindow, Minus, X } from "lucide-react";

export default function TitleBar() {
  const [win, setWin] = useState<WebviewWindow | null>(null);

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
      className="flex justify-between items-center bg-gray-800/80 text-gray-200 px-4 py-2 backdrop-blur select-none"
    >
      <span className="font-semibold">🪶 Markdown Editor</span>

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
