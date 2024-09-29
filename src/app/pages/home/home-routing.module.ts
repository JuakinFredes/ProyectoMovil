import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ChomeComponent } from 'src/app/components/chome/chome.component';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { PetsComponent } from 'src/app/components/pets/pets.component';
import { PetPerfilComponent } from 'src/app/components/pet-perfil/pet-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'chome',
        component: ChomeComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'pets',
        component: PetsComponent
      },  
      {
        path: 'petperil',
        component: PetPerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class HomePageRoutingModule {}
