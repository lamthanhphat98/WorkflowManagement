import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from './../../environments/environment'
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  
  constructor(private http:HttpClient) { }
  
  addUser(user:User)
  {
    
    return this.http.post(environment.apiUrl+"/Users/login/admin",user);
  }
  
}
