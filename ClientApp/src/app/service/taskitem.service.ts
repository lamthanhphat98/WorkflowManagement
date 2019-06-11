import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class TaskitemService {

  constructor(private http:HttpClient) { }
  postTask(taskViewModel:any) 
  {
    return this.http.post("https://localhost:44306/api/Taskitems",taskViewModel);

  }
  postListTask(taskViewModel:any) 
  {
    return this.http.post("https://localhost:44306/api/Taskitems/template",taskViewModel);

  }
}
