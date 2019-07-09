using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Service
{
    public class TaskItemService : ITaskItemService
    {
        private readonly ITaskItemRepository taskItemRepository;
        public TaskItemService(ITaskItemRepository _taskItemRepository)
        {
            taskItemRepository = _taskItemRepository;
        }

        public void addListTaskItem(List<TaskItemViewModel> taskItem,int checklistId)
        {
            taskItemRepository.addListTaskItem(taskItem,checklistId);
        }

        public void addNewTaskItem(TaskItemViewModel taskItem)
        {
            taskItemRepository.addNewTaskItem(taskItem);
        }

        public void addPostListTask(List<TaskItemViewModel> taskItem,int checklistId)
        {
            taskItemRepository.addPostListTask(taskItem, checklistId);
        }

        public List<TaskItem> getAllChecklistUpcoming(int organizationId, string userId)
        {
            return taskItemRepository.getAllChecklistUpcoming(organizationId, userId);
        }

        public List<TaskItem> getTaskItemByUserIdOnDay(int organizationId,string userId)
        {
            return taskItemRepository.getTaskItemByUserIdOnDay(organizationId,userId);
        }

        public List<TaskItem> GetTaskItems(int checklistId)
        {
            return taskItemRepository.GetTaskItems(checklistId);
        }

        public void updateTaskItems(List<TaskItemViewModel> taskItem)
        {
            taskItemRepository.updateTaskItems(taskItem);
        }
    }
}
