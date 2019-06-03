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
  memberId : number;
  constructor(private memberService:MemberService) { }

  ngOnInit() {
  
    this.memberId=JSON.parse(localStorage.getItem("OrganizationId"));
    this.getMember(this.memberId)
  }

  getMember(memberId:number)
  {
    this.memberService.getMember(memberId).subscribe(res=>{
           this.listMember=res as User[];
           console.log(this.listMember);
    });
  }
}
