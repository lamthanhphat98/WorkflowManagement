import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { CommentViewModel } from 'src/app/model/commentviewmodel';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  listComments : CommentViewModel[] = [];
  organizationId:number;
  userId:string;

  constructor(private commentService:CommentService) { }

  ngOnInit() {
    this.organizationId =JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));
    this.getContent(this.organizationId,this.userId);

  }

  getContent(organizationId,userId)
  {
    this.commentService.getComment(organizationId,userId).subscribe(res=>{
      console.log(res);
      this.listComments=res as CommentViewModel[];
    });
  }
}
