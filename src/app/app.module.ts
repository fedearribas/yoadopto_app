import { Angular2TokenService } from 'angular2-token';
import { RouterModule } from '@angular/router';
import { AuthService } from './../pages/auth/auth.service';
import { LoginPage } from './../pages/auth/login/login';
import { AdoptionDetailPage } from './../pages/adoptions/adoption-detail/adoption-detail';
import { AdoptionsService } from './../pages/adoptions/adoptions.service';
import { AdoptionsPage } from './../pages/adoptions/adoptions';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AdoptionsPage,
    ListPage,
    AdoptionDetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdoptionsPage,
    ListPage,
    AdoptionDetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdoptionsService,
    Angular2TokenService,
    AuthService
  ]
})
export class AppModule {}
