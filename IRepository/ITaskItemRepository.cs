using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IRepository
{
    public interface ITaskItemRepository
    {
        void addNewTaskItem(TaskItemViewModel taskItem);
    }
}
