import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { IUsuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  async listarUsuarios(): Promise<IUsuario[]> {
    try {
      const usuarios = await invoke<IUsuario[]>('listar_usuarios', {});
      return usuarios;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return [];
    }
  }

  async adicionarUsuario(usuario: IUsuario): Promise<void> {
    try {
      await invoke('adicionar_usuario', { nome: usuario.nome, email: usuario.email });
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  }

}
