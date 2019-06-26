using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;

namespace WorkflowManagement.IService
{
    public interface IContentService
    {
        List<ContentDetail> getContentByTaskId(int taskId);
    }
}
