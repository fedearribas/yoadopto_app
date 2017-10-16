import { NavParams } from 'ionic-angular';
import { AdoptionsService } from './../adoptions.service';
import { Adoption } from './../adoption.model';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adoption-detail',
  templateUrl: './adoption-detail.html'
})
export class AdoptionDetailPage implements OnInit {

  adoption: Adoption;
  loadedMarked = false;

  constructor(private adoptionsService: AdoptionsService,
       private location: Location,
      private params: NavParams) {}

  ngOnInit() {
    this.adoption = this.params.get('adoption');
  }

}
