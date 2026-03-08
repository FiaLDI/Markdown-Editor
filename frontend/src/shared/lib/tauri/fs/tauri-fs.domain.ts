import { DirEntry } from "@tauri-apps/plugin-fs";

export interface FileSystemDomain {
  readDir(path: string): Promise<DirEntry[]>;
  readFile(path: string): Promise<string>;
}
