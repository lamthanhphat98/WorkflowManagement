import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/model/organization';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name:string;
  userId:string;
  imageUrl:string;
  oragization:Organization;
  constructor(private organizationService : OrganizationService) { }

  ngOnInit() {
    this.userId=JSON.parse(localStorage.getItem("UserId"));
    this.name=JSON.parse(localStorage.getItem("Name"));
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
    this.oragization = {id:0,adminId:'',currentOrganization:false,name:''};
    this.getCurrentOrganization(this.userId);
  }
  getCurrentOrganization(userId:string)
  {
    this.organizationService.getCurrentOrganization(userId).subscribe(res=>{
     this.oragization=res;
     console.log(this.oragization);
     localStorage.setItem("OrganizationName",JSON.stringify(this.oragization.name));
     localStorage.setItem("OrganizationId",JSON.stringify(this.oragization.id));
     
    });  
  }
  logout()
  {


    localStorage.clear();

  }

}
