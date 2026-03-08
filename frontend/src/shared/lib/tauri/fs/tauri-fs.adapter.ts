
import { readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { FileSystemDomain } from "./tauri-fs.domain";

export const tauriFsAdapter: FileSystemDomain = {
  readDir: (path) => readDir(path),
  readFile: (path) => readTextFile(path),
};
