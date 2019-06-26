using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EntityContext;
using WorkflowManagement.Models;
using WorkflowManagement.IService;

namespace WorkflowManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentDetailsController : ControllerBase
    {
        private readonly IContentService contentService;

        public ContentDetailsController(IContentService _contentService)
        {
            contentService = _contentService;
        }

        [HttpGet("contentdetail/{checklistId}")]
        public IActionResult GetContentDetail([FromRoute] int checklistId)
        {
            return  Ok(contentService.getContentByTaskId(checklistId));
        }







        //// GET: api/ContentDetails
        //[HttpGet]
        //public IEnumerable<ContentDetail> GetContentDetail()
        //{
        //    return _context.ContentDetail;
        //}

        //// GET: api/ContentDetails/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetContentDetail([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var contentDetail = await _context.ContentDetail.FindAsync(id);

        //    if (contentDetail == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(contentDetail);
        //}

        //// PUT: api/ContentDetails/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutContentDetail([FromRoute] int id, [FromBody] ContentDetail contentDetail)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != contentDetail.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(contentDetail).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ContentDetailExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/ContentDetails
        //[HttpPost]
        //public async Task<IActionResult> PostContentDetail([FromBody] ContentDetail contentDetail)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.ContentDetail.Add(contentDetail);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetContentDetail", new { id = contentDetail.Id }, contentDetail);
        //}

        //// DELETE: api/ContentDetails/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteContentDetail([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var contentDetail = await _context.ContentDetail.FindAsync(id);
        //    if (contentDetail == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ContentDetail.Remove(contentDetail);
        //    await _context.SaveChangesAsync();

        //    return Ok(contentDetail);
        //}

        //private bool ContentDetailExists(int id)
        //{
        //    return _context.ContentDetail.Any(e => e.Id == id);
        //}
    }
}