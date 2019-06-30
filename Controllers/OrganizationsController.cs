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
    public class OrganizationsController : ControllerBase
    {
        private readonly IOrganizationService organizationService;

        public OrganizationsController(IOrganizationService _organizationService)
        {
            organizationService = _organizationService;
        }

        // GET: api/Organizations
       
        [HttpPost]
        public IActionResult AddOrganization([FromBody] Organization organization)
        {
            organizationService.addOrganization(organization);
            return Ok(organization);           
        }
        [HttpGet("current/{userId}")]
        public IActionResult GetCurrentOrganization([FromRoute] String userId)
        {
            var organization = organizationService.GetCurrentOrganization(userId);
            return Ok(organization);
        }
        [HttpGet("organizations/{userId}")]
        public IActionResult GetAllOrganization([FromRoute] String userId)
        {
            var organization = organizationService.GetAllOrganization(userId);
            return Ok(organization);
        }
    }
}