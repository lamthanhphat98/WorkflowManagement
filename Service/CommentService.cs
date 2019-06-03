using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Service
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository commentRepository;
        public CommentService(ICommentRepository _commentRepository)
        {
            commentRepository = _commentRepository;
        }
       public List<Comment> countComment(int organizationId, string userId)
        {
            return commentRepository.countComment(organizationId, userId);
        }

        public List<CommentViewModel> getCommentByOrganization(int organizationId, string userId)
        {
            return commentRepository.getCommentByOrganization(organizationId, userId);
        }
    }
}
