#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::PathBuf;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Привет, {}! 👋 Я пришёл из Rust.", name)
}

#[tauri::command]
fn open_file(path: String) -> Result<String, String> {
    let path_buf = PathBuf::from(path);

    match fs::read_to_string(&path_buf) {
        Ok(content) => Ok(content),
        Err(err) => Err(format!("Ошибка чтения файла: {}", err)),
    }
}

#[tauri::command]
fn save_file(path: String, data: String) -> Result<(), String> {
    std::fs::write(path, data)
        .map_err(|e| format!("Ошибка записи файла: {}", e))
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![greet, open_file, save_file])
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}
