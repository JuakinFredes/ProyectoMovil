import { Injectable } from '@angular/core';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})


export class MascotasService {
  
  userId : any

  constructor(private autentificacion : AutentificacionService) { 
    this.autentificacion.obtenerUsuario().then(user =>{
      this.userId = user.uid
    })
  }
}
 