#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::PathBuf;
use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use std::sync::mpsc::channel;
use std::collections::HashSet;
use std::time::{Duration, Instant};
use tauri::Emitter;

#[tauri::command]
fn create_file(path: String) -> Result<(), String> {
    fs::File::create(path)
        .map(|_| ())
        .map_err(|e| format!("Ошибка создания файла: {}", e))
}

#[tauri::command]
fn create_folder(path: String) -> Result<(), String> {
    fs::create_dir(path)
        .map_err(|e| format!("Ошибка создания директории: {}", e))
}

#[tauri::command]
fn rename_path(old_path: String, new_path: String) -> Result<(), String> {
    fs::rename(old_path, new_path)
        .map_err(|e| format!("Ошибка переименования: {}", e))
}

#[tauri::command]
fn delete_path(path: String) -> Result<(), String> {
    let path_buf = PathBuf::from(&path);

    if path_buf.is_dir() {
        fs::remove_dir_all(path_buf)
            .map_err(|e| format!("Ошибка удаления директории: {}", e))
    } else {
        fs::remove_file(path_buf)
            .map_err(|e| format!("Ошибка удаления файла: {}", e))
    }
}

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

#[tauri::command]
fn watch_folder(path: String, app: tauri::AppHandle) {
    std::thread::spawn(move || {
        let (tx, rx) = channel();

        let mut watcher: RecommendedWatcher =
            notify::recommended_watcher(tx).expect("watcher error");

        watcher
            .watch(path.as_ref(), RecursiveMode::Recursive)
            .expect("watch failed");

        let mut changed_paths: HashSet<String> = HashSet::new();
        let mut last_emit = Instant::now();

        loop {
            match rx.recv() {
                Ok(event) => {
                    if let Ok(event) = event {
                        for p in event.paths {
                            changed_paths.insert(p.to_string_lossy().to_string());
                        }
                    }
                }
                Err(_) => break,
            }

            if last_emit.elapsed() > Duration::from_millis(200) && !changed_paths.is_empty() {
                for path in changed_paths.drain() {
                    app.emit("fs:changed", path).ok();
                }

                last_emit = Instant::now();
            }
        }
    });
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_file,
            save_file,
            create_file,
            create_folder,
            rename_path,
            delete_path,
            watch_folder
        ])
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}
