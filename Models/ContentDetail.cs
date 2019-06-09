using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class ContentDetail
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Text { get; set; }
        public string ImageSrc { get; set; }
        public int? TaskItemId { get; set; }
        public int? OrderContent { get; set; }
        public string Label { get; set; }

        public TaskItem TaskItem { get; set; }
    }
}
