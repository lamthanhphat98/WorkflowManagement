import { Component, OnInit } from '@angular/core';
import { ChecklistDashboard } from 'src/app/model/checklistdashboard';
import { DashboardService } from 'src/app/service/dashboard.service';

import { Route, Router } from '@angular/router';
import { ChecklistService } from 'src/app/service/checklist.service';
import { TemplateViewmodel } from 'src/app/model/templateViewModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categoryName:string;
  imageUrl:string;
  value:string;
  show=false;
  organizationId:number;
  userId:string;
  allList:ChecklistDashboard[]=[];
  listTemplate:ChecklistDashboard[]=[];
  listChecklist : ChecklistDashboard[] = [];
  templateName:string;
  template:TemplateViewmodel;
  constructor(private dashboardSerivce : DashboardService,private router:Router,private checklistService:ChecklistService) { }

  ngOnInit() {
    localStorage.removeItem("listTaskItem");
    localStorage.removeItem("currentPriorityEdit");
    this.organizationId =JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));
    setTimeout(()=>{
      if(this.userId.length==0)
      {
        this.router.navigateByUrl("");
      }
    },300);
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
   
    this.loadAllChecklists(this.organizationId,this.userId);

    setTimeout(() => {
      this.getTemplates();
    }, 300);
    setTimeout(() => {
      this.getChecklists();
      console.log(this.listChecklist);
      
    }, 300);
    //console.log(this.listTemplate);
    

  }
  minus()
  {
   this.show=!this.show;
  }
  loadAllChecklists(organizationId,userId)
  {
    this.dashboardSerivce.getChecklist(organizationId,userId).subscribe(res=>{
      this.allList=res as ChecklistDashboard[];  });
  }
  getChecklists()
  {
  
    this.listChecklist = this.allList.filter((res: any)=>{
      return res.templateId !==null ;
    });
  
 
  }

  getTemplates()
  {
    this.listTemplate = this.allList.filter((res: any)=>{
      return res.templateId === null;
    });

    console.log(this.listTemplate);
  }
  newTemplate()
  {
    console.log(this.templateName);
    this.template={id:0,userId:this.userId,name:this.templateName,description:'',organizationId:this.organizationId,templateId:null,templateStatus:'Template',timeCreated:null,category:this.categoryName}
    localStorage.setItem("nametemplate",this.templateName);
    this.checklistService.postTemplate(this.template).subscribe(res=>{
      console.log(res);
      var id = res as TemplateViewmodel
      localStorage.setItem("templateId",id.id.toString());;
    })
    
    setTimeout(()=>{
      this.router.navigateByUrl("/template/1");
  
    },300);


  }
  setStorageTemplate(templateName:string,templateId:number)
  {
    localStorage.setItem("CurrentTemplateId",templateId.toString());
    localStorage.setItem("CurrentTemplateName",templateName.toString());

    console.log(templateId);
console.log(templateName);
  }


}
