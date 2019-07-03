import { Component, OnInit } from '@angular/core';
import { ChecklistDashboard } from 'src/app/model/checklistdashboard';
import { DashboardService } from 'src/app/service/dashboard.service';

import { Route, Router, ActivatedRoute } from '@angular/router';
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
  notification:string='';
  constructor(private dashboardSerivce : DashboardService,private router:Router,private checklistService:ChecklistService,
    private route: ActivatedRoute,) {
      
        this.allList=route.snapshot.data['dashboard'];
        this.allList=JSON.parse(localStorage.getItem("allList"));
        console.log(this.allList);
        if (this.allList===null || this.allList === undefined || this.allList.length===0)
       {
         this.notification="You have not any organization now , create it !!!"
         console.log(this.notification);
       }            
       else if(this.allList!==null || this.allList !== undefined || this.allList.length!==0)
       {
          this.organizationId  = JSON.parse(localStorage.getItem("OrganizationId")); 
          this.getTemplates();
          this.getChecklists();
       }

    
    
 

   }

  ngOnInit() {
    localStorage.removeItem("listTaskItem");
    localStorage.removeItem("templateId");

    localStorage.removeItem("currentPriorityEdit");
     
      this.userId = JSON.parse(localStorage.getItem("UserId"));
      // this.loadAllChecklists(this.organizationId,this.userId);
       setTimeout(()=>{
         if(this.userId.length==0)
         {
           this.router.navigateByUrl("");
         }
       },300);
       this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));

   
  
       //console.log(this.listTemplate);
  
    

  }
  minus()
  {
   this.show=!this.show;
  }
  loadAllChecklists(organizationId,userId)
  {
    this.dashboardSerivce.getChecklist(organizationId,userId).subscribe(res=>{
      this.allList=res as ChecklistDashboard[]; 
      console.log(this.allList);
    });
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
    console.log(this.organizationId);
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
