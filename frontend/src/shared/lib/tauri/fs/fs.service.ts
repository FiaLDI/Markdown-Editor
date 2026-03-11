import { tauriFsAdapter } from "./tauri-fs.adapter";
import { FileSystemDomain } from "./tauri-fs.domain";

let fs: FileSystemDomain = tauriFsAdapter;

export const getFS = () => fs;

export const setFS = (impl: FileSystemDomain) => {
  fs = impl;
};
