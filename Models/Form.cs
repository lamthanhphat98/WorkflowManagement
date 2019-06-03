using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class Form
    {
        public Form()
        {
            TaskItem = new HashSet<TaskItem>();
        }

        public int Id { get; set; }
        public int? CategoryId { get; set; }

        public FormCategory Category { get; set; }
        public ICollection<TaskItem> TaskItem { get; set; }
    }
}
