using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;

namespace WorkflowManagement.Repository
{
    public class FormRepository
    {
        private readonly WorkflowContext context;
        public FormRepository(WorkflowContext _context)
        {
            context = _context;
        }
    }
}
