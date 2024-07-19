using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ToDoListApp.Models.Interfaces;

namespace ToDoListApp.Repository.Models
{
    [Table("Tasks")]
    public class Task : IAuditable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string? Description { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsCompleted { get; set; }
        public DateTime? CompletedOn { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual User User { get; set; }
    }
}
