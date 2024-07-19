using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoListApp.API.Configs;
using ToDoListApp.API.Services;
using ToDoListApp.Models.Interfaces;
using ToDoListApp.Services.Interfaces;
using DTO = ToDoListApp.Models.Models;

namespace ToDoListApp.API.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(LoggedInUserFilter))]
    public class TaskController(ITaskService taskService, ILoggerManager loggerManager) : ControllerBase
    {
        [HttpGet("RecentTasks")]
        //[ResponseCache(Duration = 180)]
        public async Task<IActionResult> RecentTasks()
        {
            loggerManager.LogInfo($"Database is hit to get recent task ");
            var result = taskService.GetRecentTasks(Constants.NoOfTasks);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("ActiveTasks")]
        public async Task<IActionResult> ActiveTasks()
        {
            loggerManager.LogInfo($"Database is hit to get active task ");
            var result = taskService.GetActiveTasks();
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("CompletedTasks")]
        public async Task<IActionResult> CompletedTasks()
        {
            loggerManager.LogInfo($"Database is hit to get completed task ");
            var result = taskService.GetCompletedTasks();
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("AllTasks")]
        public async Task<IActionResult> AllTasks()
        {
            loggerManager.LogInfo($"Database is hit to get All task ");
            var result = taskService.GetAllTasks();
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [HttpPost("AddTask")]
        public async Task<IActionResult> AddTask([FromBody] DTO.Task newTask)
        {

            var result = taskService.AddTask(newTask);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete("DeleteTask/{taskId}")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            var result = taskService.DeleteTask(taskId);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [HttpPut("UpdateTask")]
        public async Task<IActionResult> UpdateTask([FromBody] DTO.Task task)
        {
            if (task == null || task.Id == 0)
            {
                return BadRequest("Invalid task data.");
            }

            var result = taskService.UpdateTask(task);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }

            return BadRequest(result.Message);
        }
        [HttpPut("UpdateTaskStatus")]
        public async Task<IActionResult> UpdateTaskStatus([FromBody] DTO.Task task)
        {
            if (task == null || task.Id == 0)
            {
                return BadRequest("Invalid task data.");
            }
            var result = taskService.UpdateTaskStatus(task);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }

            return BadRequest(result.Message);
        }

        [HttpDelete("DeleteAll")]
        public async Task<IActionResult> DeleteAll()
        {
            var result = taskService.DeleteAll();
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("Progress")]
        public async Task<IActionResult> GetProgress()
        {
            var result = taskService.GetProgress();
            if(result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return Ok(result.Message);
        }
        
    }
}