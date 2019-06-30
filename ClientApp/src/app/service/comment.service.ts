import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentViewModel } from '../model/commentviewmodel';
const header = new HttpHeaders();
header.append('Content-Type','application/json');
var token = localStorage.getItem("Token");
header.append("Authorization", "Bearer " + token);

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http:HttpClient) { }

  getComment(organizationId,userId)
  {
    return this.http.get<CommentViewModel[]>("https://localhost:44306/api/Comments/comment/"+organizationId+"/"+userId,{headers:header});

  }
}
