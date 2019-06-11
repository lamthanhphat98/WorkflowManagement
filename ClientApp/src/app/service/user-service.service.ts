import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  
  constructor(private http:HttpClient) { }
  addUser(user:User)
  {
    return this.http.post("https://localhost:44306/api"+"/Users/login/admin",user);
  }
  
}
