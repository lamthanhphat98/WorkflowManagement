import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/model/organization';
import { OrganizationService } from 'src/app/service/organization.service';
import { ActivatedRoute } from '@angular/router';

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
  notifications:number;

  
  constructor(private organizationService : OrganizationService,private route:ActivatedRoute) {   
  }

  ngOnInit() {
    this.userId=JSON.parse(localStorage.getItem("UserId"));
    this.name=JSON.parse(localStorage.getItem("Name"));
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
    this.oragization = JSON.parse(localStorage.getItem("Organization"));
    this.notifications = JSON.parse(localStorage.getItem("Notification"));
    if(this.notifications===null || this.notifications === undefined)
    {
      this.notifications=0;
    }
   // this.getCurrentOrganization(this.userId);
  }
  getCurrentOrganization(userId:string)
  {
    this.organizationService.getCurrentOrganization(userId).subscribe(res=>{
      if(!res)
      {
        localStorage.setItem("OrganizationId",JSON.stringify("None"));
        console.log("false");
      }
      else
      {
        this.oragization=res;
        console.log(this.oragization);
        localStorage.setItem("OrganizationName",JSON.stringify(this.oragization.name));
        localStorage.setItem("OrganizationId",JSON.stringify(this.oragization.id));
      }    
    });  
  }
  logout()
  {


    localStorage.clear();

  }

}
