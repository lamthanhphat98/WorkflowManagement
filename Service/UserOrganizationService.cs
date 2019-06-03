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
    public class UserOrganizationService : IUserOrganizationService
    {
        private readonly IUserOrganizationRepository userOrganizationRepository;
        public UserOrganizationService(IUserOrganizationRepository _userOrganizationRepository)
        {
            userOrganizationRepository = _userOrganizationRepository;
        }
        public List<User> getMemberByOrganizationId(int organizatonId)
        {
            return userOrganizationRepository.getMemberByOrganizationId(organizatonId);
        }
    }
}
