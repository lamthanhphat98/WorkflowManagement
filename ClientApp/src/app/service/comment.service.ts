import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentViewModel } from '../model/commentviewmodel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }
  getComment(organizationId,userId)
  {
    return this.http.get<CommentViewModel[]>("https://localhost:44306/api/Comments/comment/"+organizationId+"/"+userId);

  }
}
