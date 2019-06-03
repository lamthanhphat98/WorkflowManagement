import { Component, OnInit } from '@angular/core';
import { ChecklistDashboard } from 'src/app/model/checklistdashboard';
import { DashboardService } from 'src/app/service/dashboard.service';

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
  listChecklist : ChecklistDashboard[] = [];
  constructor(private dashboardSerivce : DashboardService) { }

  ngOnInit() {
    this.organizationId =JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
    this.value="50%";
    this.getChecklists(this.organizationId,this.userId);
  }
  minus()
  {
   this.show=!this.show;
  }
  getChecklists(organizationId,userId)
  {
    this.dashboardSerivce.getChecklist(organizationId,userId).subscribe(res=>{
      this.listChecklist=res as ChecklistDashboard[];
      console.log(res);
    })

  }

}
