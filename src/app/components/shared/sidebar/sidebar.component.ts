import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, SidebarModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  sidebarVisible: boolean = true;
  collapsed: boolean = false;
  activeItem: string = 'dashboard';
  isMobile: boolean = false;

  ngOnInit() {
    // Comentario
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarVisible = false;
      this.collapsed = true;
    } else {
      this.sidebarVisible = true;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarVisible = !this.sidebarVisible;
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  selectMenuItem(item: string) {
    this.activeItem = item;
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }
}
