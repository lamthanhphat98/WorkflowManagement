using EntityContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;

namespace WorkflowManagement.Repository
{
    public class ContentRepository : IContentRepository
    {
        private readonly WorkflowContext context;
        public ContentRepository(WorkflowContext _context)
        {
            context = _context;
        }
        public List<ContentDetail> getContentByTaskId(int taskId)
        {
            return context.ContentDetail.Where(c => c.TaskItemId == taskId).ToList();
        }
    }
}
