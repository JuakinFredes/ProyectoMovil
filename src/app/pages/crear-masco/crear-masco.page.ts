import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { Mascota, MascotasService } from 'src/app/services/mascotas.service';

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

  constructor(private autentificacion : AutentificacionService,
              private router :Router,
              private mascota : MascotasService,
              private toast : ToastController) { }

  agragarMascota(){
    const nuevaMascota = new Mascota(
      this.userId,
      this.nombre,
      this.apellido,
      this.especie,
      this.raza,
      this.dueno,
      this.createdAt
    );
    console.log('Mascota:', nuevaMascota);

    this.mascota.crearMascota(nuevaMascota).then((async ()=>{
                                const toast = await this.toast.create({
                                  message:"mascota agragada correctamente",
                                  duration:2000
                                })
                                toast.present()
                               })).catch(async (error)=>{
                                const toast = await this.toast.create({
                                  message: error,
                                  duration: 2000
                                })
                                toast.present()
                               })
    }
    
  mascotaAgregada(){
    this.agragarMascota()
    this.router.navigate(['/home/pets'])
  }

  ngOnInit() {
    this.autentificacion.obtenerUsuario().then(user => (
      this.userId =user.uid
    ))
  }

  

}
