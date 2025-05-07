use commands::usuarios_commands::listar_usuarios;
use models::app_state_models::AppState;
use tauri::State;
use std::sync::Mutex;
mod db;
mod commands;
mod models;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn adicionar_usuario(
    state: State<AppState>,
    nome: String,
    email: String,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.conn
        .execute(
            "INSERT INTO usuarios (nome, email) VALUES (?1, ?2)",
            (&nome, &email),
        )
        .map_err(|e| e.to_string())?;
    Ok(())

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db = db::Database::new("investimentos.db").expect("Falha ao abrir o banco de dados");
    db.init().expect("Falha ao inicializar o banco de dados");

    tauri::Builder::default()
        .manage(AppState {
            db: Mutex::new(db),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, adicionar_usuario, listar_usuarios])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
