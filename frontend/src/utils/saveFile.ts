import { safeInvoke } from "./tauriClient";

export async function saveFile(path: string, content: string) {
  try {
    await safeInvoke("save_file", { path, data: content });
    alert("✅ Файл сохранён успешно!");
  } catch (err) {
    console.error("Ошибка сохранения файла:", err);
    alert("❌ Ошибка при сохранении!");
  }
}
