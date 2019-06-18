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

        public void addListTaskItem(List<TaskItemViewModel> taskItem)
        {
            taskItemRepository.addListTaskItem(taskItem);
        }

        public void addNewTaskItem(TaskItemViewModel taskItem)
        {
            taskItemRepository.addNewTaskItem(taskItem);
        }

        public List<TaskItem> getTaskItemByUserIdOnDay(string userId)
        {
            return taskItemRepository.getTaskItemByUserIdOnDay(userId);
        }
    }
}
