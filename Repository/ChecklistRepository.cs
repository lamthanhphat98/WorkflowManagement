using System;
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
    }
}
