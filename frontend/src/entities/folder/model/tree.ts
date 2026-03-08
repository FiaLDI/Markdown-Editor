import { create } from "zustand";
import { FolderNode } from "./types";

interface FolderTreeStore {
  tree?: FolderNode;
  setTree: (tree: FolderNode) => void;
}

export const useFolderTreeStore = create<FolderTreeStore>((set) => ({
  tree: undefined,
  setTree: (tree) => set({ tree }),
}));
