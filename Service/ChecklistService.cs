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
    public class ChecklistService : IChecklistService
    {
        private readonly IChecklistRepository checklistRepository;
        public ChecklistService(IChecklistRepository _checklistRepository)
        {
            checklistRepository = _checklistRepository;
        }

        public Checklist addTemplate(Checklist template)
        {
            return checklistRepository.addTemplate(template);
        }

        public List<Checklist> getActivityLog(int organizationId, string userId)
        {
            return checklistRepository.getActivityLog(organizationId, userId);
        }

        public List<ChecklistViewModel> getAllChecklist(int organizationId, string userId)
        {
            return checklistRepository.getAllChecklist(organizationId, userId);
        }

        public List<ChecklistProgressViewModel> getAllChecklistProgress(int organizationId, string userId)
        {
            return checklistRepository.getAllChecklistProgress(organizationId, userId);
        }

        public ChecklistDetailViewModel getChecklistDetail(int organizationId, string userId, int checklistId)
        {
            return checklistRepository.getChecklistDetail(organizationId, userId, checklistId);
        }

        public TemplateViewModel getTemplate(int organizationId, string userId, int templateId)
        {
            return checklistRepository.getTemplate(organizationId, userId, templateId);
        }
    }
}
