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
  isDataLoaded=false;

  constructor(private checklistService: ChecklistService,
    private router: ActivatedRoute,
    private memberService: MemberService,
    private taskItemService: TaskitemService) {
      this.template=this.router.snapshot.data['template'] as Template;
      this.listTaskItem = this.router.snapshot.data['template'].taskItemViewModels;
      if (this.currentPriority == 1) {
       // console.log(this.isDataLoaded);
      this.listContentDetail = this.listTaskItem.find((res: any) => {
        return res.priority == 1;

      }).contentDetails as Content[];
      this.templateName = this.listTaskItem.find((res: any) => {
        return res.priority == 1;
      }).name;


      console.log(this.templateName);


      this.listMember = this.listTaskItem.find((res: any) => {
        return res.priority == 1;
      }).userId;
    }

  }
  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get("id"));
    this.taskId = parseInt(this.router.snapshot.paramMap.get("taskid"));
    localStorage.setItem("currentEditTask", this.taskId.toString());
    console.log(this.taskId);
    this.templateId = JSON.parse(localStorage.getItem("templateId"));
    this.organizationId = JSON.parse(localStorage.getItem("OrganizationId"));
    this.userId = JSON.parse(localStorage.getItem("UserId"));

    //resolver
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
    this.checklistService.getTemplateWithPromise(organizationId,templateId,userId).then((res:any)=>{
      this.template=res as Template;
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
    this.id = this.id + 1;
    console.log(this.id);
    var task: TaskViewModel = { id: this.id, dueTime: '', name: '', checklistId: this.templateId, contentDetails: [], priority: this.id, taskStatus: '', userId: [] };
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
    this.contentId = this.contentId + 1;
    var currentTaskId = localStorage.getItem("TaskId");
    console.log(currentTaskId);
    var content: Content = { Id: this.contentId, Type: 'text', Text: '', TaskItemId: this.id, OrderContent: this.contentId, ImageSrc: '', Label: '' };
    this.listContentDetail.push(content);
    // currentTask.contentDetail=this.listContentDetail;
    this.listTaskItem.find((res: any) => {
      return res.id === parseInt(currentTaskId);
    }).contentDetails = this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addImage() {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId = this.contentId + 1;
    var content: Content = { Id: this.contentId, Type: 'img', Text: '', TaskItemId: this.id, OrderContent: this.contentId, ImageSrc: '', Label: '' };
    this.listContentDetail.push(content);
    this.listTaskItem.find((res: any) => {
      return res.id === parseInt(currentTaskId);
    }).contentDetails = this.listContentDetail;
    console.log(this.listTaskItem);
  }
  addCheckbox() {
    var currentTaskId = localStorage.getItem("TaskId");
    this.contentId = this.contentId + 1;
    var content: Content = { Id: this.contentId, Type: 'checkbox-label', Text: '', TaskItemId: this.id, OrderContent: this.contentId, ImageSrc: '', Label: '' };
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
    console.log(priority);
    var currentTaskId = localStorage.getItem("TaskId");
    if (this.datetime !== null) {
      const d = new Date(this.datetime.toString());
      console.log(this.datetime.format("DD/MM/YYYY hh:mm:ss"));

      this.listTaskItem.find((res: any) => {
        return res.id === parseInt(currentTaskId);
      }).dueTime = this.datetime.format("DD/MM/YYYY hh:mm:ss");
      this.listTaskItem.find((res: any) => {
        return res.id === parseInt(currentTaskId);
      }).userId = this.listMember;
      localStorage.setItem("listTaskItem", JSON.stringify(this.listTaskItem));
    }



  }
  removeComponent(id: number) {
    console.log(id);
    this.listContentDetail.splice(id, 1);
  }


}
