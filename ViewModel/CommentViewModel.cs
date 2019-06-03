using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkflowManagement.ViewModel
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public int? TaskId { get; set; }
        public string UserId { get; set; }
        public string Comment1 { get; set; }
        public int? Priority { get; set; }
        public bool? IsRead { get; set; }
        public string ImageUrl { get; set; }
    }
}
