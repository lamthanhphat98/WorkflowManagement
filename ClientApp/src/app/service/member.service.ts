import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberComponent } from '../member/member/member.component';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  getMember(organizationId:number) 
  {
    return this.http.get<User[]>("https://localhost:44306/api"+"/UserOrganizations/member/"+organizationId);
  }
}
