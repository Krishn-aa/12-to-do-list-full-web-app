using AutoMapper;
using DTO = ToDoListApp.Models.Models;
using DBO = ToDoListApp.Repository.Models;

namespace ToDoListApp.Repository.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DBO.User, DTO.User>().ReverseMap();
            CreateMap<DBO.Task, DTO.Task>().ReverseMap();
        }
    }
}
