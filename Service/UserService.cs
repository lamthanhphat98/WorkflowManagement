using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using IService;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository _userRepository)
        {
            userRepository = _userRepository;
        }
        public bool addAdmin(User user)
        {
            return userRepository.addAdmin(user);
        }
        public bool addUser(User user)
        {
            return userRepository.addUser(user);
        }

        public bool delete(string user)
        {
            return userRepository.delete(user);

        }

        public  User findUser(string UserId)
        {
            return userRepository.findUser(UserId);

        }

        public List<User> getListUser()
        {
            return userRepository.getListUser();

        }

        public Task<FakeJson> getResponse(string url)
        {
            return userRepository.getResponse(url);
        }

        public string sendVerifyCode(string user)
        {
            return userRepository.sendVerifyCode(user);
        }

        public bool update(string user, User inforChange)
        {
            return userRepository.update(user,inforChange);

        }

        public string updatePhone(string user, string phone)
        {
            return userRepository.updatePhone(user, phone);
        }

        public string verifyCode(string user, string code)
        {
          return   userRepository.verifyCode(user, code);
        }
    }
}
