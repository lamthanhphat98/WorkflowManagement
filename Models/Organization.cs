using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class Organization
    {
        public Organization()
        {
            Checklist = new HashSet<Checklist>();
            UserOrganization = new HashSet<UserOrganization>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string AdminId { get; set; }
        public bool? CurrentOrganization { get; set; }

        public User Admin { get; set; }
        public ICollection<Checklist> Checklist { get; set; }
        public ICollection<UserOrganization> UserOrganization { get; set; }
    }
}
