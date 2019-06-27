import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../model/activity';
import { Template } from '../model/template';
import { ChecklistDetailViewModel } from '../model/checklistdetail';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http:HttpClient) { }
  getActivity(organizationId,userId)
  {  
  
    return this.http.get<Checklist[]>("https://localhost:44306/api/checklists/activity/"+organizationId+"/"+userId);
  }
  runChecklist(checklist:any)
  {
    return this.http.post("https://localhost:44306/api/checklists/checklist",checklist);
  }
  postTemplate(template:any)
  {
    return this.http.post("https://localhost:44306/api/checklists/template",template);
  }
  getTemplate(organizationId,templateId,userId)
  {  
  
    return this.http.get<Template>("https://localhost:44306/api/checklists/template/"+organizationId+"/"+templateId+"/"+userId);
  }
  getChecklistDetail(organizationId,checklistId,userId)
  {  
  
    return this.http.get<ChecklistDetailViewModel>("https://localhost:44306/api/checklists/checklist/"+organizationId+"/"+checklistId+"/"+userId);
  }
  getTemplateWithPromise(organizationId,templateId,userId) : Promise<Template>
  {  
  
    return this.http.get<Template>("https://localhost:44306/api/checklists/template/"+organizationId+"/"+templateId+"/"+userId).toPromise();
  }
}
