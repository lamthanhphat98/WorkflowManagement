import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Checklist } from '../model/activity';
import { Template } from '../model/template';
import { ChecklistDetailViewModel } from '../model/checklistdetail';
import { environment } from './../../environments/environment'
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http:HttpClient) { }
  getActivity(organizationId,userId)
  {  
  
    return this.http.get<Checklist[]>(environment.apiUrl+"/checklists/activity/"+organizationId+"/"+userId);
  }
  runChecklist(checklist:any)
  {
    return this.http.post(environment.apiUrl+"/checklists/checklist",checklist);
  }
  postTemplate(template:any)
  {
   // return this.http.post("https://localhost:44306/api"+"/checklists/template",template);

    return this.http.post(environment.apiUrl+"/checklists/template",template);
  }
  getTemplate(organizationId,templateId,userId)
  {  
  
    return this.http.get<Template>(environment.apiUrl+"/checklists/template/"+organizationId+"/"+templateId+"/"+userId);
  }
  getChecklistDetail(organizationId,checklistId,userId)
  {  
  
    return this.http.get<ChecklistDetailViewModel>(environment.apiUrl+"/checklists/checklist/"+organizationId+"/"+checklistId+"/"+userId);
  }
  getTemplateWithPromise(organizationId,templateId,userId) : Promise<Template>
  {  
  
    return this.http.get<Template>(environment.apiUrl+"/checklists/template/"+organizationId+"/"+templateId+"/"+userId).toPromise();
  }
}
