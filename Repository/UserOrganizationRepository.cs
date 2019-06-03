using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using WorkflowManagement.IRepository;
using WorkflowManagement.Models;

namespace WorkflowManagement.Repository
{
    public class UserOrganizationRepository : IUserOrganizationRepository
    {
        private readonly WorkflowContext context;
        public UserOrganizationRepository(WorkflowContext _context)
        {
            context = _context;
        }

        public List<User> getMemberByOrganizationId(int organizatonId)
        {
            var getListUser = context.UserOrganization.Where(ug => ug.OrganizationId == organizatonId && ug.StatusMember.Equals("MEMBER")).ToList();
            List<User> listUser = new List<User>();
            foreach (var item in getListUser)
            {
                var member = context.User.Where(u => u.Id.Equals(item.MemberId)).FirstOrDefault();
                listUser.Add(member);
            }
            return listUser;
        }
    }
}
