import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { WindowSystemDomain } from "./window.domain";

const getWindow = async () => {
  return (
    (await WebviewWindow.getByLabel("main")) ??
    new WebviewWindow("main")
  );
};

export const tauriWindowAdapter: WindowSystemDomain = {
  async minimize() {
    const win = await getWindow();
    await win.minimize();
  },

  async toggleMaximize() {
    const win = await getWindow();
    await win.toggleMaximize();
  },

  async close() {
    const win = await getWindow();
    await win.close();
  },
};
