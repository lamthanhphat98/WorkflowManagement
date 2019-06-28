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
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

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
          //  task.FormId = taskItem.FormId;
            task.DueTime = DateTime.ParseExact(taskItem.DueTime, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            //task.DueTime = Convert.ToDateTime(taskItem.DueTime);

            task.Name = taskItem.Name;
            task.Priority = taskItem.Priority;
            task.TaskStatus = taskItem.TaskStatus;
           // task.FormSubmitted = taskItem.FormSubmitted;
           // task.FormId = taskItem.FormId;
            context.TaskItem.Add(task);
            context.SaveChanges();

        }
        //add list task of template
        public void addListTaskItem(List<TaskItemViewModel> taskItem)
        {
          

            foreach (var item in taskItem)
            {
                List<ContentDetail> contentDetails = new List<ContentDetail>();
                List<TaskMember> taskMembers = new List<TaskMember>();
                TaskItem task = new TaskItem();
                task.ChecklistId = item.ChecklistId;
                task.DueTime = DateTime.ParseExact(item.DueTime, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
                task.Name = item.Name;
                task.Priority = item.Priority;
                //task.TaskStatus = item.TaskStatus;
                task.TaskStatus = "Template";
                context.TaskItem.Add(task);
                context.SaveChanges();
                var getTask = context.TaskItem.Where(t => t.Name.Equals(item.Name) && t.DueTime.Equals(task.DueTime)).FirstOrDefault();
                foreach (var content in item.ContentDetails)
                {
                    if(content.Id!=0)
                    {
                        ContentDetail detail = new ContentDetail();
                        detail.ImageSrc = content.ImageSrc;
                        detail.Label = content.Label;
                        detail.OrderContent = content.OrderContent;
                        detail.TaskItemId = getTask.Id;
                        detail.Text = content.Text;
                        detail.Type = content.Type;
                        contentDetails.Add(detail);
                    }
                  

                }
                foreach (var user in item.UserId)
                {
                    
                    TaskMember member = new TaskMember();
                    member.UserId = user.Id;
                    member.TaskId = getTask.Id;
                    taskMembers.Add(member);                   
                }
                context.ContentDetail.AddRange(contentDetails);
                context.TaskMember.AddRange(taskMembers);
                context.SaveChanges();

                //context.Task
            }
        }


        // run checklist
        public void addPostListTask(List<TaskItemViewModel> taskItem,int checklistId)
        {


            foreach (var item in taskItem)
            {
                List<ContentDetail> contentDetails = new List<ContentDetail>();
                List<TaskMember> taskMembers = new List<TaskMember>();
                TaskItem task = new TaskItem();
                task.ChecklistId = checklistId;
                task.DueTime = DateTime.Parse(item.DueTime);
                task.Name = item.Name;
                task.Priority = item.Priority;
              //  task.TaskStatus = item.TaskStatus;
                task.TaskStatus = "Running";
                context.TaskItem.Add(task);
                context.SaveChanges();
                var getTask = context.TaskItem.Where(t => t.Name.Equals(item.Name) && t.DueTime.Equals(task.DueTime) && t.TaskStatus.Equals("Running") && t.ChecklistId==checklistId).FirstOrDefault();
                foreach (var content in item.ContentDetails)
                {
                    int order = 1;
                    if (content.Id != 0)
                    {
                        ContentDetail detail = new ContentDetail();
                        detail.ImageSrc = content.ImageSrc;
                        detail.Label = content.Label;
                        detail.OrderContent = order;
                        detail.TaskItemId = getTask.Id;
                        detail.Text = content.Text;
                        detail.Type = content.Type;
                        contentDetails.Add(detail);
                    }
                    order = order + 1;


                }
                foreach (var user in item.UserId)
                {

                    TaskMember member = new TaskMember();
                    member.UserId = user.Id;
                    member.TaskId = getTask.Id;
                    taskMembers.Add(member);
                }
                context.ContentDetail.AddRange(contentDetails);
                context.TaskMember.AddRange(taskMembers);
                context.SaveChanges();

                //context.Task
            }
        }
        public List<TaskItem> getTaskItemByUserIdOnDay(String userId)
        {
            DateTime getDate = DateTime.Now;
            DateTime fromDate = new DateTime(getDate.Year, getDate.Month, getDate.Day, 0, 0, 1);
            DateTime toDate = new DateTime(getDate.Year, getDate.Month, getDate.Day, 23, 59, 59);
            SqlParameter paramFromDate = new SqlParameter("@fromDate", fromDate);
            SqlParameter paramToDate = new SqlParameter("@toDate", toDate);
            SqlParameter paramUserId = new SqlParameter("@userId", userId);
            var result = context.TaskItem.FromSql("EXEC getTaskItemByDate @fromDate,@toDate,@userId", paramFromDate,paramToDate, paramUserId).ToList();       
            return result;
        }
        public List<TaskItem> GetTaskItems(int checklistId)
        {
            return context.TaskItem.Where(t => t.ChecklistId == checklistId).ToList();
        }

        // update template
        public void updateTaskItems(List<TaskItemViewModel> taskItem)
        {

            int? checklistId = 0;
            foreach (var item in taskItem)
            {
                if(item.TaskStatus.Equals("Template"))
                {
                    var currentTask = new TaskItem();
                    currentTask.Id = item.Id;
                    currentTask.ChecklistId = item.ChecklistId;
                    checklistId = item.ChecklistId;
                    currentTask.DueTime = DateTime.Parse(item.DueTime);
                    currentTask.Name = item.Name;
                    currentTask.Priority = item.Priority;
                    currentTask.TaskStatus = item.TaskStatus;           
                    context.Entry(currentTask).State = EntityState.Modified;
                    context.SaveChanges();
                    //var getTask = context.TaskItem.Where(t => t.Name.Equals(item.Name) && t.DueTime.Equals(task.DueTime)).FirstOrDefault();
                    foreach (var content in item.ContentDetails)
                    {
                        if (content.Id != 0)
                        {
                            context.Entry(content).State = EntityState.Modified;

                        }
                    }           
                    context.SaveChanges();
                }
                else
                {

                List<ContentDetail> contentDetails = new List<ContentDetail>();
                List<TaskMember> taskMembers = new List<TaskMember>();
                TaskItem task = new TaskItem();
                    task.ChecklistId = checklistId;
                    task.DueTime = DateTime.ParseExact(item.DueTime, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
                    task.Name = item.Name;
                task.Priority = item.Priority;
                //task.TaskStatus = item.TaskStatus;
                task.TaskStatus = "Running";
                context.TaskItem.Add(task);
                context.SaveChanges();
                var getTask = context.TaskItem.Where(t => t.Name.Equals(item.Name) && t.DueTime.Equals(task.DueTime)).FirstOrDefault();
                foreach (var content in item.ContentDetails)
                {
                    if (content.Id != 0)
                    {
                        ContentDetail detail = new ContentDetail();
                        detail.ImageSrc = content.ImageSrc;
                        detail.Label = content.Label;
                        detail.OrderContent = content.OrderContent;
                        detail.TaskItemId = getTask.Id;
                        detail.Text = content.Text;
                        detail.Type = content.Type;
                        contentDetails.Add(detail);
                    }


                }
                foreach (var user in item.UserId)
                {

                    TaskMember member = new TaskMember();
                    member.UserId = user.Id;
                    member.TaskId = getTask.Id;
                    taskMembers.Add(member);
                }
                context.ContentDetail.AddRange(contentDetails);
                context.TaskMember.AddRange(taskMembers);
                context.SaveChanges();

                //context.Task
            }
        }

        }

    }
}
