import { AuthService } from './../../auth/auth.service';
import { NavParams, NavController } from 'ionic-angular';
import { AdoptionsService } from './../adoptions.service';
import { Adoption } from './../adoption.model';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.html'
})
export class AdoptionFormPage implements OnInit {

  adoption = new Adoption;
  loadedMarked = false;
  adoptionForm: FormGroup;
  imageUrl = '';
  imageSelected = false;
  isSaving = false;

  constructor(private adoptionsService: AdoptionsService,
       private location: Location,
       public navCtrl: NavController,
       private authService: AuthService,
      private params: NavParams) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {       
    this.adoptionForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'image': new FormControl(null),
      'age': new FormControl(null, Validators.required),
      'ageUnit': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  readUrl(event) {
    console.log('tst');
    if (event.target.files && event.target.files[0]) {

      console.log(event);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.imageSelected = true;
       // console.log('imagen: ' + this.imageUrl);
      }
     reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSubmit(){
    const name = this.adoptionForm.value['name'];
    const description = this.adoptionForm.value['description'];
    const image = this.imageUrl;
    const age = this.adoptionForm.value['age'];
    const ageUnit = this.adoptionForm.value['ageUnit'];
    const phone = this.adoptionForm.value['phone'];
    const email = this.adoptionForm.value['email'];
    const location = this.adoptionForm.value['location'];

    console.log(name);
    console.log(this.adoptionForm);

    this.adoption.name = name;
    this.adoption.description = description;
    this.adoption.image = image;
    this.adoption.age = age;
    this.adoption.age_measurement_unit = ageUnit;
    this.adoption.contact_phone = phone;
    this.adoption.contact_email = email;
    this.adoption.location = location;
    this.adoption.publication_type = 'adoption';

    this.isSaving = true;
  
    const user = new User(this.authService.current_user.email, this.authService.current_user.name);
    user.id = this.authService.current_user.id;
    this.adoption.user = user;
    this.adoptionsService.insertAdoption(this.adoption).subscribe(
      res => {
        this.navCtrl.goToRoot({});
      }
    );
    
  }

}
