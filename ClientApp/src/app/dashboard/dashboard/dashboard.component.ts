import { Component, OnInit } from '@angular/core';
import { ChecklistDashboard } from 'src/app/model/checklistdashboard';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Checklist } from 'src/app/model/activity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageUrl:string;
  value:string;
  show=false;
  organizationId:number;
  userId:string;
  allList:ChecklistDashboard[]=[];
  listTemplate:ChecklistDashboard[]=[];
  listChecklist : ChecklistDashboard[] = [];
  constructor(private dashboardSerivce : DashboardService) { }

  ngOnInit() {
    this.organizationId =JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
    this.value="50%";
    this.loadAllChecklists(this.organizationId,this.userId);

    setTimeout(() => {
      this.getTemplates();
    }, 300);
    setTimeout(() => {
      this.getChecklists();
      
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


}
