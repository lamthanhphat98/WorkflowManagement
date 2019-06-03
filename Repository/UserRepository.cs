using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;

using EntityContext;
using WorkflowManagement.Models;
using System.Net.Http;
using WorkflowManagement.ViewModel;

namespace Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly WorkflowContext context;
        public UserRepository(WorkflowContext _context)
        {
            context = _context; 
        }
        public bool addUser(User user)
        {
            
            if (context.User.Add(user)!=null)
            {
                context.SaveChanges();
                return true;
            };
            return false;
           
        }

        public bool delete(string user)
        {
            var userRemove = findUser(user);
            if (userRemove != null)
            {
                context.User.Remove(userRemove);
                context.SaveChanges();
                return true;

            }
            return false;

        }

        public User findUser(string UserId)
        {
            return context.User.Where(user => user.Id.Equals(UserId)).FirstOrDefault();
        }

        public List<User> getListUser()
        {
            return context.User.ToList();

        }

        public string sendVerifyCode(string user)
        {
            String randomCode = "";
            Random r = new Random();
            for (int i = 0; i <=5; i++)
            {
                randomCode = randomCode + r.Next(0, 9).ToString();
            }
            return randomCode;
        }

        public bool update(string user,User inforChange)
        {
            var userRemove = findUser(user);
            if (userRemove != null)
            {

                context.Entry(inforChange).State = EntityState.Modified;
                context.SaveChanges();
                return true;

            }
            return false;
        }
        public void update(User inforChange)
        {
                context.Entry(inforChange).State = EntityState.Modified;
                context.SaveChanges();                             
        }
        public async Task<FakeJson> getResponse(string url)
        {
            FakeJson msg = new FakeJson();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage message = await client.GetAsync("");
                if (message.IsSuccessStatusCode)
                {
                    msg = await message.Content.ReadAsAsync<FakeJson>();
                    //Console.WriteLine(person.Name);

                }
            }
            return msg;




            //using (HttpClient client = new HttpClient())
            //{
            //    using (HttpResponseMessage response = await client.GetAsync(url))
            //    {

            //        using (HttpContent content = response.Content)
            //        {
            //            string responseContent = await content.ReadAsStringAsync();
            //            return responseContent;
            //        }
            //    }
            //}

        }

        public string verifyCode(string user, string code)
        {
            var getUser = findUser(user);
            if(getUser!=null)
            {
                if(getUser.VerifyCode.Equals(code))
                {
                    getUser.Role = "USER";
                    getUser.VerifyCode = "";
                    update(getUser);
                    return getUser.Role;
                   
                }
                return null;
            }
            return null;
        }

        public string updatePhone(string user, string phone)
        {
            var getUser = findUser(user);
            if (getUser != null)
            {
                 getUser.Phone = phone;                    
                 update(getUser);
                 return phone;
            }
            return null;
        }
    }
}
