import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearMascoPageRoutingModule } from './crear-masco-routing.module';

import { CrearMascoPage } from './crear-masco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearMascoPageRoutingModule
  ],
  declarations: [CrearMascoPage]
})
export class CrearMascoPageModule {}
