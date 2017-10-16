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
  constructor(public navCtrl: NavController, private adoptionsService: AdoptionsService) {

  }

  ngOnInit() {
    this.adoptionsService.getAll().subscribe(
      res => this.adoptions = res
    );
  }
}
