// entities/file/model/file.store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface File {
  path: string;
  content: string;
  savedContent: string;
}

interface FileStore {
  files: Record<string, File>;

  setFile: (path: string, content: string) => void;
  updateContent: (path: string, content: string) => void;
  markSaved: (path: string) => void;
  removeFile: (path: string) => void;
  getFile: (path: string) => File | undefined;
}

export const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      files: {},

      setFile: (path, content) => {
        set((state) => ({
          files: {
            ...state.files,
            [path]: {
              path,
              content,
              savedContent: content,
            },
          },
        }));
      },

      updateContent: (path, content) => {
        set((state) => {
          const file = state.files[path];
          if (!file) return state;

          return {
            files: {
              ...state.files,
              [path]: {
                ...file,
                content,
              },
            },
          };
        });
      },

      markSaved: (path) => {
        set((state) => {
          const file = state.files[path];
          if (!file) return state;

          return {
            files: {
              ...state.files,
              [path]: {
                ...file,
                savedContent: file.content,
              },
            },
          };
        });
      },

      removeFile: (path) => {
        set((state) => {
          const updated = { ...state.files };
          delete updated[path];
          return { files: updated };
        });
      },

      getFile: (path) => {
        return get().files[path];
      },
    }),
    {
      name: "files-store",
    }
  )
);