using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoListApp.Repository.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is a required field.")]
        [StringLength(40, MinimumLength = 2)]
        public string Username { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 5)]
        public string Password { get; set; }

        public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}
