
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;

namespace WorkflowManagement.IRepository
{
    public interface IFormCategoryRepository
    {
        List<FormCategory> getListCategory();
        FormCategory findCategory(int formCategory);
        Boolean addCategory(FormCategory form);
        Boolean update(int formCategory, FormCategory inforChange);
        Boolean delete(int formCategory);
        List<FormCategory> getFormByCategoryId(int formCategoryId);
    }
}
