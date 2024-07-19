using ToDoListApp.Repository.Models;

namespace ToDoListApp.Repository.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        User GetUserByUsername(string username);
    }
}
