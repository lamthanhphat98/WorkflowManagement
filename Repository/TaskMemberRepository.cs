using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using WorkflowManagement.IRepository;

namespace WorkflowManagement.Repository
{
    public class TaskMemberRepository : ITaskMemberRepository
    {
        private readonly WorkflowContext context;
        public TaskMemberRepository(WorkflowContext _context)
        {
            context = _context;
        }
        public int getMemberByChecklist(int checklistId)
        {
            var id = new SqlParameter("@ChecklistId", checklistId);
            // var result = context.Database.ExecuteSqlCommand("SELECT DISTINCT m.UserId from TaskMember m join TaskItem t on m.TaskId = t.Id and t.ChecklistId = @ChecklistId", id);
            var result = context.TaskMember.FromSql("getMemberByChecklist @ChecklistId", id).ToList();
            var members = result.Select(m => m.UserId).Distinct().Count();
            return members;
        }
    }
}
