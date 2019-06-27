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
import { isNumber } from 'util';
import { DomSanitizer } from '@angular/platform-browser';



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
  taskId: number;
  isDataLoaded=false;
  imageUrl:string;
  isDone:true;
  commentPriority:number;
  dueTime:string;
  currentTemplateId:number =0;
  currentTaskId:number;
  constructor(private checklistService: ChecklistService,
    private router: ActivatedRoute,
    private memberService: MemberService,
    private taskItemService: TaskitemService,
    private domSanitizer :DomSanitizer ) {
      this.id = parseInt(this.router.snapshot.paramMap.get("id"));
      this.taskId = parseInt(this.router.snapshot.paramMap.get("taskid"));
     
      if(this.taskId===NaN)
      {
        //console.log("null");
        this.currentPriority=1;
        //localStorage.setItem("currentPriorityChecklist",'1');
      }
      else
      {
        this.currentPriority=JSON.parse(localStorage.getItem("currentPriorityChecklist"));
      }
      this.template=this.router.snapshot.data['checklist'] as ChecklistDetailViewModel;
      this.listTaskItem = this.router.snapshot.data['checklist'].taskItem;
      console.log(this.template);
      
      //console.log(this.currentPriority);
   
     
     
     
      console.log(this.listTaskItem);
      console.log(this.currentPriority);
      if(this.listTaskItem===null || this.listTaskItem === undefined || this.listTaskItem.length===0)
      {
        this.listTaskItem=[];
      }
      else
      {
        this.currentTaskId=this.listTaskItem[this.currentPriority-1].id;
        console.log(this.currentTaskId);
        this.listContentDetail = this.listTaskItem.find((res: any) => {
          return res.priority == this.currentPriority;
  
        }).contentDetails as Content[];
        this.listContentDetail.map((res:any)=>{
             res.imageSrc=this.domSanitizer.bypassSecurityTrustUrl(res.imageSrc);
        })
        this.dueTime = this.listTaskItem.find((res: any) => {
          return res.priority == this.currentPriority;
  
        }).dueTime as string;
        this.listMember = this.listTaskItem.find((res: any) => {
          return res.priority == this.currentPriority;
  
        }).userId as User[];
        console.log(this.listContentDetail);
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
    }

  ngOnInit() {
    this.currentTemplateId = parseInt(JSON.parse(localStorage.getItem("CurrentTemplateId")));
  
   // localStorage.setItem("currentEditTask", this.taskId.toString());
    //console.log(this.taskId);
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
    this.commentDetail = {Id:this.commentPriority,Comment1:'',IsRead:false,Priority:this.commentPriority,TaskId:this.currentTaskId,UserId:'',UserImage:'',UserName:''}
    this.listComment.push(this.commentDetail);
    console.log(this.listComment);
  }

}
