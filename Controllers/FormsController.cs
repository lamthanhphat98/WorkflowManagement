using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using EntityContext;
using WorkflowManagement.Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormsController : ControllerBase
    {
        //private readonly WorkflowContext _context = new WorkflowContext();

        //public FormsController()
        //{
            
        //}

        //// GET: api/Forms
        //[HttpGet]
        //public IEnumerable<Form> GetForm()
        //{
        //    return _context.Form;
        //}

        //// GET: api/Forms/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetForm([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var form = await _context.Form.FindAsync(id);

        //    if (form == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(form);
        //}

        //// PUT: api/Forms/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutForm([FromRoute] int id, [FromBody] Form form)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != form.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(form).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!FormExists(id))
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

        //// POST: api/Forms
        //[HttpPost]
        //public async Task<IActionResult> PostForm([FromBody] Form form)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Form.Add(form);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetForm", new { id = form.Id }, form);
        //}

        //// DELETE: api/Forms/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteForm([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var form = await _context.Form.FindAsync(id);
        //    if (form == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Form.Remove(form);
        //    await _context.SaveChangesAsync();

        //    return Ok(form);
        //}

        //private bool FormExists(int id)
        //{
        //    return _context.Form.Any(e => e.Id == id);
        //}
    }
}