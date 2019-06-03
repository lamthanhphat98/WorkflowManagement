using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.IService
{
    public interface ICommentService
    {
        List<Comment> countComment(int organizationId, string userId);
        List<CommentViewModel> getCommentByOrganization(int organizationId, string userId);



    }
}
