import { TaskItemDetailViewModel } from './taskitemdetail';

export class ChecklistDetailViewModel
{
    id : number;
    userId: string;
    name: string;
    description:string;
    timeCreated:Date;
    templateId:number;
    templateStatus:string;
    organizationId:number;
    taskItem:TaskItemDetailViewModel[];
}