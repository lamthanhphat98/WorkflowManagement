using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int? TaskId { get; set; }
        public string UserId { get; set; }
        public string Comment1 { get; set; }
        public int? Priority { get; set; }
        public bool? IsRead { get; set; }

        public TaskItem Task { get; set; }
        public User User { get; set; }
    }
}
