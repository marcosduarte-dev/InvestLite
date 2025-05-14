use commands::usuarios_commands::listar_usuarios;
use commands::usuarios_commands::adicionar_usuario;
use models::app_state_models::AppState;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use tauri::path::BaseDirectory;
use std::sync::Mutex;
mod db;
mod commands;
mod models;

fn get_db_path<R: tauri::Runtime>(app: &AppHandle<R>) -> PathBuf {
    app.path()
        .resolve("investimentos.db", BaseDirectory::LocalData)
        .expect("Falha ao resolver caminho para o banco de dados")
}

fn init_database<R: tauri::Runtime>(app: &AppHandle<R>) -> db::Database {
    let db_path = get_db_path(app);

    if let Some(parent) = db_path.parent() {
        std::fs::create_dir_all(parent).expect("Falha ao criar diretório");
    }

    let db = db::Database::new(db_path)
        .expect("Falha ao abrir o banco de dados");

    db.init().expect("Falha ao inicializar o banco de dados");

    db
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let db = init_database(&app.app_handle());
            app.manage(AppState {
                db: Mutex::new(db),
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![adicionar_usuario, listar_usuarios])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
