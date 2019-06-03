using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;

namespace WorkflowManagement.Service
{
    public class TaskMemberService : ITaskMemberService
    {
        private readonly ITaskMemberRepository taskMemberRepository;
        public TaskMemberService (ITaskMemberRepository _taskMemberRepository)
        {
            taskMemberRepository = _taskMemberRepository;
        }
        public int getMemberByChecklist(int checklistId)
        {
           return taskMemberRepository.getMemberByChecklist(checklistId);
        }
    }
}
