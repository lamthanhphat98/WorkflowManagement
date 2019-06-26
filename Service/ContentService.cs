using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;

namespace WorkflowManagement.Service
{
    public class ContentService : IContentService
    {
        private readonly IContentRepository contentRepository;
        public ContentService(IContentRepository _contentRepository)
        {
            contentRepository = _contentRepository;
        }

        public List<ContentDetail> getContentByTaskId(int taskId)
        {
            return contentRepository.getContentByTaskId(taskId);
        }
    }
}
