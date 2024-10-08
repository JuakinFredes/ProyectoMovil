import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre : string = "";
  contrasena : string = "";
  correo : string = "";

  constructor(public router:Router,
              private dbservice: DbserviceService
            ) { }

  usuario: any[] = [];

  ngOnInit() {}

  async registrar(){
    await this.dbservice.addUsuario(this.nombre, this.contrasena, this.correo); 
    console.log('Registrando usuario:', this.nombre, this.contrasena, this.correo);
  }
  
  ingresar(){
    this.router.navigate(['/home']);
  }

  regresar(){
    this.router.navigate(['/login']);
  }



}
