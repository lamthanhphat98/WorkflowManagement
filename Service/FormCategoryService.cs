using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;

namespace WorkflowManagement.Service
{
    public class FormCategoryService :IFormCategoryService
    {
        private readonly IFormCategoryRepository formRepository;
        public FormCategoryService (IFormCategoryRepository _formRepository)
        {
            formRepository = _formRepository;
        }

        public bool addCategory(FormCategory form)
        {
            return formRepository.addCategory(form);
        }

        public bool delete(int formCategory)
        {
            throw new NotImplementedException();
        }

        public FormCategory findCategory(int formCategory)
        {
            throw new NotImplementedException();
        }

        public List<FormCategory> getFormByCategoryId(int formCategoryId)
        {
            return formRepository.getFormByCategoryId(formCategoryId);
        }

        public List<FormCategory> getListCategory()
        {
            return formRepository.getListCategory();
        }

        public bool update(int formCategory, FormCategory inforChange)
        {
            throw new NotImplementedException();
        }
    }
}
