using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using WorkflowManagement.IRepository;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

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

        public List<UserOrganization> getMemberByUserId(string userId)
        {
            var getListUser = context.UserOrganization.Where(ug => ug.MemberId.Equals(userId) && ug.StatusMember.Equals("MEMBER")).ToList(); 
            return getListUser;
        }

        public UserOrganizationViewModel getCurrentOrganizationByUserId(string userId)
        {
            var organization = context.UserOrganization.Where(ug => ug.MemberId.Equals(userId) && ug.StatusMember.Equals("MEMBER") && ug.CurrentOrganization == true).FirstOrDefault();
            UserOrganizationViewModel organizationUser = new UserOrganizationViewModel();
            organizationUser.memberId = organization.MemberId;
            organizationUser.organizationId = organization.OrganizationId;
            organizationUser.organizationName = context.Organization.Where(o => o.Id == organization.OrganizationId).FirstOrDefault().Name;
            return organizationUser;
        }
        public void inviteMember(int organizationId, string email)
        {
            var listMember = getMemberByOrganizationId(organizationId);
            if(listMember.Where(m=>m.Email.Equals(email) && m.Type.Equals("Google")).FirstOrDefault()==null)
            {
                var user = context.User.Where(u => u.Email.Equals(email) && u.Type.Equals("Google")).FirstOrDefault();
                var userOrganization = new UserOrganization();
                userOrganization.CurrentOrganization = false;
                userOrganization.MemberId = user.Id;
                userOrganization.StatusMember = "WAITING";
                userOrganization.OrganizationId = organizationId;
                context.UserOrganization.Add(userOrganization);
                context.SaveChanges();
            }
        
        }
    }
}
