import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }
}
