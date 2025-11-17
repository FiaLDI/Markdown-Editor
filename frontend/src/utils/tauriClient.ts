import { invoke } from "@tauri-apps/api/core";

/**
 * Безопасный вызов Rust-команд через Tauri API.
 * Работает только в Tauri, иначе просто возвращает undefined.
 */
export async function safeInvoke<T = unknown>(
  command: string,
  payload?: Record<string, unknown>
): Promise<T | undefined> {
  if (typeof window === "undefined" || !("__TAURI__" in window)) {
    console.warn(`[safeInvoke] ⚠️ '${command}' skipped — not in Tauri runtime`);
    return undefined;
  }

  try {
    const result = await invoke<T>(command, payload);
    return result;
  } catch (err) {
    console.error(`[safeInvoke] ❌ ${command} failed:`, err);
    return undefined;
  }
}
