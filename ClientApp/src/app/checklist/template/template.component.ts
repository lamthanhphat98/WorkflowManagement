import { Component, OnInit } from '@angular/core';
import { TaskViewModel } from 'src/app/model/taskitem';
import { Content } from 'src/app/model/contentdetail';
import { ChecklistService } from 'src/app/service/checklist.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  templateName:string;
  listTaskItem : TaskViewModel[]=[];
  listContentDetail:Content[];
  id:number=1;
  contentId:number=0;
  constructor(private checklistService:ChecklistService,private router: ActivatedRoute) { 

  }

  ngOnInit() {
  
    this.id = parseInt(this.router.snapshot.paramMap.get("id"));
    if (!isNaN(this.id)) { 
      console.log(this.id);
      var getList = JSON.parse(localStorage.getItem("listTaskItem"));
      localStorage.setItem("TaskId",this.id.toString());
      if(getList===null)
      {
        
        this.listContentDetail=[{Id:0,ImageSrc:'',Type:'',Text:'',OrderContent:0,TaskItemId:this.id}];
        console.log(this.listContentDetail);
        var task:TaskViewModel = {id:this.id,dueTime:'',name:'',checklistId:0,contentDetail:[],priority:this.id,taskStatus:'',userId:[]};
        this.listTaskItem.push(task);
      }
      else{
        this.listContentDetail=[{Id:0,ImageSrc:'',Type:'',Text:'',OrderContent:0,TaskItemId:this.id}];
        this.listTaskItem=getList;
       
        console.log(this.listTaskItem);
      }
     
    }else{
      this.id=1;
      localStorage.setItem("TaskId",this.id.toString());
      this.listContentDetail=[{Id:0,ImageSrc:'',Type:'',Text:'',OrderContent:0,TaskItemId:1}];
      console.log(this.listContentDetail);
      var task:TaskViewModel = {id:1,dueTime:'',name:'',checklistId:0,contentDetail:[],priority:this.id,taskStatus:'',userId:[]};
      this.listTaskItem.push(task);
      
    }
    
  
    this.templateName=localStorage.getItem("nametemplate");
  }

  addTask()
  {
    this.id=this.id+1;
    console.log(this.id);
    var task:TaskViewModel = {id:this.id,dueTime:'',name:'',checklistId:0,contentDetail:[],priority:this.id,taskStatus:'',userId:[]};
    this.listTaskItem.push(task);
    console.log(this.listTaskItem);
   
  }
  save()
  {
    console.log(this.listTaskItem);
  }
  addText()
  {
    this.contentId=this.contentId+1;
    var currentTaskId = localStorage.getItem("TaskId");  
    console.log(currentTaskId);
    var content:Content = {Id:this.contentId,Type:'text',Text:'',TaskItemId:this.id,OrderContent:this.contentId,ImageSrc:''};
    this.listContentDetail.push(content);
   // currentTask.contentDetail=this.listContentDetail;
    this.listTaskItem.find((res:any)=>{
      return res.id===parseInt(currentTaskId);
     }).contentDetail=this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addImage()
  {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId=this.contentId+1;
    var content:Content = {Id:this.contentId,Type:'img',Text:'',TaskItemId:this.id,OrderContent:this.contentId,ImageSrc:''};
    this.listContentDetail.push(content);
    this.listTaskItem.find((res:any)=>{
      return res.id===parseInt(currentTaskId);
     }).contentDetail=this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addCheckbox()
  {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId=this.contentId+1;
    var content:Content = {Id:this.contentId,Type:'checkbox-label',Text:'',TaskItemId:this.id,OrderContent:this.contentId,ImageSrc:''};
    this.listContentDetail.push(content);
    // var currentTask = this.listTaskItem.find((res:any)=>{
    //   return res.id===parseInt(currentTaskId);
    //  });
     this.listTaskItem.find((res:any)=>{
      return res.id===parseInt(currentTaskId);
     }).contentDetail=this.listContentDetail;
    console.log(this.listTaskItem);

  }
  setList()
  {
    localStorage.setItem("listTaskItem",JSON.stringify(this.listTaskItem));
  }

}
