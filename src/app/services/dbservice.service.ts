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
  tblUsuario:string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(255) NOT NULL,contrasena VARCHAR(255) NOT NULL,correo VARCHAR(255) NOT NULL"

  listaMascota = new BehaviorSubject<Mascota[]>([]);
  listaUsuario = new BehaviorSubject<Usuario[]>([]);  
  private isDbReady: 
    BehaviorSubject<boolean> = new BehaviorSubject(false); 


    constructor(private sqlite: SQLite, 
      private platform: Platform, 
      public toastController: ToastController) { 
      this.crearBD(); 
    } 
   
    crearBD() { 
      this.platform.ready().then(() => { 
        this.sqlite.create({ 
          name: 'usuario.db', 
          location: 'default' 
        }).then((db: SQLiteObject) => { 
          this.database = db; 
          this.presentToast("BD creada"); 
          this.crearTablas(); 
        }).catch(e => this.presentToast(e)); 
      }) 
    } 
   
    async crearTablas() { 
      try { 
        await this.database.executeSql(this.tblUsuario, []); 
        this.presentToast("Tabla creada"); 
        this.cargarUsuario(); 
        this.isDbReady.next(true); 
      } catch (error) { 
        this.presentToast("Error en Crear Tabla: " + error); 
      } 
    } 
   

    cargarUsuario() { 
      let items: Usuario[] = []; 
      this.database.executeSql('SELECT * FROM usuario', []) 
        .then(res => { 
          if (res.rows.length > 0) { 
            for (let i = 0; i < res.rows.length; i++) { 
              items.push({ 
                id: res.rows.item(i).id, 
                nombre: res.rows.item(i).nombre, 
                contrasena: res.rows.item(i).contrasena, 
                correo: res.rows.item(i).correo
              }); 
            }
            this.listaUsuario.next(items);
          }

        }); 
    }
    async addUsuario(nombre: any, contrasena: any, correo: any) { 
      let data = [nombre, contrasena , correo]; 
      await this.database.executeSql('INSERT INTO usuario(nombre,contrasena,correo) VALUES(?,?,?)', data); 
      this.cargarUsuario(); 
    } 

    async updateUsuario(nombre: any, apellido: any, contrasena: any, correo: any) { 
      let data = [nombre, apellido, contrasena , correo]; 
      await this.database.executeSql('UPDATE usuario SET nombre=?, contrasena=? ,correo=? WHERE id=?', data); 
      this.cargarUsuario(); 
    } 

    async deleteUsuario(id: any) { 
      await this.database.executeSql('DELETE FROM usuario WHERE id=?', [id]); 
      this.cargarUsuario(); 
    } 
   
    dbState() { 
      return this.isDbReady.asObservable(); 
    } 
   
    fetchUsuario(): Observable<Usuario[]> { 
      return this.listaUsuario.asObservable(); 
    } 
   
    async presentToast(mensaje: string) { 
      const toast = await this.toastController.create({ 
        message: mensaje, 
        duration: 3000 
      }); 
      toast.present();
  }
}
