import { Component, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/service/checklist.service';
import { Checklist } from 'src/app/model/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {


  name:string;
  userId:string;
  imageUrl:string;
  organizationName:string;
  organizationId:number;
  listActivity:Checklist[];
  constructor(private checklistService : ChecklistService) { }

   ngOnInit() {
    
    this.userId=JSON.parse(localStorage.getItem("UserId"));
    this.name=JSON.parse(localStorage.getItem("Name"));
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
    this.organizationName=JSON.parse(localStorage.getItem("OrganizationName"));
    this.organizationId=JSON.parse(localStorage.getItem("OrganizationId"));
     this.getActivity(this.organizationId,this.userId);
   
 
  }
  getActivity(organizationId,userId)
  {
   this.checklistService.getActivity(organizationId,userId).subscribe(res=>{
   this.listActivity=res as Checklist[];
   console.log(res);
     });
  }

}
