using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Service
{
    public class UserOrganizationService : IUserOrganizationService
    {
        private readonly IUserOrganizationRepository userOrganizationRepository;
        public UserOrganizationService(IUserOrganizationRepository _userOrganizationRepository)
        {
            userOrganizationRepository = _userOrganizationRepository;
        }

        public UserOrganizationViewModel getCurrentOrganizationByUserId(string userId)
        {
            return userOrganizationRepository.getCurrentOrganizationByUserId(userId);
        }

        public List<User> getMemberByOrganizationId(int organizatonId)
        {
            return userOrganizationRepository.getMemberByOrganizationId(organizatonId);
        }

        public List<UserOrganization> getMemberByUserId(string userId)
        {
            return userOrganizationRepository.getMemberByUserId(userId);
        }
        public void inviteMember(int organizationId,string userId)
        {
            userOrganizationRepository.inviteMember(organizationId, userId);
        }
    }
}
