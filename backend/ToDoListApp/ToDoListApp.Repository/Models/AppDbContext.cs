using Microsoft.EntityFrameworkCore;
using ToDoListApp.Models.Interfaces;

namespace ToDoListApp.Repository.Models
{
    public class AppDbContext : DbContext
    {
        private readonly ILoggedInUser loggedUser;

        public AppDbContext(DbContextOptions<AppDbContext> options, ILoggedInUser loggedUser)
            : base(options)
        {
            this.loggedUser = loggedUser;
        }

        // Ensure that your default constructor is not being used unintentionally
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public override int SaveChanges()
        {
            if (loggedUser != null)
            {
                SetAuditProperties();
            }
            return base.SaveChanges();
        }

        private void SetAuditProperties()
        {
            var entries = ChangeTracker.Entries();
            foreach (var entry in entries)
            {
                if (entry.Entity is IAuditable entity)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            entity.CreatedOn = DateTime.Now;
                            entity.CreatedBy = loggedUser.UserId;
                            break;

                        case EntityState.Modified:
                            entity.CreatedBy = loggedUser.UserId;
                            entity.ModifiedOn = DateTime.Now;
                            entity.ModifiedBy = loggedUser.UserId;
                            break;
                    }
                }
            }
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                 .HasIndex(u => u.Username)
                 .IsUnique();

            modelBuilder.Entity<Task>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.CreatedBy);
        }
    }
}
