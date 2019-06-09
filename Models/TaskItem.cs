using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class TaskItem
    {
        public TaskItem()
        {
            Comment = new HashSet<Comment>();
            ContentDetail = new HashSet<ContentDetail>();
            TaskMember = new HashSet<TaskMember>();
        }

        public int Id { get; set; }
        public int? ChecklistId { get; set; }
        public string Name { get; set; }
        public DateTime? DueTime { get; set; }
        public int? Priority { get; set; }
        public string TaskStatus { get; set; }

        public Checklist Checklist { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<ContentDetail> ContentDetail { get; set; }
        public ICollection<TaskMember> TaskMember { get; set; }
    }
}
