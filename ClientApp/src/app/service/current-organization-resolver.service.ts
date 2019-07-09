import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { Template } from '../model/template';
import {Observable} from 'rxjs/Observable';
import { ChecklistService } from './checklist.service';
import { Injectable } from '@angular/core';
import { ChecklistDetailViewModel } from '../model/checklistdetail';
import { ChecklistDashboard } from '../model/checklistdashboard';
import { DashboardService } from './dashboard.service';
import { OrganizationService } from './organization.service';
import { Organization } from '../model/organization';

@Injectable({
    providedIn: 'root'
  })
export class CurrentOrganizationResolver implements Resolve<Organization>
{
    id:number;
    userId:string;
    organizationId:number;
    constructor(private organizationService:OrganizationService,private router:ActivatedRoute,private dashboardService:DashboardService)
    {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Organization>  {
        this.userId = JSON.parse(localStorage.getItem("UserId"));
        console.log("Home");
      return  this.organizationService.getCurrentOrganization(this.userId);
        
    }
    
}