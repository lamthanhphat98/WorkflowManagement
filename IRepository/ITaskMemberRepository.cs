using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkflowManagement.IRepository
{
    public interface ITaskMemberRepository
    {
         int getMemberByChecklist(int checklistId);
    }
}
