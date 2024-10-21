import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  contrasena : string = "";
  correo : string = "";

  formRegistro: FormGroup;
  
  constructor(public router:Router,
              private dbservice: DbserviceService,
              public formBuilder: FormBuilder,
              public autentificacion : AutentificacionService,
              public loadingControl : LoadingController
            ) { }

  usuario: any[] = [];

  ngOnInit() {
    this.formRegistro = this.formBuilder.group({
      nombre : ['', [Validators.required]],
      email : ['', [Validators.required,
                    Validators.email
      ]],
      password : ['', [Validators.required,
                       Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]],
    }) 

  

  }


  get errorControl(){ 
      return this.formRegistro?.controls;
  }


  async registarFireBase() {
    const loading = await this.loadingControl.create();
    if(this.formRegistro?.valid){
      const user = await this.autentificacion.registrarUsuario(this.formRegistro.value.email,this.formRegistro.value.password)
      if(user){
        loading.dismiss()
        this.registrar()
        this.router.navigate(['/home'])
      }
    }
  }






  async registrar(){
    await this.dbservice.addUsuario( this.contrasena, this.correo); 
    console.log('Registrando usuario:', this.contrasena, this.correo);
  }
  
  ingresar(){
    this.router.navigate(['/home']);
  }

  regresar(){
    this.router.navigate(['/login']);
  }



}
