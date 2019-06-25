using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace IService
{
    public interface IUserService
    {
        
        List<User> getListUser();
        User findUser(string UserId);
        Boolean addAdmin(User user);
        Boolean addUser(User user);
        Boolean update(string user, User inforChange);
        Boolean delete(string user);
        string sendVerifyCode(string user);
        Task<String> getResponse(string url);
        string verifyCode(string user, string code);
        string updatePhone(string user, string phone);

    }
}
