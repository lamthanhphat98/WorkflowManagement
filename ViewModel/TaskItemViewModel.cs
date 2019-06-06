using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkflowManagement.ViewModel
{
    public class TaskItemViewModel
    {
        public int Id { get; set; }
        public int? ChecklistId { get; set; }
        public string Name { get; set; }
        public string DueTime { get; set; }
        public int? Priority { get; set; }
        public int? FormId { get; set; }
        public string FormSubmitted { get; set; }
        public string TaskStatus { get; set; }
        public ICollection<String> UserId { get; set; }
    }
}
