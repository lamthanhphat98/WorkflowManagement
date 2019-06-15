﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using EntityContext;
using IRepository;
using Microsoft.EntityFrameworkCore;
using WorkflowManagement.IRepository;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Repository
{
    public class ChecklistRepository : IChecklistRepository
    {
        private readonly WorkflowContext _context;
        public ChecklistRepository(WorkflowContext context)
        {
            _context = context;
        }
       public List<ChecklistViewModel> getAllChecklist(int organizationId,string userId)
        {
            int checkNumber = 0;
            var getOrganization = _context.Organization.Where(u => u.AdminId.Equals(userId) && u.Id == organizationId).FirstOrDefault();
            var result = _context.Checklist.Where(u => u.OrganizationId==getOrganization.Id).ToList();
            List<ChecklistViewModel> checklistViewModels = new List<ChecklistViewModel>();
            foreach (var item in result)
            {
                ChecklistViewModel checklist = new ChecklistViewModel();
                checklist.Id = item.Id;
                checklist.Name = item.Name;
                checklist.OrganizationId = item.OrganizationId;
                checklist.Show = true;
                checklist.TemplateId = item.TemplateId;
                checklist.TemplateStatus = item.TemplateStatus;
                checklist.TimeCreated = item.TimeCreated;
                checklist.UserId = item.UserId;
                checklist.Description = item.Description;
                if(checklist.TemplateId == null)
                {
                    
                    checklist.CountChecklist = _context.Checklist.Where(c => c.TemplateId == checklist.Id).ToList().Count();
                   
                }else
                {
                    checklist.CountChecklist = 0;
                }
                if(checklist.TemplateId!=null)
                {
                    int countAllTaskItem = _context.TaskItem.Where(t => t.ChecklistId == checklist.Id).ToList().Count();
                    int countDoneTask = _context.TaskItem.Where(t => t.ChecklistId == checklist.Id && t.TaskStatus.Equals("1")).ToList().Count();
                    if(countAllTaskItem==0 && countDoneTask==0)
                    {
                        checklist.CountTask = "0%";
                    }
                    else
                    {
                        checklist.CountTask = ((countDoneTask /(double)countAllTaskItem) * 100).ToString() + "%";

                    }
                }
                else
                {
                    checklist.CountTask = "0%";
                }
                checklistViewModels.Add(checklist);
            }
            return checklistViewModels;
        }
        public List<Checklist> getActivityLog(int organizationId, string userId)
        {
            var id = new SqlParameter("@organizationId", organizationId);
            var user = new SqlParameter("@userId", userId);
            var activityLog = _context.Checklist.FromSql("EXECUTE dbo.getActivityLog @organizationId,@userId", id, user).ToList();
            return activityLog;
        }
        public Checklist addTemplate(Checklist template)
        {
            template.TimeCreated = DateTime.Now;
            _context.Checklist.Add(template);
            _context.SaveChanges();
            return _context.Checklist.Where(t => t.TimeCreated.Equals(template.TimeCreated) && t.UserId.Equals(template.UserId)).FirstOrDefault();

        }
        public TemplateViewModel getTemplate(int organizationId,String userId,int templateId)
        {
            
           var template = _context.Checklist.Where(c => c.OrganizationId == organizationId && c.Id == templateId && c.UserId.Equals(userId) && c.TemplateId == null).FirstOrDefault();
            var templateVM = new TemplateViewModel()
            {
                Id = template.Id,
                Description = template.Description,
                Name = template.Name,
                OrganizationId = template.OrganizationId,
                taskItemViewModels = null,
                TemplateId = template.TemplateId,
                TemplateStatus = template.TemplateStatus,
                TimeCreated = template.TimeCreated,
                UserId = template.UserId
            };
              
        

            var listTaskItem = _context.TaskItem.Where(t => t.ChecklistId == template.Id).OrderBy(t => t.Priority).ToList();
            var listTaskItemVM = new List<TaskItemViewModel>();
            foreach (var item in listTaskItem)
            {
                var taskItemVM = new TaskItemViewModel();
                taskItemVM.Id = item.Id;
                taskItemVM.Name = item.Name;
                taskItemVM.Priority = item.Priority;
                taskItemVM.TaskStatus = item.TaskStatus;
                taskItemVM.ChecklistId = item.ChecklistId;
                var listContent = _context.ContentDetail.Where(c => c.TaskItemId == item.Id).OrderBy(c => c.OrderContent).ToList();
                taskItemVM.ContentDetails = listContent;
                var listUser = _context.User.FromSql("getUserByTaskId @TaskId", new SqlParameter("@TaskId", item.Id)).ToList();
                taskItemVM.UserId = listUser;
                listTaskItemVM.Add(taskItemVM);
            }           
            templateVM.taskItemViewModels = listTaskItemVM;
            return templateVM;

        }

        
    }
}
