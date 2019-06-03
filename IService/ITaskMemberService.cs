using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkflowManagement.IService
{
    public interface ITaskMemberService
    {
        int getMemberByChecklist(int checklistId);
    }
}
