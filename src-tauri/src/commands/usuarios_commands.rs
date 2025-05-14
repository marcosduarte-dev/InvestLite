use tauri::State;
use crate::models::usuarios_models::Usuario;
use crate::models::app_state_models::AppState;

#[tauri::command]
pub fn listar_usuarios(state: State<'_, AppState>) -> Result<Vec<Usuario>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    let mut stmt = db.conn.prepare("SELECT id, nome, email FROM usuarios").map_err(|e| e.to_string())?;

    let rows = stmt.query_map([], |row| {
        Ok(Usuario {
            id: row.get(0)?,
            nome: row.get(1)?,
            email: row.get(2)?,
        })
    }).map_err(|e| e.to_string())?;
    

    let usuarios = rows.into_iter().map(|r| r.unwrap()).collect();

    Ok(usuarios)
}

#[tauri::command]
pub fn adicionar_usuario(
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