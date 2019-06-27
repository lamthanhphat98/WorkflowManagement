import { TaskItemDetailViewModel } from './taskitemdetail';
import { TaskViewModel } from './taskitem';

export  class ChecklistViewModel
{
    id : number;
    userId: string;
    name: string;
    description:string;
    timeCreated:Date;
    templateId:number;
    templateStatus:string;
    organizationId:number;
    category:string;
    taskItem:TaskViewModel[];
}