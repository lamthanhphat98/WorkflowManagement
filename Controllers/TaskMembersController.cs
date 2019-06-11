using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntityContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkflowManagement.IService;
using WorkflowManagement.Models;

namespace Workflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskMembersController : ControllerBase
    {
        private readonly ITaskMemberService taskMemberService;

        public TaskMembersController(ITaskMemberService _taskMemberService)
        {
            taskMemberService = _taskMemberService;
        }

        // GET: api/Tasks
        [HttpGet("member/{checklistId}")]
        public IActionResult getMemberByChecklist(int checklistId)
        {
            var result = taskMemberService.getMemberByChecklist(checklistId);
            return Ok(result);
        }
    }
}