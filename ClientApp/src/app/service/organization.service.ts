import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../model/organization';
import { environment } from './../../environments/environment'
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http:HttpClient) { }

  getCurrentOrganization(userId)
  {  
    //return this.http.get<Organization>("https://localhost:44306/api/Organizations/current/2372592022969346");
    return this.http.get<Organization>(environment.apiUrl+"/Organizations/current/"+userId);
  }
  getComment(organizationId,userId)
  {  
    //return this.http.get<Organization>("https://localhost:44306/api/Organizations/current/2372592022969346");
    return this.http.get<Comment[]>(environment.apiUrl+"/Comments/notification/"+organizationId+"/"+userId);
  }
  getAllOrganization(userId)
  {  
    //return this.http.get<Organization>("https://localhost:44306/api/Organizations/current/2372592022969346");
    return this.http.get<Organization[]>(environment.apiUrl+"/Organizations/organizations/"+userId);
  }
  postOrganization(organization:Organization)
  {
    return this.http.post(environment.apiUrl+"/Organizations",organization);
    
  }
  switchOrganization(userId:string,targetId:number,oldId:number)
  {
    return this.http.put(environment.apiUrl+"/Organizations/switch/"+userId+"/"+targetId+"/"+oldId,null);
    
  }
}
