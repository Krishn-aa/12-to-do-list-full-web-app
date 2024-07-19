using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ToDoListApp.Models.Interfaces;
using ToDoListApp.Models.Models;
using ToDoListApp.Services.Interfaces;

namespace ToDoListApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController(IConfiguration config, IUserService userService, ILoggerManager loggerManager) : ControllerBase
    {
        private readonly IConfiguration config = config;
        private readonly IUserService userService = userService;
        private readonly ILoggerManager loggerManager = loggerManager;
        [HttpPost("register")]
        public IActionResult Add([FromBody] User user)
        {
            loggerManager.LogInfo("A new user is registered");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.Password = HashPassword(user.Password);
            var result = userService.Register(user);
            if (result.IsSuccess)
            {
                return Ok("Registered");
            }
            else
            {
                return StatusCode(409, "Username is already registered");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            loggerManager.LogInfo("A user has logged in");
            User _user = AuthenticateUser(user);
            if (_user != null)
            {
                var token = GenerateToken(_user);
                return Ok(token);
            }
            return NotFound("User not found");
        }
        [NonAction]
        private User AuthenticateUser(User user)
        {
            var hashedPassword = HashPassword(user.Password);
            var result = userService.GetUserByUsername(user);
            if(result.IsSuccess)
            {
                if (result.Data.Password == hashedPassword)
                {
                    return result.Data;
                }
            }
            return null;
        }
        [NonAction]
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {

                new Claim("userId", user!.Id.ToString()!),
                new Claim(ClaimTypes.NameIdentifier, user!.Username.ToString()!),
            };
            var token = new JwtSecurityToken(
             issuer: config["Jwt:Issuer"],
             audience: config["Jwt:Audience"],
             claims: claims,
             expires: DateTime.Now.AddHours(2),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [NonAction]
        private string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var asBytedArray = Encoding.UTF8.GetBytes(password);
                var hashedPassword = sha.ComputeHash(asBytedArray);
                return Convert.ToBase64String(hashedPassword);
            }
        }
    }
}