import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent  implements OnInit {

  userId:any;
  nombre:string;
  apellido:string;
  especie:string;
  raza:string;
  dueno:string;
  createdAt:any;

  constructor(private router:Router,
    private autentificacion : AutentificacionService
  ) { }

  ngOnInit() {
    this.autentificacion.obtenerUsuario().then(user => (
      this.userId =user.uid
    ))
  }


  perfilMascota(){
    this.router.navigate(['/petperil']);
  }

}
