import { tauriFsAdapter } from "./tauri-dialog.adapter"
import { DialogSystemDomain } from "./tauri-dialog.domain";

let dialog: DialogSystemDomain = tauriFsAdapter;

export const getDialog = () => dialog;

export const setFS = (impl: DialogSystemDomain) => {
  dialog = impl;
};
