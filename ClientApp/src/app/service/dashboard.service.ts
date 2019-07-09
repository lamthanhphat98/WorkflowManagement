import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChecklistDashboard } from '../model/checklistdashboard';
import { environment } from './../../environments/environment'
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getChecklist(organizationId,userId)
  {  
    if(organizationId==="None")
    {
      return null;
    }
    return this.http.get<ChecklistDashboard[]>(environment.apiUrl+"/checklists/get/"+organizationId+"/"+userId);
  }
}
