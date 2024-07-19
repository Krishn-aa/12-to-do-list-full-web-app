using AutoMapper;
using ToDoListApp.Models.Interfaces;
using ToDoListApp.Models.Models;
using ToDoListApp.Repository.Interfaces;
using ToDoListApp.Services.Interfaces;
using DBO = ToDoListApp.Repository.Models;
namespace ToDoListApp.Services
{
    public class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IMapper mapper = mapper;

        public ServiceResult<User> GetUserByUsername(User user)
        {
            DBO.User _user = userRepository.GetUserByUsername(user.Username);

            User DTO_user = mapper.Map<DBO.User, User>(_user);

            return  ServiceResult<User>.Success(DTO_user);
        }

        public ServiceResult<int> Register(User newUser)
        {
            DBO.User user = mapper.Map<User, DBO.User>(newUser);
            try
            {
                int rowsAffected = userRepository.Insert(user);
                if (rowsAffected > 0)
                {
                    return ServiceResult<int>.Success(rowsAffected);
                }
            }
            catch(Exception ex)
            {
                return ServiceResult<int>.Fail(ex.Message);
            }
            return ServiceResult<int>.Fail("Error Unknown");
        }
    }
}
