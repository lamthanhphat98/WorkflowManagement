import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChecklistDashboard } from '../model/checklistdashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getChecklist(organizationId,userId)
  {  
  
    return this.http.get<ChecklistDashboard[]>("https://localhost:44306/api/checklists/get/"+organizationId+"/"+userId);
  }
}
