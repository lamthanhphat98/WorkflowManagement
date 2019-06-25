import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/service/member.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  listMember: User[];
  organizationId : number;
  organizationName:string;
  email:string;
  

  constructor(private memberService:MemberService) { }

  ngOnInit() {
  
    this.organizationId=JSON.parse(localStorage.getItem("OrganizationId"));
    this.organizationName=JSON.parse(localStorage.getItem("OrganizationName"));
    this.getMember(this.organizationId)
  }

  getMember(organizationId:number)
  {
    this.memberService.getMember(organizationId).subscribe(res=>{
           this.listMember=res as User[];
           console.log(this.listMember);
    });
  }
  inviteMember()
  {
    //console.log(this.email);
    this.memberService.inviteMember(this.organizationId,this.email).subscribe(res=>{
      console.log(res);
    })
  }
}
