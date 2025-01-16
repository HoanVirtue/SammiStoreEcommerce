using AutoMapper;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.DomainModels.Users;

namespace SAMMI.ECOM.API.Infrastructure.AutoMapperConfigs
{
    public class UsersMapperProfile : Profile
    {
        public UsersMapperProfile()
        {
            CreateMap<User, EmployeeDTO>();
        }
    }
}
