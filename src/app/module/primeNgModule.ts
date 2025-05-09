import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [], // Aqui você pode adicionar componentes, diretivas ou pipes compartilhados, se houver
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule
  ],
  exports: [
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule
  ],
})
export class PrimeNGModule {}