import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { Template } from '../model/template';
import {Observable} from 'rxjs/Observable';
import { ChecklistService } from './checklist.service';
import { Injectable } from '@angular/core';
import { ChecklistDetailViewModel } from '../model/checklistdetail';
import { ChecklistDashboard } from '../model/checklistdashboard';
import { DashboardService } from './dashboard.service';
import { OrganizationService } from './organization.service';
import { Checklist } from '../model/activity';

@Injectable({
    providedIn: 'root'
  })
export class GetAllChecklistResolver implements Resolve<ChecklistDashboard[]>
{
    id:number;
    userId:string;
    organizationId:number;
    allList:ChecklistDashboard[]=[];
    constructor(private checklistService:ChecklistService,private router:ActivatedRoute,
      private dashboardService:DashboardService,
      private organizationService : OrganizationService)
    {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<ChecklistDashboard[]>  {
  
        this.userId = JSON.parse(localStorage.getItem("UserId"));
       // this.userId = JSON.parse(localStorage.getItem("UserId"));
        console.log("Home");
       this.organizationService.getCurrentOrganization(this.userId).subscribe((res:any)=>{
        if(!res)
        {
          localStorage.setItem("OrganizationId",JSON.stringify("0"));
          this.organizationId =JSON.parse(localStorage.getItem("OrganizationId")); 
          console.log("false");
          return null;
        }
        else
        {
       
          localStorage.setItem("OrganizationName",JSON.stringify(res.name));
          localStorage.setItem("OrganizationId",JSON.stringify(res.id));     
          localStorage.setItem("Organization",JSON.stringify(res));    
          this.organizationId =JSON.parse(localStorage.getItem("OrganizationId")); 
          this.organizationService.getComment(this.organizationId,this.userId).subscribe((subRes:any)=>{
            console.log(subRes);
            localStorage.setItem("Notification",JSON.stringify(subRes));            
        });
         this.dashboardService.getChecklist(this.organizationId,this.userId).subscribe((subRes:any)=>{
           this.allList = subRes as ChecklistDashboard[];
          localStorage.setItem("allList",JSON.stringify(this.allList));    

         });  
        }    
      });   
         return null;
       // return this.checklistService.getChecklistDetail(this.organizationId,route.params.id,this.userId);
    }
    
}