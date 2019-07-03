using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IRepository
{
    public interface IChecklistRepository
    {
        List<ChecklistViewModel> getAllChecklist(int organizationId, string userId);
        List<Checklist> getActivityLog(int organizationId, string userId);
        Checklist addTemplate(Checklist template);
        TemplateViewModel getTemplate(int organizationId, String userId, int templateId);
        List<ChecklistProgressViewModel> getAllChecklistProgress(int organizationId);
        ChecklistDetailViewModel getChecklistDetail(int organizationId, String userId, int checklistId);
        List<TemplateMobileViewModel> getTemplateByUserId(int organizationId, String userId);


    }
}
