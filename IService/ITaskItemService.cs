using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IService
{
    public interface ITaskItemService
    {

        void addNewTaskItem(TaskItemViewModel taskItem);
        void addListTaskItem(List<TaskItemViewModel> taskItem);


    }
}
