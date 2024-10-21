import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { Platform, ToastController } from '@ionic/angular'; 
import { BehaviorSubject, Observable } from 'rxjs'; 
import { Usuario } from '../class/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database!: SQLiteObject;
  tblUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT, contrasena VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL)";

  listaUsuario = new BehaviorSubject<Usuario[]>([]);  
  private isDbReady: 
    BehaviorSubject<boolean> = new BehaviorSubject(false); 


    constructor(private sqlite: SQLite, 
      private platform: Platform, 
      public toastController: ToastController,
      private afAuth: AngularFireAuth
    ) { 
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
                contrasena: res.rows.item(i).contrasena, 
                correo: res.rows.item(i).correo
              }); 
            }
            this.listaUsuario.next(items);
          }

        }); 
    }
    async addUsuario(contrasena: any, correo: any) { 
      let data = [contrasena , correo]; 
      await this.database.executeSql('INSERT INTO usuario(contrasena,correo) VALUES(?,?)', data); 
      this.cargarUsuario(); 
    } 


    async deleteUsuario(id: any) { 
      await this.database.executeSql('DELETE FROM usuario WHERE id=?', [id]); 
      this.cargarUsuario(); 
    } 
   
    dbState() { 
      return this.isDbReady.asObservable(); 
    } 
   
    async login(email: string, contrasena: string) {
      return this.afAuth.signInWithEmailAndPassword(email, contrasena);
    }
  
    async logout() {
      return this.afAuth.signOut();
    }
   
    async presentToast(mensaje: string) { 
      const toast = await this.toastController.create({ 
        message: mensaje, 
        duration: 3000 
      }); 
      toast.present();
  }
}
