import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'  
})

export class LoginPage implements OnInit {

  signInUser = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSignInSubmit() {
    this.authService.signIn(this.signInUser)
      .subscribe(res => this.navCtrl.goToRoot({}));
  }

  loginWithFacebook(): void {
    this.authService.signInOAuth('facebook');
  }

}
