using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;

namespace WorkflowManagement.IRepository
{
    public interface IOrganizationRepository
    {
        Organization GetCurrentOrganization(String userId);
        void addOrganization(Organization organization);
    }
}
