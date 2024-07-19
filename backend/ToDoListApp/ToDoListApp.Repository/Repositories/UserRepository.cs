using ToDoListApp.Repository.Interfaces;
using ToDoListApp.Repository.Models;

namespace ToDoListApp.Repository.Repositories
{
    public class UserRepository(AppDbContext context) : BaseRepository<User>(context), IUserRepository
    {
        private readonly AppDbContext _context = context;
        public User GetUserByUsername(string username)
        {
           return _context.Users.Where(user => user.Username==username).FirstOrDefault();
        }
    }
}
