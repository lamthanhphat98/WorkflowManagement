using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IRepository
{
    public interface ICommentRepository
    {
        List<Comment> countComment(int organizationId, string userId);
        List<CommentViewModel> getCommentByOrganization(int organizationId, string userId);

    }
}
