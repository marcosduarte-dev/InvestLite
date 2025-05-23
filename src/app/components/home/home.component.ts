import { Component } from '@angular/core';
import { IUsuario } from '../../interfaces/Usuario';
import { Router, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { PrimeNGModule } from '../../module/primeNgModule';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PrimeNGModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedUser: string = '';
  visibleNovoPerfil: boolean = false;
  usuarios: IUsuario[] = []

  // Campos do modal
  nome: string = '';
  email: string = '';
  avatar: string = '';

  constructor(private router: Router, private usuariosService: UsuariosService) { }

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
      this.router.navigate([`dashboard`]);
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
      let usuario: IUsuario = {
        id: 0,
        nome: this.nome,
        email: this.email,
        avatar: this.avatar
      };
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
