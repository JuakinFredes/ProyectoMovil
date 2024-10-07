import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { Platform, ToastController } from '@ionic/angular'; 
import { BehaviorSubject, Observable } from 'rxjs'; 
import { Mascota } from '../class/mascota';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database!: SQLiteObject;
  tblMascota:string = "CREATE TABLE IF NOT EXISTS mascota(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255),especie VARCHAR(255) NOT NULL,raza VARCHAR(255),nomDueno VARCHAR(255));"
  tblUsuario:string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255),contrasena VARCHAR(255) NOT NULL,correo VARCHAR(255) NOT NULL"

  listaMascota = new BehaviorSubject<Mascota[]>([]);
  listaUsuario = new BehaviorSubject<Usuario[]>([]);  
  private isDbReady: 
    BehaviorSubject<boolean> = new BehaviorSubject(false); 


  constructor() {
   }
}
