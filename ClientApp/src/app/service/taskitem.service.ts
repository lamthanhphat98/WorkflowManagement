import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from './../../environments/environment'
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');
@Injectable({
  providedIn: 'root'
})
export class TaskitemService {

  constructor(private http:HttpClient) { }
  postTask(taskViewModel:any) 
  {
    return this.http.post(environment.apiUrl+"/Taskitems",taskViewModel);

  }
  postListTask(templateId:number,taskViewModel:any) 
  {
   //return this.http.post("https://localhost:44306/+"/Taskitems/template",taskViewModel);

   return this.http.post(environment.apiUrl+"/Taskitems/template/"+templateId,taskViewModel);

  }
  pathListTask(taskViewModel:any) 
  {
    return this.http.put(environment.apiUrl+"/Taskitems/taskitem",taskViewModel);

  }
}
