using Microsoft.AspNetCore.Mvc.Filters;
using ToDoListApp.Models.Interfaces;

namespace ToDoListApp.API.Services
{
    public class LoggedInUserFilter(IHttpContextAccessor contextAccessor, ILoggedInUser loggedUser) : IActionFilter
    {
        private readonly IHttpContextAccessor _contextAccessor = contextAccessor;
        private readonly ILoggedInUser loggedUser = loggedUser;
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var idClaim = _contextAccessor.HttpContext.User.FindFirst("UserId");
            if (idClaim == null)
            {
                throw new Exception("User not found.");
            }
            else
            {
                loggedUser.UserId = int.Parse(idClaim.Value);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Do nothing
        }
    }

}
