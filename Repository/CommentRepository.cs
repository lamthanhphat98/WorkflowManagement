using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using WorkflowManagement.IRepository;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;

namespace WorkflowManagement.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly WorkflowContext _context;
        public CommentRepository(WorkflowContext context)
        {
            _context = context;
        }

        public List<Comment> countComment(int organizationId, string userId)
        {
            var organization = new SqlParameter("@OrganizationId", organizationId);
            var user = new SqlParameter("@UserId", userId);
            return _context.Comment.FromSql("EXECUTE dbo.getCommentByOrganization @OrganizationId,@UserId", organization, user).ToList();
        }

        public List<CommentViewModel> getCommentByOrganization(int organizationId, string userId)
        {
            List<CommentViewModel> commentViewModels = new List<CommentViewModel>();
            var viewModel = new CommentViewModel();
            var organization = new SqlParameter("@OrganizationId", organizationId);
            var user = new SqlParameter("@UserId", userId);
            var getComment = _context.Comment.FromSql("EXECUTE dbo.getCommentByOrganization @OrganizationId,@UserId", organization, user).Where(c=>!c.UserId.Equals(userId)).ToList();
            foreach (var item in getComment)
            {
                viewModel.Id = item.Id;
                viewModel.TaskId = item.TaskId;
                viewModel.UserId = item.UserId;
                viewModel.Comment1 = item.Comment1;
                viewModel.Priority = item.Priority;
                viewModel.IsRead = item.IsRead;
                var getUser = _context.User.Where(u => u.Id.Equals(item.UserId)).FirstOrDefault();
                viewModel.ImageUrl = getUser.Avatar;
                commentViewModels.Add(viewModel);
            }
            return commentViewModels;
        }

    }
}
