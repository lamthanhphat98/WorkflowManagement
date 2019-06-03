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
    public class UserOrganizationsController : ControllerBase
    {
        private readonly IUserOrganizationService userOrganizationService;

        public UserOrganizationsController(IUserOrganizationService _userOrganizationService)
        {
            userOrganizationService = _userOrganizationService;
        }

        // GET: api/UserOrganizations
        [HttpGet("member/{organizationId}")]
        public IActionResult getMember(int organizationId)
        {
            var result = userOrganizationService.getMemberByOrganizationId(organizationId);
            
            return Ok(result);
        }
      
    }
}