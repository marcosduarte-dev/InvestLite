import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  async listarUsuarios(): Promise<Usuario[]> {
    try {
      const usuarios = await invoke<Usuario[]>('listar_usuarios', {});
      return usuarios;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return [];
    }
  }

  async adicionarUsuario(usuario: Usuario): Promise<void> {
    try {
      await invoke('adicionar_usuario', {nome: usuario.nome, email: usuario.email});
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  }

}
