using ToDoListApp.Models.Interfaces;

namespace ToDoListApp.Models.Models
{
    public class LoggedInUser : ILoggedInUser
    {
        public int UserId { get; set; }
    }
}
