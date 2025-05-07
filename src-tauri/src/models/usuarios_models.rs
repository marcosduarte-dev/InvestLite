use serde::Serialize;

#[derive(Serialize)]
pub struct Usuario {
    pub id: i32,
    pub nome: String,
    pub email: String,
}