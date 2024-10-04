import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearMascoPage } from './crear-masco.page';

const routes: Routes = [
  {
    path: '',
    component: CrearMascoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearMascoPageRoutingModule {}
