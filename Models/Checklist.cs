using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class Checklist
    {
        public Checklist()
        {
            InverseTemplate = new HashSet<Checklist>();
            TaskItem = new HashSet<TaskItem>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? TimeCreated { get; set; }
        public string TemplateStatus { get; set; }
        public int? OrganizationId { get; set; }
        public int? TemplateId { get; set; }

        public Organization Organization { get; set; }
        public Checklist Template { get; set; }
        public User User { get; set; }
        public ICollection<Checklist> InverseTemplate { get; set; }
        public ICollection<TaskItem> TaskItem { get; set; }
    }
}
