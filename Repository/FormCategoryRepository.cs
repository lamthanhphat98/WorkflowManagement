using EntityContext;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.IRepository;
using WorkflowManagement.Models;

namespace WorkflowManagement.Repository
{
    public class FormCategoryRepository :IFormCategoryRepository
    {
        private readonly WorkflowContext context;
        public FormCategoryRepository(WorkflowContext _context)
        {
            context = _context;
        }

        public bool addCategory(FormCategory form)
        {
            if (context.FormCategory.Add(form) != null)
            {
                context.SaveChanges();
                return true;
            };
            return false;
        }

        public bool delete(int formCategory)
        {
            throw new NotImplementedException();
        }

        public FormCategory findCategory(int formCategory)
        {
            throw new NotImplementedException();
        }

        public List<FormCategory> getListCategory()
        {
            return context.FormCategory.ToList();
        }

        public bool update(int formCategory, FormCategory inforChange)
        {
            throw new NotImplementedException();
        }
        public List<FormCategory>getFormByCategoryId(int formCategoryId)
        {
            var id = new SqlParameter("@categoryId", formCategoryId);
            return context.FormCategory.FromSql("EXECUTE dbo.getFormByCategoryId @categoryId", id).ToList();
        }

    }
}
