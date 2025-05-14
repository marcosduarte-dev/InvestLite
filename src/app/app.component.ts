import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from './models/Usuario';
import { UsuariosService } from './services/usuarios.service';
import { PrimeNGModule } from './module/primeNgModule';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PrimeNGModule, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  selectedUser: string = '';
  visibleNovoPerfil: boolean = false;
  usuarios: Usuario[] = []

  // Campos do modal
  nome: string = '';
  email: string = '';
  avatar: string = '';

  constructor(private router: Router, private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.listarUsuarios();
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
    this.visibleNovoPerfil = true;
  }

  cancelarCriarPerfil() {
    this.nome = "";
    this.email = "";
    this.visibleNovoPerfil = false;
  }

  criarPerfil() {
    try {
      let usuario: Usuario = new Usuario();
      usuario.nome = this.nome;
      usuario.email = this.email;
      usuario.avatar = this.avatar;

      this.usuariosService.adicionarUsuario(usuario);
      this.listarUsuarios();
      this.visibleNovoPerfil = false;
    } catch (error) {
      //#TODO: Notificacao erro
      console.log("Erro ao criar perfil:")
    }
    
  }

  async listarUsuarios() {
    this.usuarios = await this.usuariosService.listarUsuarios();
  }
}
