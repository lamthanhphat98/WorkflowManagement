import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { TaskViewModel } from 'src/app/model/taskitem';
import { TaskitemService } from 'src/app/service/taskitem.service';
import { MemberService } from 'src/app/service/member.service';
import { User } from 'src/app/model/user';
import { TemplateViewmodel } from 'src/app/model/templateViewModel';
import { ChecklistService } from 'src/app/service/checklist.service';
import { Content } from 'src/app/model/contentdetail';
import { Template } from 'src/app/model/template';

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


  templateName: string;
  listTaskItem: TaskViewModel[] = [];
  listContentDetail: Content[] = [];
  id: number = 1;
  contentId: number = 0;
  datetime: any;
  dt: any;
  listUser: User[] = [];
  listMember: User[] = [];
  organizationId: number;
  templateId: number;
  userId: string;
  template: Template;
  currentPriority = 1;
  listAllContentDetail: Content[] = [];
  taskId: number = 1;
  isDataLoaded = false;
  taskName: string;
  currentDuetime: string;

  constructor(private checklistService: ChecklistService,
    private router: ActivatedRoute,
    private memberService: MemberService,
    private taskItemService: TaskitemService) {
    this.id = parseInt(this.router.snapshot.paramMap.get("id"));
    this.currentPriority = parseInt(this.router.snapshot.paramMap.get("taskid"));

    if (isNaN(this.currentPriority)) {
      //this.currentPriority=1;
      localStorage.setItem("currentPriorityEdit", '1');
    } else {
      this.currentPriority = JSON.parse(localStorage.getItem("currentPriorityEdit"));
    }

    this.listTaskItem = JSON.parse(localStorage.getItem("listTaskItem"));
    if (this.listTaskItem === undefined) {
      this.template = this.router.snapshot.data['template'] as Template;
      this.listTaskItem = this.router.snapshot.data['template'].taskItemViewModels;
    }


    console.log(this.router.snapshot.data['template']);



    console.log("priority : ");
    console.log(this.currentPriority);
    // mẹ lủng OOP rồi list = 1 nhưng index = 0 =,=
    //console.log(this.isDataLoaded);
    if (this.listTaskItem[this.currentPriority-1] !== undefined) {
      this.listContentDetail = this.listTaskItem.find((res: any) => {
        return res.priority == this.currentPriority;
      }).contentDetails;

      if (typeof this.listTaskItem[this.currentPriority-1].dueTime == 'string' && this.listTaskItem[this.currentPriority-1].dueTime.length == 0) {
        // var d = new Date();
        // var tommorow = d.getDate() + 1;

        // console.log(tommorow); // => 27 à ý là get cả day luôn, ok doi chut

        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        console.log(tomorrow);
        console.log(typeof tomorrow);
        console.log(tomorrow.toLocaleDateString() +' ' + tomorrow.toLocaleTimeString());
        this.currentDuetime=tomorrow.toLocaleDateString() +' ' + tomorrow.toLocaleTimeString();
        console.log(tomorrow.toLocaleString()); 
 
      } else {
      // rồi chuẩn r ông :D
      //à sẵn làm lại giúp tui cái này dễ lắm
      // tui muốn cái chữ màu đen nằm trên cái chữ ko đậm màu
      // Tài ơi
        this.currentDuetime = this.listTaskItem[this.currentPriority-1].dueTime;

        console.log(this.currentDuetime);

        // => tui muốn kiểm tra thằng này khác undefined s v ong
      }



      this.listContentDetail = this.listContentDetail as Content[];
      this.templateName = this.listTaskItem.find((res: any) => {
        return res.priority == this.currentPriority;
      }).name;

      // mở mic lên ông
      console.log(this.listContentDetail);

      this.taskId = this.listTaskItem.find((res: any) => {
        return res.priority == this.currentPriority;
      }).id;
      localStorage.setItem("TaskId", this.taskId.toString());
      this.listMember = this.listTaskItem.find((res: any) => {
        return res.priority == this.currentPriority;
      }).userId;
    }
    else {
      var d = new Date();
      var tommorow = d.getDate() + 1;
      console.log(tommorow);
      // tui muốn lấy ngày mai của ngày hôm nay
      //new Date() luc nao cung tra ve ngay hom nay


    }







  }
  ngOnInit() {

    console.log(this.taskId);
    this.templateId = JSON.parse(localStorage.getItem("templateId"));
    this.organizationId = JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));

    //resolver
    console.log(this.currentPriority);
    console.log(this.template);

    // setTimeout(()=>{
    //  // this.loadTemplate(this.organizationId, this.id, this.userId);
    //  this.checklistService.getTemplateWithPromise(this.organizationId,this.id,this.userId).then((res:any)=>{
    //   this.template=res as Template;
    //   this.listTaskItem = res.taskItemViewModels;
    //   this.isDataLoaded=true;
    //   console.log(this.listTaskItem);
    // });
    // },200);








    console.log('listCOntentDetail');
    console.log(this.listContentDetail);



  }

  loadTemplate(organizationId, templateId, userId) {
    this.checklistService.getTemplateWithPromise(organizationId, templateId, userId).then((res: any) => {
      this.template = res as Template;
      this.listTaskItem = res.taskItemViewModels;
      console.log(this.listTaskItem);
    });
    // this.checklistService.getTemplate(organizationId, templateId, userId).subscribe((res: any) => {
    //   this.template = res as Template;
    //   // console.log('load template');

    //   // console.log(res.taskItemViewModels);
    //   // this.listTaskItem = [];
    //   this.listTaskItem = res.taskItemViewModels;
    //   // this.listTaskItem = res.taskItemViewModels.map(item => ({ ...item }));
    //   // this.listTaskItem = [...res.taskItemViewModels]

    //   //  this.listTaskItem.map((e:any)=>{
    //   // this.listAllContentDetail.push(e.contentDetails);
    //   // this.listMember.push(e.userId);
    //   // });
    //   // listTaskItem

    //   // console.log(this.listMember);
    //   // console.log(this.template);
    //   // console.log(this.listTaskItem);
    //   // console.log(this.listAllContentDetail);
    // });
  }

  getMember(organizationId: number) {
    this.memberService.getMember(organizationId).subscribe(res => {
      this.listUser = res as User[];
      // console.log("a");
    });
  }
  addMemberToTask(user: User) {
    var userFilter = this.listMember.filter(res => res.id === user.id)[0];
    var currentTaskId = localStorage.getItem("TaskId");

    if (user !== userFilter) {
      this.listMember.push(user);

      console.log(this.listMember);
    };
    console.log(this.listTaskItem);
  }

  addTask() {
    //const d = new Date(this.datetime.toString());

    //console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
    // this.id = this.id + 1;
    console.log(this.id);
    var task: TaskViewModel = { id: this.id, dueTime: '', name: '', checklistId: this.templateId, contentDetails: [], priority: this.listTaskItem.length + 1, taskStatus: '', userId: [] };
    this.listTaskItem.push(task);
    console.log(this.listTaskItem);

  }
  save() {
    console.log(this.listTaskItem);
    if (this.datetime !== null) {
      const d = new Date(this.datetime.toString());
      console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
      var currentTaskId = localStorage.getItem("TaskId");

      this.listTaskItem.find((res: any) => {
        return res.id === parseInt(currentTaskId);
      }).dueTime = this.datetime.format("DD/MM/YYYY hh:mm:ss");
      this.listTaskItem.find((res: any) => {
        return res.id === parseInt(currentTaskId);
      }).userId = this.listMember;
      this.taskItemService.postListTask(this.listTaskItem).subscribe(res => {
        console.log(res);
      });
    }

  }
  addText() {

    var currentTaskId = localStorage.getItem("currentEditTask");
    console.log(currentTaskId);
    this.contentId = this.contentId + 1;
    var content: Content = { id: this.contentId, type: 'text', text: '', taskItemId: parseInt(currentTaskId), orderContent: this.listContentDetail.length + 1, imageSrc: '', label: '' };
    this.listContentDetail.push(content);
    // currentTask.contentDetail=this.listContentDetail;
    console.log(this.listTaskItem);
    console.log(this.listContentDetail);

    this.listTaskItem.find((res: any) => {
      return res.id === parseInt(currentTaskId);
    }).contentDetails = this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addImage() {
    var currentTaskId = localStorage.getItem("currentEditTask");
    this.contentId = this.contentId + 1;
    var content: Content = { id: this.contentId, type: 'img', text: '', taskItemId: parseInt(currentTaskId), orderContent: this.listContentDetail.length + 1, imageSrc: '', label: '' };
    this.listContentDetail.push(content);
    this.listTaskItem.find((res: any) => {
      return res.id === parseInt(currentTaskId);
    }).contentDetails = this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addCheckbox() {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId = this.contentId + 1;
    var content: Content = { id: this.contentId, type: 'checkbox-label', text: '', taskItemId: parseInt(currentTaskId), orderContent: this.listContentDetail.length + 1, imageSrc: '', label: '' };
    this.listContentDetail.push(content);
    // var currentTask = this.listTaskItem.find((res:any)=>{
    //   return res.id===parseInt(currentTaskId);
    //  });
    this.listTaskItem.find((res: any) => {
      return res.id === parseInt(currentTaskId);
    }).contentDetails = this.listContentDetail;
    console.log(this.listTaskItem);

  }
  setList(priority: number) {


    console.log(this.currentDuetime);
    console.log(this.currentPriority);

    console.log(priority);
    localStorage.setItem("currentPriorityEdit", priority.toString());
    //this.currentPriority = priority;
    console.log(this.listTaskItem);
    var currentTaskId = localStorage.getItem("TaskId");
 
      if (this.datetime !== undefined) {
        const d = new Date(this.datetime.toString());
        console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));
        this.listTaskItem.find((res: any) => {
          return res.id === parseInt(this.currentPriority.toString());
        }).dueTime = this.datetime.format("DD/MM/YYYY hh:mm:ss");
        this.listTaskItem.find((res: any) => {
          return res.id === parseInt(this.currentPriority.toString());
        }).userId = this.listMember;
        localStorage.setItem("listTaskItem", JSON.stringify(this.listTaskItem));
      }
      else
      {
        console.log(this.listTaskItem[this.currentPriority-1]);
        console.log("a");
        console.log(this.currentPriority);
        this.listTaskItem[this.currentPriority-1].dueTime = this.currentDuetime;
        this.listTaskItem[this.currentPriority-1].userId = this.listMember;
        localStorage.setItem("listTaskItem", JSON.stringify(this.listTaskItem));
      }
    
  }
  removeComponent(id: number) {
    console.log(id);
    this.listContentDetail.splice(id, 1);
  }
  changeTaskName(event: any) {
    this.templateName = event.target.value;
  }


}
