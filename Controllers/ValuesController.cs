using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
       
        public ActionResult<string> Get()
        {
           // var path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\img", "baotrung.jpg");
           var path = "https://workflow3i.azurewebsites.net/";
            var imagePath = "img/" + "baotrung.jpg";

            //byte[] image = System.IO.File.ReadAllBytes(path);

           // var file = File()
           //           MemoryStream ms = new MemoryStream()
            return  Ok(new String(path+imagePath));
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
