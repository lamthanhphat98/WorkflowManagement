using System;
using System.Collections.Generic;

namespace WorkflowManagement.Models
{
    public partial class User
    {
        public User()
        {
            Checklist = new HashSet<Checklist>();
            Comment = new HashSet<Comment>();
            Organization = new HashSet<Organization>();
            TaskMember = new HashSet<TaskMember>();
            UserOrganization = new HashSet<UserOrganization>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public string Role { get; set; }
        public string VerifyCode { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public string DeviceToken { get; set; }

        public ICollection<Checklist> Checklist { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<Organization> Organization { get; set; }
        public ICollection<TaskMember> TaskMember { get; set; }
        public ICollection<UserOrganization> UserOrganization { get; set; }
    }
}
