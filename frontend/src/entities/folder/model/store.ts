import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FolderUIStore {
  currentPath?: string;
  expandedFolders: string[];
  selected?: string;

  setCurrentPath: (path: string) => void;
  toggleFolder: (path: string) => void;
  select: (path: string) => void;
  rename: (path: string) => void;
}

export const useFolderUIStore = create<FolderUIStore>()(
  persist(
    (set, get) => ({
      currentPath: undefined,
      expandedFolders: [],
      selected: undefined,

      setCurrentPath: (path) => set({ currentPath: path }),

      toggleFolder: (path) =>
        set((state) => ({
          expandedFolders: state.expandedFolders.includes(path)
            ? state.expandedFolders.filter((p) => p !== path)
            : [...state.expandedFolders, path],
        })),

      select: (path) => set({ selected: path }),
      
      rename: (path) => {
        const currentPath = get().currentPath;

        if(currentPath == path) {
          set({currentPath: path})
        }
      },
    }),
    {
      name: "folder-ui-store",
    }
  )
);
