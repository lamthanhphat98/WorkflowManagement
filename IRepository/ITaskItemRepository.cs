using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IRepository
{
    public interface ITaskItemRepository
    {
        void addNewTaskItem(TaskItemViewModel taskItem);
        void addListTaskItem(List<TaskItemViewModel> taskItem);
        List<TaskItem> getTaskItemByUserIdOnDay(String userId);
        List<TaskItem> GetTaskItems(int checklistId);
        void updateTaskItems(List<TaskItemViewModel> taskItem);
        void addPostListTask(List<TaskItemViewModel> taskItem, int checklistId);


    }
}
