using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IService
{
    public interface ITaskItemService
    {

        void addNewTaskItem(TaskItemViewModel taskItem);
        void addListTaskItem(List<TaskItemViewModel> taskItem, int checklistId);

        List<TaskItem> getTaskItemByUserIdOnDay(int organizationId,String userId);
        List<TaskItem> GetTaskItems(int checklistId);
        void updateTaskItems(List<TaskItemViewModel> taskItem);
        void addPostListTask(List<TaskItemViewModel> taskItem, int checklistId);
        List<TaskItem> getAllChecklistUpcoming(int organizationId, string userId);




    }
}
