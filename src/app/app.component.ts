import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/core";
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Usuario } from './models/Usuario';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, DropdownModule, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  selectedUser: string = '';
  users: string[] = ['Marcos', 'João', 'Maria']; // Exemplo de usuários
  usuarios: Usuario[] = []

  constructor(private router: Router) {}

  ngOnInit() {
    this.listarUsuarios()
  }

  onUserSelect() {
    if (this.selectedUser) {
      // Aqui você pode adicionar a lógica de navegação
      console.log('Usuário selecionado:', this.selectedUser);
    }
  }

  onEnter() {
    if (this.selectedUser) {
      console.table(this.usuarios)
      console.log('Entrando com usuário:', this.selectedUser);
      // Adicione aqui a lógica de navegação
    }
  }

  onNewProfile() {
    console.log('Criando novo perfil');
    // Adicione aqui a lógica para criar novo perfil
  }

  listarUsuarios(): Usuario[] {
    try {
      invoke('listar_usuarios', {}).then((usuarios: any) => {
        this.usuarios = usuarios
      });
    } catch (error) {
      console.error('Erro ao adicionar investimento:', error);
    }
    return []
  }
}
