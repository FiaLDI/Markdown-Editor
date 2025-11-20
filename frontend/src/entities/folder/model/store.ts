import { createStore } from "@/shared/lib/store/createStore";

export interface FileEntry {
  name: string;
  path: string;
  isDir: boolean;
}

interface FolderState {
  currentPath?: string;
  entries: FileEntry[];
  setCurrentPath: (p: string) => void;
  setEntries: (e: FileEntry[]) => void;
}

export const useFolderStore = createStore<FolderState>(
  (set) => ({
    currentPath: undefined,
    entries: [],
    setCurrentPath: (p) => set({ currentPath: p }),
    setEntries: (e) => set({ entries: e }),
  }),
  "folder-store"
);
