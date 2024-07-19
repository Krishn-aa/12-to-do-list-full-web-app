using AutoMapper;
using DTO = ToDoListApp.Models.Models;
using ToDoListApp.Repository.Interfaces;
using DBO = ToDoListApp.Repository.Models;
using ToDoListApp.Models.Models;
using ToDoListApp.Services.Interfaces;
namespace ToDoListApp.Services
{
    public class TaskService(ITaskRepository taskRepository, IMapper mapper) : ITaskService
    {
        private readonly ITaskRepository taskRepository = taskRepository;
        private readonly IMapper mapper = mapper;

        public ServiceResult<List<DTO.Task>> GetRecentTasks(int numberOfTasks)
        {
            try
            {
                List<DBO.Task> tasks = taskRepository.GetRecentTasks(numberOfTasks);
                List<DTO.Task> tasksToView = tasks.Select(mapper.Map<DBO.Task, DTO.Task>).ToList();
                return ServiceResult<List<DTO.Task>>.Success(tasksToView);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<DTO.Task>>.Fail(ex.Message);
            }
        }

        public ServiceResult<List<DTO.Task>> GetActiveTasks()
        {
            try
            {
                List<DBO.Task> tasks = taskRepository.GetActiveTasks();
                List<DTO.Task> tasksToView = tasks.Select(mapper.Map<DBO.Task, DTO.Task>).ToList();
                return ServiceResult<List<DTO.Task>>.Success(tasksToView);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<DTO.Task>>.Fail(ex.Message);
            }
        }

        public ServiceResult<List<DTO.Task>> GetCompletedTasks()
        {
            try
            {
                List<DBO.Task> tasks = taskRepository.GetCompletedTasks();
                List<DTO.Task> tasksToView = tasks.Select(mapper.Map<DBO.Task, DTO.Task>).ToList();
                return ServiceResult<List<DTO.Task>>.Success(tasksToView);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<DTO.Task>>.Fail(ex.Message);
            }
        }
        public ServiceResult<List<DTO.Task>> GetAllTasks()
        {
            try
            {
                List<DBO.Task> tasks = taskRepository.GetAllTasks();
                List<DTO.Task> tasksToView = tasks.Select(mapper.Map<DBO.Task, DTO.Task>).ToList();
                return ServiceResult<List<DTO.Task>>.Success(tasksToView);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<DTO.Task>>.Fail(ex.Message);
            }
        }

        public ServiceResult<DTO.Task> GetTaskById(int id)
        {
            try
            {
                DBO.Task task = taskRepository.Get(id);
                if (task != null)
                {
                    DTO.Task taskToView = mapper.Map<DBO.Task, DTO.Task>(task);
                    return ServiceResult<DTO.Task>.Success(taskToView);
                }
                else
                {
                    return ServiceResult<DTO.Task>.Fail("Task Not Found");
                }
            }
            catch (Exception ex)
            {
                return ServiceResult<DTO.Task>.Fail("Database Error: " + ex.Message);
            }
        }
        public ServiceResult<int> AddTask(DTO.Task newTask)
        {
            try
            {
                DBO.Task taskToAdd = mapper.Map<DTO.Task, DBO.Task>(newTask);
                taskToAdd.CreatedOn = DateTime.Now;
                int rowsUpdated = taskRepository.Insert(taskToAdd);


                return ServiceResult<int>.Success(rowsUpdated);
            }
            catch (Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
        }

        public ServiceResult<int> DeleteTask(int id)
        {
            try
            {
                int rowsDeleted = taskRepository.Delete(id);
                return ServiceResult<int>.Success(rowsDeleted);
            }
            catch (Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
        }

        public ServiceResult<int> UpdateTask(DTO.Task task)
        {
            try
            {
                DBO.Task taskToUpdate = mapper.Map<DTO.Task, DBO.Task>(task);
                int rowsUpdated = taskRepository.UpdateTask(taskToUpdate);
                return ServiceResult<int>.Success(rowsUpdated);
            }
            catch (Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
        }
        public ServiceResult<int> UpdateTaskStatus(DTO.Task task)
        {
            try
            {
                if (task.IsCompleted)
                {
                    task.IsCompleted = false;
                    task.CompletedOn = null;
                }
                else
                {
                    task.IsCompleted = true;
                    task.CompletedOn = DateTime.Now;
                }
                DBO.Task taskToUpdate = mapper.Map<DTO.Task, DBO.Task>(task);
                int rowsUpdated = taskRepository.UpdateTask(taskToUpdate);
                return ServiceResult<int>.Success(rowsUpdated);
            }
            catch (Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
        }

        public ServiceResult<int> DeleteAll()
        {
            try
            {
                int rowsUpdated = taskRepository.DeleteAll();
                return ServiceResult<int>.Success(rowsUpdated);
            }
            catch (Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
        }

        public ServiceResult<int> GetProgress()
        {
            try
            {
                int activeTaskCount = taskRepository.GetActiveTaskCount();
                int completedTaskCount = taskRepository.GetCompletedTaskCount();
                int progress = 0;

                if (activeTaskCount + completedTaskCount > 0)
                {
                    progress = (int)Math.Ceiling(((double)completedTaskCount / (activeTaskCount + completedTaskCount)) * 100);
                }

                return ServiceResult<int>.Success(progress);
            }
            catch (Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
        }

    }
}