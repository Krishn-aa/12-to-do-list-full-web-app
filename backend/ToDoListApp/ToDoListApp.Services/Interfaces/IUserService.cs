using ToDoListApp.Models.Models;

namespace ToDoListApp.Services.Interfaces
{
    public interface IUserService
    {
        ServiceResult<User> GetUserByUsername(User user);
        ServiceResult<int> Register(User user);

    }
}