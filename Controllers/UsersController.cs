using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IService;
using WorkflowManagement.Models;
using System.Net.Http;
using EntityContext;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService _userService)
        {
            userService = _userService;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUser()
        {
            return userService.getListUser();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public IActionResult GetUser([FromRoute] string id)
        {
            
            var user = userService.findUser(id);
            return Ok(user);
        }
        [HttpPost]
        public void Post([FromBody] User user)
        {
            if(userService.findUser(user.Id)==null)
            {
                userService.addUser(user);
             
            }                    
        }
        [HttpGet("getverifycode/{id}")]
        public IActionResult GetVerifyCode([FromRoute] string id)
        {
         
             var user = userService.findUser(id);
             var code = userService.sendVerifyCode(id);
             user.VerifyCode = code;
             userService.update(id, user);
            //String url = "http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?" +
            //"Phone=0932018265&Content=" + "Test DT" +
            //"&ApiKey=623DF6834DF711DA8DB915DA94CDCB" +
            //"&SecretKey=01D9247C207CE8E2E66FE40E516136" +
            //"&SmsType=3";
            //String url = "http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?" +
            //   "Phone=0932018265&Content=" + code +
            //   "&ApiKey=623DF6834DF711DA8DB915DA94CDCB" +
            //   "&SecretKey=01D9247C207CE8E2E66FE40E516136" +
            //   "&SmsType=3";
            ////String fakeJson = "https://jsonplaceholder.typicode.com/todos/1";
            //var result = userService.getResponse(url);
            return Ok();
        }

        [HttpGet("verifycode/{userid}/{code}")]
        public IActionResult VerifyCode([FromRoute] string userid,string code)
        {

           var result = userService.verifyCode(userid, code);
            return Ok(result);
        }
        [HttpGet("updatephone/{userid}/{phone}")]
        public IActionResult UpdatePhone([FromRoute] string userid, string phone)
        {

            var result = userService.updatePhone(userid, phone);
            return Ok(result);
        }

    }
}