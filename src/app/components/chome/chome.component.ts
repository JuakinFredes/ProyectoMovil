import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController, IonButton } from '@ionic/angular';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-chome',
  templateUrl: './chome.component.html',
  styleUrls: ['./chome.component.scss'],
})
export class ChomeComponent  implements OnInit {

  @ViewChildren(IonButton, {read: ElementRef})
  btn!: QueryList<ElementRef<HTMLIonButtonElement>>;

  private animation! : Animation;

  constructor(private animationCtrl:AnimationController,
              public router:Router,
              public autentificacion : AutentificacionService){ }

  ngOnInit() {}
  ngAfterViewInit(){
    const salir = this.animationCtrl
    .create()
    .addElement(this.btn.get(0)!.nativeElement)
    .fromTo('opacity', '0.2', '1');;

    this.animation=this.animationCtrl
    .create()
    .duration(3000)
    .iterations(1)
    .addAnimation([salir]);

    this.animation.play();
  }
  async logoutUsuario(){
    this.autentificacion.logoutUsuario();
    this.router.navigate(['/login']);
  }
  
}
