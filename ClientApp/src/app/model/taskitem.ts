import { Content } from './contentdetail';
import { User } from './user';


export class TaskViewModel
{
          id : number;
          checklistId :number;
          name :string;
          dueTime :string;
          priority :number;         
          taskStatus :string;
          userId :User[];
          contentDetails:Content[];
}