using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class FormCategory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public string PreviewImage { get; set; }

        public Form Form { get; set; }
    }
}
