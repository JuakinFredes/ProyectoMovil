import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  //declarar un modelo para obtener los input del login
  login:any={
   email:"",
   password:"" 
 }
 //defino una variable para indicar el campo vacío
 field:string="";

  formLogin: FormGroup;

   constructor(public router:Router, 
               public toastController:ToastController,
               public formBuilder: FormBuilder,
              public autentificacion : AutentificacionService) { }
 
   ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email : ['', [Validators.required,
                    Validators.email
      ]],
      password : ['', [Validators.required,
                       Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]],
    }) 

   }


   get errorControl(){ 
    return this.formLogin?.controls;
  }

  async loginUsuario() {
    if(this.formLogin?.valid){
      //const user = await this.autentificacion.registrarUsuario(email,password)
    }
    }








  registro(){
    this.router.navigate(['/register']);
  }


  ingresar(){
    if(this.validateModel(this.login)){
      this.presentToast("middle","Bienvenido/a " + this.login.usuario);
      //agrego creación de NavigationExtras para pasar parámetros a ota page
      let navigationExtras : NavigationExtras ={
        state: {login: this.login}
      };
      this.router.navigate(['/home'],navigationExtras);
    }else{
      this.presentToast("middle","Error - Falta: " + this.field,3000);
    }    
  }



  /**
     * validateModel sirve para validar que se ingrese algo en los
     * campos del html mediante su modelo
     */
  validateModel(model:any){
    //Recorro el modelo 'login' revisando las entradas del Object
    for(var [key,value] of Object.entries(model)){
      //si un valor es "" retorno falso e indico el nombre del campo que falta
      if(value == ""){
        //rescato el nombre del campo vacío
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