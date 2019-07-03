using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using WorkflowManagement.Models;
using WorkflowManagement.IRepository;
using Microsoft.EntityFrameworkCore;

namespace WorkflowManagement.Repository
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly WorkflowContext context;
        public OrganizationRepository(WorkflowContext _context)
        {
            context = _context;
        }

       public void addOrganization(Organization organization)
        {
            context.Organization.Add(organization);
            UserOrganization userOrganization = new UserOrganization();
            userOrganization.MemberId = organization.AdminId;
            userOrganization.OrganizationId = organization.Id;
            userOrganization.CurrentOrganization = false;
            context.UserOrganization.Add(userOrganization);
            context.SaveChanges();
        }
        public Organization GetCurrentOrganization( String userId)
        {
            var organization = context.Organization.Where(o => o.AdminId.Equals(userId) && o.CurrentOrganization == true).FirstOrDefault();

            return organization;
        }
        public List<Organization> GetAllOrganization(String userId)
        {
            var organizations = context.Organization.Where(o => o.AdminId.Equals(userId)).ToList();

            return organizations;
        }
        public void SwitchOrganization(String userId,int targetOrganizationId,int oldOrganizationId)
        {
            var getOrganization = context.Organization.Where(o => o.Id == targetOrganizationId).FirstOrDefault();
            var oldOrganization = context.Organization.Where(o => o.Id == oldOrganizationId).FirstOrDefault();
            if(oldOrganization != null)
            {
                oldOrganization.CurrentOrganization = false;
                context.Entry(oldOrganization).State = EntityState.Modified;
            }        
            getOrganization.CurrentOrganization = true;
           
            context.Entry(getOrganization).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
