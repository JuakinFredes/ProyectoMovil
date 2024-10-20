import { Injectable } from '@angular/core';
import { AutentificacionService } from './autentificacion.service';
import { collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class Mascota{
  id?:string;
  userId:string;
  nombre:string;
  apellido:string;
  especie:string;
  raza:string;
  dueno:string;
  createdAt:any;

  constructor(userId:string,nombre:string,apellido:string,especie:string,raza:string,dueno:string,createdAt:any){
    this.userId = userId;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especie = especie;
    this.raza = raza;
    this.dueno = dueno;
    this.createdAt = createdAt;
  }
}

export class MascotasService {
  
  userId : any

  constructor(private autentificacion : AutentificacionService) { 
    this.autentificacion.obtenerUsuario().then(user =>{
      this.userId = user.uid
    })
  }

  crearMascota(mascota:Mascota){
    mascota.userId = this.userId
    const mascotaRef = collection
  }

}
 