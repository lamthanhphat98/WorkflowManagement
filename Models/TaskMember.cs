using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class TaskMember
    {
        public int Id { get; set; }
        public int? TaskId { get; set; }
        public string UserId { get; set; }

        public TaskItem Task { get; set; }
        public User User { get; set; }
    }
}
