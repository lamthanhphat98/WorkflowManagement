using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EntityContext;
using WorkflowManagement.Models;
using WorkflowManagement.IService;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly ITaskItemService taskItemService;

        public TaskItemsController(ITaskItemService _taskItemService)
        {
            taskItemService = _taskItemService;
        }
   
        // POST: api/TaskItems
        [HttpPost]
        public IActionResult PostTaskItem([FromBody] TaskItemViewModel taskItem)
        {
            taskItemService.addNewTaskItem(taskItem);
            return Ok(taskItem);
        }

        [HttpPost("template/{templateId}")]
        public IActionResult PostListTaskItem([FromRoute]int templateId,[FromBody] List<TaskItemViewModel> taskItem)
        {
            taskItemService.addListTaskItem(taskItem, templateId);
            return Ok(taskItem);
        }
        [HttpGet("taskoverdue/{organizationId}/{userId}")]
        public IActionResult GetTaskOverdue([FromRoute] int organizationId,  string userId)
        {
            return Ok(taskItemService.getTaskItemByUserIdOnDay(organizationId, userId));
        }
        [HttpGet("getupcoming/{organizationId}/{userId}")]
        public IActionResult GetTaskItems([FromRoute]  int organizationId,String userId)
        {
            return Ok(taskItemService.getAllChecklistUpcoming(organizationId,userId));
        }

        [HttpGet("taskitems/{checklistId}")]
        public IActionResult GetTaskItems([FromRoute]  int checklistId)
        {
            return Ok(taskItemService.GetTaskItems(checklistId));
        }
        [HttpPut("taskitem")]
        public IActionResult saveChecklist([FromBody] List<TaskItemViewModel> tasktitem)
        {
            //var result = checklistService.addTemplate(template);
            taskItemService.updateTaskItems(tasktitem);
            return Ok();
            // return Ok(result);
        }


    }
}