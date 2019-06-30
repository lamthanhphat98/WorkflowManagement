import { Injectable } from '@angular/core';

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
    return this.http.post("https://localhost:44306/api/FormCategories", formData,{headers:headers});
  }
  getImage()
  {
    console.log(headers);
    return this.http.get("https://localhost:44306/api/Values",{headers:headers,responseType:'text'}).toPromise();
  }
}
