using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewModel;
using EntityContext;
using WorkflowManagement.IService;
using WorkflowManagement.Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormCategoriesController : ControllerBase
    {
      //  private readonly IFormCategoryService formCategoryService;

      //  public FormCategoriesController(IFormCategoryService formCategoryService)
      //  {
      //      this.formCategoryService = formCategoryService;
      //  }

      //  // GET: api/FormCategories
      //  [HttpGet]
      //  public IEnumerable<FormCategory> GetFormCategory()
      //  {
      //      return formCategoryService.getListCategory();
      //  }

      //  // GET: api/FormCategories/5
      //  [HttpGet("{id}")]
      //  public IActionResult GetFormCategory([FromRoute] int id)
      //  {
      //      if (!ModelState.IsValid)
      //      {
      //          return BadRequest(ModelState);
      //      }

      //      var formCategory =  formCategoryService.findCategory(id);

      //      if (formCategory == null)
      //      {
      //          return NotFound();
      //      }

      //      return Ok(formCategory);
      //  }

      //  // PUT: api/FormCategories/5
      //  [HttpPut("{id}")]
      //  public IActionResult PutFormCategory([FromRoute] int id, [FromBody] FormCategory formCategory)
      //  {
      //      if (!ModelState.IsValid)
      //      {
      //          return BadRequest(ModelState);
      //      }

      //      if (id != formCategory.Id)
      //      {
      //          return BadRequest();
      //      }

      //      formCategoryService.update(id, formCategory);
          
         
      //      return NoContent();
      //  }

      //  // POST: api/FormCategories
      //  [HttpPost]
      //  //[Consumes("multipart/form-data")]
      //  public IActionResult PostFormCategory([FromForm] FormCategoryViewModel formCategoryViewModel)
      //  {
      //      //return Ok();
      //      if (formCategoryViewModel == null || formCategoryViewModel.File == null || formCategoryViewModel.File.Length == 0)
      //          return Content("file not selected");

      //      var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img", formCategoryViewModel.File.FileName);

      //      using (var stream = new FileStream(path, FileMode.Create))
      //      {
      //           formCategoryViewModel.File.CopyToAsync(stream);
      //      }
      //      var formCategory = new FormCategory()
      //      {
      //          Title = formCategoryViewModel.Title,
      //          Type = formCategoryViewModel.Type,
      //          Url = formCategoryViewModel.Url,
      //          PreviewImage = formCategoryViewModel.File.FileName
      //      };
      //      formCategoryService.addCategory(formCategory);
         
      //      return Ok(formCategory);

      //  }

      //  // DELETE: api/FormCategories/5
      //  [HttpDelete("{id}")]
      //  public IActionResult DeleteFormCategory([FromRoute] int id)
      //  {
           

      //      return Ok();
      //  }

      //  [HttpGet("categoryid/{id}")]
      ////  [Route("categoryid")]
      //  public IEnumerable<FormCategory> GetFormById(int categoryId)
      //  {
      //      return formCategoryService.getFormByCategoryId(categoryId);
      //  }


    }
}