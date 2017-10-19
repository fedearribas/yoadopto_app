import { AuthService } from './../auth/auth.service';
import { AdoptionFormPage } from './adoption-form/adoption-form';
import { AdoptionDetailPage } from './adoption-detail/adoption-detail';
import { AdoptionsService } from './adoptions.service';
import { Adoption } from './adoption.model';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-adoptions',
  templateUrl: 'adoptions.html'
})
export class AdoptionsPage implements OnInit {

  adoptions: Adoption[];
  constructor(public navCtrl: NavController, 
    private adoptionsService: AdoptionsService,
    public authService: AuthService) {}

  ngOnInit() {
    this.adoptionsService.getAll().subscribe(
      res => this.adoptions = res
    );
  }

  onAdoptionClick(adoption: Adoption) {
    this.navCtrl.push(AdoptionDetailPage, {adoption: adoption});
  }

  addAdoption() {
    this.navCtrl.push(AdoptionFormPage);
  }
}
