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

namespace WorkflowManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChecklistsController : ControllerBase
    {
        private readonly IChecklistService checklistService;

        public ChecklistsController(IChecklistService _checklistService)
        {
            checklistService = _checklistService;
        }

        // GET: api/Checklists
        [HttpGet("get/{organizationId}/{userId}")]
        public IActionResult GetChecklist([FromRoute] int organizationId, string userId)
        {
            return Ok(checklistService.getAllChecklist(organizationId, userId));
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

    }
}