import { Component, OnInit } from '@angular/core';

import { NeworganizationComponent } from '../neworganization/neworganization.component';

import { Organization } from 'src/app/model/organization';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  openNewOrganization = false;
  organization:Organization;
  userId:string;
  name:string;
  imageUrl:string;
  organizationName:string;
  organizationId:string;
  listOrganization:Organization[]=[];
  constructor(private organizationService : OrganizationService) { }

  ngOnInit() {
    this.userId=JSON.parse(localStorage.getItem("UserId"));
    this.name=JSON.parse(localStorage.getItem("Name"));
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
    this.organizationName = JSON.parse(localStorage.getItem("OrganizationName"));
    this.organizationId = JSON.parse(localStorage.getItem("OrganizationId"));
    this.organization={id:0,name:'',adminId:'',currentOrganization:false};
    this.getAll(this.userId);
  }
  openPopup()
  {
    this.openNewOrganization=!this.openNewOrganization;

  }
  getAll(userId:string)
  {
    this.organizationService.getAllOrganization(userId).subscribe(res=>{
      this.listOrganization=res as Organization[];
      console.log(this.listOrganization);
    });
  }
  switchOrganization(userId:string,id:number,oldId:number)
  {
    this.organizationService.switchOrganization(userId,id,oldId).subscribe(res=>{
      console.log(res);
    });
   // location.reload();
  }
  onSubmit()
  {
    this.organization.adminId=JSON.parse(localStorage.getItem("UserId"));
    console.log(this.organization);
    this.organizationService.postOrganization(this.organization).toPromise().then(res=>console.log(res));
    location.reload();
  }

}
