import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilMascoPage } from './perfil-masco.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilMascoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilMascoPageRoutingModule {}
