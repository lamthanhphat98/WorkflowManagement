import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'

import { CreateformComponent } from '../form/createform/createform.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');

@Injectable({
  providedIn: 'root'
})
export class FormcategoryService {

  constructor(private http:HttpClient) { }
  post(formData: any)
  {
    return this.http.post(environment.apiUrl+"/FormCategories", formData,{headers:headers});
  }
  getImage()
  {
    console.log(headers);
    return this.http.get(environment.apiUrl+"/Values",{headers:headers,responseType:'text'}).toPromise();
  }
}
