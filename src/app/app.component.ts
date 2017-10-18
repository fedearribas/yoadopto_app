import { AuthService } from './../pages/auth/auth.service';
import { LoginPage } from './../pages/auth/login/login';
import { Angular2TokenService } from 'angular2-token';
import { AdoptionsPage } from './../pages/adoptions/adoptions';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AdoptionsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public _tokenService: Angular2TokenService, 
    public authService: AuthService) {
    this.initializeApp();
  
    this.pages = [
      { title: 'Adopciones', component: AdoptionsPage },
      { title: 'Perdidos', component: ListPage }     
    ];

    this._tokenService.init({
      apiBase: 'https://yoadopto-api-fedearribas.c9users.io',
      oAuthBase: 'https://yoadopto-api-fedearribas.c9users.io',
      oAuthWindowType: 'sameWindow',
      oAuthPaths: {
        facebook: 'auth/facebook'
    },
      oAuthCallbackPath: 'oauth_callback'
    });
    this.authService.validateToken();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.signOut();
    this.nav.goToRoot({});
  }

  openPage(page) {   
    this.nav.setRoot(page.component);
  }

  openLoginPage() {
    this.nav.setRoot(LoginPage);
  }
}
