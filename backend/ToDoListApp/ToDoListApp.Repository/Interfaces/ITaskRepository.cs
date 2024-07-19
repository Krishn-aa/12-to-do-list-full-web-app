using Model = ToDoListApp.Repository.Models;
namespace ToDoListApp.Repository.Interfaces
{
    public interface ITaskRepository : IBaseRepository<Model.Task>
    {
        List<Model.Task> GetActiveTasks();
        List<Model.Task> GetCompletedTasks();
        List<Model.Task> GetRecentTasks(int numberOfTasks);
        List<Model.Task> GetAllTasks();
        int UpdateTask(Model.Task task);
        int DeleteAll();
        int GetActiveTaskCount();
        int GetCompletedTaskCount();
    }
}
