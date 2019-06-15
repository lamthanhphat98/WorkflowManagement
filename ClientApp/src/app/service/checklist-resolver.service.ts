import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { Template } from '../model/template';
import {Observable} from 'rxjs/Observable';
import { ChecklistService } from './checklist.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ChecklistResolverService implements Resolve<Template>
{
    id:number;
    userId:string;
    organizationId:number;
    constructor(private checklistService:ChecklistService,private router:ActivatedRoute)
    {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Template>  {
        this.id = parseInt(this.router.snapshot.paramMap.get("id"));
        
        this.organizationId = JSON.parse(localStorage.getItem("OrganizationId"));
        this.userId = JSON.parse(localStorage.getItem("UserId"));
        return this.checklistService.getTemplate(this.organizationId,route.params.id,this.userId);
    }
    
}