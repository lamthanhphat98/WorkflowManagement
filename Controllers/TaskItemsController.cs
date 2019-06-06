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

    }
}