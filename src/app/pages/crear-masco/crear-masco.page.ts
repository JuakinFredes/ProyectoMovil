import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-crear-masco',
  templateUrl: './crear-masco.page.html',
  styleUrls: ['./crear-masco.page.scss'],
})
export class CrearMascoPage implements OnInit {

  userId:any;
  nombre:string;
  apellido:string;
  especie:string;
  raza:string;
  dueno:string;
  createdAt:any;

  constructor(private autentificacion : AutentificacionService) { }

  ngOnInit() {
    this.autentificacion.obtenerUsuario().then(user => (
      this.userId =user.uid
    ))
  }


  
}
