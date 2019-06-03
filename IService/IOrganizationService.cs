using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using WorkflowManagement.Models;

namespace WorkflowManagement.IService
{
    public interface IOrganizationService
    {
        Organization GetCurrentOrganization(String userId);

        void addOrganization(Organization organization);

    }
}
