using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkflowManagement.ViewModel
{
    public class ChecklistViewModel
    {

        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? TimeCreated { get; set; }
        public string TemplateStatus { get; set; }
        public int? OrganizationId { get; set; }
        public int? TemplateId { get; set; }
        public Boolean Show { get; set; }
    }
}
