using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class UserOrganization
    {
        public int Id { get; set; }
        public string MemberId { get; set; }
        public int? OrganizationId { get; set; }
        public bool? CurrentOrganization { get; set; }
        public string StatusMember { get; set; }

        public User Member { get; set; }
        public Organization Organization { get; set; }
    }
}
