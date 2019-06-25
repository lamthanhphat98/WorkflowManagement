using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WorkflowManagement.Models;

namespace EntityContext
{
    public partial class WorkflowContext : DbContext
    {
        public WorkflowContext()
        {
        }

        public WorkflowContext(DbContextOptions<WorkflowContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Checklist> Checklist { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<ContentDetail> ContentDetail { get; set; }
        public virtual DbSet<Organization> Organization { get; set; }
        public virtual DbSet<TaskItem> TaskItem { get; set; }
        public virtual DbSet<TaskMember> TaskMember { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserOrganization> UserOrganization { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=PHATLTSE62882\\SQLEXPRESS;Database=Workflow;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Checklist>(entity =>
            {
                entity.Property(e => e.Category).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.TemplateStatus).HasMaxLength(50);

                entity.Property(e => e.TimeCreated).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasMaxLength(250);

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.Checklist)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_Checklist_Organization");

                entity.HasOne(d => d.Template)
                    .WithMany(p => p.InverseTemplate)
                    .HasForeignKey(d => d.TemplateId)
                    .HasConstraintName("FK_Checklist_Checklist");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Checklist)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Checklist_User");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Comment1).HasColumnName("Comment");

                entity.Property(e => e.UserId).HasMaxLength(250);

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_Comment_Task");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<ContentDetail>(entity =>
            {
                entity.Property(e => e.ImageSrc).HasMaxLength(250);

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.HasOne(d => d.TaskItem)
                    .WithMany(p => p.ContentDetail)
                    .HasForeignKey(d => d.TaskItemId)
                    .HasConstraintName("FK_ContentDetail_TaskItem1");
            });

            modelBuilder.Entity<Organization>(entity =>
            {
                entity.Property(e => e.AdminId).HasMaxLength(250);

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.Organization)
                    .HasForeignKey(d => d.AdminId)
                    .HasConstraintName("FK_Organization_User");
            });

            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.Property(e => e.DueTime).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.TaskStatus).HasMaxLength(50);

                entity.HasOne(d => d.Checklist)
                    .WithMany(p => p.TaskItem)
                    .HasForeignKey(d => d.ChecklistId)
                    .HasConstraintName("FK_Task_Checklist");
            });

            modelBuilder.Entity<TaskMember>(entity =>
            {
                entity.Property(e => e.UserId).HasMaxLength(250);

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskMember)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_TaskMember_Task");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TaskMember)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_TaskMember_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(250)
                    .ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.Property(e => e.Role).HasMaxLength(50);

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.Property(e => e.VerifyCode).HasMaxLength(50);
            });

            modelBuilder.Entity<UserOrganization>(entity =>
            {
                entity.Property(e => e.MemberId).HasMaxLength(250);

                entity.Property(e => e.StatusMember).HasMaxLength(50);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.UserOrganization)
                    .HasForeignKey(d => d.MemberId)
                    .HasConstraintName("FK_UserOrganization_User");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.UserOrganization)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_UserOrganization_Organization");
            });
        }
    }
}
