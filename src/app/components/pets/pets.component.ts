import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  perfilMascota(){
    this.router.navigate(['/petperil']);
  }

}
