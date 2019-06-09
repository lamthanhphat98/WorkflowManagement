import { Content } from './contentdetail';


export class TaskViewModel
{
          id : number;
          checklistId :number;
          name :string;
          dueTime :string;
          priority :number;         
          taskStatus :string;
          userId :string[];
          contentDetail:Content[];
}