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

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService commentService;

        public CommentsController(ICommentService _commentService)
        {
            commentService = _commentService;
        }

        //[HttpGet("notification/{taskId}/{userId}")]
        //public IActionResult getNotification([FromRoute] int taskId,string userId)
        //{
        //    var result = commentService.countComment(taskId, userId).Count();
        //    return Ok(result);
        //}
        [HttpGet("notification/{organizationId}/{userId}")]
        public IActionResult getAllNotification([FromRoute] int organizationId, string userId)
        {
            var result = commentService.countComment(organizationId, userId).Count();
            return Ok(result);
        }
        [HttpGet("comment/{organizationId}/{userId}")]
        public IActionResult getAllCommentsByOrganization([FromRoute] int organizationId, string userId)
        {
            var result = commentService.getCommentByOrganization(organizationId, userId);
            return Ok(result);;
        }

    }
}