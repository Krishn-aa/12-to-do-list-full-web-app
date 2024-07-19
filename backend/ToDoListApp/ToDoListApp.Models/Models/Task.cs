namespace ToDoListApp.Models.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedOn { get; set; }
        public DateTime? CompletedOn { get; set; }
        

    }
}
