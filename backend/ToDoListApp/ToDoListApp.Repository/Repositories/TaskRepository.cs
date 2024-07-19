using ToDoListApp.Models.Interfaces;
using ToDoListApp.Repository.Interfaces;
using DBO = ToDoListApp.Repository.Models;


namespace ToDoListApp.Repository.Repositories
{
    public class TaskRepository(DBO.AppDbContext context, ILoggedInUser loggedUser) : BaseRepository<DBO.Task>(context), ITaskRepository
    {
        private readonly DBO.AppDbContext _context = context;

        public List<DBO.Task> GetActiveTasks()
        {
            return  _context.Tasks
                           .Where(t => t.CreatedBy == loggedUser.UserId)
                           .Where(t => t.CreatedOn.Date == DateTime.Now.Date)
                           .Where(t => t.IsCompleted == false).ToList();
        }

        public List<DBO.Task> GetCompletedTasks()
        {
            return  _context.Tasks
                            .Where(t => t.CreatedBy == loggedUser.UserId)
                            .Where(t => t.IsCompleted == true)
                            .Where(t => t.CompletedOn.Value.Date == DateTime.Now.Date).ToList();
        }
        public List<DBO.Task> GetRecentTasks(int numberOfTasks)
        {
            return _context.Tasks
                            .Where(task => task.CreatedBy == loggedUser.UserId)
                            .Where(task => task.CreatedOn.Date == DateTime.Now.Date)
                            .OrderBy(task => task.CreatedOn)
                            .OrderByDescending(task => !task.IsCompleted)
                            .Take(numberOfTasks).ToList();
        }
        public List<DBO.Task> GetAllTasks()
        {
            return _context.Tasks
                            .Where(task => task.CreatedBy == loggedUser.UserId)
                            .Where(task => task.IsCompleted == false)
                            .Where(task => task.CreatedOn.Date != DateTime.Now.Date)
                            .OrderByDescending(task => task.CreatedOn)
                            .ToList();
        }
        public int UpdateTask(DBO.Task task)
        {
            var existingTask = _context.Tasks.Find(task.Id);
            if (existingTask != null)
            {
                _context.Entry(existingTask).CurrentValues.SetValues(task);
            }
            return _context.SaveChanges();

        }
        public int DeleteAll()
        {
            var tasks = _context.Tasks.Where(t => t.CreatedBy == loggedUser.UserId);
            foreach (var task in tasks)
            {
                _context.Tasks.Remove(task);
            }
            return _context.SaveChanges();
        }
        public int GetActiveTaskCount()
        {
            return _context.Tasks
                .Where(t => t.CreatedBy == loggedUser.UserId)
                .Where(t => t.CreatedOn.Date == DateTime.Now.Date)
                .Where(t=> t.IsCompleted==false)
                .Count();
        }
        public int GetCompletedTaskCount()
        {
                return _context.Tasks
                .Where(t => t.CreatedBy == loggedUser.UserId)
                .Where(t => t.CreatedOn.Date == DateTime.Now.Date)
                .Where(t => t.IsCompleted == true)
                .Count();
        }
    }
}
