import { DirEntry } from "@tauri-apps/plugin-fs";

export interface FileSystemDomain {
  readDir(path: string): Promise<DirEntry[]>;
  readFile(path: string): Promise<string>;

  writeFile(path: string, data: string): Promise<void>;
  createFile(path: string): Promise<void>;
  createDir(path: string): Promise<void>;
  rename(oldPath: string, newPath: string): Promise<void>;
  delete(path: string): Promise<void>;
  watch(path: string, cb: () => void): Promise<() => void>;
}
