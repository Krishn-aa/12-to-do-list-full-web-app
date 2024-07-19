using ToDoListApp.Models.Models;
using DTO = ToDoListApp.Models.Models;
namespace ToDoListApp.Services.Interfaces
{
    public interface ITaskService
    {
        ServiceResult<List<DTO.Task>> GetRecentTasks(int numberOfTasks);
        ServiceResult<List<DTO.Task>> GetActiveTasks();
        ServiceResult<List<DTO.Task>> GetCompletedTasks();
        ServiceResult<List<DTO.Task>> GetAllTasks();
        ServiceResult<DTO.Task> GetTaskById(int id);
        ServiceResult<int> AddTask(DTO.Task newTask);
        ServiceResult<int> DeleteTask(int id);
        ServiceResult<int> UpdateTask(DTO.Task task);
        ServiceResult<int> UpdateTaskStatus(DTO.Task task);
        ServiceResult<int> GetProgress();

        ServiceResult<int> DeleteAll();

    }
}