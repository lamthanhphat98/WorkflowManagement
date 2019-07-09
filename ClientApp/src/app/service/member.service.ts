import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MemberComponent } from '../member/member/member.component';
import { User } from '../model/user';
import { environment } from './../../environments/environment'
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  getMember(organizationId:number) 
  {
    return this.http.get<User[]>(environment.apiUrl+"/UserOrganizations/member/"+organizationId);
  }
  inviteMember(organizationId:number,email:string)
  {
    return this.http.post(environment.apiUrl+"/UserOrganizations/invite/"+organizationId+"/"+email,null);

  }
}
