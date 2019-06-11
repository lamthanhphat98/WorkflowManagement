using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace IRepository
{
    public interface IUserRepository
    {
        
        List<User> getListUser();
        User findUser(string UserId);
        Boolean addUser(User user);
        Boolean addAdmin(User user);
        Boolean update(string user, User inforChange);
        Boolean delete(string user);
        string sendVerifyCode(string user);
        Task<FakeJson> getResponse(string url);
        string verifyCode(string user, string code);
        string updatePhone(string user, string phone);


    }
}
