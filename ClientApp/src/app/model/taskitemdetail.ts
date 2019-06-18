import { Content } from './contentdetail';
import { User } from './user';
import { CommentViewModel } from './commentviewmodel';


export class TaskItemDetailViewModel
{
          id : number;
          checklistId :number;
          name :string;
          dueTime :string;
          priority :number;         
          taskStatus :string;
          userId :User[];
          contentDetails:Content[];
          comments:CommentViewModel[];
}