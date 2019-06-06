using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;
using WorkflowManagement.IRepository;
using System.Globalization;

namespace WorkflowManagement.Repository
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly WorkflowContext context;
        public TaskItemRepository(WorkflowContext _context)
        {
            context = _context;
        }
        public void addNewTaskItem(TaskItemViewModel taskItem)
        {
            var task = new TaskItem();
            task.ChecklistId = taskItem.ChecklistId;
            task.FormId = taskItem.FormId;
            task.DueTime = DateTime.ParseExact(taskItem.DueTime, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            //task.DueTime = Convert.ToDateTime(taskItem.DueTime);

            task.Name = taskItem.Name;
            task.Priority = taskItem.Priority;
            task.TaskStatus = taskItem.TaskStatus;
            task.FormSubmitted = taskItem.FormSubmitted;
            task.FormId = taskItem.FormId;
            context.TaskItem.Add(task);
            context.SaveChanges();

        }
    }
}
