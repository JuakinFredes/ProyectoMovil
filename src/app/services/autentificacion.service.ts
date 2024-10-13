import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  constructor(public ngFireAuth : AngularFireAuth) { }

  async registrarUsuario(email:string,password:string){
      return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }

  async loginUsuario(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async logoutUsuario(){
    return await this.ngFireAuth.signOut()
  }

  async obtenerUsuario(){
    return await this.ngFireAuth.currentUser
  }
}
