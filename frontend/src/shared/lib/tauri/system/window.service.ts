import { tauriWindowAdapter } from "./tauri-window.adapter";
import { WindowSystemDomain } from "./window.domain";

let windowSystem: WindowSystemDomain = tauriWindowAdapter;

export const getWindowSystem = () => windowSystem;

export const setWindowSystem = (impl: WindowSystemDomain) => {
  windowSystem = impl;
};
