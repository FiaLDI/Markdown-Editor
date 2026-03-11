import {
  readDir,
  readTextFile,
  writeTextFile,
  create,
  mkdir,
  rename,
  remove,
  watch,
} from "@tauri-apps/plugin-fs";

import { FileSystemDomain } from "./tauri-fs.domain";

export const tauriFsAdapter: FileSystemDomain = {
  readDir: (path) => readDir(path),

  readFile: (path) => readTextFile(path),

  writeFile: (path, data) => writeTextFile(path, data),

  createFile: async (path) => {
    await create(path);
  },

  createDir: (path) => mkdir(path),

  rename: (oldPath, newPath) => rename(oldPath, newPath),

  delete: (path) => remove(path, { recursive: true }),

  watch: async (path: string, cb: () => void) => {
    const unwatch = await watch(
      path,
      () => {
        cb();
      },
      {
        recursive: true,
      }
    );

    return () => unwatch();
  },
};
