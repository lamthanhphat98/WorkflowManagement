import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from './../../environments/environment'
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
