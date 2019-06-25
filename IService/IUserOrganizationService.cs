using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IService
{
    public interface IUserOrganizationService
    {
        List<User> getMemberByOrganizationId(int organizatonId);
        List<UserOrganization> getMemberByUserId(string userId);
        UserOrganizationViewModel getCurrentOrganizationByUserId(string userId);
        void inviteMember(int organizationId, string email);



    }
}
