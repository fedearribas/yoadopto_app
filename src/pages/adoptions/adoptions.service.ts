import { Subject } from 'rxjs/Subject';
import { Adoption } from './adoption.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class AdoptionsService {

  private baseUrl = 'https://yoadopto-api-fedearribas.c9users.io/publications';
  private baseUrlFiltered = this.baseUrl + '/type/adoption';
  private currentUserHeader;
  public adoptions: Adoption[] = [];

  public adoptionsListChanged: Subject<Adoption[]> = new BehaviorSubject<Adoption[]>(null);

  constructor(private httpClient: HttpClient
             ) { }

  getAll(): Observable<Adoption[]> {
    if (this.adoptions) {
      this.adoptionsListChanged.next(this.adoptions);
    }
     this.httpClient.get<Adoption[]>(this.baseUrlFiltered).map(
      adoptions => adoptions)
      .subscribe(
      (res: Adoption[]) =>  {
        this.adoptions = res;
        this.adoptionsListChanged.next(this.adoptions);
      }
    );
    return this.adoptionsListChanged;
  }

  getAdoption(id: number): Observable<Adoption> {
    const ad = this.getAdoptionArray(id);
    if (ad) {
     return Observable.of(ad);
    } else {
      return this.httpClient.get<Adoption>(this.baseUrl + '/' + id).map(
        (adoption: Adoption) => {
          console.log(adoption);
          return adoption;
        }
      );
    }
  }

  getAdoptionArray(id: number): Adoption {
    return this.adoptions.find(x => x.id == id);
 }

  insertAdoption(adoption: Adoption) {
    return this.httpClient.post(this.baseUrl, adoption).map(
      (data: Adoption) => {
        this.adoptionsListChanged.next(this.adoptions);       
      });
    }

  /* updateAdoption(adoption: Adoption, redirect: boolean = true) {
    this.currentUserHeader = new HttpHeaders().set('CURRENTUSERID', this.authService.current_user.id.toString());
    return this.httpClient.put(this.baseUrl + '/' + adoption.id, adoption, {headers: this.currentUserHeader})
      .subscribe(
        (data: Adoption) => {
          const itemIndex = this.adoptions.findIndex(item => item.id == adoption.id);
          this.adoptions[itemIndex] = data;
          console.log('updated: ' + data);
          this.adoptionsListChanged.next(this.adoptions);
          if (redirect) {
            this.router.navigate(['/adoptions']);
          }
        },
        (error) => alert(error.error)
      );
  }

  deleteAdoption(adoption: Adoption) {
    return this.httpClient.delete(this.baseUrl + '/' + adoption.id).subscribe(
      (data) => {
        const itemIndex = this.adoptions.findIndex(item => item.id == adoption.id);
        this.adoptions.splice(itemIndex, 1);
        this.adoptionsListChanged.next(this.adoptions);
        this.router.navigate(['/adoptions']);
      }
    );
  } */
}
