import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilMascoPageRoutingModule } from './perfil-masco-routing.module';

import { PerfilMascoPage } from './perfil-masco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilMascoPageRoutingModule
  ],
  declarations: [PerfilMascoPage]
})
export class PerfilMascoPageModule {}
