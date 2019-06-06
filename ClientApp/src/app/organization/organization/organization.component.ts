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
  constructor(private organizationService : OrganizationService) { }

  ngOnInit() {
    this.organization={id:0,name:'',adminId:'',currentOrganization:false}
  }
  openPopup()
  {
    this.openNewOrganization=!this.openNewOrganization;

  }
  onSubmit()
  {
    this.organization.adminId=JSON.parse(localStorage.getItem("UserId"));
    console.log(this.organization);
    this.organizationService.postOrganization(this.organization).toPromise().then(res=>console.log(res));
  }

}
