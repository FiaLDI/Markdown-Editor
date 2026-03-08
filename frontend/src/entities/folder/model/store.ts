import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FolderNode } from "./types";

interface FolderStore {
  root?: FolderNode;
  currentPath?: string;

  setTree: (tree: FolderNode, path: string) => void;
}

export const useFolderStore = create<FolderStore>()(
  persist(
    (set) => ({
      root: undefined,
      currentPath: undefined,

      setTree: (tree, path) =>
        set({
          root: tree,
          currentPath: path,
        }),
    }),
    {
      name: "folder-store",
    }
  )
);