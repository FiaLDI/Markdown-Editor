
import { open, save } from "@tauri-apps/plugin-dialog";
import { DialogSystemDomain } from "./tauri-dialog.domain";

export const tauriFsAdapter: DialogSystemDomain = {
  readPath: (title, directory) => open({title, directory}),
  saveAs: (options) => save(options),
};
