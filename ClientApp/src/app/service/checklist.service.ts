import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../model/activity';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http:HttpClient) { }
  getActivity(organizationId,userId)
  {  
  
    return this.http.get<Checklist[]>("https://localhost:44306/api/checklists/activity/"+organizationId+"/"+userId);
  }
}
