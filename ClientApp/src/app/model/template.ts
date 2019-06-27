import { TaskViewModel } from './taskitem';

export class Template{
    id : number;
    userId: string;
    name: string;
    description:string;
    timeCreated:Date;
    templateId:number;
    templateStatus:string;
    category:string;
    organizationId:number;
    taskItem:TaskViewModel[];

}