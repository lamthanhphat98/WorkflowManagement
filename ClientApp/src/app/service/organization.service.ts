import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../model/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http:HttpClient) { }

  getCurrentOrganization(userId)
  {  
    //return this.http.get<Organization>("https://localhost:44306/api/Organizations/current/2372592022969346");
    return this.http.get<Organization>("https://localhost:44306/api/Organizations/current/"+userId);
  }
  postOrganization(organization:Organization)
  {
    return this.http.post("https://localhost:44306/api/Organizations",organization);
    
  }
}
