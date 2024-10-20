import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideFirebaseApp,initializeApp  } from '@angular/fire/app';
import { getFirestore,provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            AngularFireModule,AngularFireAuthModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            provideFirebaseApp(() =>  initializeApp(environment.firebaseConfig)),
            provideFirestore(() => getFirestore())
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
