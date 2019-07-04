using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EntityContext;
using WorkflowManagement.Models;
using System.Data.SqlClient;
using WorkflowManagement.IService;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChecklistsController : ControllerBase
    {
        private readonly IChecklistService checklistService;
        private readonly ITaskItemService taskItemService;

        public ChecklistsController(IChecklistService _checklistService, ITaskItemService _taskItemService)
        {
            checklistService = _checklistService;
            taskItemService = _taskItemService;
        }

        // GET: api/Checklists
        [HttpGet("get/{organizationId}/{userId}")]
        public IActionResult GetChecklist([FromRoute] int organizationId, string userId)
        {
            return Ok(checklistService.getAllChecklist(organizationId, userId));
        }
        [HttpGet("checklistprogress/{organizationId}")]
        public IActionResult GetChecklistProgress([FromRoute] int organizationId)
        {
            return Ok(checklistService.getAllChecklistProgress(organizationId));
        }

        [HttpGet("activity/{organizationId}/{userId}")]
        public IActionResult getActivityLog([FromRoute] int organizationId, string userId)
        {
            return Ok(checklistService.getActivityLog(organizationId, userId));
        }
        [HttpPost("template")]
        public IActionResult postTemplate([FromBody] Checklist template)
        {
            var result = checklistService.addTemplate(template);
            return Ok(result);
        }
        [HttpGet("template/{organizationId}/{templateId}/{userId}")]
        public IActionResult getActivityLog([FromRoute] int organizationId,int templateId, string userId)
        {
            return Ok(checklistService.getTemplate(organizationId, userId, templateId));
        }
        [HttpGet("checklist/{organizationId}/{checklistId}/{userId}")]
        public IActionResult getChecklist([FromRoute] int organizationId, string userId,int checklistId )
        {
            return Ok(checklistService.getChecklistDetail(organizationId, userId, checklistId));
        }
        [HttpPost("checklist")]
        public IActionResult runChecklist([FromBody] ChecklistPostViewModel checklistViewmodel)
        {
            var checklist = new Checklist();
            checklist.Category = checklistViewmodel.Category;
            checklist.TemplateId = checklistViewmodel.Id;
            checklist.Description = checklistViewmodel.Description;
            checklist.Name = checklistViewmodel.Name;
            checklist.TemplateStatus = checklistViewmodel.TemplateStatus;
            checklist.UserId = checklistViewmodel.UserId;
            checklist.OrganizationId = checklistViewmodel.OrganizationId;
            var result = checklistService.addTemplate(checklist);
            //var result = checklistService.addTemplate(template);

            taskItemService.addPostListTask(checklistViewmodel.TaskItem.ToList(),result.Id);
            return Ok();
           // return Ok(result);
        }
        [HttpPost("run/{userId}")]
        public IActionResult runNewChecklist([FromRoute] string userId,[FromBody] TemplateViewModel templateViewModel)
        {
            var checklist = new Checklist();
            checklist.Category = templateViewModel.Category;
            checklist.TemplateId = templateViewModel.Id;
            checklist.Description = templateViewModel.Description;
            checklist.Name = templateViewModel.Name;
            checklist.TemplateStatus = templateViewModel.TemplateStatus;
            checklist.UserId = userId;
            checklist.OrganizationId = templateViewModel.OrganizationId;
            var result = checklistService.addTemplate(checklist);
            //var result = checklistService.addTemplate(template);
            taskItemService.addPostListTask(templateViewModel.taskItemViewModels.ToList(), result.Id);
            return Ok();
            // return Ok(result);
        }
        [HttpGet("listtemplate/{organizationId}/{userId}")]
        public IActionResult getTemplateByUserId([FromRoute] int organizationId,string userId)
        {
            return Ok(checklistService.getTemplateByUserId(organizationId, userId));
        }


    }
}