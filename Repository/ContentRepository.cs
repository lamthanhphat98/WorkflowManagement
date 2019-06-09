using EntityContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkflowManagement.Repository
{
    public class ContentRepository
    {
        private readonly WorkflowContext _context;
        public ContentRepository(WorkflowContext context)
        {
            _context = context;
        }
    }
}
