import { SaveDialogOptions } from "@tauri-apps/plugin-dialog";

export interface DialogSystemDomain {
  readPath(title: string, directory: boolean,): Promise<string | null>;
  saveAs(options?: SaveDialogOptions | undefined): Promise<string | null>
}
