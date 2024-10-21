import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  login:any={
   email:"",
   password:"" 
 }

 contrasena : string = "";
 correo : string = "";

 field:string="";

  formLogin: FormGroup;

   constructor(public router:Router, 
               public toastController:ToastController,
               public formBuilder: FormBuilder,
               public autentificacion : AutentificacionService,
               public loadingControl : LoadingController,
               public db : DbserviceService) { }
 
   ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email : ['', [Validators.required,
                    Validators.email
      ]],
      password : ['', [Validators.required,
                       Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]],
    })
    this.db.dbState().subscribe((ready: boolean) => {
      if (ready) {
        console.log('La base de datos está lista.');
        this.db.cargarUsuario();
      } else {
        console.log('La base de datos no está lista.');
      }
    }); 

   }


   get errorControl(){ 
    return this.formLogin?.controls;
  }

  async loginUsuario() {
    const loading = await this.loadingControl.create();
    if(this.formLogin?.valid){
      const user = await this.autentificacion.loginUsuario(this.formLogin.value.email,this.formLogin.value.password)
      if(user){
        loading.dismiss()
        this.registrar()
        this.router.navigate(['/home'])
      }
    }
    }


    async registrar() {
      await this.db.addUsuario(this.formLogin.value.password, this.formLogin.value.email);
      console.log('Registrando usuario:', this.formLogin.value.password, this.formLogin.value.email);
    }





  registro(){
    this.router.navigate(['/register']);
  }


  ingresar(){
    if(this.validateModel(this.login)){
      this.presentToast("middle","Bienvenido/a " + this.login.usuario);
      let navigationExtras : NavigationExtras ={
        state: {login: this.login}
      };
      this.router.navigate(['/home'],navigationExtras);
    }else{
      this.presentToast("middle","Error - Falta: " + this.field,3000);
    }    
  }




  validateModel(model:any){
    for(var [key,value] of Object.entries(model)){
      if(value == ""){
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
    });

    await toast.present();
  }

}