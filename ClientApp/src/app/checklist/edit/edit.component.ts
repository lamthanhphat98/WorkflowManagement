import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { TaskViewModel } from 'src/app/model/taskitem';
import { TaskitemService } from 'src/app/service/taskitem.service';
import { MemberService } from 'src/app/service/member.service';
import { User } from 'src/app/model/user';

// const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
  parseInput: 'dd/MM/yyyy HH:mm || dd/MM/yyyy', // custom support for multiple date input types separated by ||
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'dd/MM/yyyy',
  timePickerInput: 'HH:mm',
  monthYearLabel: 'MMM yyyy',
  dateA11yLabel: 'dd/MM/yyyy',
  monthYearA11yLabel: 'MMMM yyyy',
};

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})
export class EditComponent implements OnInit {
  // public dateTime = new moment();
  datetime: any;
  id: string;
  priority: string[] = ['1', '2', '3'];
  first: string[] = [];
  showTime: false;
  dt: any;
  listMember:User[]=[];
  listUser:User[]=[{id:'',email:'',name:'',phone:'',type:'',avatar:''}];
  organizationId:number;
  taskViewModel:TaskViewModel={id:0,checklistId:2,dueTime:"",name:'',priority:1,taskStatus:'',userId:[],contentDetails:[]};
  constructor(private router: ActivatedRoute,private taskItemService:TaskitemService,private memberService:MemberService) { }

  ngOnInit() {
    this.organizationId = JSON.parse(localStorage.getItem("OrganizationId")); 
    console.log(this.listUser);
    setTimeout(() => {
      this.getMember(this.organizationId);
    }, 300);
  

    // this.id = this.router.snapshot.paramMap.get("id");
    // console.log(this.id);
    // if (this.id === null) {
    //   this.first = this.priority.filter(f => {
    //     return f.valueOf() === "1";
    //   });
    //   console.log(this.first);

    // }
    // else {
    //   console.log("OK");
    // }
    // if(this.id!==NaN)
    // {
    //   console.log("OK");  

    // }
    // else
    // {
    //   this.first = this.priority.filter(f=>{
    //     return f.valueOf()==="1";
    //   });
    //   console.log(this.first);
    // }

   
  }
  getMember(organizationId:number) 
  {
    this.memberService.getMember(organizationId).subscribe(res=>{
     this.listUser = res as User[];
    // console.log("a");
    });
  }
  save()
  {
    const d = new Date(this.datetime.toString()); 
    console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
    console.log(d);
    console.log(this.taskViewModel.dueTime);
    this.taskViewModel.dueTime = this.datetime.format("DD/MM/YYYY hh:mm:ss"); 
        //console.log(this.listUser);
    this.taskItemService.postTask(this.taskViewModel).subscribe(res=>{
      console.log(res);
    })

  }
  addMemberToTask(user:User)
  {
   var userFilter = this.listMember.filter(res=>res.id===user.id)[0];
   if(user !==userFilter)
   {
    this.listMember.push(user);
    
    console.log(this.listMember);
   } 
  }
 

}
