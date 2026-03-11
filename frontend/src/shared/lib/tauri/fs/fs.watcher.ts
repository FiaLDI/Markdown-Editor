import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export const startWatcher = async (path: string, cb: () => void) => {
  await invoke("watch_folder", { path });

  const unlisten = await listen<string>("fs:changed", () => {
    cb();
  });

  return () => {
    unlisten();
  };
};