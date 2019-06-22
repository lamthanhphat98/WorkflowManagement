import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { TaskViewModel } from 'src/app/model/taskitem';
import { TaskitemService } from 'src/app/service/taskitem.service';
import { MemberService } from 'src/app/service/member.service';
import { User } from 'src/app/model/user';
import { TemplateViewmodel } from 'src/app/model/templateViewModel';
import { ChecklistService } from 'src/app/service/checklist.service';
import { Content } from 'src/app/model/contentdetail';
import { Template } from 'src/app/model/template';
import {  TaskItemDetailViewModel } from 'src/app/model/taskitemdetail';
import { ChecklistDetailViewModel } from 'src/app/model/checklistdetail';
import { CommentViewModel } from 'src/app/model/commentviewmodel';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  commentDetail:CommentViewModel;
  templateName: string;
  listTaskItem: TaskItemDetailViewModel[] = [];
  listComment:CommentViewModel[]=[];
  listContentDetail: Content[] = [];
  id: number = 1;
  contentId: number = 0;
  datetime: any;
  dt: any;
  listUser: User[] = [];
  listMember: User[] = [];
  organizationId: number;
  templateId: number;
  userId: string;
  template: ChecklistDetailViewModel;
  currentPriority = 1;
  listAllContentDetail: Content[] = [];
  taskId: number = 1;
  isDataLoaded=false;
  imageUrl:string;
  isDone:true;
  commentPriority=0;
  constructor(private checklistService: ChecklistService,
    private router: ActivatedRoute,
    private memberService: MemberService,
    private taskItemService: TaskitemService) {
      this.template=this.router.snapshot.data['checklist'] as ChecklistDetailViewModel;
      this.listTaskItem = this.router.snapshot.data['checklist'].taskItemViewModels;
      console.log(this.template);
  
      //console.log(this.currentPriority);
   
      this.currentPriority=JSON.parse(localStorage.getItem("currentPriorityChecklist"));
     
     
      if(isNaN(this.currentPriority))
      {
        this.currentPriority=1;
      }
      //console.log(this.isDataLoaded);
      this.listContentDetail = this.listTaskItem.find((res: any) => {
        return res.priority == this.currentPriority;

      }).contentDetails as Content[];
      this.listComment = this.listTaskItem.find((res: any) => {
        return res.priority == this.currentPriority;

      }).comments as CommentViewModel[];
      this.templateName = this.listTaskItem.find((res: any) => {
        return res.priority ==  this.currentPriority;
      }).name;


      console.log(this.templateName);


      this.listMember = this.listTaskItem.find((res: any) => {
        return res.priority ==  this.currentPriority;
      }).userId;
     }

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get("id"));
    this.taskId = parseInt(this.router.snapshot.paramMap.get("taskid"));
    localStorage.setItem("currentEditTask", this.taskId.toString());
    console.log(this.taskId);
    this.templateId = JSON.parse(localStorage.getItem("templateId"));
    this.organizationId = JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));

    //resolver
    console.log(this.currentPriority);
    console.log(this.template);
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
  }
  commingsoon()
  {
    alert("This feature will be comming soon");
  }
  setList(priority:number)
  {
    localStorage.setItem("currentPriorityChecklist",priority.toString());
  }
  comment()
  {
    this.commentPriority  = this.listComment.length +1;
    this.commentDetail = {Id:this.commentPriority,Comment1:'',IsRead:false,Priority:this.commentPriority,TaskId:this.taskId,UserId:'',UserImage:'',UserName:''}
    this.listComment.push(this.commentDetail);
    console.log(this.listComment);
  }

}
