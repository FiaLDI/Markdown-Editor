import { create } from "zustand";

interface OpenFile {
  path: string;
  content: string;
  savedContent: string;
}

interface FileStore {
  openFiles: OpenFile[];
  activePath?: string;
  setActive: (path: string) => void;
  openFile: (path: string, content?: string) => void;
  updateContent: (path: string, content: string) => void;
  closeFile: (path: string) => void;
  markSaved: (path: string) => void;
  hydrate: () => void;
}

export const useFileStore = create<FileStore>((set, get) => ({
  openFiles: [],
  activePath: undefined,

  hydrate: () => {
    if (typeof window === "undefined") return;
    const openFiles = JSON.parse(localStorage.getItem("openFiles") || "[]");
    const activePath = localStorage.getItem("activePath") || undefined;
    set({ openFiles, activePath });
  },

  setActive: (path) => {
    if (typeof window !== "undefined") localStorage.setItem("activePath", path);
    set({ activePath: path });
  },

  openFile: (path, content = "") => {
    const existing = get().openFiles.find((f) => f.path === path);
    const updated = existing
      ? get().openFiles
      : [...get().openFiles, { path, content, savedContent: content }];

    localStorage.setItem("openFiles", JSON.stringify(updated));
    localStorage.setItem("activePath", path);
    set({ openFiles: updated, activePath: path });
  },

  updateContent: (path, content) => {
    const updated = get().openFiles.map((f) =>
      f.path === path ? { ...f, content } : f
    );
    if (typeof window !== "undefined")
      localStorage.setItem("openFiles", JSON.stringify(updated));
    set({ openFiles: updated });
  },

  closeFile: (path) => {
    const updated = get().openFiles.filter((f) => f.path !== path);
    const nextActive =
      get().activePath === path ? updated[0]?.path : get().activePath;
    if (typeof window !== "undefined") {
      localStorage.setItem("openFiles", JSON.stringify(updated));
      localStorage.setItem("activePath", nextActive || "");
    }
    set({ openFiles: updated, activePath: nextActive });
  },

  markSaved: (path) => {
    const updated = get().openFiles.map((f) =>
      f.path === path ? { ...f, savedContent: f.content } : f
    );
    if (typeof window !== "undefined")
      localStorage.setItem("openFiles", JSON.stringify(updated));
    set({ openFiles: updated });
  },
}));
