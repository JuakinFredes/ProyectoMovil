import { NgModule  } from '@angular/core';

import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { ChomeComponent } from 'src/app/components/chome/chome.component';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { PetsComponent } from 'src/app/components/pets/pets.component';
import { PetPerfilComponent } from 'src/app/components/pet-perfil/pet-perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  
  declarations: [HomePage,ChomeComponent, CalendarComponent,PetsComponent,PetPerfilComponent]
})
export class HomePageModule {}
