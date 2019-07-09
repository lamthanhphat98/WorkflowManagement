using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;

namespace WorkflowManagement.Service
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository organizationRepository;
        public OrganizationService(IOrganizationRepository _organizationRepository)
        {
            organizationRepository = _organizationRepository;
        }

        public void addOrganization(Organization organization)
        {
            organizationRepository.addOrganization(organization);
        }

        public List<Organization> GetAllOrganization(string userId)
        {
            return organizationRepository.GetAllOrganization(userId);
        }

        public Organization GetCurrentOrganization(string userId)
        {
            return organizationRepository.GetCurrentOrganization(userId);
        }

        public void SwitchOrganization(string userId, int targetOrganizationId, int oldOrganizationId)
        {
            organizationRepository.SwitchOrganization(userId, targetOrganizationId, oldOrganizationId);
        }
    }
}
