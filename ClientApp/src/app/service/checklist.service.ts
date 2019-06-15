import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../model/activity';
import { Template } from '../model/template';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http:HttpClient) { }
  getActivity(organizationId,userId)
  {  
  
    return this.http.get<Checklist[]>("https://localhost:44306/api/checklists/activity/"+organizationId+"/"+userId);
  }
  postTemplate(template:any)
  {
    return this.http.post("https://localhost:44306/api/checklists/template",template);
  }
  getTemplate(organizationId,templateId,userId)
  {  
  
    return this.http.get<Template>("https://localhost:44306/api/checklists/template/"+organizationId+"/"+templateId+"/"+userId);
  }
  getTemplateWithPromise(organizationId,templateId,userId) : Promise<Template>
  {  
  
    return this.http.get<Template>("https://localhost:44306/api/checklists/template/"+organizationId+"/"+templateId+"/"+userId).toPromise();
  }
}
