import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { CommentViewModel } from '../model/commentviewmodel';
var token = JSON.parse(localStorage.getItem("Token"));
 const headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http:HttpClient) { }

  getComment(organizationId,userId)
  {
    return this.http.get<CommentViewModel[]>(environment.apiUrl+"/Comments/comment/"+organizationId+"/"+userId,{headers:headers});

  }
}
