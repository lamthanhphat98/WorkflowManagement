using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;

namespace WorkflowManagement.Repository
{
    public class TaskItemRepository
    {
        private readonly WorkflowContext context;
        public TaskItemRepository(WorkflowContext _context)
        {
            context = _context;
        }
    }
}
