import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskViewModel } from 'src/app/model/taskitem';
import { Content } from 'src/app/model/contentdetail';
import { ChecklistService } from 'src/app/service/checklist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { User } from 'src/app/model/user';
import { MemberService } from 'src/app/service/member.service';
import { TaskitemService } from 'src/app/service/taskitem.service';

export const MY_CUSTOM_FORMATS = {
  parseInput: 'dd/MM/yyyy HH:mm || dd/MM/yyyy', // custom support for multiple date input types separated by ||
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'dd/MM/yyyy',
  timePickerInput: 'HH:mm',
  monthYearLabel: 'MMM yyyy',
  dateA11yLabel: 'dd/MM/yyyy',
  monthYearA11yLabel: 'MMMM yyyy',
}; 
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})
export class TemplateComponent implements OnInit {

  templateName:string;
  listTaskItem : TaskViewModel[]=[];
  listContentDetail:Content[];
  id:number=1;
  contentId:number=0;
  datetime: any;
  dt:any;
  listUser:User[]=[];
  listMember:User[]=[];
  organizationId:number;
  templateId:number;
  taskName:string;
  constructor(private checklistService:ChecklistService,
    private router: ActivatedRoute,
    private route:Router,
    private memberService:MemberService,
    private taskItemService:TaskitemService) { 

  }

  ngOnInit() {
    //localStorage.removeItem("listTaskItem");
    this.id = parseInt(this.router.snapshot.paramMap.get("id"));
    this.templateId = JSON.parse(localStorage.getItem("templateId")); 
    this.organizationId = JSON.parse(localStorage.getItem("OrganizationId")); 
    if (!isNaN(this.id)) { 
      console.log(this.id);
      var getList = JSON.parse(localStorage.getItem("listTaskItem"));
      //console.log(getList);
      localStorage.setItem("TaskId",this.id.toString());
      if(getList===null)
      {
        
        this.listContentDetail=[{id:0,imageSrc:'',type:'',text:'',orderContent:0,taskItemId:this.id,label:''}];
        console.log(this.listContentDetail);
        var task:TaskViewModel = {id:this.id,dueTime:'',name:'',checklistId:this.templateId,contentDetails:[],priority:this.id,taskStatus:'',userId:[]};
        this.listTaskItem.push(task);
      }
      else{
        //this.listMember=[{id:'',email:'',name:'',phone:'',type:'',avatar:''}];
        this.listContentDetail=[{id:0,imageSrc:'',type:'',text:'',orderContent:0,taskItemId:this.id,label:''}];
//        this.listContentDetail=[{Id:0,ImageSrc:'',Type:'',Text:'',OrderContent:0,TaskItemId:this.id,Label:''}];
        this.listTaskItem=getList;
       
        console.log(this.listTaskItem);
      }
     
    }else{
      this.id=1;
      localStorage.setItem("TaskId",this.id.toString());
      this.listContentDetail=[{id:0,imageSrc:'',type:'',text:'',orderContent:0,taskItemId:1,label:''}];
      console.log(this.listContentDetail);
      var task:TaskViewModel = {id:1,dueTime:'',name:'',checklistId:this.templateId,contentDetails:[],priority:this.id,taskStatus:'',userId:[]};
      this.listTaskItem.push(task);    
    }
    
  setTimeout(()=>{
      this.getMember(this.organizationId);
  },300);
    this.templateName=localStorage.getItem("nametemplate");
  }

  getMember(organizationId:number) 
  {
    this.memberService.getMember(organizationId).subscribe(res=>{
     this.listUser = res as User[];
    // console.log("a");
    });
  }
  addMemberToTask(user:User)
  {
   var userFilter = this.listMember.filter(res=>res.id===user.id)[0];
   var currentTaskId = localStorage.getItem("TaskId");  

   if(user !==userFilter)
   { 
    this.listMember.push(user);
 
    console.log(this.listMember);
   };
   console.log(this.listTaskItem);
  }

  addTask()
  {
    //const d = new Date(this.datetime.toString());
    
    //console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
    this.id=this.id+1;
    console.log(this.id);
    var task:TaskViewModel = {id:this.id,dueTime:'',name:'',checklistId:this.templateId,contentDetails:[],priority:this.id,taskStatus:'',userId:[]};
    this.listTaskItem.push(task);
    console.log(this.listTaskItem);
   
  }
  save()
  {
    console.log(this.listTaskItem);
    if(this.datetime!=null)
    {
      const d = new Date(this.datetime.toString()); 
      console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
      var currentTaskId = localStorage.getItem("TaskId");
       
      this.listTaskItem.find((res:any)=>{
        return res.id===parseInt(currentTaskId);
       }).dueTime = this.datetime.format("DD/MM/YYYY hh:mm:ss");      
       this.listTaskItem.find((res:any)=>{
        return res.id===parseInt(currentTaskId);
       }).userId=this.listMember;
      this.taskItemService.postListTask(this.listTaskItem).subscribe(res=>{
        console.log(res);
      });
    }
    setTimeout(()=>{
        this.route.navigateByUrl("/dashboard");
    },500);

  }
  addText()
  {
    this.contentId=this.contentId+1;
    var currentTaskId = localStorage.getItem("TaskId");  
    console.log(currentTaskId);
    var content:Content = {id:this.contentId,type:'text',text:'',taskItemId:this.id,orderContent:this.contentId,imageSrc:'',label:''};
    this.listContentDetail.push(content);
   // currentTask.contentDetail=this.listContentDetail;
    this.listTaskItem.find((res:any)=>{
      return res.id===parseInt(currentTaskId);
     }).contentDetails=this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addImage()
  {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId=this.contentId+1;
    var content:Content = {id:this.contentId,type:'img',text:'',taskItemId:this.id,orderContent:this.contentId,imageSrc:'',label:''};
   // var content:Content = {Id:this.contentId,Type:'img',Text:'',TaskItemId:this.id,OrderContent:this.contentId,ImageSrc:'',Label:''};
    this.listContentDetail.push(content);
    this.listTaskItem.find((res:any)=>{
      return res.id===parseInt(currentTaskId);
     }).contentDetails=this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addCheckbox()
  {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId=this.contentId+1;
    var content:Content = {id:this.contentId,type:'checkbox-label',text:'',taskItemId:this.id,orderContent:this.contentId,imageSrc:'',label:''};
  //  var content:Content = {Id:this.contentId,Type:'checkbox-label',Text:'',TaskItemId:this.id,OrderContent:this.contentId,ImageSrc:'',Label:''};
    this.listContentDetail.push(content);
    // var currentTask = this.listTaskItem.find((res:any)=>{
    //   return res.id===parseInt(currentTaskId);
    //  });
     this.listTaskItem.find((res:any)=>{
      return res.id===parseInt(currentTaskId);
     }).contentDetails=this.listContentDetail;
    console.log(this.listTaskItem);

  }
  setList()
  {
    var currentTaskId = localStorage.getItem("TaskId");
    if(this.datetime!==null)
    {   
      const d = new Date(this.datetime.toString()); 
      console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
       
      this.listTaskItem.find((res:any)=>{
        return res.id===parseInt(currentTaskId);
       }).dueTime = this.datetime.format("DD/MM/YYYY hh:mm:ss");      
       this.listTaskItem.find((res:any)=>{
        return res.id===parseInt(currentTaskId);
       }).userId=this.listMember;
      localStorage.setItem("listTaskItem",JSON.stringify(this.listTaskItem));
    }
 
    
    
  }
  removeComponent(id:number)
  {
    console.log(id);
    this.listContentDetail.splice(id,1);
  }
  changeTaskName(event:any)
  {
     this.taskName=event.target.value;
  }
  setTargetTextarea(taskPriority:number)
  {
    console.log(taskPriority);
    console.log(this.listTaskItem);
    localStorage.setItem("currentTargetTextarea",taskPriority.toString());
  }
}
